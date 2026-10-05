import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_7fcCtHManI4B@ep-jolly-cloud-zae2i71e-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export const sql = neon(connectionString);

let leadsTableReady = false;

export async function ensureLeadsTable() {
  if (leadsTableReady) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        telefone VARCHAR(50) NOT NULL,
        objetivo TEXT,
        horario_contacto TEXT,
        notes TEXT,
        interesse TEXT DEFAULT 'Domaine XXV Moradia T3/T4',
        source TEXT,
        status VARCHAR(50) DEFAULT 'novo',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS objetivo TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS horario_contacto TEXT;`;
    leadsTableReady = true;
  } catch (error) {
    console.error('Error ensuring leads table exists:', error);
  }
}
