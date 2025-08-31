/**
 * audio.js
 * -------------------------------------
 * 呼び出し元: main.js, player.js
 * 役割: 効果音再生・BGM制御
 * 呼び出し先: 特になし
 */
let audioCtx = null;

export function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

export function playShot() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  osc.type = 'square';
  osc.frequency.value = 440;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.1;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

export function playExplosion() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 100;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.2;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}
