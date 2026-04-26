import { storage } from './storage.js';
import { dictionary } from './dictionary.js';
import { createTiles } from './tiles.js';

const STARTERS = [
  { kanji: "水",  readingKana: "みず",   meaning: "water" },
  { kanji: "火",  readingKana: "ひ",     meaning: "fire" },
  { kanji: "木",  readingKana: "き",     meaning: "tree" },
  { kanji: "山",  readingKana: "やま",   meaning: "mountain" },
  { kanji: "川",  readingKana: "かわ",   meaning: "river" },
  { kanji: "人",  readingKana: "ひと",   meaning: "person" },
  { kanji: "空",  readingKana: "そら",   meaning: "sky" },
  { kanji: "土",  readingKana: "つち",   meaning: "earth" },
  { kanji: "風",  readingKana: "かぜ",   meaning: "wind" },
  { kanji: "花",  readingKana: "はな",   meaning: "flower" },
  { kanji: "海",  readingKana: "うみ",   meaning: "sea" },
  { kanji: "石",  readingKana: "いし",   meaning: "stone" },
  { kanji: "金",  readingKana: "きん",   meaning: "gold" },
  { kanji: "日",  readingKana: "ひ",     meaning: "sun / day" },
  { kanji: "月",  readingKana: "つき",   meaning: "moon" },
  { kanji: "草",  readingKana: "くさ",   meaning: "grass" },
  { kanji: "雨",  readingKana: "あめ",   meaning: "rain" },
  { kanji: "雪",  readingKana: "ゆき",   meaning: "snow" },
  { kanji: "光",  readingKana: "ひかり", meaning: "light" },
  { kanji: "夜",  readingKana: "よる",   meaning: "night" },
];

export function initGame(canvasEl, sidebarTilesEl) {
  const tiles = createTiles();
  let discoveredWords = {};
  let canvasInstances = {};
  let saveTimer = null;

  const $ = (id) => document.getElementById(id);

  function makeTileData(kanji, readingKana, meaning, isStarter) {
    const id = tiles.makeTileId(kanji, readingKana);
    return { id, kanji, readingKana, meaning, isStarter: !!isStarter, discoveredAt: Date.now() };
  }

  function scheduleS() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 500);
  }

  function saveState() {
    const instances = [];
    canvasEl.querySelectorAll('.tile').forEach(el => {
      instances.push({ instanceId: el.dataset.instanceId, wordId: el.dataset.wordId, x: parseInt(el.style.left) || 0, y: parseInt(el.style.top) || 0 });
    });
    storage.save(discoveredWords, instances);
  }

  function updateDiscoveredCount() {
    const count = Object.keys(discoveredWords).length;
    const el = $('ijk-discovered-count');
    if (el) el.textContent = count === 1 ? '1 word' : `${count} words`;
  }

  function setStatus(msg, type) {
    const el = $('ijk-status-message');
    if (!el) return;
    el.textContent = msg;
    el.className = type || '';
  }

  function resultPositions(midX, midY, count, canvasW, canvasH) {
    const tileW = 90, tileH = 100, gap = 10;
    const totalW = count * tileW + (count - 1) * gap;
    return Array.from({ length: count }, (_, i) => ({
      x: Math.max(4, Math.min(midX - totalW / 2 + i * (tileW + gap), canvasW - tileW - 4)),
      y: Math.max(4, Math.min(midY, canvasH - tileH - 4)),
    }));
  }

  async function attemptCombine(dragTileData, targetEl) {
    const targetWordId = targetEl.dataset.wordId;
    const targetInstanceId = targetEl.dataset.instanceId;
    const targetTileData = discoveredWords[targetWordId];
    if (!targetTileData) return;

    const kanaA = dragTileData.readingKana;
    const kanaB = targetTileData.readingKana;
    const kanjiA = dragTileData.kanji;
    const kanjiB = targetTileData.kanji;
    const combined = kanaA + kanaB;

    if (dragTileData.instanceId === targetInstanceId) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const draggedEl = dragTileData.instanceId ? canvasEl.querySelector(`[data-instance-id="${dragTileData.instanceId}"]`) : null;

    let midX, midY;
    if (draggedEl) {
      const dragRect = draggedEl.getBoundingClientRect();
      midX = ((dragRect.left + dragRect.right) / 2 + (targetRect.left + targetRect.right) / 2) / 2 - canvasRect.left - 40;
      midY = ((dragRect.top + dragRect.bottom) / 2 + (targetRect.top + targetRect.bottom) / 2) / 2 - canvasRect.top - 45;
    } else {
      midX = (targetRect.left + targetRect.right) / 2 - canvasRect.left - 40;
      midY = (targetRect.top + targetRect.bottom) / 2 - canvasRect.top - 45;
    }

    const savedDragPos = draggedEl ? { left: draggedEl.style.left, top: draggedEl.style.top } : null;
    const savedTargetPos = { left: targetEl.style.left, top: targetEl.style.top };

    if (draggedEl) { draggedEl.classList.add('combining'); delete canvasInstances[dragTileData.instanceId]; }
    targetEl.classList.add('combining');
    delete canvasInstances[targetInstanceId];

    const loadingTile = tiles.createLoadingTile(midX, midY);
    setStatus(`Combining ${kanaA} + ${kanaB}…`, '');

    setTimeout(() => {
      if (draggedEl && draggedEl.parentNode) draggedEl.remove();
      if (targetEl.parentNode) targetEl.remove();
    }, 200);

    const lookupOpts = { kanaRev: kanaB + kanaA, kanji: kanjiA + kanjiB, kanjiRev: kanjiB + kanjiA };
    const results = await dictionary.lookup(combined, lookupOpts);
    loadingTile.remove();

    if (!results.length) {
      setStatus(`No word found for ${kanjiA} + ${kanjiB} — try a different pair!`, 'status-fail');
      if (draggedEl) {
        const r = tiles.placeOnCanvas(dragTileData, parseInt(savedDragPos.left), parseInt(savedDragPos.top), false);
        canvasInstances[r] = { wordId: dragTileData.id, x: parseInt(savedDragPos.left), y: parseInt(savedDragPos.top) };
      }
      const r = tiles.placeOnCanvas(targetTileData, parseInt(savedTargetPos.left), parseInt(savedTargetPos.top), false);
      canvasInstances[r] = { wordId: targetTileData.id, x: parseInt(savedTargetPos.left), y: parseInt(savedTargetPos.top) };
      scheduleS();
      return;
    }

    const positions = resultPositions(midX, midY, results.length, canvasEl.clientWidth, canvasEl.clientHeight);
    const newWords = [];

    results.forEach((result, i) => {
      const tileData = makeTileData(result.kanji, result.readingKana, result.meaning, false);
      const isNew = !discoveredWords[tileData.id];
      if (isNew) { discoveredWords[tileData.id] = tileData; tiles.addToSidebar(tileData, true); newWords.push(tileData); }
      const { x, y } = positions[i];
      const instanceId = tiles.placeOnCanvas(tileData, x, y, true);
      canvasInstances[instanceId] = { wordId: tileData.id, x, y };
    });

    if (newWords.length > 0) updateDiscoveredCount();

    if (newWords.length > 0) {
      const names = newWords.map(t => `${t.kanji} (${t.meaning})`).join('、 ');
      setStatus(`✨ ${newWords.length} new word${newWords.length > 1 ? 's' : ''}: ${names}`, 'status-new');
    } else {
      const names = results.map(r => `${r.kanji} (${r.meaning})`).join('、 ');
      setStatus(`${kanjiA} + ${kanjiB} → ${names}`, 'status-ok');
    }

    scheduleS();
  }

  function initStarters() {
    discoveredWords = {};
    canvasInstances = {};
    STARTERS.forEach(s => {
      const td = makeTileData(s.kanji, s.readingKana, s.meaning, true);
      discoveredWords[td.id] = td;
    });
    const cols = 4;
    const tileW = 88, tileH = 100, startX = 20, startY = 20;
    STARTERS.forEach((s, i) => {
      const td = discoveredWords[tiles.makeTileId(s.kanji, s.readingKana)];
      const x = startX + (i % cols) * (tileW + 10);
      const y = startY + Math.floor(i / cols) * (tileH + 10);
      const instanceId = tiles.placeOnCanvas(td, x, y, false);
      canvasInstances[instanceId] = { wordId: td.id, x, y };
    });
    STARTERS.slice().reverse().forEach(s => {
      tiles.addToSidebar(discoveredWords[tiles.makeTileId(s.kanji, s.readingKana)], false);
    });
  }

  function restoreState(saved) {
    discoveredWords = saved.discoveredWords || {};
    canvasInstances = {};
    tiles.clearCanvas();
    tiles.clearSidebar();
    STARTERS.forEach(s => {
      const id = tiles.makeTileId(s.kanji, s.readingKana);
      if (!discoveredWords[id]) discoveredWords[id] = makeTileData(s.kanji, s.readingKana, s.meaning, true);
      else discoveredWords[id].isStarter = true;
    });
    const starters = STARTERS.map(s => discoveredWords[tiles.makeTileId(s.kanji, s.readingKana)]);
    const discovered = Object.values(discoveredWords).filter(t => !t.isStarter).sort((a, b) => (a.discoveredAt || 0) - (b.discoveredAt || 0));
    [...starters].reverse().forEach(t => tiles.addToSidebar(t, false));
    discovered.forEach(t => tiles.addToSidebar(t, false));
    (saved.canvasInstances || []).forEach(inst => {
      const tileData = discoveredWords[inst.wordId];
      if (!tileData) return;
      const instanceId = tiles.placeOnCanvas(tileData, inst.x, inst.y, false);
      canvasInstances[instanceId] = { wordId: inst.wordId, x: inst.x, y: inst.y };
    });
  }

  function initCreateModal() {
    const modal   = $('ijk-create-modal');
    const input   = $('ijk-create-input');
    const preview = $('ijk-create-kana-preview');
    const errorEl = $('ijk-create-error');
    const confirm = $('ijk-create-confirm');
    const cancel  = $('ijk-create-cancel');

    const openModal = () => {
      input.value = '';
      preview.textContent = '';
      errorEl.classList.add('hidden');
      confirm.disabled = false;
      modal.classList.remove('hidden');
      setTimeout(() => input.focus(), 60);
    };
    const closeModal = () => modal.classList.add('hidden');
    const showError = (msg) => { errorEl.textContent = msg; errorEl.classList.remove('hidden'); confirm.disabled = false; };

    input.addEventListener('input', () => {
      preview.textContent = dictionary.romajiToHiragana(input.value) || '';
      errorEl.classList.add('hidden');
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') confirmCreate();
      if (e.key === 'Escape') closeModal();
    });
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    cancel.addEventListener('click', closeModal);
    confirm.addEventListener('click', confirmCreate);

    async function confirmCreate() {
      const romaji = input.value.trim();
      if (!romaji) { showError('Please enter a romaji reading.'); return; }
      const kana = dictionary.romajiToHiragana(romaji);
      if (!kana || kana === romaji) { showError(`Could not convert "${romaji}" to hiragana.`); return; }

      confirm.disabled = true;
      errorEl.classList.add('hidden');
      preview.textContent = kana;

      const allResults = await dictionary.lookup(kana);
      if (!allResults.length) { showError(`No kanji found for "${kana}" (${romaji}).`); return; }

      const result = allResults[Math.floor(Math.random() * allResults.length)];
      closeModal();

      const tileData = makeTileData(result.kanji, result.readingKana, result.meaning, false);
      const isNew = !discoveredWords[tileData.id];
      if (isNew) { discoveredWords[tileData.id] = tileData; tiles.addToSidebar(tileData, true); updateDiscoveredCount(); }

      const cx = Math.max(20, (canvasEl.clientWidth / 2 - 40) + (Math.random() - 0.5) * 120);
      const cy = Math.max(20, (canvasEl.clientHeight / 2 - 45) + (Math.random() - 0.5) * 80);
      const instanceId = tiles.placeOnCanvas(tileData, cx, cy, true);
      canvasInstances[instanceId] = { wordId: tileData.id, x: cx, y: cy };

      setStatus(isNew ? `✨ Created: ${result.kanji} (${result.readingKana}) — ${result.meaning}` : `${result.kanji} placed on canvas — ${result.meaning}`, isNew ? 'status-new' : 'status-ok');
      scheduleS();
    }

    $('ijk-btn-create').addEventListener('click', openModal);
  }

  function initSearch() {
    const input = $('ijk-search-input');
    if (!input) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      sidebarTilesEl.querySelectorAll('.tile').forEach(el => {
        const kanji = el.querySelector('.tile-kanji')?.textContent || '';
        const reading = el.querySelector('.tile-furigana')?.textContent || '';
        const meaning = el.querySelector('.tile-meaning')?.textContent || '';
        el.style.display = (!q || kanji.includes(q) || reading.includes(q) || meaning.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }

  // Bootstrap
  tiles.init(canvasEl, sidebarTilesEl, {
    onCombine(dragTileData, targetEl) { attemptCombine(dragTileData, targetEl); },
    onDrop(tileData, instanceId, x, y) { canvasInstances[instanceId] = { wordId: tileData.id, x, y }; scheduleS(); },
    onRemove(instanceId) { delete canvasInstances[instanceId]; scheduleS(); },
  });

  const saved = storage.load();
  if (saved) restoreState(saved);
  else { initStarters(); saveState(); }

  updateDiscoveredCount();
  initSearch();
  initCreateModal();

  $('ijk-btn-clear').addEventListener('click', () => {
    tiles.clearCanvas();
    canvasInstances = {};
    saveState();
    setStatus('Canvas cleared. Drag tiles from the sidebar to start again!', '');
  });

  $('ijk-btn-reset').addEventListener('click', () => {
    if (!confirm('Reset everything? All discovered words will be lost.')) return;
    storage.clear();
    tiles.clearCanvas();
    tiles.clearSidebar();
    initStarters();
    saveState();
    updateDiscoveredCount();
    setStatus('Reset! Start combining from scratch.', '');
  });

  return function cleanup() {
    clearTimeout(saveTimer);
  };
}
