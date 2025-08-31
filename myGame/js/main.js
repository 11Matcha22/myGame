import { Machine1, Machine2 } from './player.js';
import { bullets, updateBullets, renderBullets } from './bullet.js';
import { enemies, updateEnemies, renderEnemies, spawnEnemy } from './enemy.js';
import { playShot, playExplosion, initAudio } from './audio.js';
import { initMenu } from './menu.js';
import { rand } from './utils.js';

// 設定読み込み
let config = {};
async function loadConfig() {
  const response = await fetch('config.json'); // ✅ index.htmlと同じ階層なのでこれでOK
  config = await response.json();
}
await loadConfig();

// Canvas初期化
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ゲーム状態
let state = {
  score: 0,
  over: false,
  paused: false,
  currentMachine: null,
};
state.currentMachine = new Machine1(canvas, config); // デフォルトはマシン1

// メニュー初期化
initMenu(state, canvas, config, () => {
  if (state.currentMachine instanceof Machine1) {
    state.currentMachine = new Machine2(canvas, config);
  } else {
    state.currentMachine = new Machine1(canvas, config);
  }
});

// メインループ
function loop() {
  if (!state.paused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // プレイヤー
    state.currentMachine.update();
    state.currentMachine.render(ctx);

    // 弾
    updateBullets(ctx, config);
    renderBullets(ctx);

    // 敵
    updateEnemies(ctx, config);
    renderEnemies(ctx);
  }
  requestAnimationFrame(loop);
}
loop();
