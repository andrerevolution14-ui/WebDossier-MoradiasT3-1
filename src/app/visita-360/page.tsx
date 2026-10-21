import type { Metadata } from 'next';
import Tour360 from '@/components/Tour360';

export const metadata: Metadata = {
  title: 'Visita Virtual 360° · Moradia T3 Domaine XXV, Aveiro',
  description:
    'Entre na moradia T3 em Oliveirinha, Aveiro. Visita virtual 360° com 22 pontos, do jardim ao sótão.',
};

export default function Visita360Page() {
  return <Tour360 />;
}
