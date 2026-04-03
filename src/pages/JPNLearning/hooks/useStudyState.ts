import { useState, useCallback } from 'react';
import { KanaChar } from '../data/characters';
import { CharGroup } from '../data/characters';

export type SRSLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface CharProgress {
  srsLevel: SRSLevel;
  correctCount: number;
  incorrectCount: number;
  lastReview?: number;
  nextReview?: number;
}

export type ProgressMap = Record<string, CharProgress>;

export type StudySelection = {
  hiragana_basic: boolean;
  hiragana_dakuten: boolean;
  hiragana_combination: boolean;
  katakana_basic: boolean;
  katakana_dakuten: boolean;
  katakana_combination: boolean;
};

// SRS intervals in minutes
const SRS_INTERVALS: Record<number, number> = {
  1: 120,     // 2 hours
  2: 480,     // 8 hours
  3: 1440,    // 24 hours
  4: 2880,    // 48 hours (Guru)
  5: 10080,   // 1 week (Guru 2)
  6: 20160,   // 2 weeks (Master)
  7: 43200,   // 30 days (Enlightened)
  8: 172800,  // ~4 months (Burned)
};

const STORAGE_KEY_PROGRESS  = 'jpnlearn_progress';
const STORAGE_KEY_SELECTION = 'jpnlearn_selection';
const STORAGE_KEY_STREAK    = 'jpnlearn_streak';

const DEFAULT_SELECTION: StudySelection = {
  hiragana_basic:       true,
  hiragana_dakuten:     false,
  hiragana_combination: false,
  katakana_basic:       false,
  katakana_dakuten:     false,
  katakana_combination: false,
};

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function loadSelection(): StudySelection {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTION);
    return raw ? (JSON.parse(raw) as StudySelection) : DEFAULT_SELECTION;
  } catch {
    return DEFAULT_SELECTION;
  }
}

function loadStreak(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STREAK);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function saveProgress(progress: ProgressMap): void {
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
}

function saveSelection(selection: StudySelection): void {
  localStorage.setItem(STORAGE_KEY_SELECTION, JSON.stringify(selection));
}

function saveStreak(streak: number): void {
  localStorage.setItem(STORAGE_KEY_STREAK, String(streak));
}

export function getSRSLabel(level: SRSLevel): string {
  if (level === 0) return 'New';
  if (level <= 4)  return 'Apprentice';
  if (level <= 6)  return 'Guru';
  if (level === 7) return 'Master';
  if (level === 8) return 'Enlightened';
  return 'Burned';
}

export function getSRSColor(level: SRSLevel): string {
  if (level === 0) return '#555555';
  if (level <= 4)  return '#9FDC7F';
  if (level <= 6)  return '#8DDEFC';
  if (level === 7) return '#CCD3F0';
  if (level === 8) return '#4C9057';
  return '#8D7E61';
}

export function getNextSRSLevel(current: SRSLevel, correct: boolean): SRSLevel {
  if (correct) {
    return Math.min(9, current + 1) as SRSLevel;
  } else {
    // Incorrect: drop by 2 levels but keep minimum at 1 if already started
    if (current === 0) return 0;
    return Math.max(1, current - 2) as SRSLevel;
  }
}

export function getNextReviewTime(level: SRSLevel): number {
  const intervalMinutes = SRS_INTERVALS[level] ?? 0;
  return Date.now() + intervalMinutes * 60 * 1000;
}

function getActiveChars(chars: KanaChar[], selection: StudySelection): KanaChar[] {
  return chars.filter((c) => {
    const key = `${c.type}_${c.category}` as CharGroup;
    return selection[key] === true;
  });
}

export function getDueCharacters(
  chars: KanaChar[],
  progress: ProgressMap,
  selection: StudySelection,
): KanaChar[] {
  const active = getActiveChars(chars, selection);
  const now = Date.now();
  return active.filter((c) => {
    const p = progress[c.id];
    if (!p || p.srsLevel === 0) return false;
    if (p.srsLevel === 9) return false; // Burned — never review again
    if (p.nextReview === undefined) return false;
    return p.nextReview <= now;
  });
}

export function getNewCharacters(
  chars: KanaChar[],
  progress: ProgressMap,
  selection: StudySelection,
): KanaChar[] {
  const active = getActiveChars(chars, selection);
  return active.filter((c) => {
    const p = progress[c.id];
    return !p || p.srsLevel === 0;
  });
}

export interface StudyStateReturn {
  progress: ProgressMap;
  selection: StudySelection;
  streak: number;
  updateProgress: (charId: string, correct: boolean) => SRSLevel;
  resetProgress: () => void;
  setSelection: (sel: StudySelection) => void;
  toggleGroup: (group: CharGroup) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export function useStudyState(): StudyStateReturn {
  const [progress,  setProgressState]  = useState<ProgressMap>(loadProgress);
  const [selection, setSelectionState] = useState<StudySelection>(loadSelection);
  const [streak,    setStreakState]     = useState<number>(loadStreak);

  const updateProgress = useCallback(
    (charId: string, correct: boolean): SRSLevel => {
      setProgressState((prev) => {
        const existing = prev[charId] ?? {
          srsLevel:      0 as SRSLevel,
          correctCount:  0,
          incorrectCount: 0,
        };
        const newLevel = getNextSRSLevel(existing.srsLevel, correct);
        const updated: CharProgress = {
          srsLevel:      newLevel,
          correctCount:  existing.correctCount  + (correct ? 1 : 0),
          incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
          lastReview:    Date.now(),
          nextReview:    newLevel === 9 ? undefined : getNextReviewTime(newLevel),
        };
        const next = { ...prev, [charId]: updated };
        saveProgress(next);
        return next;
      });

      // Return the new SRS level synchronously (computed from current state snapshot)
      const existing = progress[charId] ?? { srsLevel: 0 as SRSLevel, correctCount: 0, incorrectCount: 0 };
      return getNextSRSLevel(existing.srsLevel, correct);
    },
    [progress],
  );

  const resetProgress = useCallback(() => {
    setProgressState({});
    saveProgress({});
    setStreakState(0);
    saveStreak(0);
  }, []);

  const setSelection = useCallback((sel: StudySelection) => {
    setSelectionState(sel);
    saveSelection(sel);
  }, []);

  const toggleGroup = useCallback((group: CharGroup) => {
    setSelectionState((prev) => {
      const next = { ...prev, [group]: !prev[group] };
      saveSelection(next);
      return next;
    });
  }, []);

  const incrementStreak = useCallback(() => {
    setStreakState((prev) => {
      const next = prev + 1;
      saveStreak(next);
      return next;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setStreakState(0);
    saveStreak(0);
  }, []);

  return {
    progress,
    selection,
    streak,
    updateProgress,
    resetProgress,
    setSelection,
    toggleGroup,
    incrementStreak,
    resetStreak,
  };
}
