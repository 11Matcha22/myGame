/**
 * enemy.js
 * -------------------------------------
 * 呼び出し元: main.js
 * 役割: 敵の生成・更新・描画
 * 呼び出し先: utils.js
 */
import { rand } from './utils.js';

export let enemies = [];

export function spawnEnemy(canvas, config) {
  const angle = rand(0, Math.PI*2);
  const dist = Math.max(canvas.width, canvas.height) / 2 + 50;
  enemies.push({
    x: canvas.width/2 + Math.cos(angle) * dist,
    y: canvas.height/2 + Math.sin(angle) * dist,
    speed: config.baseEnemySpeed/60
  });
}

export function updateEnemies(ctx, config) {
  enemies.forEach(e => {
    const dx = ctx.canvas.width/2 - e.x;
    const dy = ctx.canvas.height/2 - e.y;
    const len = Math.hypot(dx, dy);
    e.x += dx/len * e.speed;
    e.y += dy/len * e.speed;
  });
}

export function renderEnemies(ctx) {
  ctx.fillStyle = 'red';
  enemies.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 10, 0, Math.PI*2);
    ctx.fill();
  });
}
