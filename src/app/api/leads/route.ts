import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureLeadsTable } from '@/lib/db';
import { sendMetaLeadConversion } from '@/lib/metaConversions';

function calculateLeadPriority(
  disponibilidadeCapital?: string | null,
  creditoHabitacao?: string | null,
  horizonteTemporal?: string | null
): string {
  const cap = (disponibilidadeCapital || '').toLowerCase();
  const cred = (creditoHabitacao || '').toLowerCase();
  const horiz = (horizonteTemporal || '').toLowerCase();

  // Filtro de Realidade: Se tem menos de 30.000€, não cumpre os 10% mínimos de entrada (33.500€)
  if (cap.includes('menos de 30') || cap.includes('< 30')) {
    return '4. BAIXA / DESQUALIFICADA (Capital < 30k)';
  }

  const hasCapital = cap.includes('mais de 35') || cap.includes('> 35');
  const isPreApproved = cred.includes('pré-aprovado') || cred.includes('pre-aprovado');
  const isSimulation = cred.includes('simulaç') || cred.includes('limite');
  const isImmediate = horiz.includes('30 a 60') || horiz.includes('imediato');
  const isMediumTerm = horiz.includes('3 a 6');

  // Top Lead: Tem capital + Crédito Pré-Aprovado
  if (hasCapital && isPreApproved && (!horiz || isImmediate)) {
    return '1. TOP LEAD (Prioridade Máxima)';
  }

  // Alta prioridade: Tem capital + (Pré-aprovado ou simulação) + prazo curto/médio
  if (hasCapital && (isPreApproved || isSimulation) && (!horiz || isImmediate || isMediumTerm)) {
    return '2. ALTA PRIORIDADE';
  }

  // Média prioridade: Tem capital
  if (hasCapital) {
    return '3. MÉDIA PRIORIDADE';
  }

  return 'Normal';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nome,
      telefone,
      email,
      source,
      interesse,
      notes,
      eventId,
      disponibilidadeCapital,
      creditoHabitacao,
      horizonteTemporal,
      fbp: bodyFbp,
      fbc: bodyFbc,
    } = body;
    const objetivo = body.objetivo ? String(body.objetivo).slice(0, 200) : null;
    const horarioContacto = body.horarioContacto ? String(body.horarioContacto).slice(0, 100) : null;

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return NextResponse.json(
        { error: 'Por favor, indique o seu nome.' },
        { status: 400 }
      );
    }

    const cleanPhone = (telefone || '').toString().replace(/\s+/g, '').replace(/^(\+351)/, '');
    const phoneRegex = /^9\d{8}$/;

    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'O número de telemóvel tem de ter 9 dígitos e começar por 9.' },
        { status: 400 }
      );
    }

    const prioridade = calculateLeadPriority(
      disponibilidadeCapital,
      creditoHabitacao,
      horizonteTemporal
    );

    // 1. Guardar na base de dados Neon: nome, telefone, objetivo, horario, notes, capital, credito e resto
    let dbResult = null;
    try {
      await ensureLeadsTable();
      dbResult = await sql`
        INSERT INTO leads (
          nome,
          telefone,
          objetivo,
          horario_contacto,
          notes,
          disponibilidade_capital,
          credito_habitacao,
          prioridade,
          horizonte_temporal,
          interesse,
          source,
          status
        )
        VALUES (
          ${nome.trim()},
          ${cleanPhone},
          ${objetivo},
          ${horarioContacto},
          ${notes || ''},
          ${disponibilidadeCapital || null},
          ${creditoHabitacao || null},
          ${prioridade},
          ${horizonteTemporal || null},
          ${interesse || 'Domaine XXV Moradia T3/T4'},
          ${source || 'site_lead_modal'},
          'novo'
        )
        RETURNING id, created_at;
      `;
    } catch (dbError) {
      console.error('Database lead insert error:', dbError);
      // Fallback: tentar novamente com dados formatados nas notas
      try {
        const enrichedNotes = `Capital: ${disponibilidadeCapital || '-'} | Crédito: ${creditoHabitacao || '-'}${horizonteTemporal ? ` | Prazo: ${horizonteTemporal}` : ''} ${notes ? `| Notas: ${notes}` : ''}`;
        dbResult = await sql`
          INSERT INTO leads (nome, telefone, objetivo, horario_contacto, notes, interesse, source)
          VALUES (${nome.trim().slice(0, 250)}, ${cleanPhone}, ${objetivo || '-'}, ${horarioContacto || '-'}, ${enrichedNotes}, ${'Domaine XXV'}, ${String(source || 'site_lead_modal').slice(0, 90)})
          RETURNING id, created_at;
        `;
      } catch (retryError) {
        console.error('Database lead insert retry failed:', retryError);
      }
    }

    // 2. Extrair metadados para máxima qualidade de correspondência Meta CAPI (Event Match Quality)
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null;
    const clientUserAgent = req.headers.get('user-agent') || null;
    const sourceUrl = req.headers.get('referer') || 'https://domainexxv.pt';

    const fbp = bodyFbp || req.cookies.get('_fbp')?.value || null;
    const fbc = bodyFbc || req.cookies.get('_fbc')?.value || null;

    const finalEventId =
      eventId || `capi_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 3. Disparo Server-Side Meta Conversions API (Lead com o valor mais alto de referência: 450.000€)
    try {
      await sendMetaLeadConversion({
        eventId: finalEventId,
        nome: nome.trim(),
        telefone: cleanPhone,
        email: email || null,
        sourceUrl,
        clientIp,
        clientUserAgent,
        fbp,
        fbc,
      });
    } catch (metaError: any) {
      console.error('⚠️ [Meta CAPI] Falha ao enviar evento:', metaError?.message || metaError);
    }

    return NextResponse.json({
      success: true,
      id: dbResult?.[0]?.id,
      eventId: finalEventId,
      message: 'Contacto registado com sucesso.',
    });
  } catch (error: any) {
    console.error('Error processing lead request:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao registar o contacto. Por favor tente novamente.' },
      { status: 500 }
    );
  }
}
