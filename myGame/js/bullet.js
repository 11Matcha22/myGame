/**
 * bullet.js
 * -------------------------------------
 * 呼び出し元: main.js, player.js
 * 役割: 弾の生成・更新・描画
 * 呼び出し先: utils.js（乱数など）
 */
export let bullets = [];

export function createBullet(x, y, angle, speed) {
  bullets.push({
    x, y,
    vx: Math.cos(angle) * speed / 60,
    vy: Math.sin(angle) * speed / 60,
    life: 60
  });
}

export function updateBullets(ctx, config) {
  bullets.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    b.life--;
  });
  bullets = bullets.filter(b => b.life > 0);
}

export function renderBullets(ctx) {
  ctx.fillStyle = 'white';
  bullets.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 3, 0, Math.PI*2);
    ctx.fill();
  });
}
