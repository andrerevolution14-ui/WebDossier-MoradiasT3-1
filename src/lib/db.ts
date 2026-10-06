import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_7fcCtHManI4B@ep-jolly-cloud-zae2i71e-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export const sql = neon(connectionString);

let leadsTableReady = false;

export async function ensureLeadsTable() {
  if (leadsTableReady) return;
  try {
    // Tabela organizada no Neon: 1. id, 2. nome, 3. telefone, 4. objetivo, 5. horario_contacto, 6. notes, 7. disponibilidade_capital, 8. credito_habitacao e só depois o resto
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        telefone VARCHAR(50) NOT NULL,
        objetivo TEXT,
        horario_contacto TEXT,
        notes TEXT,
        disponibilidade_capital TEXT,
        credito_habitacao TEXT,
        prioridade VARCHAR(100) DEFAULT 'Normal',
        horizonte_temporal TEXT,
        interesse TEXT DEFAULT 'Domaine XXV Moradia T3/T4',
        source TEXT,
        status VARCHAR(50) DEFAULT 'novo',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS objetivo TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS horario_contacto TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS disponibilidade_capital TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS credito_habitacao TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS prioridade VARCHAR(100) DEFAULT 'Normal';`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS horizonte_temporal TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS interesse TEXT DEFAULT 'Domaine XXV Moradia T3/T4';`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'novo';`;
    leadsTableReady = true;
  } catch (error) {
    console.error('Error ensuring leads table exists:', error);
  }
}
