/**
 * DOMAINE XXV — Interactive Digital Dossier Logic
 * Mobile-First Engagement, Financial Simulator, Video/Audio Player & Lead Tracking
 */

// Configuration Constants
const CONFIG = {
  property: {
    name: 'Domaine XXV',
    price: 329000,
    appraisal: 450000,
    ivaRefund: 31500,
    landTaxSavings: 23700,
    constructionMonths: 10,
    deposit: 38500,
    unitsAvailable: 2,
    unitsTotal: 3,
    locality: 'Quintas, Oliveirinha, Aveiro',
    address: 'Rua Acácio Simões Vieira, 25'
  },
  // Default WhatsApp receiver phone number (international format without +)
  whatsappPhone: '351910000000', 
  // Webhook URL for CRM / Zapier / Make integration
  webhookUrl: '', 
  // Simulated interest rate for bank mortgage calculation (~3.3% mixed/variable)
  annualInterestRate: 0.0335
};

// State Store
const state = {
  audioPlaying: false,
  audioCurrentTime: 0,
  audioDuration: 48,
  audioInterval: null,
  
  sim: {
    downPaymentPercent: 0.10,
    termYears: 40
  },
  
  currentPlan: 'piso0',
  currentVideoIndex: 0
};

// Plan Data
const PLANS_DATA = {
  piso0: {
    title: 'Piso 0 (Térreo)',
    img: 'assets/images/planta-tecnica.webp',
    areas: [
      { label: 'Área Social / Sala', val: '38,50 m²' },
      { label: 'Cozinha Open Space', val: '16,20 m²' },
      { label: 'Estacionamento / Alpendre', val: '32,00 m²' },
      { label: 'Jardim / Pátio Privado', val: '~120 m²' }
    ]
  },
  piso1: {
    title: 'Piso 1 (Quartos & Suites)',
    img: 'assets/images/plantas3.webp',
    areas: [
      { label: 'Master Suite + Closet', val: '22,40 m²' },
      { label: 'Quarto 2 com Varanda', val: '14,80 m²' },
      { label: 'Quarto 3 com Roupeiro', val: '13,90 m²' },
      { label: 'Varandas & Circulação', val: '18,30 m²' }
    ]
  },
  planta3d: {
    title: 'Visualização 3D Volumétrica',
    img: 'assets/images/planta-3d.webp',
    areas: [
      { label: 'Área Bruta Privativa (ABP)', val: '~ 180 m²' },
      { label: 'Área Útil Habitável (R/C+P1+Sótão)', val: '~ 146,34 m²' },
      { label: 'Área Dependente Útil', val: '77,65 m²' },
      { label: 'Lote de Terreno Privativo', val: '~230 m²' },
      { label: 'Eficiência Energética', val: 'Classe A+' }
    ]
  }
};

/* ==========================================================================
   TELEMETRY & EVENT TRACKER
   ========================================================================== */
function trackEvent(eventName, payload = {}) {
  const timestamp = new Date().toISOString();
  const eventData = {
    event: eventName,
    property: CONFIG.property.name,
    timestamp,
    ...payload
  };

  console.log(`[Dossier Analytics] 📡 ${eventName}:`, eventData);

  // Store in LocalStorage for lead session inspection
  try {
    const existingEvents = JSON.parse(localStorage.getItem('domaine_xxv_events') || '[]');
    existingEvents.push(eventData);
    localStorage.setItem('domaine_xxv_events', JSON.stringify(existingEvents.slice(-50)));
  } catch (e) {
    // Storage quota or private browsing safeguard
  }

  // If webhook configured, send beacon or post
  if (CONFIG.webhookUrl) {
    try {
      fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        keepalive: true
      }).catch(() => {});
    } catch (e) {}
  }
}

function showToast(message) {
  const toast = document.getElementById('trackerToast');
  if (!toast) return;
  toast.innerHTML = `<span>✓ ${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* ==========================================================================
   AUDIO PLAYER EMULATOR
   ========================================================================== */
function initAudioPlayer() {
  const playBtn = document.getElementById('audioPlayBtn');
  const playIcon = document.getElementById('playIcon');
  const playerBox = document.getElementById('audioPlayerBox');
  const timeDisplay = document.getElementById('audioTime');
  const transcriptBtn = document.getElementById('transcriptToggleBtn');
  const transcriptContent = document.getElementById('transcriptContent');

  if (!playBtn || !playerBox) return;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  playBtn.addEventListener('click', () => {
    state.audioPlaying = !state.audioPlaying;

    if (state.audioPlaying) {
      playerBox.classList.add('playing');
      playIcon.textContent = '❚❚';
      trackEvent('audio_play_started', { position: state.audioCurrentTime });

      state.audioInterval = setInterval(() => {
        state.audioCurrentTime += 1;
        if (state.audioCurrentTime >= state.audioDuration) {
          state.audioCurrentTime = 0;
          state.audioPlaying = false;
          playerBox.classList.remove('playing');
          playIcon.textContent = '▶';
          clearInterval(state.audioInterval);
          trackEvent('audio_completed');
        }
        timeDisplay.textContent = `${formatTime(state.audioCurrentTime)} / ${formatTime(state.audioDuration)}`;
      }, 1000);
    } else {
      playerBox.classList.remove('playing');
      playIcon.textContent = '▶';
      clearInterval(state.audioInterval);
      trackEvent('audio_paused', { position: state.audioCurrentTime });
    }
  });

  if (transcriptBtn && transcriptContent) {
    transcriptBtn.addEventListener('click', () => {
      const isVisible = transcriptContent.classList.toggle('show');
      transcriptBtn.textContent = isVisible ? 'Ocultar transcrição' : 'Ver transcrição do áudio';
      trackEvent('transcript_toggled', { open: isVisible });
    });
  }
}

/* ==========================================================================
   VIDEO SHOWCASE & REEL CONTROLS
   ========================================================================== */
function initVideoShowcase() {
  const videoElem = document.getElementById('mainProjectVideo');
  const muteBtn = document.getElementById('videoMuteToggle');
  const muteIcon = document.getElementById('muteIcon');
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');
  const tabButtons = document.querySelectorAll('.video-tab-btn');
  const scrollToVideosBtn = document.getElementById('btnScrollToVideos');

  if (scrollToVideosBtn) {
    scrollToVideosBtn.addEventListener('click', () => {
      const section = document.getElementById('videosTour');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        trackEvent('hero_cta_videos_click');
      }
    });
  }

  if (!videoElem) return;

  // Auto-play on touch/click for mobile policy
  document.body.addEventListener('click', () => {
    if (videoElem.paused) {
      videoElem.play().catch(() => {});
    }
  }, { once: true });

  // Mute / Unmute
  if (muteBtn && muteIcon) {
    muteBtn.addEventListener('click', () => {
      videoElem.muted = !videoElem.muted;
      muteIcon.textContent = videoElem.muted ? '🔇' : '🔊';
      muteBtn.title = videoElem.muted ? 'Ativar Som' : 'Desativar Som';
      trackEvent('video_mute_toggle', { muted: videoElem.muted });
      showToast(videoElem.muted ? 'Vídeo sem som' : 'Som do vídeo ativado');
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (videoElem.requestFullscreen) {
          videoElem.requestFullscreen();
        } else if (videoElem.webkitEnterFullscreen) {
          videoElem.webkitEnterFullscreen();
        }
        trackEvent('video_fullscreen_opened');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Tab switching between the 3 videos
  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-src');
      const newPoster = btn.getAttribute('data-poster');

      if (newPoster) videoElem.poster = newPoster;
      
      videoElem.src = newSrc;
      videoElem.load();
      videoElem.play().catch(() => {});

      trackEvent('video_tab_switched', { index, title: btn.textContent.trim(), src: newSrc });
    });
  });
}

/* ==========================================================================
   INTERACTIVE FLOORPLANS VIEWER
   ========================================================================== */
function initFloorplans() {
  const tabs = document.querySelectorAll('.plan-tab-item');
  const planImg = document.getElementById('currentPlanImg');
  const areasContainer = document.getElementById('planAreasData');
  const zoomBtn = document.getElementById('btnZoomPlan');

  if (!tabs.length || !planImg || !areasContainer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-target');
      state.currentPlan = target;
      const data = PLANS_DATA[target];

      if (data) {
        planImg.src = data.img;
        planImg.alt = data.title;

        // Render areas
        areasContainer.innerHTML = data.areas.map(item => `
          <div class="plan-area-col">
            ${item.label}
            <strong>${item.val}</strong>
          </div>
        `).join('');

        trackEvent('plan_switched', { plan: target, title: data.title });
      }
    });
  });

  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
      const current = PLANS_DATA[state.currentPlan];
      if (current) {
        openLightbox(current.img, `${current.title} — Domaine XXV`);
        trackEvent('plan_zoomed', { plan: state.currentPlan });
      }
    });
  }
}

/* ==========================================================================
   FINANCIAL SIMULATOR
   ========================================================================== */
function calculateMortgage(loanAmount, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const nPayments = years * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, nPayments)) /
                         (Math.pow(1 + monthlyRate, nPayments) - 1);
  return Math.round(monthlyPayment);
}

function updateSimulator() {
  const price = CONFIG.property.price; // 329.000€
  const downPayment = Math.round(price * state.sim.downPaymentPercent);
  const loanAmount = price - downPayment;

  // Display down payment string
  const downDisplay = document.getElementById('simDownpaymentDisplay');
  if (downDisplay) {
    downDisplay.textContent = `${Math.round(state.sim.downPaymentPercent * 100)}% (${downPayment.toLocaleString('pt-PT')}€)`;
  }

  // Display term string
  const termDisplay = document.getElementById('simTermDisplay');
  if (termDisplay) {
    termDisplay.textContent = `${state.sim.termYears} Anos (${state.sim.termYears * 12} meses)`;
  }

  // Calculate construction phase monthly interest (average across release tranches)
  // During construction, client pays only interest on drawn tranches (~60% average release)
  const averageConstructionLoanDrawn = loanAmount * 0.58;
  const constMonthlyInterest = Math.round((averageConstructionLoanDrawn * CONFIG.annualInterestRate) / 12);
  const constDisplay = document.getElementById('simConstMonthly');
  if (constDisplay) {
    constDisplay.textContent = `~${constMonthlyInterest.toLocaleString('pt-PT')}€ / mês`;
  }

  // Calculate post-delivery full amortization payment
  const finalMonthly = calculateMortgage(loanAmount, CONFIG.annualInterestRate, state.sim.termYears);
  const finalDisplay = document.getElementById('simFinalMonthly');
  if (finalDisplay) {
    finalDisplay.textContent = `~${finalMonthly.toLocaleString('pt-PT')}€ / mês`;
  }

  trackEvent('simulator_updated', {
    downPaymentPercent: state.sim.downPaymentPercent,
    downPaymentValue: downPayment,
    termYears: state.sim.termYears,
    constMonthlyInterest,
    finalMonthly
  });
}

function initSimulator() {
  const downBtns = document.querySelectorAll('.sim-select-btn[data-down]');
  const termBtns = document.querySelectorAll('.sim-select-btn[data-term]');
  const simCtaBtn = document.getElementById('btnRequestSim');

  downBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      downBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.sim.downPaymentPercent = parseFloat(btn.getAttribute('data-down'));
      updateSimulator();
    });
  });

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.sim.termYears = parseInt(btn.getAttribute('data-term'), 10);
      updateSimulator();
    });
  });

  if (simCtaBtn) {
    simCtaBtn.addEventListener('click', () => {
      trackEvent('simulator_request_study_click');
      openLeadModal('Simulação de Crédito');
    });
  }

  updateSimulator();
}

/* ==========================================================================
   LIGHTBOX GALLERY
   ========================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const captionElem = document.getElementById('lightboxCaption');

  if (!modal || !img) return;

  img.src = src;
  if (captionElem) captionElem.textContent = caption || '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const modal = document.getElementById('lightboxModal');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const caption = item.getAttribute('data-caption');
      openLightbox(fullSrc, caption);
      trackEvent('gallery_image_opened', { caption });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeLeadModal();
    }
  });
}

/* ==========================================================================
   LEAD CAPTURE MODAL & WHATSAPP REDIRECTION
   ========================================================================== */
function openLeadModal(sourceContext = 'Geral') {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  trackEvent('lead_modal_opened', { source: sourceContext });
}

function closeLeadModal() {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLeadForm() {
  const form = document.getElementById('leadCaptureForm');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('leadModal');

  // Open triggers
  const callBtn = document.getElementById('btnFloatingCall');
  const simFloatingBtn = document.getElementById('btnFloatingSim');

  if (callBtn) {
    callBtn.addEventListener('click', () => {
      openLeadModal('Barra Flutuante (Quero Receber Chamada)');
    });
  }

  if (simFloatingBtn) {
    simFloatingBtn.addEventListener('click', () => {
      const simSec = document.getElementById('simulador');
      if (simSec) {
        simSec.scrollIntoView({ behavior: 'smooth' });
        trackEvent('floating_sim_scroll_click');
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLeadModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeLeadModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('leadName').value.trim();
      const phone = document.getElementById('leadPhone').value.trim();
      const typology = document.getElementById('leadTypology').value;
      const timeSlot = document.getElementById('leadTimeSlot').value;

      if (!name || !phone) return;

      const leadPayload = {
        name,
        phone,
        typology,
        timeSlot,
        downPaymentSelected: `${Math.round(state.sim.downPaymentPercent * 100)}%`,
        termYears: state.sim.termYears
      };

      trackEvent('lead_submitted', leadPayload);
      showToast('A redirecionar para o WhatsApp do Gestor...');

      // Build personalized WhatsApp URL
      const whatsappMsg = `Olá André! Vi o Dossier Digital do Domaine XXV (329.000€ | Avaliação 450.000€).\n\nO meu nome é *${name}* (${phone}).\n• Interesse: ${typology}\n• Horário preferido: ${timeSlot}\n• Simulação: ${Math.round(state.sim.downPaymentPercent * 100)}% de entrada (${state.sim.termYears} anos)\n\nGostaria de agendar uma breve chamada para analisar a viabilidade e receber o mapa de acabamentos.`;

      const waUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(whatsappMsg)}`;

      setTimeout(() => {
        closeLeadModal();
        window.open(waUrl, '_blank');
      }, 700);
    });
  }
}

/* ==========================================================================
   EXTERNAL ACTIONS & MAP TRACKING
   ========================================================================== */
function initExternalActions() {
  const gMapsBtn = document.getElementById('btnGoogleMaps');
  const floatingMapBtn = document.getElementById('btnFloatingMap');

  [gMapsBtn, floatingMapBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        trackEvent('map_navigation_clicked', { destination: CONFIG.property.address });
      });
    }
  });
}

/* ==========================================================================
   INITIALIZATION ON DOM READY
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  trackEvent('dossier_view_loaded', {
    referrer: document.referrer,
    viewportWidth: window.innerWidth,
    isMobile: window.innerWidth <= 768
  });

  initAudioPlayer();
  initVideoShowcase();
  initFloorplans();
  initSimulator();
  initLightbox();
  initLeadForm();
  initExternalActions();

  console.log('✨ Domaine XXV Mobile-First Dossier Initialized Successfully.');
});
