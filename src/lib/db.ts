import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_7fcCtHManI4B@ep-jolly-cloud-zae2i71e-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export const sql = neon(connectionString);

export async function ensureLeadsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        telefone VARCHAR(50) NOT NULL,
        source VARCHAR(100),
        interesse VARCHAR(100) DEFAULT 'Domaine XXV Moradia T3/T4',
        status VARCHAR(50) DEFAULT 'novo',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    // Migração: 'interesse' passou a guardar título + objetivo (>100 chars)
    await sql`ALTER TABLE leads ALTER COLUMN interesse TYPE TEXT;`;
    await sql`ALTER TABLE leads ALTER COLUMN source TYPE TEXT;`;
  } catch (error) {
    console.error('Error ensuring leads table exists:', error);
  }
}
