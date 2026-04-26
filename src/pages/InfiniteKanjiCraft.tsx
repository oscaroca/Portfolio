import React, { useEffect, useRef } from 'react';
import { initGame } from './InfiniteKanjiCraft/game.js';
import './InfiniteKanjiCraft/InfiniteKanjiCraft.css';

export default function InfiniteKanjiCraft() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !sidebarRef.current) return;
    const cleanup = initGame(canvasRef.current, sidebarRef.current);
    return cleanup;
  }, []);

  return (
    <div
      className="ijk-game"
      style={{ height: 'calc(100vh - 112px)', marginTop: '112px' }}
    >
      <header id="ijk-header">
        <h1>Infinite Kanji Craft</h1>
        <span id="ijk-discovered-count">0 words</span>
        <div className="ijk-header-buttons">
          <button id="ijk-btn-create" className="ijk-btn-create">＋ Create Kanji</button>
          <button id="ijk-btn-clear">Clear Canvas</button>
          <button id="ijk-btn-reset">Reset All</button>
        </div>
      </header>

      <div id="ijk-create-modal" className="ijk-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="ijk-modal-title">
        <div className="ijk-modal-box">
          <h2 id="ijk-modal-title">Create a Kanji Tile</h2>
          <p className="ijk-modal-hint">Type a romaji reading and we'll find a matching kanji.</p>
          <div className="ijk-modal-input-row">
            <input type="text" id="ijk-create-input" placeholder="e.g. mi, hoshi, michi" autoComplete="off" spellCheck={false} />
            <span id="ijk-create-kana-preview" className="ijk-kana-preview" aria-live="polite"></span>
          </div>
          <div id="ijk-create-error" className="ijk-modal-error hidden"></div>
          <div className="ijk-modal-buttons">
            <button id="ijk-create-cancel" type="button">Cancel</button>
            <button id="ijk-create-confirm" type="button" className="ijk-btn-primary">Create</button>
          </div>
        </div>
      </div>

      <main id="ijk-main">
        <div id="ijk-canvas" ref={canvasRef}></div>
        <aside id="ijk-sidebar">
          <div className="ijk-sidebar-header">
            <span className="ijk-label">Discovered Words</span>
            <input type="text" id="ijk-search-input" placeholder="Search kanji, reading, meaning…" />
          </div>
          <div id="ijk-sidebar-tiles" ref={sidebarRef}></div>
        </aside>
      </main>

      <footer id="ijk-status-bar">
        <span id="ijk-status-message">Drag two tiles together to combine their readings!</span>
      </footer>
    </div>
  );
}
