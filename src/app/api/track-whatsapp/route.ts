import { NextRequest, NextResponse } from 'next/server';
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

    // 2. Disparar Meta Conversions API (CAPI) Server-Side como Lead e Contact
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

    // Apenas envia a conversão para o Meta; não insere na tabela de leads da base de dados.
    return NextResponse.json({
      success: true,
      eventId: finalEventId,
      message: 'Contacto WhatsApp rastreado para o Meta com sucesso.',
    });
  } catch (error: any) {
    console.error('Erro em /api/track-whatsapp:', error);
    return NextResponse.json(
      { error: 'Erro ao processar tracking WhatsApp.' },
      { status: 500 }
    );
  }
}

