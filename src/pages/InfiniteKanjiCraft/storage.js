const KEY = 'infiniteJapanese_v1';

export const storage = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== 1) return null;
      return data;
    } catch {
      return null;
    }
  },
  save(discoveredWords, canvasInstances) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: 1, discoveredWords, canvasInstances }));
    } catch (e) {
      console.warn('Save failed:', e);
    }
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};
