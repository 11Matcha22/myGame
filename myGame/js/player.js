/**
 * player.js
 * -------------------------------------
 * 呼び出し元: main.js
 * 役割: プレイヤー（マシン）の挙動を定義
 * 呼び出し先:
 *   - bullet.js（弾生成）
 *   - audio.js（射撃音）
 */
import { createBullet } from './bullet.js';
import { playShot } from './audio.js';

export class Machine1 {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = 0;
    this.isFiring = false;

    canvas.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      this.angle = Math.atan2(
        e.clientY - rect.top - this.y,
        e.clientX - rect.left - this.x
      );
    });
    canvas.addEventListener('pointerdown', () => this.isFiring = true);
    canvas.addEventListener('pointerup', () => this.isFiring = false);
  }

  update() {
    if (this.isFiring) {
      createBullet(this.x, this.y, this.angle, this.config.bulletSpeed);
      playShot();
    }
  }

  render(ctx) {
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Machine2 {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = 0;

    this.turnSpeed = (config.machine2TurnSpeedDegPerSec || 360) * Math.PI/180 / 60;

    addEventListener('keydown', e => {
      if (e.code === 'ArrowLeft') this.angle -= this.turnSpeed;
      if (e.code === 'ArrowRight') this.angle += this.turnSpeed;
    });
  }

  update() {
    createBullet(this.x, this.y, this.angle, this.config.bulletSpeed);
    playShot();
  }

  render(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(this.x + Math.cos(this.angle) * 12, this.y + Math.sin(this.angle) * 12);
    ctx.lineTo(this.x - Math.cos(this.angle) * 12, this.y - Math.sin(this.angle) * 12);
    ctx.stroke();
  }
}
