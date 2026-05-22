/* ================================================
   app.js — Flexbox Luggage Game Logic
   ================================================ */

// ------------------------------------------------
// Level Data
// ------------------------------------------------

const LEVELS = [
  {
    id: 1,
    destination: "台北",
    destinationEn: "Taipei",
    emoji: "🏙️",
    themeColor: "#4A90D9",
    story: "週末去台北逛街！行李很輕鬆，但物品現在都疊成一堆，沒辦法出發。請用 CSS 讓它們並排！",
    items: [
      { emoji: "👕", label: "上衣" },
      { emoji: "💳", label: "悠遊卡" },
      { emoji: "☂️", label: "雨傘" },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: {},
    properties: [
      {
        property: "display",
        options: ["block", "flex", "grid", "inline-flex"],
        answer: "flex",
        defaultValue: "block",
      },
    ],
    hint: "💡 只需要一個屬性！試試看 display: flex 會發生什麼神奇的事。",
    successMessage: "太棒了！display: flex 讓物品自動並排了！這是 Flexbox 的魔法起點。",
    successConcept: "display: flex → 開啟 Flexbox 模式",
    nextDestination: "下一站：京都 🏯",
  },
  {
    id: 2,
    destination: "京都",
    destinationEn: "Kyoto",
    emoji: "⛩️",
    themeColor: "#C0392B",
    story: "前往京都！行李箱是直立的，和風配件必須由上到下整齊疊放。請改變排列方向！",
    items: [
      { emoji: "👘", label: "浴衣" },
      { emoji: "🪭", label: "扇子" },
      { emoji: "🍵", label: "抹茶" },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: { display: "flex" },
    properties: [
      {
        property: "flex-direction",
        options: ["row", "row-reverse", "column", "column-reverse"],
        answer: "column",
        defaultValue: "row",
      },
    ],
    hint: "💡 flex-direction 控制主軸方向。想讓物品直排，主軸要變成垂直的！",
    successMessage: "完美！flex-direction: column 讓物品從左右變成上下排列。",
    successConcept: "flex-direction: column → 垂直排列（主軸向下）",
    nextDestination: "下一站：夏威夷 🌺",
  },
  {
    id: 3,
    destination: "夏威夷",
    destinationEn: "Hawaii",
    emoji: "🌺",
    themeColor: "#16A085",
    story: "衝浪去！行李箱空間寬裕，但海灘物品全擠在左邊。讓它們在行李箱裡均勻分散！",
    items: [
      { emoji: "👙", label: "泳衣" },
      { emoji: "🧴", label: "防曬乳" },
      { emoji: "🥽", label: "蛙鏡" },
      { emoji: "🏄", label: "衝浪板" },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: { display: "flex", "justify-content": "flex-start" },
    properties: [
      {
        property: "justify-content",
        options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
        answer: "space-between",
        defaultValue: "flex-start",
      },
    ],
    hint: "💡 justify-content 控制主軸（水平）方向的對齊。想讓物品兩端靠齊、中間均勻分散，試試 space-between！",
    successMessage: "漂亮！space-between 讓物品兩端固定、中間均勻分散，行李排得整整齊齊！",
    successConcept: "justify-content: space-between → 主軸均勻分散",
    nextDestination: "下一站：巴黎 🗼",
  },
  {
    id: 4,
    destination: "巴黎",
    destinationEn: "Paris",
    emoji: "🗼",
    themeColor: "#8E44AD",
    story: "浪漫巴黎！高跟鞋、小錢包、香水瓶高矮不一，但要讓它們底部對齊，才能放穩！",
    items: [
      { emoji: "👠", label: "高跟鞋", height: 60 },
      { emoji: "👛", label: "小錢包", height: 40 },
      { emoji: "🍾", label: "香水", height: 100 },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: { display: "flex", "align-items": "flex-start" },
    properties: [
      {
        property: "align-items",
        options: ["flex-start", "flex-end", "center", "stretch", "baseline"],
        answer: "flex-end",
        defaultValue: "flex-start",
      },
    ],
    hint: "💡 align-items 控制交叉軸（垂直）方向的對齊。底部對齊，就是 flex-end 的方向！",
    successMessage: "C'est magnifique！align-items: flex-end 讓物品底部整齊對齊了！",
    successConcept: "align-items: flex-end → 交叉軸底部對齊",
    nextDestination: "下一站：紐約 🗽",
  },
  {
    id: 5,
    destination: "紐約",
    destinationEn: "New York",
    emoji: "🗽",
    themeColor: "#2C3E50",
    story: "商務出差去紐約！要帶的東西太多了，一行塞不下。讓物品自動換行排列！",
    items: [
      { emoji: "👔", label: "西裝" },
      { emoji: "💻", label: "筆電" },
      { emoji: "📁", label: "文件" },
      { emoji: "🔌", label: "充電器" },
      { emoji: "☕", label: "咖啡杯" },
      { emoji: "📱", label: "手機" },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: { display: "flex", "flex-wrap": "nowrap" },
    properties: [
      {
        property: "flex-wrap",
        options: ["nowrap", "wrap", "wrap-reverse"],
        answer: "wrap",
        defaultValue: "nowrap",
      },
    ],
    hint: "💡 預設 flex-wrap: nowrap 會讓物品擠在一行。試試 wrap，讓它們自動換到下一行！",
    successMessage: "Perfect！flex-wrap: wrap 讓物品自動換行，再多東西也塞得下！",
    successConcept: "flex-wrap: wrap → 自動換行",
    nextDestination: "下一站：阿爾卑斯山 🏔️",
  },
  {
    id: 6,
    destination: "阿爾卑斯山",
    destinationEn: "Alps",
    emoji: "🏔️",
    themeColor: "#27AE60",
    story: "健行去阿爾卑斯山！水瓶要填滿剩餘空間（帶最多水），其他裝備保持原本大小。",
    items: [
      { emoji: "🍶", label: "水瓶", itemId: "water-bottle" },
      { emoji: "🩹", label: "急救包", itemId: "first-aid" },
      { emoji: "🗺️", label: "地圖", itemId: "map" },
    ],
    type: "item",
    cssSelector: ".water-bottle",
    brokenCSS: { display: "flex" },
    properties: [
      {
        property: "flex-grow",
        itemId: "water-bottle",
        itemLabel: "水瓶",
        options: ["0", "1", "2", "3"],
        answer: "1",
        defaultValue: "0",
      },
    ],
    hint: "💡 flex-grow 決定物品分配剩餘空間的比例。設定 flex-grow: 1 讓水瓶填滿空間！",
    successMessage: "讚！flex-grow: 1 讓水瓶自動伸展，填滿了行李箱的剩餘空間！",
    successConcept: "flex-grow: 1 → 填滿剩餘空間",
    nextDestination: "最終關卡：環遊世界 🌍",
  },
  {
    id: 7,
    destination: "環遊世界",
    destinationEn: "World Tour",
    emoji: "🌍",
    themeColor: "#E8834A",
    story: "最終挑戰！環遊世界的行李需要綜合所有技巧：並排、換行、均勻分散，才能完美出發！",
    items: [
      { emoji: "🗺️", label: "地圖" },
      { emoji: "📷", label: "相機" },
      { emoji: "🔋", label: "電池" },
      { emoji: "🧴", label: "保養品" },
      { emoji: "📖", label: "旅遊書" },
      { emoji: "🎧", label: "耳機" },
    ],
    type: "container",
    cssSelector: ".suitcase",
    brokenCSS: { display: "block" },
    properties: [
      {
        property: "display",
        options: ["block", "flex", "grid"],
        answer: "flex",
        defaultValue: "block",
      },
      {
        property: "flex-wrap",
        options: ["nowrap", "wrap", "wrap-reverse"],
        answer: "wrap",
        defaultValue: "nowrap",
      },
      {
        property: "justify-content",
        options: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"],
        answer: "space-around",
        defaultValue: "flex-start",
      },
      {
        property: "align-items",
        options: ["flex-start", "flex-end", "center", "stretch"],
        answer: "center",
        defaultValue: "flex-start",
      },
    ],
    hint: "💡 綜合前六關的技巧！先 display: flex，再設定 flex-wrap、justify-content 和 align-items。",
    successMessage: "🎉 恭喜！你已經完全掌握 CSS Flexbox！環遊世界，出發！",
    successConcept: "display:flex + flex-wrap:wrap + justify-content:space-around + align-items:center",
    nextDestination: "",
  },
];

// ------------------------------------------------
// Game State
// ------------------------------------------------

let currentLevelIndex = 0;
let hintShown = false;

// ------------------------------------------------
// Initialise
// ------------------------------------------------

function init() {
  renderProgressTrack();
  loadLevel(currentLevelIndex);
}

function restartGame() {
  currentLevelIndex = 0;
  document.getElementById("complete-overlay").classList.add("hidden");
  init();
}

// ------------------------------------------------
// Progress Track
// ------------------------------------------------

function renderProgressTrack() {
  const track = document.getElementById("progress-track");
  track.innerHTML = "";
  LEVELS.forEach((lvl, i) => {
    if (i > 0) {
      const conn = document.createElement("div");
      conn.className = "progress-connector" + (i <= currentLevelIndex ? " completed" : "");
      track.appendChild(conn);
    }
    const dot = document.createElement("div");
    dot.className = "progress-dot" +
      (i < currentLevelIndex ? " completed" : "") +
      (i === currentLevelIndex ? " active" : "");
    dot.textContent = lvl.emoji;
    dot.title = lvl.destination;
    track.appendChild(dot);
  });
}

// ------------------------------------------------
// Load Level
// ------------------------------------------------

function loadLevel(idx) {
  const lvl = LEVELS[idx];
  hintShown = false;

  // Update counter
  document.getElementById("level-counter").textContent = `關卡 ${idx + 1} / ${LEVELS.length}`;

  // Banner
  document.getElementById("dest-emoji").textContent = lvl.emoji;
  document.getElementById("dest-name").textContent = lvl.destination;
  document.getElementById("story-text").textContent = lvl.story;
  document.getElementById("destination-banner").style.background =
    `linear-gradient(135deg, ${lvl.themeColor} 0%, ${darken(lvl.themeColor, 20)} 100%)`;

  // CSS selector label — hide outer selector for item-type levels (item-block has its own)
  const cssSelectorEl = document.getElementById("css-selector");
  const outerClosingEl = document.querySelector(".css-editor .closing");
  if (lvl.type === "item") {
    cssSelectorEl.style.display = "none";
    outerClosingEl.style.display = "none";
  } else {
    cssSelectorEl.style.display = "";
    outerClosingEl.style.display = "";
    cssSelectorEl.textContent = lvl.cssSelector + " {";
  }

  // Build property rows
  buildPropertyRows(lvl);

  // Build suitcases
  buildSuitcase("target-interior", lvl, true);
  buildSuitcase("player-interior", lvl, false);

  // Update CSS preview
  updateCSSPreview(lvl);

  // Hide hint and error
  document.getElementById("hint-box").classList.add("hidden");
  document.getElementById("error-box").classList.add("hidden");
  document.getElementById("hint-btn").textContent = "💡 提示";

  // Progress
  renderProgressTrack();
}

// ------------------------------------------------
// Build Property Rows (Code Editor UI)
// ------------------------------------------------

function buildPropertyRows(lvl) {
  const container = document.getElementById("property-rows");
  container.innerHTML = "";

  if (lvl.type === "item") {
    // Group properties by itemId
    lvl.properties.forEach(prop => {
      const block = document.createElement("div");
      block.className = "item-block";

      const selectorLine = document.createElement("div");
      selectorLine.className = "code-line item-selector-line";
      selectorLine.textContent = `.${prop.itemId} {`;
      block.appendChild(selectorLine);

      const row = buildPropRow(prop, true);
      block.appendChild(row);

      const closing = document.createElement("div");
      closing.className = "code-line item-closing";
      closing.textContent = "}";
      block.appendChild(closing);

      container.appendChild(block);
    });
  } else {
    lvl.properties.forEach(prop => {
      const row = buildPropRow(prop, false);
      container.appendChild(row);
    });
  }
}

function buildPropRow(prop, isItem) {
  const row = document.createElement("div");
  row.className = "property-row" + (isItem ? " item-prop-row" : "");

  const name = document.createElement("span");
  name.className = "prop-name";
  name.textContent = prop.property;
  row.appendChild(name);

  const colon = document.createElement("span");
  colon.className = "prop-colon";
  colon.textContent = ": ";
  row.appendChild(colon);

  const select = document.createElement("select");
  select.className = "prop-select";
  select.id = `select-${prop.property}${prop.itemId ? "-" + prop.itemId : ""}`;
  select.addEventListener("change", () => liveUpdate());

  prop.options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    if (opt === prop.defaultValue) option.selected = true;
    select.appendChild(option);
  });
  row.appendChild(select);

  const semi = document.createElement("span");
  semi.className = "prop-semicolon";
  semi.textContent = ";";
  row.appendChild(semi);

  return row;
}

// ------------------------------------------------
// Build Suitcase
// ------------------------------------------------

function buildSuitcase(containerId, lvl, isTarget) {
  const interior = document.getElementById(containerId);
  interior.innerHTML = "";
  interior.removeAttribute("style");

  // Apply CSS to player suitcase interior (broken/starting state)
  if (!isTarget) {
    applyContainerCSS(interior, lvl.brokenCSS);
  } else {
    // Target: merge brokenCSS (base) + solution properties for the full correct layout
    const answerCSS = buildSolutionCSS(lvl);
    if (lvl.type === "container") {
      const targetCSS = Object.assign({}, lvl.brokenCSS, answerCSS);
      applyContainerCSS(interior, targetCSS);
    } else {
      // Item-level: container still needs flex from brokenCSS
      const containerCSS = Object.assign({}, lvl.brokenCSS, { "align-items": "center" });
      applyContainerCSS(interior, containerCSS);
    }
  }

  lvl.items.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "luggage-item";
    if (item.itemId) el.classList.add(item.itemId);
    if (item.height) el.style.minHeight = item.height + "px";

    const emoji = document.createElement("span");
    emoji.className = "item-emoji";
    emoji.textContent = item.emoji;

    const label = document.createElement("span");
    label.className = "item-label";
    label.textContent = item.label;

    el.appendChild(emoji);
    el.appendChild(label);
    interior.appendChild(el);

    // Target item-level: apply answer properties to correct item
    if (isTarget && lvl.type === "item") {
      lvl.properties.forEach(prop => {
        if (prop.itemId === item.itemId) {
          el.style[camelCase(prop.property)] = prop.answer;
          // Set flex-basis: 0 so flex-grow effect is visually obvious
          if (prop.property === "flex-grow" && prop.answer !== "0") {
            el.style.flexBasis = "0%";
          }
        }
      });
    }
  });
}

function applyContainerCSS(el, css) {
  for (const [prop, val] of Object.entries(css)) {
    el.style[camelCase(prop)] = val;
  }
}

function buildSolutionCSS(lvl) {
  const css = {};
  lvl.properties.forEach(p => { css[p.property] = p.answer; });
  return css;
}

// ------------------------------------------------
// Live Update (on select change)
// ------------------------------------------------

function liveUpdate() {
  const lvl = LEVELS[currentLevelIndex];
  const playerInterior = document.getElementById("player-interior");

  if (lvl.type === "container") {
    // Clear ALL inline styles first, then rebuild from broken state + selections
    playerInterior.removeAttribute("style");
    applyContainerCSS(playerInterior, lvl.brokenCSS);
    // Apply player selections on top
    lvl.properties.forEach(prop => {
      const sel = document.getElementById(`select-${prop.property}`);
      if (sel) playerInterior.style[camelCase(prop.property)] = sel.value;
    });
  } else {
    // Item-level: re-apply container CSS + apply item properties
    applyContainerCSS(playerInterior, lvl.brokenCSS);
    lvl.properties.forEach(prop => {
      const sel = document.getElementById(`select-${prop.property}-${prop.itemId}`);
      const itemEl = playerInterior.querySelector(`.${prop.itemId}`);
      if (sel && itemEl) {
        itemEl.style[camelCase(prop.property)] = sel.value;
        // Mirror target: set flex-basis so flex-grow effect matches
        if (prop.property === "flex-grow") {
          itemEl.style.flexBasis = sel.value !== "0" ? "0%" : "";
        }
      }
    });
  }

  updateCSSPreview(lvl);
}

function updateCSSPreview(lvl) {
  const lines = [];
  lvl.properties.forEach(prop => {
    const id = prop.itemId
      ? `select-${prop.property}-${prop.itemId}`
      : `select-${prop.property}`;
    const sel = document.getElementById(id);
    const val = sel ? sel.value : prop.defaultValue;
    lines.push(`${prop.property}: ${val}`);
  });
  const prefix = lvl.type === "item" ? `.${lvl.properties[0].itemId}` : lvl.cssSelector;
  document.getElementById("current-css-display").textContent =
    `${prefix} { ${lines.join("; ")} }`;
}

// ------------------------------------------------
// Check Answer
// ------------------------------------------------

function checkAnswer() {
  const lvl = LEVELS[currentLevelIndex];
  let allCorrect = true;

  lvl.properties.forEach(prop => {
    const id = prop.itemId
      ? `select-${prop.property}-${prop.itemId}`
      : `select-${prop.property}`;
    const sel = document.getElementById(id);
    if (!sel || sel.value !== prop.answer) allCorrect = false;
  });

  if (allCorrect) {
    showSuccess(lvl);
  } else {
    const errBox = document.getElementById("error-box");
    errBox.classList.remove("hidden");
    setTimeout(() => errBox.classList.add("hidden"), 2000);
  }
}

// ------------------------------------------------
// Show Hint
// ------------------------------------------------

function showHint() {
  const lvl = LEVELS[currentLevelIndex];
  const hintBox = document.getElementById("hint-box");
  hintBox.textContent = lvl.hint;
  hintBox.classList.toggle("hidden");
  document.getElementById("hint-btn").textContent = hintBox.classList.contains("hidden") ? "💡 提示" : "🙈 收起";
}

// ------------------------------------------------
// Success & Next Level
// ------------------------------------------------

function showSuccess(lvl) {
  document.getElementById("success-message").textContent = lvl.successMessage;
  document.getElementById("success-concept").textContent = lvl.successConcept;
  document.getElementById("next-dest").textContent = lvl.nextDestination;

  const isLast = currentLevelIndex === LEVELS.length - 1;
  const nextBtn = document.getElementById("next-btn");
  nextBtn.textContent = isLast ? "🏁 完成！" : "下一關 →";

  document.getElementById("success-overlay").classList.remove("hidden");
  spawnConfetti();
}

function nextLevel() {
  document.getElementById("success-overlay").classList.add("hidden");
  document.getElementById("confetti-container").innerHTML = "";

  if (currentLevelIndex === LEVELS.length - 1) {
    showComplete();
    return;
  }

  currentLevelIndex++;
  loadLevel(currentLevelIndex);
}

function showComplete() {
  document.getElementById("success-overlay").classList.add("hidden");

  const skillsEl = document.getElementById("skills-learned");
  skillsEl.innerHTML = "";
  const skills = ["display: flex", "flex-direction", "justify-content", "align-items", "flex-wrap", "flex-grow", "綜合應用"];
  skills.forEach(s => {
    const tag = document.createElement("div");
    tag.className = "skill-tag";
    tag.textContent = s;
    skillsEl.appendChild(tag);
  });

  document.getElementById("complete-overlay").classList.remove("hidden");
  spawnConfetti();
}

// ------------------------------------------------
// Confetti
// ------------------------------------------------

function spawnConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";
  const colors = ["#E8834A", "#4CAF7D", "#4A90D9", "#FCD34D", "#8E44AD", "#16A085"];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 6) + "px";
    piece.style.height = (Math.random() * 8 + 6) + "px";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
    piece.style.animationDelay = (Math.random() * 0.8) + "s";
    container.appendChild(piece);
  }
}

// ------------------------------------------------
// Utilities
// ------------------------------------------------

function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function darken(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}

// ------------------------------------------------
// Start
// ------------------------------------------------

document.addEventListener("DOMContentLoaded", init);
