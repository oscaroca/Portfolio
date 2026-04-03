import React, { useState, useEffect, useRef, useCallback } from 'react';
import './JPNLearning.css';
import { allCharacters, charactersByGroup, groupLabels, groupPreviews, CharGroup } from './data/characters';
import { KanaChar } from './data/characters';
import {
  useStudyState,
  getDueCharacters,
  getNewCharacters,
  getSRSLabel,
  getSRSColor,
  SRSLevel,
  StudySelection,
} from './hooks/useStudyState';

// ─── Types ───────────────────────────────────────────────────────────────────

type View = 'dashboard' | 'selector' | 'lesson' | 'review' | 'results';

type LessonPhase = 'display' | 'quiz';

interface ReviewResult {
  char: KanaChar;
  correct: boolean;
  newSrsLevel: SRSLevel;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function srsLabelClass(level: SRSLevel): string {
  const label = getSRSLabel(level).toLowerCase();
  return `srs-badge-${label}`;
}

const LESSON_BATCH = 5;
const QUIZ_EVERY   = 3; // show quiz after every N displays

// ─── Sub-components ──────────────────────────────────────────────────────────

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}
function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="jpn-progress-wrap">
      <div className="jpn-progress-label">
        <span>{label ?? `${current} / ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div className="jpn-progress-track">
        <div className="jpn-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

interface SRSBadgeProps { level: SRSLevel; }
function SRSBadge({ level }: SRSBadgeProps) {
  return (
    <span
      className={`jpn-badge ${srsLabelClass(level)}`}
      style={{ color: getSRSColor(level) }}
    >
      {getSRSLabel(level)}
    </span>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  id: string;
}
function Toggle({ checked, onChange, id }: ToggleProps) {
  return (
    <label className="jpn-toggle" htmlFor={id} onClick={(e) => e.stopPropagation()}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="jpn-toggle-slider" />
    </label>
  );
}

// ─── Dashboard View ───────────────────────────────────────────────────────────

interface DashboardProps {
  dueCount:     number;
  newCount:     number;
  progress:     ReturnType<typeof useStudyState>['progress'];
  selection:    StudySelection;
  streak:       number;
  onStartLesson:  () => void;
  onStartReview:  () => void;
  onOpenSelector: () => void;
  onToggleGroup:  (g: CharGroup) => void;
  onReset:        () => void;
}

function DashboardView({
  dueCount, newCount, progress, selection, streak,
  onStartLesson, onStartReview, onOpenSelector, onToggleGroup, onReset,
}: DashboardProps) {
  // Compute stats
  const allProgress = Object.values(progress);
  const learned = allProgress.filter((p) => p.srsLevel > 0).length;

  const totalAnswers = allProgress.reduce(
    (acc, p) => acc + p.correctCount + p.incorrectCount, 0,
  );
  const totalCorrect = allProgress.reduce((acc, p) => acc + p.correctCount, 0);
  const accuracy = totalAnswers === 0 ? 0 : Math.round((totalCorrect / totalAnswers) * 100);

  // SRS breakdown
  type SRSGroup = { label: string; count: number; color: string; level: SRSLevel };
  const srsGroups: SRSGroup[] = [
    { label: 'New',         level: 0, count: 0, color: getSRSColor(0) },
    { label: 'Apprentice',  level: 1, count: 0, color: getSRSColor(1) },
    { label: 'Guru',        level: 5, count: 0, color: getSRSColor(5) },
    { label: 'Master',      level: 7, count: 0, color: getSRSColor(7) },
    { label: 'Enlightened', level: 8, count: 0, color: getSRSColor(8) },
    { label: 'Burned',      level: 9, count: 0, color: getSRSColor(9) },
  ];

  allProgress.forEach((p) => {
    const lvl = p.srsLevel;
    if (lvl === 0)         srsGroups[0].count++;
    else if (lvl <= 4)     srsGroups[1].count++;
    else if (lvl <= 6)     srsGroups[2].count++;
    else if (lvl === 7)    srsGroups[3].count++;
    else if (lvl === 8)    srsGroups[4].count++;
    else                   srsGroups[5].count++;
  });

  const groups = Object.keys(selection) as CharGroup[];

  return (
    <>
      {/* Hero */}
      <div className="jpn-hero">
        <span className="jpn-hero-kanji">日本語</span>
        <h1 className="jpn-hero-title">JPNLearn</h1>
        <p className="jpn-hero-subtitle">Master Hiragana &amp; Katakana</p>
      </div>

      <div className="jpn-container">
        {/* Stats bar */}
        <div className="jpn-stats-bar">
          <div className="jpn-stat-card">
            <span className="jpn-stat-value">{learned}</span>
            <div className="jpn-stat-label">Total Learned</div>
          </div>
          <div className="jpn-stat-card">
            <span className="jpn-stat-value">{dueCount}</span>
            <div className="jpn-stat-label">Due for Review</div>
          </div>
          <div className="jpn-stat-card">
            <span className="jpn-stat-value">{accuracy}%</span>
            <div className="jpn-stat-label">Accuracy</div>
          </div>
          <div className="jpn-stat-card">
            <span className="jpn-stat-value">{streak}</span>
            <div className="jpn-stat-label">Streak</div>
          </div>
        </div>

        {/* SRS breakdown */}
        <div className="jpn-srs-breakdown">
          <h3>SRS Breakdown</h3>
          <div className="jpn-srs-bars">
            {srsGroups.map((g) => (
              <div className="jpn-srs-bar-item" key={g.label}>
                <div
                  className="jpn-srs-bar-fill"
                  style={{ background: g.color, opacity: 0.8 }}
                />
                <span className="jpn-srs-bar-count" style={{ color: g.color }}>
                  {g.count}
                </span>
                <span className="jpn-srs-bar-name">{g.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="jpn-actions">
          <button
            className="jpn-btn jpn-btn-primary"
            onClick={onStartLesson}
            disabled={newCount === 0}
          >
            Start Lessons
            <span className="jpn-badge srs-badge-new" style={{ marginLeft: '0.25rem' }}>
              {newCount}
            </span>
          </button>
          <button
            className="jpn-btn jpn-btn-secondary"
            onClick={onStartReview}
            disabled={dueCount === 0}
          >
            Start Review
            <span
              className="jpn-badge srs-badge-apprentice"
              style={{ marginLeft: '0.25rem', color: getSRSColor(1) }}
            >
              {dueCount}
            </span>
          </button>
        </div>

        <div className="jpn-divider" />

        {/* Quick selector */}
        <div className="jpn-quick-selector">
          <h3>Study Groups</h3>
          <div className="jpn-quick-chips">
            {groups.map((g) => (
              <button
                key={g}
                className={`jpn-chip${selection[g] ? ' active' : ''}`}
                onClick={() => onToggleGroup(g)}
              >
                {groupLabels[g]}
                <span style={{ opacity: 0.6 }}>
                  ({charactersByGroup[g].length})
                </span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <button className="jpn-configure-link" onClick={onOpenSelector}>
              Configure groups &rarr;
            </button>
          </div>
        </div>

        {/* Reset */}
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <button className="jpn-btn jpn-btn-danger jpn-btn-sm" onClick={onReset}>
            Reset Progress
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Selector View ────────────────────────────────────────────────────────────

interface SelectorProps {
  selection:      StudySelection;
  onToggleGroup:  (g: CharGroup) => void;
  onBack:         () => void;
  onStartLesson:  () => void;
  onStartReview:  () => void;
  dueCount:       number;
  newCount:       number;
}

function SelectorView({
  selection, onToggleGroup, onBack, onStartLesson, onStartReview, dueCount, newCount,
}: SelectorProps) {
  const groups = Object.keys(selection) as CharGroup[];

  return (
    <div className="jpn-container">
      <div className="jpn-selector-header">
        <button className="jpn-back-btn" onClick={onBack}>&#8592; Dashboard</button>
        <h2>Study Groups</h2>
        <p>Toggle the groups you want to study. All enabled characters appear in lessons and reviews.</p>
      </div>

      <div className="jpn-selector-grid">
        {groups.map((g) => (
          <div
            key={g}
            className={`jpn-selector-card${selection[g] ? ' active' : ''}`}
            onClick={() => onToggleGroup(g)}
          >
            <div className="jpn-selector-card-top">
              <div>
                <div className="jpn-selector-card-title">{groupLabels[g]}</div>
                <div className="jpn-selector-card-count">
                  {charactersByGroup[g].length} characters
                </div>
              </div>
              <Toggle
                id={`toggle-${g}`}
                checked={selection[g]}
                onChange={() => onToggleGroup(g)}
              />
            </div>
            <div className="jpn-selector-previews">
              {groupPreviews[g].map((ch) => (
                <span key={ch} className="jpn-preview-char">{ch}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="jpn-selector-actions">
        <button
          className="jpn-btn jpn-btn-primary"
          onClick={onStartLesson}
          disabled={newCount === 0}
        >
          Start Lessons ({newCount})
        </button>
        <button
          className="jpn-btn jpn-btn-secondary"
          onClick={onStartReview}
          disabled={dueCount === 0}
        >
          Start Review ({dueCount})
        </button>
      </div>
    </div>
  );
}

// ─── Lesson View ──────────────────────────────────────────────────────────────

interface LessonProps {
  chars:          KanaChar[];
  onComplete:     (reviewed: ReviewResult[]) => void;
  onBack:         () => void;
  updateProgress: (id: string, correct: boolean) => SRSLevel;
}

function LessonView({ chars, onComplete, onBack, updateProgress }: LessonProps) {
  const batch = chars.slice(0, LESSON_BATCH);

  // displayIdx: index of the character currently shown in display phase
  const [displayIdx,     setDisplayIdx]     = useState(0);
  // quizBatchStart: first index of chars included in the current quiz session
  const [quizBatchStart, setQuizBatchStart] = useState(0);
  // quizChars: shuffled subset shown in the current quiz session
  const [quizChars,      setQuizChars]      = useState<KanaChar[]>([]);
  const [phase,          setPhase]          = useState<LessonPhase>('display');
  const [quizIndex,      setQuizIndex]      = useState(0);
  const [input,          setInput]          = useState('');
  const [answered,       setAnswered]       = useState(false);
  const [isCorrect,      setIsCorrect]      = useState(false);
  const [results,        setResults]        = useState<ReviewResult[]>([]);
  const [feedback,       setFeedback]       = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDisplay = batch[displayIdx];
  const quizChar       = quizChars[quizIndex];

  const startQuiz = (nextDisplayIdx: number, batchStart: number) => {
    const toQuiz = shuffle(batch.slice(batchStart, nextDisplayIdx));
    setQuizChars(toQuiz);
    setQuizBatchStart(nextDisplayIdx); // next quiz starts from here
    setQuizIndex(0);
    setInput('');
    setAnswered(false);
    setFeedback('');
    setPhase('quiz');
  };

  const handleGotIt = () => {
    const nextIdx = displayIdx + 1;
    const isLast  = nextIdx >= batch.length;
    const hitQuizThreshold = nextIdx % QUIZ_EVERY === 0;

    if (isLast || hitQuizThreshold) {
      // Advance displayIdx first so after quiz we show the right next char
      setDisplayIdx(nextIdx);
      startQuiz(nextIdx, quizBatchStart);
    } else {
      setDisplayIdx(nextIdx);
    }
  };

  useEffect(() => {
    if (phase === 'quiz' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, quizIndex]);

  // Enter key: Got It in display phase, advance after answering in quiz phase
  useEffect(() => {
    if (phase === 'display') {
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') handleGotIt(); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    if (phase === 'quiz' && answered) {
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') handleQuizNext(); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [phase, answered, displayIdx, quizIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQuizSubmit = useCallback(() => {
    if (!quizChar || answered) return;
    const trimmed  = input.trim().toLowerCase();
    const correct  = trimmed === quizChar.romaji.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    setFeedback(correct ? 'Correct!' : `Incorrect — ${quizChar.romaji}`);
    const newLevel = updateProgress(quizChar.id, correct);
    setResults((prev) => [...prev, { char: quizChar, correct, newSrsLevel: newLevel }]);
  }, [quizChar, answered, input, updateProgress]);

  const handleQuizNext = () => {
    if (quizIndex < quizChars.length - 1) {
      setQuizIndex((i) => i + 1);
      setInput('');
      setAnswered(false);
      setFeedback('');
    } else {
      // Quiz session done
      if (displayIdx < batch.length) {
        // More characters left to display — go back to display phase
        setPhase('display');
        setInput('');
        setAnswered(false);
        setFeedback('');
      } else {
        onComplete(results);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!answered) handleQuizSubmit();
      else handleQuizNext();
    }
  };

  const dotCount = batch.length;

  return (
    <div className="jpn-container">
      <div className="jpn-lesson-header">
        <button className="jpn-back-btn" onClick={onBack}>&#8592; Back</button>
        <div className="jpn-lesson-phase">
          {phase === 'display' ? 'Learn' : 'Practice Quiz'}
        </div>
        <ProgressBar
          current={Math.min(displayIdx, batch.length)}
          total={batch.length}
          label={`${Math.min(displayIdx + 1, batch.length)} / ${batch.length} characters`}
        />
      </div>

      {/* Dot indicators */}
      <div className="jpn-lesson-dots">
        {Array.from({ length: dotCount }).map((_, i) => {
          const cls =
            i < displayIdx    ? 'seen'
            : i === displayIdx ? 'current'
            : '';
          return <div key={i} className={`jpn-lesson-dot ${cls}`} />;
        })}
      </div>

      {phase === 'display' && currentDisplay && (
        <div className="jpn-lesson-card">
          <span className="jpn-kana-display">{currentDisplay.kana}</span>
          <div className="jpn-romaji-display">{currentDisplay.romaji}</div>
          <span
            className={`jpn-type-badge ${
              currentDisplay.type === 'hiragana' ? 'jpn-type-hiragana' : 'jpn-type-katakana'
            }`}
          >
            {currentDisplay.type} &middot; {currentDisplay.category}
          </span>
          <div className="jpn-lesson-nav">
            <button className="jpn-btn jpn-btn-primary" onClick={handleGotIt}>
              Got It &#8594;
            </button>
          </div>
        </div>
      )}

      {phase === 'quiz' && quizChar && (
        <div className="jpn-quiz-card">
          <div className="jpn-quiz-prompt">What is the romaji for this character?</div>
          <span className="jpn-kana-display jpn-kana-display-sm">{quizChar.kana}</span>
          <span
            className={`jpn-type-badge ${
              quizChar.type === 'hiragana' ? 'jpn-type-hiragana' : 'jpn-type-katakana'
            }`}
            style={{ marginBottom: '1.25rem' }}
          >
            {quizChar.type}
          </span>

          {!answered ? (
            <div className="jpn-input-wrap" style={{ justifyContent: 'center' }}>
              <input
                ref={inputRef}
                className="jpn-input"
                style={{ maxWidth: 260 }}
                placeholder="Type romaji..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              <button
                className="jpn-btn jpn-btn-primary"
                onClick={handleQuizSubmit}
                disabled={input.trim() === ''}
              >
                Check
              </button>
            </div>
          ) : (
            <>
              <div className={`jpn-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {feedback}
              </div>
              <button className="jpn-btn jpn-btn-outline" onClick={handleQuizNext}>
                {quizIndex < quizChars.length - 1
                  ? 'Next Character'
                  : displayIdx < batch.length
                    ? 'Continue Learning'
                    : 'Finish Lesson'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Review View ──────────────────────────────────────────────────────────────

interface ReviewProps {
  chars:          KanaChar[];
  progress:       ReturnType<typeof useStudyState>['progress'];
  streak:         number;
  onComplete:     (results: ReviewResult[]) => void;
  onBack:         () => void;
  updateProgress: (id: string, correct: boolean) => SRSLevel;
  incrementStreak: () => void;
  resetStreak:    () => void;
}

function ReviewView({
  chars, progress, streak, onComplete, onBack,
  updateProgress, incrementStreak, resetStreak,
}: ReviewProps) {
  const [queue]    = useState<KanaChar[]>(() => shuffle(chars));
  const [index,    setIndex]    = useState(0);
  const [input,    setInput]    = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results,  setResults]  = useState<ReviewResult[]>([]);
  const [feedback, setFeedback] = useState('');
  const [cardAnim, setCardAnim] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const current = queue[index];
  const currentProgress = current ? progress[current.id] : undefined;
  const currentLevel    = (currentProgress?.srsLevel ?? 0) as SRSLevel;

  useEffect(() => {
    if (!answered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [index, answered]);

  // Allow Enter to advance to next character after answering
  useEffect(() => {
    if (!answered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [answered, index]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(() => {
    if (!current || answered) return;
    const trimmed = input.trim().toLowerCase();
    const correct = trimmed === current.romaji.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      incrementStreak();
      setFeedback('Correct!');
      setCardAnim('feedback-correct');
    } else {
      resetStreak();
      setFeedback(`Incorrect — correct answer: ${current.romaji}`);
      setCardAnim('feedback-incorrect');
    }

    const newLevel = updateProgress(current.id, correct);
    setResults((prev) => [...prev, { char: current, correct, newSrsLevel: newLevel }]);

    setTimeout(() => setCardAnim(''), 600);
  }, [current, answered, input, updateProgress, incrementStreak, resetStreak]);

  const handleNext = () => {
    if (index >= queue.length - 1) {
      onComplete(results);
      return;
    }
    setIndex((i) => i + 1);
    setInput('');
    setAnswered(false);
    setFeedback('');
    setIsCorrect(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!answered) handleSubmit();
      else handleNext();
    }
  };

  if (!current) {
    return (
      <div className="jpn-container">
        <div className="jpn-empty-state">
          <p>No more characters to review.</p>
          <button className="jpn-btn jpn-btn-primary" onClick={() => onComplete(results)}>
            See Results
          </button>
        </div>
      </div>
    );
  }

  const srsColor   = getSRSColor(currentLevel);
  const cardBg     = `rgba(${hexToRgb(srsColor)}, 0.08)`;
  const cardBorder = `rgba(${hexToRgb(srsColor)}, 0.25)`;

  return (
    <div className="jpn-container">
      <div className="jpn-review-header">
        <button className="jpn-back-btn" onClick={onBack}>&#8592; Back</button>
        <div className="jpn-review-meta">
          <ProgressBar
            current={index}
            total={queue.length}
            label={`${index} / ${queue.length} reviewed`}
          />
          <div className="jpn-streak">
            &#9889; {streak} streak
          </div>
        </div>
      </div>

      {/* Review card */}
      <div
        className={`jpn-review-card ${cardAnim}`}
        style={{ background: cardBg, borderColor: cardBorder }}
      >
        <SRSBadge level={currentLevel} />
        <span className="jpn-kana-display">{current.kana}</span>
        <span
          className={`jpn-type-badge ${
            current.type === 'hiragana' ? 'jpn-type-hiragana' : 'jpn-type-katakana'
          }`}
        >
          {current.type}
        </span>
      </div>

      {/* Input */}
      {!answered ? (
        <div className="jpn-input-wrap">
          <input
            ref={inputRef}
            className="jpn-input"
            placeholder="Type romaji and press Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="none"
          />
          <button
            className="jpn-btn jpn-btn-primary"
            onClick={handleSubmit}
            disabled={input.trim() === ''}
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <div className={`jpn-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                Correct! <SRSBadge level={results[results.length - 1]?.newSrsLevel ?? currentLevel} />
              </>
            ) : (
              <>
                Incorrect
                <span className="jpn-feedback-answer">— {current.romaji}</span>
                <div className="jpn-level-change">
                  SRS level adjusted to{' '}
                  <SRSBadge level={results[results.length - 1]?.newSrsLevel ?? currentLevel} />
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="jpn-btn jpn-btn-primary" onClick={handleNext}>
              {index >= queue.length - 1 ? 'See Results' : 'Next '}
              {index < queue.length - 1 && <>&#8594;</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Results View ─────────────────────────────────────────────────────────────

interface ResultsProps {
  results:       ReviewResult[];
  onDashboard:   () => void;
  onReviewAgain: () => void;
  mode:          'lesson' | 'review';
}

function ResultsView({ results, onDashboard, onReviewAgain, mode }: ResultsProps) {
  const correct   = results.filter((r) => r.correct).length;
  const incorrect = results.length - correct;
  const accuracy  = results.length === 0 ? 0 : Math.round((correct / results.length) * 100);

  return (
    <div className="jpn-container">
      <div className="jpn-results-header">
        <h2>{mode === 'lesson' ? 'Lesson Complete' : 'Review Complete'}</h2>
        <span className="jpn-results-accuracy">{accuracy}%</span>
        <p className="jpn-results-sub">Accuracy across {results.length} character{results.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="jpn-results-summary">
        <div className="jpn-result-stat">
          <span className="jpn-result-stat-value" style={{ color: '#9FDC7F' }}>
            {correct}
          </span>
          <span className="jpn-result-stat-label">Correct</span>
        </div>
        <div className="jpn-result-stat">
          <span className="jpn-result-stat-value" style={{ color: '#f88' }}>
            {incorrect}
          </span>
          <span className="jpn-result-stat-label">Incorrect</span>
        </div>
      </div>

      {results.length > 0 && (
        <div className="jpn-results-list">
          <div className="jpn-results-list-header">Characters Reviewed</div>
          {results.map((r, i) => (
            <div className="jpn-result-item" key={`${r.char.id}-${i}`}>
              <span className="jpn-result-kana">{r.char.kana}</span>
              <div className="jpn-result-romaji">
                <div>{r.char.romaji}</div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.1rem' }}>
                  <SRSBadge level={r.newSrsLevel} />
                </div>
              </div>
              <span className={`jpn-result-status ${r.correct ? 'correct' : 'incorrect'}`}>
                {r.correct ? 'Correct' : 'Wrong'}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="jpn-results-actions">
        <button className="jpn-btn jpn-btn-primary" onClick={onDashboard}>
          Return to Dashboard
        </button>
        {incorrect > 0 && (
          <button className="jpn-btn jpn-btn-outline" onClick={onReviewAgain}>
            Review Missed
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >>  8) & 255;
  const b =  n        & 255;
  return `${r}, ${g}, ${b}`;
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function JPNLearning() {
  const {
    progress,
    selection,
    streak,
    updateProgress,
    resetProgress,
    toggleGroup,
    incrementStreak,
    resetStreak,
  } = useStudyState();

  const [view,          setView]          = useState<View>('dashboard');
  const [lessonChars,   setLessonChars]   = useState<KanaChar[]>([]);
  const [reviewChars,   setReviewChars]   = useState<KanaChar[]>([]);
  const [results,       setResults]       = useState<ReviewResult[]>([]);
  const [resultMode,    setResultMode]    = useState<'lesson' | 'review'>('review');
  const [missedChars,   setMissedChars]   = useState<KanaChar[]>([]);

  const dueChars = getDueCharacters(allCharacters, progress, selection);
  const newChars = getNewCharacters(allCharacters, progress, selection);

  const startLesson = () => {
    const chars = getNewCharacters(allCharacters, progress, selection);
    if (chars.length === 0) return;
    setLessonChars(chars);
    setView('lesson');
  };

  const startReview = () => {
    const chars = getDueCharacters(allCharacters, progress, selection);
    if (chars.length === 0) return;
    setReviewChars(chars);
    setView('review');
  };

  const handleLessonComplete = (res: ReviewResult[]) => {
    setResults(res);
    setResultMode('lesson');
    setMissedChars(res.filter((r) => !r.correct).map((r) => r.char));
    setView('results');
  };

  const handleReviewComplete = (res: ReviewResult[]) => {
    setResults(res);
    setResultMode('review');
    setMissedChars(res.filter((r) => !r.correct).map((r) => r.char));
    setView('results');
  };

  const handleReviewMissed = () => {
    if (missedChars.length === 0) {
      setView('dashboard');
      return;
    }
    setReviewChars(missedChars);
    setView('review');
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      resetProgress();
      setView('dashboard');
    }
  };

  return (
    <div className="jpn-page">
      {view === 'dashboard' && (
        <DashboardView
          dueCount={dueChars.length}
          newCount={newChars.length}
          progress={progress}
          selection={selection}
          streak={streak}
          onStartLesson={startLesson}
          onStartReview={startReview}
          onOpenSelector={() => setView('selector')}
          onToggleGroup={toggleGroup}
          onReset={handleReset}
        />
      )}

      {view === 'selector' && (
        <SelectorView
          selection={selection}
          onToggleGroup={toggleGroup}
          onBack={() => setView('dashboard')}
          onStartLesson={() => { startLesson(); }}
          onStartReview={() => { startReview(); }}
          dueCount={dueChars.length}
          newCount={newChars.length}
        />
      )}

      {view === 'lesson' && (
        <LessonView
          chars={lessonChars}
          onComplete={handleLessonComplete}
          onBack={() => setView('dashboard')}
          updateProgress={updateProgress}
        />
      )}

      {view === 'review' && (
        <ReviewView
          chars={reviewChars}
          progress={progress}
          streak={streak}
          onComplete={handleReviewComplete}
          onBack={() => setView('dashboard')}
          updateProgress={updateProgress}
          incrementStreak={incrementStreak}
          resetStreak={resetStreak}
        />
      )}

      {view === 'results' && (
        <ResultsView
          results={results}
          onDashboard={() => setView('dashboard')}
          onReviewAgain={handleReviewMissed}
          mode={resultMode}
        />
      )}
    </div>
  );
}
