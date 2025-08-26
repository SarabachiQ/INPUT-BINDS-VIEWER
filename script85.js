// script85.js

const gameCommands = [
  { name: "MOVE F/B/L/R", fixed: "🕹L" },
  { name: "FIRE🔥" },
  { name: "AIM" },
  { name: "MELEE" },
  { name: "RELOAD" },
  { name: "INTERACT" },
  { name: "CROUCH/SLIDE" },
  { name: "SPRINT" },
  { name: "JUMP/EXOSUIT (HOLD)" },
  { name: "EXOSUIT" },
  { name: "SWITCH WEAPON 1" },
  { name: "SWITCH WEAPON 2", fixed: "NUL" },
  { name: "EQUIP MELEE WEAPON", fixed: "LB" },
  { name: "EQUIP UTILITY 1", fixed: "RB" },
  { name: "EQUIP UTILITY 2", fixed: "RB" },
  { name: "EQUIP KAPSULE", fixed: "LB+RB" },
  { name: "LEAN L/R", dual: true },
  { name: "DROP ITEM" },
  { name: "PING" },
  { name: "SWITCH SHOULDER" },
  { name: "TOGGLE SCORECARD" },
  { name: "EMOTE WHEEL" },
  { name: "　" },
  { name: "　" }
];
const keymapCommands = gameCommands.map(cmd => ({ ...cmd }));

const modeMaster = [
  "A", "B", "X", "Y", "LB", "RB", "LT", "RT",
  "OPTION", "MENU", "L3", "R3",
  "FRONT", "BACK", "LEFT", "RIGHT",
  "HOME", "CAMERA", "M1", "M2", "M3", "M4",
  "JFRONT", "JBACK", "JLEFT", "JRIGHT",
  "🕹L", "NUL", "LB+RB", "　", "+"
];

const NUM_BIND_CELLS = 2; // ゲーム側列数
const NUM_TOTAL_CELLS = 24; // 使用するボタン数
// 共通部分（3モードで同じもの）
const baseMapping = {
  L3: "L3",
  R3: "R3",
  FRONT: "▲",
  BACK: "▼",
  LEFT: "◀",
  RIGHT: "▶",
  CAMERA: "📷",
  HOME: "⬡",
  JFRONT: "⇧🕹L",
  JBACK: "⇩🕹L",
  JLEFT: "⇦🕹L",
  JRIGHT: "⇨🕹L",
  M1: "M1",
  M2: "M2",
  M3: "M3",
  M4: "M4"
};
// モードごとの差分だけ書く
const modeMapping = {
  modeXbox: {
    ...baseMapping,
    X: "X",
    Y: "Y",
    A: "A",
    B: "B",
    LB: "LB",
    RB: "RB",
    LT: "LT",
    RT: "RT",
    OPTION: "❑",
    MENU: "≡"
  },
  modePlaystation: {
    ...baseMapping,
    X: "□",
    Y: "△",
    A: "✕",
    B: "○",
    LB: "L1",
    RB: "R1",
    LT: "L2",
    RT: "R2",
    OPTION: "❑",
    MENU: "≡"
  },
  modeSwitch: {
    ...baseMapping,
    X: "Y",
    Y: "X",
    A: "B",
    B: "A",
    LB: "L",
    RB: "R",
    LT: "ZL",
    RT: "ZR",
    OPTION: "-",
    MENU: "+"
  }
};

let currentMode = "modeXbox";

function setMode(mode) {
  currentMode = mode; // ← グローバルに保存
  
  const cells = document.querySelectorAll("td");
  
  cells.forEach((cell) => {
    const innerBtns = cell.querySelectorAll(".inner-btn");
    
    innerBtns.forEach((btn) => {
      const btnId = btn.dataset.btnId;
      const newLabel = modeMapping[currentMode][btnId];
      
      if (newLabel) {
        // テキストだけ更新（class はそのまま）
        btn.textContent = newLabel;
      }
    });
  });
  
  // body にモードクラスを反映
  document.body.classList.remove("modeXbox", "modePlaystation", "modeSwitch");
  document.body.classList.add(currentMode);
}

const buttonIds = [
  "btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9", "btn10", "btn11", "btn12", "btn13", "btn14", "btn15", "btn16", "btn17", "btn18", "btn19", "btn20", "btn21", "btn22", "btn23", "btn24", "btn25", "btn26"
];

const labelToClass = {
  "X": "X",
  "Y": "Y",
  "A": "A",
  "B": "B",
  "⬆": "FRONT",
  "⬇": "BACK",
  "⬅": "LEFT",
  "➡": "RIGHT",
  "LB": "LB",
  "RB": "RB",
  "LT": "LT",
  "RT": "RT",
  "L3": "L3",
  "R3": "R3",
  "❐": "OPTION",
  "≡": "MENU",
  "📷": "CAMERA",
  "⬡": "HOME",
  "M1": "M1",
  "M2": "M2",
  "M3": "M3",
  "M4": "M4",
  "⇧🕹L": "JFRONT",
  "⇩🕹L": "JBACK",
  "⇦🕹L": "JLEFT",
  "⇨🕹L": "JRIGHT"
};

const flashCellColor = {
  xbox: {
    "X": "#5533FF",
    "Y": "#FFFC33",
    "A": "#3DFF33",
    "B": "#FF3333",
    "❑": "#AAAAAA",
    "≡": "#AAAAAA",
    "📷": "#AAAAAA",
    "⬡": "#AAAAAA",
    "LB": "#33CCFF",
    "LT": "#33AAFF",
    "RB": "#FF33CC",
    "RT": "#FF33AA",
    "L3": "#66FF66",
    "R3": "#FF6666",
    "⬆": "#FFFFFF",
    "⬇": "#FFFFFF",
    "⬅": "#FFFFFF",
    "➡": "#FFFFFF",
    "⇧🕹L": "#FF9900",
    "⇩🕹L": "#FF9900",
    "⇦🕹L": "#FF9900",
    "⇨🕹L": "#FF9900",
    "M1": "#9c00d0",
    "M2": "#9c00d0",
    "M3": "#9c00d0",
    "M4": "#9c00d0"
  },
  playstation: {
    "X": "#FF9D9D",
    "Y": "#80FFA6",
    "A": "#B4A5FF",
    "B": "#FF1B1B",
    "❑": "#AAAAAA",
    "≡": "#AAAAAA",
    "📷": "#AAAAAA",
    "⬡": "#AAAAAA",
    "LB": "#33CCFF",
    "LT": "#33AAFF",
    "RB": "#FF33CC",
    "RT": "#FF33AA",
    "L3": "#66FF66",
    "R3": "#FF6666",
    "⬆": "#FFFFFF",
    "⬇": "#FFFFFF",
    "⬅": "#FFFFFF",
    "➡": "#FFFFFF",
    "⇧🕹L": "#FF9900",
    "⇩🕹L": "#FF9900",
    "⇦🕹L": "#FF9900",
    "⇨🕹L": "#FF9900",
    "M1": "#9c00d0",
    "M2": "#9c00d0",
    "M3": "#9c00d0",
    "M4": "#9c00d0"
  },
  switch: {
    "X": "white",
    "Y": "white",
    "A": "white",
    "B": "white",
    "❑": "white",
    "≡": "white",
    "📷": "white",
    "⬡": "white",
    "LB": "white",
    "LT": "white",
    "RB": "white",
    "RT": "white",
    "L3": "white",
    "R3": "white",
    "⬆": "white",
    "⬇": "white",
    "⬅": "white",
    "➡": "white",
    "⇧🕹L": "white",
    "⇩🕹L": "white",
    "⇦🕹L": "white",
    "⇨🕹L": "white",
    "M1": "#9c00d0",
    "M2": "#9c00d0",
    "M3": "#9c00d0",
    "M4": "#9c00d0"
  }
};

const roundBtn = ["X", "Y", "A", "B", "❏", "≡", "📷", "⬡"];
const oblongBtn = ["LB", "LT", "RB", "RT", "L3", "R3"];
const squareBtn = ["▲", "▼", "◀", "▶"];
const joystickBtn = ["⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"];
const macroBtn = ["M1", "M2", "M3", "M4"];

const btnGamePool = [
  "X", "Y", "A", "B", "▲", "▼", "◀", "▶",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❐", "≡",
  "⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L",
  "　", "　", "　", "　"
];
const btnKeymapPool2 = [
  "X", "Y", "A", "B", "▲", "▼", "◀", "▶",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❏", "≡", "M1", "M2", "M3", "M4",
  "⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"
];
const btnKeymapPool3 = [
  "X", "Y", "A", "B", "▲", "▼", "◀", "▶",
  "LB", "RB", "LT", "RT", "L3", "R3",
  "❏", "≡", "M1", "M2", "M3", "M4",
  "⇧🕹L", "⇩🕹L", "⇦🕹L", "⇨🕹L"
];

const gameBody0001 = document.getElementById("gameBody");
const btnGamePool0001 = document.getElementById("btnGamePool");
const poolWindow0005 = document.getElementById("poolWindow5");

const keymapBody0002 = document.getElementById("keymapBody2");
const btnKeymapPool0002 = document.getElementById("btnKeymapPool2");
const poolWindow0002 = document.getElementById("poolWindow2");

const keymapBody0003 = document.getElementById("keymapBody3");
const btnKeymapPool0003 = document.getElementById("btnKeymapPool3");
const poolWindow0003 = document.getElementById("poolWindow3");

const container0001 = document.getElementById("container1");
const container0002 = document.getElementById("container2");
const container0003 = document.getElementById("container");

const statusEl = document.getElementById("status");

let gamepadIndex = null;
// ----------------- 動画再生 -----------------
const scenes = [
  "mp4/scene11.mp4"
];

let index = 0;
const video = document.getElementById("bg-video");
const fadeDuration = 2000; // フェードイン/アウト時間（ms）
const sceneDuration = 20000; // 1本の動画再生時間（ms）
let pollingInterval = null;

function playScene(idx) {
  video.src = scenes[idx];
  
  // ----------------- 再生動画間 -----------------
  // ①フェードインが開始するまでの時間：0ms（即開始）
  // ②フェードインが開始してから不透明になるまでの時間：1000ms
  // ③フェードアウトが開始してから透明になるまでの時間：fadeDuration ms
  video.style.transition = `opacity 2000ms ease`;
  video.style.opacity = 0; // 初期は完全に透明
  video.play();
  
  // フェードイン
  setTimeout(() => {
    video.style.opacity = 1;
  }, 0); // ①フェードイン開始までの待機時間
  
  // 再生時間の終わりでフェードアウト
  setTimeout(() => {
    video.style.transition = `opacity ${fadeDuration / 1000}s ease`;
    video.style.opacity = 0;
  }, sceneDuration - fadeDuration); // ③フェードアウト時間
  
  // 次の動画へ
  setTimeout(() => {
    index = (idx + 1) % scenes.length;
    playScene(index);
  }, sceneDuration);
}
// ----------------- コントローラー接続/切断 -----------------
function handleGamepadConnected(e) {
  gamepadIndex = e.gamepad.index;
  
  // 背景透明化
  document.body.style.backgroundColor = "transparent";
  
  // 初回接続・再接続共通：動画は再生せず opacity 0
  video.style.opacity = 0;
  
  // ----------------- 再接続時 -----------------
  // ①フェードインが開始するまでの時間：0ms
  // ②フェードインが開始してから不透明になるまでの時間：1000ms
  // ③フェードアウトは再接続時はなし
  
  // ポーリング開始（ボタン操作で再生）
  if (!pollingInterval) {
    pollingInterval = setInterval(() => {
      const gamepads = navigator.getGamepads();
      if (gamepads[gamepadIndex]) {
        const gp = gamepads[gamepadIndex];
        const anyButtonPressed = gp.buttons.some(b => b.pressed);
        const anyAxisMoved = gp.axes.some(a => Math.abs(a) > 0.1);
        if (anyButtonPressed || anyAxisMoved) {
          clearInterval(pollingInterval);
          pollingInterval = null;
          playScene(index);
        }
      }
    }, 0);
  }
  
  // SVG CTRLBODY 表示
  const svgDoc = svgObject.contentDocument;
  const ctrlBody = svgDoc?.getElementById('CTRLBODY');
  if (ctrlBody) {
    ctrlBody.style.opacity = "1.0";
  }
  
  // ステータス更新
  const formatted = `Connected Model : <br>` +
    e.gamepad.id.replace(/\(/g, '<br>(');
  statusEl.innerHTML = formatted;
  
  statusEl.classList.remove("waiting");
  statusEl.classList.add("connected");
  
  requestAnimationFrame(updateSVG);
}

function handleGamepadDisconnected(e) {
  if (gamepadIndex !== null && gamepadIndex === e.gamepad.index) {
    gamepadIndex = null;
    
    // ポーリング停止
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
    
    // SVG CTRLBODY 非表示
    const svgDoc = svgObject.contentDocument;
    const ctrlBody = svgDoc?.getElementById('CTRLBODY');
    if (ctrlBody) {
      ctrlBody.style.opacity = "0.02";
    }
    
    // ステータス更新
    statusEl.textContent = "Waiting for connection…";
    statusEl.classList.remove("connected");
    statusEl.classList.add("waiting");
    
    // ----------------- 切断時 -----------------
    // ①フェードインはなし
    // ②フェードインはなし
    // ③フェードアウトが開始してから透明になるまでの時間：fadeDuration ms
    video.style.transition = `opacity ${fadeDuration / 1000}s ease`;
    video.style.opacity = 0;
    
    setTimeout(() => {
      video.style.transition = "none";
      video.src = "";
      document.body.style.backgroundColor = "#212121";
    }, fadeDuration);
  }
}

window.addEventListener("gamepadconnected", handleGamepadConnected);
window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);
// ----------------- SVG ボタン名 -----------------
const svgButtonNames = [
  "A", "B", "X", "Y", "LB", "RB", "LT", "RT",
  "OPTION", "MENU", "L3", "R3",
  "FRONT", "BACK", "LEFT", "RIGHT",
  "HOME", "CAMERA", "M1", "M2", "M3", "M4"
];

function getSVGButtonName(i) {
  return svgButtonNames[i] || `Btn${i}`;
}
// ----------------- SVG 更新関数 -----------------
function updateCommandMonitor() {
  const monitorEl = document.getElementById('commandMonitor');
  if (!monitorEl) return;
  
  const pressedCommands = [];
  const gameRows = Array.from(document.querySelectorAll('#gameBody tr'));
  
  gameRows.forEach(row => {
    const gameUserCell = row.cells[1] || null;
    const gameBtnId = gameUserCell?.querySelector('.inner-btn')?.dataset.btnId || null;
    
    // ゲーム側セルに flashCellColor が付いている場合のみ
    if (gameBtnId && gameUserCell.classList.contains('flashCellColor')) {
      const cmdName = row.cells[0]?.textContent?.trim();
      if (cmdName) pressedCommands.push(cmdName);
    }
  });
  
  const uniqueCommands = [...new Set(pressedCommands)];
  monitorEl.innerHTML = '';
  
  if (uniqueCommands.length > 0) {
    uniqueCommands.forEach(cmdName => {
      const div = document.createElement('div');
      div.className = 'command-item';
      div.textContent = cmdName;
      
      // 背景色はゲーム側0列目のセルから取得
      const cmdCell = Array.from(document.querySelectorAll('#gameBody tr td:first-child'))
        .find(td => td.textContent.trim() === cmdName);
      
      let bg = '#333';
      if (cmdCell) {
        const cellBg = getComputedStyle(cmdCell).backgroundColor;
        if (cellBg && cellBg !== 'rgba(0, 0, 0, 0)') bg = cellBg;
      }
      div.style.backgroundColor = bg;
      
      // 文字色判定
      const rgbMatch = bg.match(/\d+/g);
      let textColor = '#fff';
      if (rgbMatch && rgbMatch.length >= 3) {
        const rgb = rgbMatch.map(Number);
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        if (brightness > 180) textColor = '#333';
      }
      div.style.color = textColor;
      
      monitorEl.appendChild(div);
    });
    monitorEl.style.display = 'block';
  } else {
    monitorEl.style.display = 'none';
  }
}
// --- updateSVG 内で呼び出す ---
function updateSVG() {
  if (gamepadIndex === null) return;
  
  const gp = navigator.getGamepads()[gamepadIndex];
  if (!gp) return;
  
  const svgObject = document.getElementById('controllerSvg');
  if (!svgObject || !svgObject.contentDocument) return;
  const svgDoc = svgObject.contentDocument;
  
  const pressedIds = new Set();
  gp.buttons.forEach((b, idx) => {
    if (b && b.pressed) pressedIds.add(getSVGButtonName(idx));
  });
  
  const allCells = document.querySelectorAll('#gameBody td, #keymapBody2 td, #keymapBody3 td');
  allCells.forEach(td => {
    td.classList.remove('flashCellColor', 'modeXbox', 'modePlaystation', 'modeSwitch');
    td.style.backgroundColor = '';
  });
  
  const modeClass = document.body.classList.contains('modeXbox') ? 'modeXbox' :
    document.body.classList.contains('modePlaystation') ? 'modePlaystation' :
    document.body.classList.contains('modeSwitch') ? 'modeSwitch' : '';
  
  let probe = null;
  if (modeClass) {
    probe = document.createElement('div');
    probe.className = `flashCellColor ${modeClass}`;
    probe.style.display = 'none';
    document.body.appendChild(probe);
  }
  
  const isValidButton = (btnId) => btnId && svgButtonNames.includes(btnId);
  
  const gameRows = Array.from(document.querySelectorAll('#gameBody tr'));
  const key2Rows = Array.from(document.querySelectorAll('#keymapBody2 tr'));
  const key3Rows = Array.from(document.querySelectorAll('#keymapBody3 tr'));
  const maxRows = Math.max(gameRows.length, key2Rows.length, key3Rows.length);
  
  const swapBtnIds = new Set();
  key2Rows.forEach(r => {
    const id = r?.cells?.[1]?.querySelector('.inner-btn')?.dataset?.btnId || null;
    if (isValidButton(id)) swapBtnIds.add(id);
  });
  key3Rows.forEach(r => {
    const id = r?.cells?.[0]?.querySelector('.inner-btn')?.dataset?.btnId || null;
    if (isValidButton(id)) swapBtnIds.add(id);
  });
  
  const dualPairs = [
    [1, 15],
  ];
  const dualMap = new Map();
  dualPairs.forEach(([a, b]) => {
    dualMap.set(a, b);
    dualMap.set(b, a);
  });
  
  for (let i = 0; i < maxRows; i++) {
    const gameRow = gameRows[i];
    if (!gameRow) continue;
    
    const key2Row = key2Rows[i] || null;
    const key3Row = key3Rows[i] || null;
    
    const gameCmdCell = gameRow.cells[0] || null;
    const gameUserCell = gameRow.cells[1] || null;
    const gameBtnId = gameUserCell?.querySelector('.inner-btn')?.dataset.btnId || null;
    
    const key2CopyCell = key2Row ? key2Row.cells[0] : null;
    const key2UserCell = key2Row ? key2Row.cells[1] : null;
    const key2UserBtnId = key2UserCell?.querySelector('.inner-btn')?.dataset?.btnId || null;
    
    const key3UserCell = key3Row ? key3Row.cells[0] : null;
    const key3CmdCell = key3Row ? key3Row.cells[1] : null;
    const key3UserBtnId = key3UserCell?.querySelector('.inner-btn')?.dataset?.btnId || null;
    
    const p1 = gameBtnId && pressedIds.has(gameBtnId);
    const p2 = key2UserBtnId && pressedIds.has(key2UserBtnId);
    const p3 = key3UserBtnId && pressedIds.has(key3UserBtnId);
    
    const swapActive = isValidButton(key2UserBtnId) || isValidButton(key3UserBtnId);
    
    let ignoreSwapDisable = false;
    if (dualMap.has(i)) {
      const pairIdx = dualMap.get(i);
      const pairRow = gameRows[pairIdx];
      const pairBtnId = pairRow?.cells?.[1]?.querySelector('.inner-btn')?.dataset.btnId || null;
      if (pairBtnId && pairBtnId === gameBtnId) {
        ignoreSwapDisable = true;
      }
    }
    
    let selection = null;
    if (p3) selection = 'key3';
    else if (p2) selection = 'key2';
    else if (!swapActive && p1 && (!swapBtnIds.has(gameBtnId) || ignoreSwapDisable)) selection = 'game0';
    else selection = null;
    
    if (!selection) continue;
    
    const targets = [];
    const pushTarget = (td, fallbackBtnId) => {
      if (!td) return;
      const inner = td.querySelector ? td.querySelector('.inner-btn') : null;
      let colorId = inner ? (inner.dataset.btnId || inner.id || inner.textContent.trim()) : null;
      if (!colorId && fallbackBtnId) colorId = fallbackBtnId;
      if (!colorId) return;
      targets.push({ td, colorId });
    };
    
    if (selection === 'key3') {
      pushTarget(gameCmdCell, gameBtnId);
      pushTarget(gameUserCell, gameBtnId);
      pushTarget(key2CopyCell, gameBtnId);
      pushTarget(key2UserCell, key2UserBtnId || null);
      pushTarget(key3UserCell, key3UserBtnId || null);
      pushTarget(key3CmdCell, key3UserBtnId || null);
    } else if (selection === 'key2') {
      pushTarget(gameCmdCell, gameBtnId);
      pushTarget(gameUserCell, gameBtnId);
      pushTarget(key2CopyCell, gameBtnId);
      pushTarget(key2UserCell, key2UserBtnId || null);
    } else if (selection === 'game0') {
      pushTarget(gameCmdCell, gameBtnId);
      pushTarget(gameUserCell, gameBtnId);
      pushTarget(key2CopyCell, gameBtnId);
    }
    
    targets.forEach(({ td, colorId }) => {
      if (!td) return;
      td.classList.add('flashCellColor');
      if (modeClass) td.classList.add(modeClass);
      if (probe && colorId) {
        const val = getComputedStyle(probe).getPropertyValue(`--${colorId}`).trim();
        if (val) td.style.backgroundColor = val;
      } else if (colorId && modeClass) {
        td.style.backgroundColor = '';
      }
    });
  }
  
  if (probe) {
    document.body.removeChild(probe);
    probe = null;
  }
  
  // --- SVGボタン光らせ ---
  gp.buttons.forEach((btn, i) => {
    const btnId = getSVGButtonName(i);
    const btnEl = svgDoc.getElementById(btnId);
    if (!btnEl) return;
    btnEl.style.filter = btn.pressed ? "brightness(1.2) saturate(0.6)" : "brightness(0) saturate(0.5)";
  });
  
  // --- スクロール固定 ---
  gameRows.forEach((row, i) => {
    const userCell = row.cells[1];
    const btnId = userCell?.querySelector('.inner-btn')?.dataset?.btnId;
    
    const key2Row = key2Rows[i] || null;
    const key3Row = key3Rows[i] || null;
    const key2UserBtnId = key2Row?.cells?.[1]?.querySelector('.inner-btn')?.dataset?.btnId || null;
    const key3UserBtnId = key3Row?.cells?.[0]?.querySelector('.inner-btn')?.dataset?.btnId || null;
    const swapActive = isValidButton(key2UserBtnId) || isValidButton(key3UserBtnId);
    
    let ignoreSwapDisable = false;
    if (dualMap.has(i)) {
      const pairIdx = dualMap.get(i);
      const pairRow = gameRows[pairIdx];
      const pairBtnId = pairRow?.cells?.[1]?.querySelector('.inner-btn')?.dataset?.btnId || null;
      if (pairBtnId && pairBtnId === btnId) {
        ignoreSwapDisable = true;
      }
    }
    
    const effectivePressed =
      (key3UserBtnId && pressedIds.has(key3UserBtnId)) ||
      (key2UserBtnId && pressedIds.has(key2UserBtnId)) ||
      (!swapActive && btnId && pressedIds.has(btnId) && (!swapBtnIds.has(btnId) || ignoreSwapDisable));
    
    const box = row.cells[0]?.querySelector('.scrolling-box');
    if (!box) return;
    if (effectivePressed) {
      box.style.animation = 'none';
      box.style.transform = 'translateX(0%)';
    } else {
      box.style.animation = '';
    }
  });
  
  // --- 0列目コマンド名文字色調整追加 ---
  gameRows.forEach(row => {
    const cmdCell = row.cells[0];
    if (!cmdCell) return;
    
    const bgColor = window.getComputedStyle(cmdCell).backgroundColor;
    
    const isLight = (() => {
      const match = bgColor.match(/\d+/g);
      if (!match) return false;
      const [r, g, b] = match.map(Number);
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
    })();
    
    cmdCell.style.color = isLight ? 'black' : 'white';
  });
  
  updateCommandMonitor(Array.from(pressedIds));
  requestAnimationFrame(updateSVG);
}
// ----------------- コマンドモニター -----------------
function applySwapMarkers() {
  // まず既存のマークを全クリア
  const gameRows = Array.from(document.querySelectorAll('#gameBody tr'));
  gameRows.forEach(row => {
    const td0 = row.cells[0];
    const td1 = row.cells[1];
    if (td0) td0.classList.remove('swap-btn');
    if (td1) td1.classList.remove('swap-btn');
  });
  
  // gameBody(1列目)のボタンID -> 行インデックス一覧 を作る
  const idToRows = new Map();
  gameRows.forEach((row, idx) => {
    const btn = row.cells[1]?.querySelector('.inner-btn');
    const id = btn?.dataset?.btnId;
    if (id) {
      if (!idToRows.has(id)) idToRows.set(id, []);
      idToRows.get(id).push(idx);
    }
  });
  
  // keymapBody2(1列目=Swap列)にボタンがあれば、そのボタンIDに一致する
  // gameBody(1列目)の「別行」を .swap-btn マーク
  const key2Rows = Array.from(document.querySelectorAll('#keymapBody2 tr'));
  key2Rows.forEach((row, i) => {
    const swapBtn = row.cells[1]?.querySelector('.inner-btn'); // 1列目(インデックス1)
    const swapId = swapBtn?.dataset?.btnId;
    if (!swapId) return;
    
    const targetRows = idToRows.get(swapId) || [];
    targetRows.forEach(rIdx => {
      if (rIdx === i) return; // 同じ行はマークしない（別行のみ）
      const gRow = gameRows[rIdx];
      if (!gRow) return;
      const td0 = gRow.cells[0]; // コマンド名セル
      const td1 = gRow.cells[1]; // ボタンセル
      if (td0) td0.classList.add('swap-btn');
      if (td1) td1.classList.add('swap-btn');
    });
  });
}
// ----------------- DOM 読み込み後に開始 -----------------
window.addEventListener('DOMContentLoaded', () => {
  updateSVG();
});
// ----------------- SVG ロード時に初期化 -----------------
const svgObject = document.getElementById('controllerSvg');
svgObject.addEventListener('load', () => {
  const svgDoc = svgObject.contentDocument;
  
  const ctrlBody = svgDoc.getElementById('CTRLBODY');
  if (ctrlBody) {
    ctrlBody.style.opacity = "1.0";
  }
  
  svgButtonNames.forEach(id => {
    const btnEl = svgDoc.getElementById(id);
    if (btnEl) {
      btnEl.style.filter = "brightness(0%) saturate(0%)";
      btnEl.style.cursor = "pointer";
    }
  });
  
  requestAnimationFrame(updateSVG);
});
// ----------------- 既存マップ保持 -----------------
const commandCellMap = new Map();
const keymapCellMap = new Map();
// ----------------- 追記: ボタン押下で gameBody 行を光らせる -----------------
function updateGameBodyHighlight() {
  if (gamepadIndex === null) return;
  const gp = navigator.getGamepads()[gamepadIndex];
  if (!gp) return;
  
  // gameBody の行をボタン ID で紐付けて光らせる
  commandCellMap.forEach((rowEl, btnId) => {
    const btnIndex = svgButtonNames.indexOf(btnId);
    if (btnIndex === -1) return;
    const pressed = gp.buttons[btnIndex]?.pressed;
    if (rowEl) {
      if (pressed) {
        rowEl.classList.add(HIGHLIGHT_CLASS);
      } else {
        rowEl.classList.remove(HIGHLIGHT_CLASS);
      }
    }
  });
  
  // JOYSTICK の上下左右
  const joystickMapping = {
    "⇧🕹L": 14, // FRONT
    "⇩🕹L": 15, // BACK
    "⇦🕹L": 16, // LEFT
    "⇨🕹L": 17 // RIGHT
  };
  Object.entries(joystickMapping).forEach(([id, index]) => {
    const rowEl = commandCellMap.get(id);
    const pressed = gp.buttons[index]?.pressed;
    if (rowEl) {
      if (pressed) rowEl.classList.add(HIGHLIGHT_CLASS);
      else rowEl.classList.remove(HIGHLIGHT_CLASS);
    }
  });
  
  // ====== ここから追記: dualペアも同時にハイライト ======
  // dualMap は AIM と LEAN L/R の行インデックス対応マップを既に定義済みである前提
  // commandCellMap はボタンID -> 行要素の Map
  dualMap.forEach((pairIdx, rowIdx) => {
    const rowArray = Array.from(commandCellMap.values());
    const keyArray = Array.from(commandCellMap.keys());
    const rowEl1 = rowArray[rowIdx];
    const rowEl2 = rowArray[pairIdx];
    const btnId1 = keyArray[rowIdx];
    const btnId2 = keyArray[pairIdx];
    
    if (rowEl1 && rowEl2 && btnId1 && btnId2) {
      const btnIndex1 = svgButtonNames.indexOf(btnId1);
      const btnIndex2 = svgButtonNames.indexOf(btnId2);
      const pressed1 = (btnIndex1 !== -1) && gp.buttons[btnIndex1]?.pressed;
      const pressed2 = (btnIndex2 !== -1) && gp.buttons[btnIndex2]?.pressed;
      
      // どちらかが押されている場合、両方にハイライトを適用
      if (pressed1 || pressed2) {
        rowEl1.classList.add(HIGHLIGHT_CLASS);
        rowEl2.classList.add(HIGHLIGHT_CLASS);
      }
    }
  });
  // ====== 追記ここまで ======
  
  requestAnimationFrame(updateGameBodyHighlight);
}

// 初回呼び出し
requestAnimationFrame(updateGameBodyHighlight);

let activeRow = null;

let defaultMode = "modeXbox";

let bodyButtons = [];

let gameBody0001Current = [];
let btnGamePool0001Current = [...btnGamePool];
let keymapBody0002Current = [];
let btnKeymapPool0002Current = [...btnKeymapPool2];
let keymapBody0003Current = [];
let btnKeymapPool0003Current = [...btnKeymapPool3];

let selectedCell = null;
let selectedCommand = null;
let selectedAimBtn = "";
let selectedColIndex = null;
let selectedBodyId = null;
let selectedCellClass = null;

let isDragging = false;

function syncGame02ToKeymap01() {
  const gameRows = [...gameBody0001.querySelectorAll("tr")];
  const keymapRows = [...keymapBody0002.querySelectorAll("tr")];
  
  gameRows.forEach((gameRow, i) => {
    const gameCell = gameRow.cells[1]; // ゲーム側ユーザー操作セル（配置済みのセル）
    const keymapRow = keymapRows[i];
    const keymapCell = keymapRow?.cells[0]; // キーマップコピーセル0列目
    
    if (!gameCell || !keymapCell) return;
    
    keymapCell.innerHTML = "";
    keymapCell.className = "btn-cell6 btn-cell6-02"; // 初期クラス復元
    
    // ゲームセルからボタンを取得
    const btn = gameCell.querySelector(".inner-btn");
    
    let clonedBtn = null;
    if (btn) {
      // ボタンを複製
      clonedBtn = btn.cloneNode(true);
      
      // ---- ★ ここでラベルを現在のモードに合わせる ----
      const btnId = clonedBtn.dataset.btnId;
      const newLabel = modeMapping[currentMode][btnId];
      if (newLabel) {
        clonedBtn.textContent = newLabel;
      }
      // --------------------------------------------
      
      // クラス付与
      if (gameCell.classList.contains("fixed-cell")) {
        keymapCell.classList.add("fixed-cell", "fixed-cell-copy");
        clonedBtn.classList.add("shape-fixed");
      } else if (gameCell.classList.contains("dual")) {
        keymapCell.classList.add("dual", "fixed-cell-copy");
        clonedBtn.classList.add("shape-dual");
      } else {
        keymapCell.classList.add("fixed-cell-copy");
        clonedBtn.classList.add("shape-copy");
      }
      
      // td 側に data-btn-id をコピー（ボタンがある場合のみ）
      keymapCell.dataset.btnId = clonedBtn.dataset.btnId;
      keymapCell.setAttribute("data-btn-id", clonedBtn.dataset.btnId);
      
      // td にボタンを追加
      keymapCell.appendChild(clonedBtn);
    }
    
    // td 側に data-cmd-name を必ずコピー
    if (gameCell.dataset.cmdName) {
      keymapCell.dataset.cmdName = gameCell.dataset.cmdName;
      keymapCell.setAttribute("data-cmd-name", gameCell.dataset.cmdName);
    }
  });
}

function traceCalls(fn, name) {
  return function(...args) {
    console.group(`📞 Called: ${name}`);
    console.trace(); // 呼び出し元スタックを表示
    const result = fn.apply(this, args);
    console.groupEnd();
    return result;
  };
}

createGameTable = traceCalls(createGameTable, "createGameTable");
createKeymapTable = traceCalls(createKeymapTable, "createKeymapTable");
rebuildBtnPool = traceCalls(rebuildBtnPool, "rebuildBtnPool");
syncGame02ToKeymap01 = traceCalls(syncGame02ToKeymap01, "syncGame02ToKeymap01");

function enableRowDragAndDrop(gameBody0001, keymapBody0002, keymapBody0003) {
  const bodies = [gameBody0001, keymapBody0002, keymapBody0003];
  let draggingRow = null;
  
  bodies.forEach(tbody => {
    Array.from(tbody.children).forEach(row => {
      row.setAttribute("draggable", true);
      row.classList.add("draggable");
      
      row.addEventListener("dragstart", () => {
        draggingRow = row;
        bodies.forEach(b => Array.from(b.children).forEach(r => r.classList.remove("dragging", "drag-hover")));
        bodies.forEach(b => Array.from(b.children).forEach(r => r.classList.remove("dragging-row")));
        
        row.classList.add("dragging");
        
        const rowIndex = row.dataset.index;
        bodies.forEach(b => {
          const movingRow = Array.from(b.children).find(r => r.dataset.index === rowIndex);
          if (movingRow) {
            movingRow.classList.add("drag-hover");
            movingRow.classList.add("dragging-row");
          }
        });
      });
      
      row.addEventListener("dragend", () => {
        draggingRow = null;
        bodies.forEach(b => Array.from(b.children).forEach(r => r.classList.remove("dragging", "drag-hover")));
        bodies.forEach(b => Array.from(b.children).forEach(r => r.classList.remove("dragging-row")));
      });
    });
  });
  
  bodies.forEach(tbody => {
    tbody.addEventListener("dragover", e => {
      e.preventDefault();
      if (!draggingRow) return;
      
      const dragIndex = draggingRow.dataset.index;
      const afterRow = Array.from(tbody.children).find(r => {
        const rect = r.getBoundingClientRect();
        return e.clientY < rect.top + rect.height / 2;
      });
      
      bodies.forEach(b => {
        const rows = Array.from(b.children);
        const movingRow = rows.find(r => r.dataset.index === dragIndex);
        if (!movingRow) return;
        
        if (!afterRow) {
          b.appendChild(movingRow);
        } else {
          const afterIndex = rows.indexOf(rows.find(r => r.dataset.index === afterRow.dataset.index));
          if (afterIndex !== -1) b.insertBefore(movingRow, rows[afterIndex]);
        }
      });
    });
  });
}

// 🔽 停止中のスクロールボックスを記録する変数（解除用）
let selectedScrollBox = null;

function openPool(poolId) {
  const pools = [poolWindow0002, poolWindow0003, poolWindow0005];
  pools.forEach(el => el.classList.remove("show")); // 他のプールを閉じる
  
  let referenceNode;
  if (poolId === "poolWindow5") referenceNode = container1;
  else if (poolId === "poolWindow2") referenceNode = container2;
  else if (poolId === "poolWindow3") referenceNode = container3;
  
  const pool = document.getElementById(poolId);
  referenceNode.insertAdjacentElement("afterend", pool);
  pool.style.display = "block";
  
  requestAnimationFrame(() => {
    pool.classList.add("show"); // CSSに従って幅や回転で開く
  });
}

function closePoolWindow() {
  const pools = [poolWindow0002, poolWindow0003, poolWindow0005];
  pools.forEach((el) => {
    // inline opacity が残っている場合はリセット
    el.style.opacity = null;
    /*
    el.style.opacity = '1';
    */
    el.style.margin = '0';
    
    // CSSの transition に任せてゆっくり閉じる
    el.classList.remove('show');
  });
}

function handleCellClick(cell, cmd, colIndex = 0, isKeymap = false) {
  if (isKeymap && colIndex === 0) return; // キーマップ2の1列目は選択不可
  if (cell.classList.contains("fixed-cell-copy")) return;
  if (cell.classList.contains("fixed-cell")) return;
  
  if (selectedCell === cell) {
    selectedCell.classList.remove("highlight");
    if (selectedScrollBox) {
      selectedScrollBox.removeAttribute("data-scroll-paused");
      selectedScrollBox = null;
    }
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedIsKeymap = false;
    selectedCellClass = null;
    return;
  }
  
  if (selectedCell) {
    selectedCell.classList.remove("highlight");
    if (selectedScrollBox) {
      selectedScrollBox.removeAttribute("data-scroll-paused");
      selectedScrollBox = null;
    }
    selectedCell = null;
    selectedCommand = null;
    selectedColIndex = null;
    selectedCellClass = null;
  }
  
  // 新しいセル選択
  selectedCell = cell;
  selectedCommand = cmd;
  selectedColIndex = colIndex;
  
  selectedCellClass = Array.from(cell.classList).find(cls =>
    cls.startsWith("btn-cell6-") || cls === "btn-cell5"
  );
  
  cell.classList.add("highlight");
  
  // ゲーム側0列目スクロール停止
  const tbody = cell.closest("tbody");
  const rowsArray = Array.from(tbody.rows);
  const rowIndex = rowsArray.indexOf(cell.parentElement);
  const gameRow = gameBody0001.rows[rowIndex];
  if (gameRow) {
    const scrollBox = gameRow.cells[0].querySelector(".scrolling-box");
    if (scrollBox) {
      if (selectedScrollBox && selectedScrollBox !== scrollBox) {
        selectedScrollBox.removeAttribute("data-scroll-paused");
      }
      scrollBox.removeAttribute("data-scroll-paused");
      void scrollBox.offsetWidth;
      scrollBox.setAttribute("data-scroll-paused", "true");
      selectedScrollBox = scrollBox;
    }
  }
  
  // セルに応じてプールを開く
  if (selectedCellClass === "btn-cell5") openPool("poolWindow5");
  else if (selectedCellClass === "btn-cell6-02") openPool("poolWindow2");
  else if (selectedCellClass === "btn-cell6-03") openPool("poolWindow3");
  
  syncGame02ToKeymap01();
}
// --- キーマップ 双方向コピーまとめ ---
function syncKeymapDualCopyAll(selectedCell) {
  if (!selectedCell) return;
  
  const tbody = selectedCell.parentElement.parentElement;
  if (!tbody) return;
  
  const colIndex = selectedCell.cellIndex;
  const rowIndex = parseInt(selectedCell.parentElement.dataset.index, 10);
  
  const isKeymap2 = selectedCell.classList.contains("btn-cell6-02");
  const isKeymap3 = selectedCell.classList.contains("btn-cell6-03");
  const isGameBody = selectedCell.classList.contains("btn-cell5");
  
  // コピー対象の行ペアを定義（2↔16, 4↔5）
  const pairs = [
    [2, 16],
    [4, 5]
  ];
  
  for (const [a, b] of pairs) {
    if (rowIndex === a || rowIndex === b) {
      const targetRowIndex = rowIndex === a ? b : a;
      const targetRow = tbody.querySelector(`tr[data-index="${targetRowIndex}"]`);
      if (!targetRow) continue;
      
      const targetCell = targetRow.cells[colIndex];
      if (!targetCell) continue;
      
      // ゲーム側は全列コピー
      if (isGameBody) {
        const innerBtn = selectedCell.querySelector(".inner-btn");
        const targetInnerBtn = targetCell.querySelector(".inner-btn");
        
        if (innerBtn) {
          targetCell.innerHTML = "";
          targetCell.appendChild(innerBtn.cloneNode(true));
        }
        
        // 追加: 4↔5コピー時は両方のセルに syncGame02ToKeymap01 を呼ぶ
        if ((rowIndex === 4 || rowIndex === 5) && colIndex >= 0) {
          // 元セル
          syncGame02ToKeymap01(selectedCell);
          // コピー先セル
          syncGame02ToKeymap01(targetCell);
        }
      }
      
      // キーマップ側は元の制限
      if ((isKeymap2 && colIndex === 1) || (isKeymap3 && colIndex === 0)) {
        const innerBtn = selectedCell.querySelector(".inner-btn");
        if (innerBtn) {
          targetCell.innerHTML = "";
          targetCell.appendChild(innerBtn.cloneNode(true));
        }
      }
    }
  }
}

function createBtnEl(label) {
  const div = document.createElement("div");
  div.className = "inner-btn";
  div.textContent = label;
  return div;
}

function getBtnShapeClass(btn) {
  if (roundBtn.includes(btn)) return "shape-round";
  if (oblongBtn.includes(btn)) return "shape-oblong";
  if (squareBtn.includes(btn)) return "shape-square";
  if (joystickBtn.includes(btn)) return "shape-joystick";
  if (macroBtn.includes(btn)) return "shape-macro";
  return "shape-tap";
}

function mapToBtnId(btn) {
  switch (btn) {
    case "▲":
      return "FRONT";
    case "▼":
      return "BACK";
    case "◀":
      return "LEFT";
    case "▶":
      return "RIGHT";
    case "❏":
      return "OPTION"; // PlayStationの□
    case "≡":
      return "MENU"; // Xboxの≡
    default:
      return btn;
  }
}

function rebuildBtnPool(master, current, tbody, type, bodyElement) {
  if (!tbody) return;
  
  const isGameBody = type === "btn-cell5";
  
  // bodyElement があれば、配置済みボタンを取得（dataset.btnId 基準）
  const bodyButtons = [];
  if (bodyElement) {
    const tds = Array.from(bodyElement.querySelectorAll("td"));
    for (const td of tds) {
      const cls = td.className;
      if (
        (type === "btn-cell5" && cls.includes("btn-cell5")) ||
        (type === "btn-cell6-02" && cls.includes("btn-cell6-02")) ||
        (type === "btn-cell6-03" && cls.includes("btn-cell6-03"))
      ) {
        const inner = td.querySelector(".inner-btn");
        if (inner) {
          const btnId = inner.dataset.btnId;
          if (btnId) bodyButtons.push(btnId);
        }
      }
    }
  }
  
  // current を更新
  current.length = 0;
  if (isGameBody) {
    // ゲーム側は配置済みを除外
    for (const btn of master) {
      const btnId = mapToBtnId(btn);
      if (!bodyButtons.includes(btnId)) {
        current.push(btn);
      }
    }
  } else {
    // キーマップ側は配置済みも残す
    current.push(...master);
  }
  
  // tbody をクリア
  tbody.innerHTML = "";
  
  for (let i = 0; i < master.length; i += 2) {
    const row = document.createElement("tr");
    
    for (let j = 0; j < 2; j++) {
      const idx = i + j;
      const btn = master[idx];
      if (!btn) continue;
      
      const cell = document.createElement("td");
      cell.className = "btn";
      
      const shapeClass = getBtnShapeClass(btn);
      const colorClass = "btn-" + btn;
      
      const innerBtn = document.createElement("div");
      innerBtn.className = `inner-btn ${shapeClass} ${colorClass}`;
      innerBtn.textContent = modeMapping[currentMode][btn] || btn;
      const correctId = mapToBtnId(btn);
      innerBtn.dataset.btnId = correctId;
      
      // 特殊ボタン
      if (btn === "⬡") {
        innerBtn.style.opacity = "0.2";
        cell.classList.add("fixed-cell");
      } else if (!current.includes(btn)) {
        innerBtn.style.opacity = "0.15";
        cell.style.pointerEvents = "none";
      } else {
        innerBtn.style.opacity = "0.9";
        
        // クリックイベント
        cell.addEventListener("click", () => {
          if (!selectedCell) return;
          
          const oldEl = selectedCell.querySelector(".inner-btn");
          let oldVal;
          if (oldEl) {
            oldVal = oldEl.dataset.original || oldEl.dataset.btnId || oldEl.textContent.trim();
          } else {
            oldVal = selectedCell.dataset.btnId || selectedCell.textContent.trim();
          }
          
          if (oldVal && isGameBody && !current.includes(oldVal)) {
            current.push(oldVal);
          }
          
          // ゲーム側は current から削除（dataset.btnId 基準）
          if (isGameBody) {
            const index = current.indexOf(correctId);
            if (index > -1) current.splice(index, 1);
          }
          
          selectedCell.dataset.btnId = correctId;
          selectedCell.innerHTML = "";
          selectedCell.appendChild(innerBtn.cloneNode(true));
          
          // syncReloadInteract(selectedCell); ← 呼び出しを削除
          
          syncGame02ToKeymap01();
          syncKeymapDualCopyAll(selectedCell);
          rebuildBtnPool(master, current, tbody, type, bodyElement);
          
          selectedCell.classList.remove("highlight");
          selectedCell = null;
          selectedCommand = null;
          selectedColIndex = null;
          selectedCellClass = null;
        });
      }
      
      cell.appendChild(innerBtn);
      row.appendChild(cell);
    }
    
    tbody.appendChild(row);
  }
}

function assignClassesToToCells() {
  const toCells = document.querySelectorAll(".fixed-cell-copy");
  toCells.forEach(cell => {
    const label = cell.textContent.trim();
    const cls = labelToClass[label];
    if (cls) cell.classList.add(cls);
  });
}
// 保存用マップ
const layoutStorageKey = "buttonLayout_v2";

function startSaveProgress() {
  const titleBar = document.querySelector(".title-bar");
  const fill = titleBar.querySelector(".progress-fill");
  const text = titleBar.querySelector(".progress-text");
  const modeButtons = titleBar.querySelectorAll(".mode-btn button");
  const titleText = titleBar.querySelector(".title");
  
  // 初期化
  fill.style.width = "0%";
  fill.style.opacity = 1;
  fill.style.zIndex = "1";
  text.textContent = "";
  text.style.opacity = 0;
  text.style.zIndex = "1";
  titleText.style.zIndex = "10";
  modeButtons.forEach(btn => btn.style.zIndex = "10");
  
  let percent = 0;
  
  // requestAnimationFrame で即描画を確定してから開始
  requestAnimationFrame(() => {
    const interval = setInterval(() => {
      percent += 10;
      fill.style.width = percent + "%";
      
      if (percent >= 100) {
        clearInterval(interval);
        
        // 完了テキストを表示
        text.textContent = "Save completed";
        text.style.opacity = 1;
        
        // 少し表示したあとにフェードアウト
        setTimeout(() => {
          fill.style.transition = "opacity 1s";
          text.style.transition = "opacity 1s";
          fill.style.opacity = 0;
          text.style.opacity = 0;
          
          setTimeout(() => {
            // フェードアウト後の処理
            fill.style.width = "0%"; // ✅ 完全に透明になったあとに幅をゼロに戻す
            fill.style.zIndex = "0";
            text.style.zIndex = "0";
            fill.style.transition = "";
            text.style.transition = "";
          }, 1000); // フェードアウトと同じ秒数
        }, 1500);
      }
    }, 200);
  });
}

document.getElementById("saveBtn").addEventListener("click", () => {
  startSaveProgress();
});
// SAVE: 現在のボタン配置を保存
function saveLayout() {
  const gameCells = document.querySelectorAll(".btn-cell5");
  const keymap2Cells = document.querySelectorAll(".btn-cell6-02");
  const keymap3Cells = document.querySelectorAll(".btn-cell6-03");
  
  const layoutData = {
    gameCol2: Array.from(gameCells).map(cell => ({
      html: cell.innerHTML,
      btnId: cell.dataset.btnId || null
    })),
    keymap2Col1: Array.from(keymap2Cells).map(cell => ({
      html: cell.innerHTML,
      btnId: cell.dataset.btnId || null
    })),
    keymap3Col1: Array.from(keymap3Cells).map(cell => ({
      html: cell.innerHTML,
      btnId: cell.dataset.btnId || null
    }))
  };
  
  localStorage.setItem("buttonLayout", JSON.stringify(layoutData));
}
// LOAD: 保存されたボタン配置を復元
function loadLayout() {
  const layoutData = JSON.parse(localStorage.getItem("buttonLayout"));
  if (!layoutData) return;
  
  const gameCells = document.querySelectorAll(".btn-cell5");
  layoutData.gameCol2.forEach((cellData, i) => {
    gameCells[i].innerHTML = cellData.html || "";
    if (cellData.btnId) gameCells[i].dataset.btnId = cellData.btnId;
  });
  
  const keymap2Cells = document.querySelectorAll(".btn-cell6-02");
  layoutData.keymap2Col1.forEach((cellData, i) => {
    keymap2Cells[i].innerHTML = cellData.html || "";
    if (cellData.btnId) keymap2Cells[i].dataset.btnId = cellData.btnId;
  });
  
  const keymap3Cells = document.querySelectorAll(".btn-cell6-03");
  layoutData.keymap3Col1.forEach((cellData, i) => {
    keymap3Cells[i].innerHTML = cellData.html || "";
    if (cellData.btnId) keymap3Cells[i].dataset.btnId = cellData.btnId;
  });
  
  assignClassesToToCells();
  enableRowDragAndDrop(gameBody0001, keymapBody0002, keymapBody0003);
  syncGame02ToKeymap01();
  setTimeout(adjustPoolsAfterLoad, 0);
}

function adjustPoolsAfterLoad() {
  // 使用中の data-btn-id を収集（セルの方から）
  const usedIds = [];
  document.querySelectorAll("#keymapBody0002 td, #keymapBody0003 td, #gameBody0001 td").forEach(cell => {
    const btnId = cell.dataset.btnId;
    if (btnId) usedIds.push(btnId);
  });
  
  // プールから削除
  const poolIds = ["#btnGamePool", "#btnKeymapPool2", "#btnKeymapPool3"];
  poolIds.forEach(poolSelector => {
    usedIds.forEach(id => {
      
      const poolBtn = document.querySelector(`${poolSelector} .inner-btn[data-btn-id="${id}"]`);
      if (poolBtn) {
        console.log("チェック:", poolBtn?.dataset.btnId, "vs", id);
        const cell = poolBtn.closest("td");
        if (cell) cell.remove();
        else poolBtn.remove(); // td がなければ div だけでも削除
      }
    });
  });
}

const defaultData = [
  '<div class="inner-btn shape-fixed" data-btn-id="🕹L">🕹L</div>',
  '<div class="inner-btn shape-oblong btn-RT" data-btn-id="RT" style="opacity: 0.9;">RT</div>',
  '<div class="inner-btn shape-oblong btn-LT" data-btn-id="LT" style="opacity: 0.9;">LT</div>',
  '<div class="inner-btn shape-oblong btn-R3" data-btn-id="R3" style="opacity: 0.9;">R3</div>',
  '<div class="inner-btn shape-round btn-X" data-btn-id="X" style="opacity: 0.9;">X</div>',
  '<div class="inner-btn shape-round btn-X" data-btn-id="X" style="opacity: 0.9;">X</div>',
  '<div class="inner-btn shape-round btn-B" data-btn-id="B" style="opacity: 0.9;">B</div>',
  '<div class="inner-btn shape-oblong btn-L3" data-btn-id="L3" style="opacity: 0.9;">L3</div>',
  '<div class="inner-btn shape-round btn-A" data-btn-id="A" style="opacity: 0.9;">A</div>',
  '<div class="inner-btn shape-tap" data-btn-id="+">+</div>',
  '<div class="inner-btn shape-round btn-Y" data-btn-id="Y" style="opacity: 0.9;">Y</div>',
  '<div class="inner-btn shape-fixed" data-btn-id="NUL">NUL</div>',
  '<div class="inner-btn shape-fixed" data-btn-id="LB">LB</div>',
  '<div class="inner-btn shape-fixed" data-btn-id="RB">RB</div>',
  '<div class="inner-btn shape-fixed" data-btn-id="RB">RB</div>',
  '<div class="inner-btn shape-fixed" data-btn-id="LB+RB">LB+RB</div>',
  '<div class="inner-btn shape-oblong btn-LT" data-btn-id="LT" style="opacity: 0.9;">LT</div><div class="inner-btn shape-dual">🕹L</div>',
  '<div class="inner-btn shape-square btn-▼" data-btn-id="BACK" style="opacity: 0.9;">▼</div>',
  '<div class="inner-btn shape-square btn-▲" data-btn-id="FRONT" style="opacity: 0.9;">▲</div>',
  '<div class="inner-btn shape-square btn-◀" data-btn-id="LEFT" style="opacity: 0.9;">◀</div>',
  '<div class="inner-btn shape-round btn-❏" data-btn-id="OPTION" style="opacity: 0.9;">❏</div>',
  '<div class="inner-btn shape-square btn-▶" data-btn-id="RIGHT" style="opacity: 0.9;">▶</div>',
  '<div class="inner-btn shape-tap" data-btn-id="+">+</div>',
  '<div class="inner-btn shape-tap" data-btn-id="+">+</div>'
];
// Set to default ボタン
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("setDefaultBtn").addEventListener("click", () => {
    setDefaultLayout();
  });
});

function setDefaultLayout() {
  const gameCells = document.querySelectorAll(".btn-cell5");
  
  // 1) セルの消去（fixed-cell と dual は残す）
  gameCells.forEach(cell => {
    const keep = Array.from(cell.querySelectorAll(".fixed-cell, .dual"));
    cell.innerHTML = "";
    keep.forEach(el => cell.appendChild(el));
  });
  
  // 2) defaultData をゲーム側2列目（.btn-cell5）へ反映
  defaultData.forEach((html, i) => {
    if (i < gameCells.length) {
      gameCells[i].insertAdjacentHTML("beforeend", html);
    }
  });
  
  // 3) 復元後の再バインド
  assignClassesToToCells();
  enableRowDragAndDrop(gameBody0001, keymapBody0002, keymapBody0003);
  
  // 4) プール更新（ゲーム／キーマップ両方を再構築）
  rebuildBtnPool(
    btnGamePool,
    [], // ← あなたの初期化方針に合わせて current は都度生成
    btnGamePool0001,
    "btn-cell5",
    gameBody0001
  );
  rebuildBtnPool(
    btnKeymapPool2,
    [],
    btnKeymapPool0002,
    "btn-cell6-02",
    keymapBody0002
  );
  rebuildBtnPool(
    btnKeymapPool3,
    [],
    btnKeymapPool0003,
    "btn-cell6-03",
    keymapBody0003
  );
  
  // 5) 同期（DOM反映直後を保証）
  requestAnimationFrame(() => {
    syncGame02ToKeymap01();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  /*
  console.log("スクリプト読み込みました");
  */
  const gameBody0001 = document.getElementById("gameBody");
  const keymapBody0002 = document.getElementById("keymapBody2");
  const keymapBody0003 = document.getElementById("keymapBody3");
  
  createGameTable(gameBody0001, modeMaster, NUM_BIND_CELLS);
  createKeymapTable(keymapBody0002, keymapBody0003, modeMaster);
  
  rebuildBtnPool(btnGamePool, [], document.getElementById("btnGamePool"), "btn-cell5", gameBody0001);
  rebuildBtnPool(btnKeymapPool2, [], document.getElementById("btnKeymapPool2"), "btn-cell6-02", keymapBody0002);
  rebuildBtnPool(btnKeymapPool3, [], document.getElementById("btnKeymapPool3"), "btn-cell6-03", keymapBody0003);
  
  document.addEventListener('dragstart', () => { isDragging = true; });
  document.addEventListener('dragend', () => { isDragging = false; });
  
  // ← ここでドラッグドロップ有効化
  enableRowDragAndDrop(gameBody0001, keymapBody0002, keymapBody0003);
  
  setMode(defaultMode);
  assignClassesToToCells();
  syncGame02ToKeymap01();
  /*
  console.log("---- 初期化 完了 ----");
  */
  /*
  Array.from(gameBody0001.children).forEach(row => console.log(row.dataset.index, row.getAttribute('draggable')));
  Array.from(keymapBody0002.children).forEach(row => console.log(row.dataset.index, row.getAttribute('draggable')));
  Array.from(keymapBody0003.children).forEach(row => console.log(row.dataset.index, row.getAttribute('draggable')));
  */
});
// GameTable 作成
function createGameTable() {
  gameBody0001.innerHTML = "";
  
  gameCommands.forEach((cmd, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;
    
    // 0列目：コマンド名
    const nameCell = document.createElement("td");
    
    // スクロール用ラップを作る
    const scrollContainer = document.createElement("div");
    scrollContainer.classList.add("scrolling-box-container");
    
    const scrollBox = document.createElement("div");
    scrollBox.classList.add("scrolling-box");
    scrollBox.textContent = cmd.name;
    
    scrollContainer.appendChild(scrollBox);
    nameCell.appendChild(scrollContainer);
    
    if (cmd.fixed !== undefined) {
      nameCell.classList.add("fixed-cell");
    }
    
    row.appendChild(nameCell);
    
    commandCellMap.set(cmd.name, []);
    
    // 1列目：ボタン配置セル
    const cell = document.createElement("td");
    cell.classList.add("btn-cell5");
    cell.dataset.cmdName = cmd.name;
    
    if (cmd.fixed !== undefined && cmd.fixed !== "") {
      const btn = document.createElement("div");
      btn.classList.add("inner-btn", "shape-fixed");
      btn.textContent = cmd.fixed;
      // ★ 修正：data-btn-id を固定名 or コマンド名に
      btn.setAttribute("data-btn-id", cmd.fixed || cmd.name);
      cell.classList.add("fixed-cell");
      cell.appendChild(btn);
    } else if (cmd.dual) {
      const placeholderSpan = document.createElement("span");
      placeholderSpan.textContent = "…";
      cell.appendChild(placeholderSpan);
      cell.append(" + ");
      
      const dualBtn = document.createElement("div");
      dualBtn.classList.add("inner-btn", "shape-dual");
      dualBtn.textContent = "🕹L";
      // ★ 修正：data-btn-id を固定名 or コマンド名に
      dualBtn.setAttribute("data-btn-id", cmd.fixed || cmd.name);
      cell.appendChild(dualBtn);
    } else {
      const btn = document.createElement("div");
      btn.classList.add("inner-btn", "shape-tap");
      btn.textContent = "+";
      // ★ 修正：data-btn-id を固定名 or コマンド名に
      btn.setAttribute("data-btn-id", cmd.fixed || cmd.name);
      cell.appendChild(btn);
      
      cell.addEventListener("click", () => handleCellClick(cell, cmd.name, 0, false));
    }
    
    commandCellMap.get(cmd.name).push(cell);
    row.appendChild(cell);
    
    gameBody0001.appendChild(row);
  });
  
  // AIMセル監視
  /*
  const aimRow = Array.from(gameBody0001.rows).find(row => row.cells[0].textContent === "AIM");
  const aimCell = aimRow?.cells[1];
  
  if (aimCell) {
    const observer = new MutationObserver(() => {
      updateLeanBinds();
    });
    observer.observe(aimCell, { childList: true });
  }
  */
  /*
  console.log("---- createGameTable 完了 ----");
  */
}
// KeymapTable 作成（keymapBody2 / keymapBody3 両方）
function createKeymapTable(body2, body3) {
  body2.innerHTML = "";
  body3.innerHTML = "";
  
  keymapCommands.forEach((cmdObj, i) => {
    const cmdName = cmdObj.name;
    
    // --- keymapBody0002 ---
    const row2 = body2.insertRow();
    row2.dataset.index = i;
    row2.classList.add("draggable");
    row2.draggable = true;
    
    // 0列目：ゲームコピーセル（操作禁止）
    const cell2_0 = row2.insertCell();
    cell2_0.classList.add("btn-cell6", "btn-cell6-02");
    cell2_0.dataset.cmdName = cmdName;
    const btnDiv2_0 = document.createElement("div");
    btnDiv2_0.classList.add("inner-btn");
    let btnId0 = cmdObj.fixed || cmdObj.name;
    cell2_0.dataset.btnId = btnId0;
    btnDiv2_0.dataset.btnId = btnId0;
    if (cmdObj.fixed) {
      btnDiv2_0.classList.add("shape-fixed");
      btnDiv2_0.textContent = cmdObj.fixed;
    } else if (cmdObj.dual) {
      btnDiv2_0.classList.add("shape-fixed", "shape-dual");
      btnDiv2_0.textContent = "🕹L";
    } else {
      btnDiv2_0.textContent = "";
    }
    cell2_0.appendChild(btnDiv2_0);
    
    // 1列目：ユーザー操作セル
    const cell2_1 = row2.insertCell();
    cell2_1.classList.add("btn-cell6", "btn-cell6-02");
    cell2_1.dataset.cmdName = cmdName;
    
    const btnDiv2_1 = document.createElement("div");
    btnDiv2_1.classList.add("inner-btn", "shape-tap");
    if (cmdObj.dual && cmdObj.name === "LEAN L/R") {
      btnDiv2_1.textContent = "…";
    } else {
      btnDiv2_1.textContent = "＋";
    }
    
    let btnId1 = cmdObj.name;
    cell2_1.dataset.btnId = btnId1;
    btnDiv2_1.dataset.btnId = btnId1;
    cell2_1.appendChild(btnDiv2_1);
    cell2_1.addEventListener("click", () => handleCellClick(cell2_1, cmdName, 1, false));
    
    // --- keymapBody0003 ---
    const row3 = body3.insertRow();
    row3.dataset.index = i;
    row3.classList.add("draggable");
    row3.draggable = true;
    
    // 0列目：ユーザー操作セル（生成）
    const cell3_0 = row3.insertCell();
    cell3_0.classList.add("btn-cell6", "btn-cell6-03");
    cell3_0.dataset.cmdName = cmdName;
    const box3 = document.createElement("div");
    box3.classList.add("inner-btn", "shape-tap");
    if (cmdObj.dual && cmdObj.name === "LEAN L/R") {
      box3.textContent = "…";
    } else {
      box3.textContent = "＋";
    }
    box3.dataset.btnId = cmdObj.name;
    cell3_0.appendChild(box3);
    cell3_0.addEventListener("click", () => handleCellClick(cell3_0, cmdName, 0, false));
    
    // 1列目：ラベル（生成しない）
    // const cell3_1 = row3.insertCell();
    // cell3_1.classList.add("label-cell");
    // const scrollContainer = document.createElement("div");
    // scrollContainer.classList.add("scrolling-box-container");
    // const scrollBox = document.createElement("div");
    // scrollBox.classList.add("scrolling-box");
    // scrollBox.textContent = cmdName;
    // scrollContainer.appendChild(scrollBox);
    // cell3_1.appendChild(scrollContainer);
    
    // 1行目だけ固定セル化
    if (i === 0) {
      // キーマップ2
      cell2_1.classList.remove("btn-cell6-02");
      btnDiv2_1.classList.remove("shape-tap");
      cell2_1.classList.add("fixed-cell");
      btnDiv2_1.textContent = "　";
      
      // キーマップ3（0列目を固定セル化）
      cell3_0.classList.remove("btn-cell6-03");
      box3.classList.remove("shape-tap");
      cell3_0.classList.add("fixed-cell");
      box3.textContent = "　";
    }
  });
}