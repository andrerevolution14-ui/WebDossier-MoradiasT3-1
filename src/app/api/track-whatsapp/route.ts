import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureLeadsTable } from '@/lib/db';
import { sendMetaWhatsAppConversion } from '@/lib/metaConversions';
import { getSiteUrl } from '@/lib/siteUrl';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      eventId,
      objective = 'Conversa Geral',
      message = '',
      source = 'whatsapp_floating_widget',
      fbp: bodyFbp,
      fbc: bodyFbc,
    } = body;

    const finalEventId =
      eventId || `wa_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 1. Extrair metadados de rede para o CAPI
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null;
    const clientUserAgent = req.headers.get('user-agent') || null;
    const sourceUrl = req.headers.get('referer') || getSiteUrl();

    const fbp = bodyFbp || req.cookies.get('_fbp')?.value || null;
    const fbc = bodyFbc || req.cookies.get('_fbc')?.value || null;

    // 2. Disparar Meta Conversions API (CAPI) Server-Side
    try {
      await sendMetaWhatsAppConversion({
        eventId: finalEventId,
        objective,
        source,
        sourceUrl,
        clientIp,
        clientUserAgent,
        fbp,
        fbc,
      });
    } catch (metaError) {
      console.error('⚠️ [Meta CAPI WhatsApp] Falha ao enviar para Graph API:', metaError);
    }

    // 3. Registar na base de dados Neon para que o utilizador veja imediatamente na DB
    let dbId = null;
    try {
      await ensureLeadsTable();
      const enrichedNotes = `Iniciou conversa no WhatsApp com o André. Objetivo: "${objective}". ${message ? `Mensagem: "${message}". ` : ''}EventID: ${finalEventId}`;
      const result = await sql`
        INSERT INTO leads (
          nome,
          telefone,
          objetivo,
          notes,
          interesse,
          source,
          status,
          prioridade
        )
        VALUES (
          'Contacto WhatsApp (Iniciado)',
          '+351 920 601 070 (WA)',
          ${objective.slice(0, 200)},
          ${enrichedNotes},
          'Domaine XXV Moradia T3',
          ${String(source).slice(0, 90)},
          'whatsapp_iniciado',
          'Média (WhatsApp)'
        )
        RETURNING id;
      `;
      dbId = result?.[0]?.id;
    } catch (dbError) {
      console.error('⚠️ [Neon DB] Falha ao registar clique WhatsApp na base de dados:', dbError);
    }

    return NextResponse.json({
      success: true,
      eventId: finalEventId,
      dbId,
      message: 'Contacto WhatsApp rastreado com sucesso.',
    });
  } catch (error: any) {
    console.error('Erro em /api/track-whatsapp:', error);
    return NextResponse.json(
      { error: 'Erro ao processar tracking WhatsApp.' },
      { status: 500 }
    );
  }
}
