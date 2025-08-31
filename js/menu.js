/**
 * menu.js
 * -------------------------------------
 * 呼び出し元: main.js
 * 役割: メニューUIと一時停止処理
 * 呼び出し先: 特になし
 */
export function initMenu(state, canvas, config, switchMachineCallback) {
    const btn = document.createElement('button');
    btn.textContent = '☰';
    btn.style.position = 'absolute';
    btn.style.top = '10px';
    btn.style.left = '10px';
    document.body.appendChild(btn);
  
    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style.top = '50px';
    menu.style.left = '10px';
    menu.style.background = '#333';
    menu.style.padding = '10px';
    menu.style.display = 'none';
    menu.style.color = 'white';
    menu.innerHTML = `
      <div><label><input type=\"radio\" name=\"machine\" value=\"1\" checked> マシン1</label></div>
      <div><label><input type=\"radio\" name=\"machine\" value=\"2\"> マシン2</label></div>
      <button id=\"resetBtn\">リセット</button>
      <button id=\"closeBtn\">閉じる</button>
    `;
    document.body.appendChild(menu);
  
    btn.addEventListener('click', () => {
      state.paused = true;
      menu.style.display = 'block';
    });
    menu.querySelector('#closeBtn').addEventListener('click', () => {
      state.paused = false;
      menu.style.display = 'none';
    });
    menu.querySelector('#resetBtn').addEventListener('click', () => {
      location.reload();
    });
    menu.querySelectorAll('input[name=machine]').forEach(r => {
      r.addEventListener('change', e => {
        switchMachineCallback();
      });
    });
  }
  