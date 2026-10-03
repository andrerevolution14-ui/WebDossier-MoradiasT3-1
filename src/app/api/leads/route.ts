import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureLeadsTable } from '@/lib/db';
import { sendMetaLeadConversion } from '@/lib/metaConversions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, telefone, email, source, interesse, notes, eventId, fbp: bodyFbp, fbc: bodyFbc } = body;

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

    // 1. Guardar na base de dados Neon
    let dbResult = null;
    try {
      await ensureLeadsTable();
      dbResult = await sql`
        INSERT INTO leads (nome, telefone, source, interesse, notes)
        VALUES (${nome.trim()}, ${cleanPhone}, ${source || 'site_lead_modal'}, ${interesse || 'Domaine XXV Moradia T3/T4'}, ${notes || ''})
        RETURNING id, created_at;
      `;
    } catch (dbError) {
      console.error('Database lead insert error:', dbError);
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
