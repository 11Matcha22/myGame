/**
 * utils.js
 * -------------------------------------
 * 呼び出し元: main.js, enemy.js, bullet.js など
 * 役割: 汎用ユーティリティ関数
 * 呼び出し先: 特になし
 */
export function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  