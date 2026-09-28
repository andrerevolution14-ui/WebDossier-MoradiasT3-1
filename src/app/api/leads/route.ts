import { NextRequest, NextResponse } from 'next/server';
import { sql, ensureLeadsTable } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, telefone, source, interesse, notes } = body;

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

    await ensureLeadsTable();

    const result = await sql`
      INSERT INTO leads (nome, telefone, source, interesse, notes)
      VALUES (${nome.trim()}, ${cleanPhone}, ${source || 'site_lead_modal'}, ${interesse || 'Domaine XXV Moradia T3/T4'}, ${notes || ''})
      RETURNING id, created_at;
    `;

    return NextResponse.json({
      success: true,
      id: result[0]?.id,
      message: 'Contacto registado com sucesso.',
    });
  } catch (error: any) {
    console.error('Error saving lead to Neon database:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao registar o contacto. Por favor tente novamente.' },
      { status: 500 }
    );
  }
}
