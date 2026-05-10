// =====================================================================
//  FEEDBACK — sons via Web Audio API + helpers visuais
//  Usa oscillators, sem precisar de arquivos de áudio.
// =====================================================================

let _ctx = null;
function ctx() {
  if (!_ctx) {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return _ctx;
}

function tone({ freq, type = 'sine', dur = 0.2, gain = 0.18, delay = 0, ramp = 'exp' }) {
  const c = ctx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.connect(g); g.connect(c.destination);
  osc.type = type;
  const t0 = c.currentTime + delay;
  if (typeof freq === 'number') {
    osc.frequency.setValueAtTime(freq, t0);
  } else {
    // freq pode ser [from, to] pra slide
    osc.frequency.setValueAtTime(freq[0], t0);
    osc.frequency.exponentialRampToValueAtTime(freq[1], t0 + dur);
  }
  g.gain.setValueAtTime(gain, t0);
  if (ramp === 'exp') {
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  } else {
    g.gain.linearRampToValueAtTime(0, t0 + dur);
  }
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

// Som de SUCESSO: três notas ascendentes (acorde maior)
export function playSuccess() {
  // C5 E5 G5 — sequência rápida, vibe arcade win
  tone({ freq: 523.25, type: 'triangle', dur: 0.18, gain: 0.18, delay: 0 });
  tone({ freq: 659.25, type: 'triangle', dur: 0.18, gain: 0.18, delay: 0.08 });
  tone({ freq: 783.99, type: 'triangle', dur: 0.32, gain: 0.20, delay: 0.16 });
}

// Som de ERRO: tom grave descendente curto
export function playError() {
  tone({ freq: [220, 90], type: 'square', dur: 0.18, gain: 0.16 });
}

// Som BIG SUCCESS: pra acertos importantes (chave-mestre, climax)
export function playBigSuccess() {
  // Acorde C E G C — quatro notas
  tone({ freq: 523.25, type: 'triangle', dur: 0.6, gain: 0.16, delay: 0 });
  tone({ freq: 659.25, type: 'triangle', dur: 0.6, gain: 0.16, delay: 0.05 });
  tone({ freq: 783.99, type: 'triangle', dur: 0.6, gain: 0.16, delay: 0.10 });
  tone({ freq: 1046.5, type: 'triangle', dur: 0.8, gain: 0.20, delay: 0.20 });
}

// Som de NOTIFICAÇÃO/ATENÇÃO (validado, neutro)
export function playPing() {
  tone({ freq: 880, type: 'sine', dur: 0.12, gain: 0.15 });
}

// === HELPER VISUAL: aplica pulse de sucesso no elemento ===
export function pulseSuccess(el) {
  el.classList.remove('success-pulse');
  // force reflow pra reiniciar animação
  void el.offsetWidth;
  el.classList.add('success-pulse');
  setTimeout(() => el.classList.remove('success-pulse'), 800);
}

// === HELPER VISUAL: shake + flash vermelho de erro ===
export function shakeError(el) {
  el.classList.remove('error-shake');
  void el.offsetWidth;
  el.classList.add('error-shake');
  setTimeout(() => el.classList.remove('error-shake'), 500);
}
