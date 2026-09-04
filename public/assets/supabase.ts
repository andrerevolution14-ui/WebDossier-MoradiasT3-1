import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (typeof window === 'undefined') {
        console.warn('⚠️ Supabase credentials not found. Forms will fail until variables are set in Vercel.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
    nome: string;
    telefone: string;
    prazo: string;
    valor: string;
}

export async function insertLead(lead: Lead) {
    const { data, error } = await supabase.from('leads').insert([lead]).select();
    if (error) throw error;
    return data;
}
