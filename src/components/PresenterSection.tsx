'use client';

import React from 'react';
import Image from 'next/image';
import { WA_MANAGER } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

interface PresenterProps {
  onContact: () => void;
}

export default function PresenterSection({ onContact }: PresenterProps) {
  return (
    <section className="section" style={{ background: '#1a1714' }}>
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left — copy ── */}
          <div>
            <div className="text-[#a07850] text-[11px] font-semibold uppercase tracking-widest mb-4">
              O seu gestor dedicado
            </div>
            <h2
              className="serif font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
            >
              Uma pessoa real,{' '}
              <span className="serif-italic text-[#a07850]">disponível para si</span>
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8 max-w-sm">
              Acompanho cada cliente desde o primeiro contacto até à entrega da chave — sem
              intermediários, sem burocracia desnecessária, com total transparência de processo.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Avaliação de viabilidade bancária gratuita',
                'Mapa de acabamentos enviado no momento',
                'Relatório fotográfico semanal durante a obra',
                'Acompanhamento legal e contratual completo',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#a07850] font-semibold">—</span>
                  <span className="text-white/75 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a
              href={WA_MANAGER}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead('presenter_falar_comigo')}
              className="inline-flex items-center gap-2 bg-[#a07850] hover:bg-[#c5a059] text-white font-semibold text-sm px-7 py-3.5 rounded transition-colors"
            >
              <span>💬</span> Falar Comigo pelo WhatsApp
            </a>
          </div>

          {/* ── Right — photo + process + partners ── */}
          <div className="flex flex-col gap-7">

            {/* Profile */}
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#a07850] ring-offset-2 ring-offset-[#1a1714]">
                <Image
                  src="/EU1.jpeg"
                  alt="André Queirós — Gestor de Projeto"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
              <div>
                <div className="text-white font-semibold text-base">André Queirós</div>
                <div className="text-white/50 text-xs mt-0.5">Gestor de Projeto · Silvermont Capital</div>
                <a
                  href={WA_MANAGER}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppLead('presenter_profile_msg')}
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#a07850] hover:text-[#c5a059] transition-colors"
                >
                  <span>💬</span> Enviar mensagem no WhatsApp
                </a>
              </div>
            </div>

            {/* Process */}
            <div className="border border-white/10 rounded-xl p-5 space-y-5">
              <div className="text-white/50 text-[11px] font-semibold uppercase tracking-widest">O processo — 3 passos</div>
              {[
                { n: '01', title: 'Informação & Validação', desc: 'Apresentação do projeto, estudo de viabilidade e escolha de personalização.' },
                { n: '02', title: 'Reserva com Proteção Total', desc: 'O terreno é escriturado em seu nome com proteção contratual do sinal de 38.500€.' },
                { n: '03', title: 'Obra & Entrega Chave na Mão', desc: '10 meses de construção com acompanhamento semanal e entrega completa.' },
              ].map(step => (
                <div key={step.n} className="flex gap-4">
                  <span className="serif-italic text-[#a07850] text-xl font-medium leading-none flex-shrink-0 pt-0.5">{step.n}</span>
                  <div>
                    <div className="text-white text-sm font-medium mb-0.5">{step.title}</div>
                    <div className="text-white/50 text-xs leading-snug">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner logos */}
            <div className="flex items-center gap-6 opacity-55 flex-wrap">
              <div className="relative h-7 w-32">
                <Image src="/silvermont1.png" alt="Silvermont Capital" fill className="object-contain object-left" sizes="128px" />
              </div>
              <div className="relative h-6 w-24">
                <Image src="/Positive.png" alt="Positive Project & Co" fill className="object-contain object-left" sizes="96px" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
