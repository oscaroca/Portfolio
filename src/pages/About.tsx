import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import myImg from '../assets/avatar.webp';
import aboutBg from '../assets/about_bg.webp';
import bookBg from '../assets/book_bg.webp';
import Tilt from 'react-parallax-tilt';
import '../styles/About.css';
import skillCategories from '../data/skills';

// ─── Diary Data ───────────────────────────────────────────────────────────────

interface DiarySpread {
  left: { heading: string; date: string; text: string };
  right: { heading: string; date: string; text: string };
}

const SPREADS: DiarySpread[] = [
  {
    left: {
      heading: '✦ The Beginning',
      date: '— Page I —',
      text: 'I started my journey in software as a teenager, fascinated by how a few lines of text could make a computer do something remarkable. That curiosity never left me.\n\nI studied computer science and fell in love with the craft — not just solving problems, but designing solutions that feel elegant and simple.',
    },
    right: {
      heading: '✦ What I Build',
      date: '— Page II —',
      text: 'My work spans production systems, LLM integrations, and full-stack features — problems where engineering decisions have real operational impact.\n\nOutside of work I build open-source tools: an AI companion with persistent memory and multiple LLM backends, a headless CMS, and a few language learning apps.',
    },
  },
  {
    left: {
      heading: '✦ Beyond the Code',
      date: '— Page III —',
      text: 'When I am not at the keyboard, I am tinkering with hardware — custom keyboards, electronics, anything with a soldering iron and a problem to solve.\n\nI am also a 3D artist, exploring procedural generation and digital sculpture as a creative outlet.',
    },
    right: {
      heading: '✦ What Drives Me',
      date: '— Page IV —',
      text: "I want to work on teams that ship things people actually use — where engineering quality and real-world impact aren't in tension.\n\nI'm most excited about AI and full-stack products where the gap between a good idea and something live in people's hands is as small as possible.",
    },
  },
];

// ─── Experience Data ──────────────────────────────────────────────────────────

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

// Update company/institution names and dates to match your actual CV
const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Routal',
    role: 'Software Engineer',
    period: '2022 – Present',
    bullets: [
      'Integrated LLM models into a production route-planning platform used daily by logistics teams',
      'Built full-stack features across Python backend, TypeScript/React frontend, and data pipelines',
      'Designed AI-powered workflows that automate and improve operational tasks at scale',
    ],
  },
  {
    company: 'University Research',
    role: 'ML Researcher',
    period: '2021 – 2022',
    bullets: [
      'Built neural network architectures from scratch — layer definitions, forward/backward passes, optimisers',
      'Reproduced and benchmarked published algorithms in controlled experiments',
    ],
  },
  {
    company: 'University',
    role: 'Teaching Assistant',
    period: '2020 – 2021',
    bullets: [
      'Supported students across programming fundamentals and computer science courses',
    ],
  },
];

// ─── Skill Bar ────────────────────────────────────────────────────────────────

const SEG_COLOR: Record<string, string> = {
  torch: '#9FDC7F',
  parchment: '#CCD3F0',
  sage: '#8DDEFC',
  amber: '#e87820',
};

function SkillBar({
  name,
  level,
  color,
}: {
  name: string;
  level: number;
  color: string;
}) {
  const MAX = 10;
  const fill = SEG_COLOR[color] ?? '#e87820';
  return (
    <div className="rpg-skill-row">
      <span className="rpg-skill-name">{name}</span>
      <div
        className="rpg-skill-bar"
        aria-label={`${name} level ${level} of ${MAX}`}
      >
        {Array.from({ length: MAX }).map((_, i) => (
          <span
            key={i}
            className={`rpg-skill-seg${i < level ? ' rpg-skill-seg--on' : ''}`}
            style={
              i < level
                ? {
                    background: fill,
                    boxShadow: `0 0 4px ${fill}88`,
                    animationDelay: `${i * 55}ms`,
                  }
                : undefined
            }
          />
        ))}
      </div>
      <span className="rpg-skill-level">Lv.{level}</span>
    </div>
  );
}

// ─── Tavern Board wrapper ─────────────────────────────────────────────────────

function TavernBoard({
  title,
  className = '',
  nailsBottom = false,
  children,
}: {
  title: string;
  className?: string;
  nailsBottom?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`tavern-board ${className}`}>
      <span className="tavern-nail tavern-nail--tl" aria-hidden="true" />
      <span className="tavern-nail tavern-nail--tr" aria-hidden="true" />
      {nailsBottom && (
        <>
          <span className="tavern-nail tavern-nail--bl" aria-hidden="true" />
          <span className="tavern-nail tavern-nail--br" aria-hidden="true" />
        </>
      )}
      <h2 className="tavern-sign">{title}</h2>
      {children}
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

export default function About() {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [turning, setTurning] = useState<'next' | 'prev' | null>(null);
  const spread = SPREADS[spreadIdx];

  const turn = (dir: 'next' | 'prev') => {
    const next = dir === 'next' ? spreadIdx + 1 : spreadIdx - 1;
    if (next < 0 || next >= SPREADS.length || turning) return;
    setTurning(dir);
    setTimeout(() => {
      setSpreadIdx(next);
      setTurning(null);
    }, 380);
  };

  return (
    <>
      {/* Page-scoped background — unmounts when leaving About */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${aboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      />
      <section
        className="about-section tavern-section"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Container fluid style={{ paddingBottom: '80px', paddingTop: '30px' }}>
          <Container>
            {/* ── RPG Layout ── */}
            <div className="rpg-layout">
              {/* Stats Board */}
              <TavernBoard
                title="✦ STATS ✦"
                className="rpg-stats-panel"
                nailsBottom
              >
                {skillCategories.map((cat) => (
                  <div key={cat.label} className="rpg-category">
                    <div className={`rpg-category-label rpg-cat--${cat.color}`}>
                      {cat.label}
                    </div>
                    {cat.skills.map((s) => (
                      <SkillBar key={s.name} color={cat.color} {...s} />
                    ))}
                  </div>
                ))}
              </TavernBoard>

              {/* Character Board */}
              <TavernBoard title="✦ CHARACTER ✦" className="rpg-char-panel">
                <div className="tavern-parchment">
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={false}>
                    <div className="rpg-portrait-frame">
                      <img
                        src={myImg}
                        alt="character portrait"
                        className="rpg-portrait-img"
                        draggable={false}
                      />
                    </div>
                  </Tilt>

                  <div className="rpg-char-name">OSCAROCA</div>
                  <div className="rpg-char-divider" />
                  <div className="rpg-char-class">AI Product Engineer</div>

                  <div className="rpg-char-lv-row">
                    <span className="rpg-lv-label">LV</span>
                    <span className="rpg-lv-num">25</span>
                    <span className="rpg-exp">EXP ★★★</span>
                  </div>

                  <div className="rpg-bar-row">
                    <span className="rpg-bar-label">HP</span>
                    <div className="rpg-bar-track">
                      <div className="rpg-bar-fill rpg-bar-fill--hp" />
                    </div>
                    <span className="rpg-bar-val">999</span>
                  </div>

                  <div className="rpg-bar-row">
                    <span className="rpg-bar-label">MP</span>
                    <div className="rpg-bar-track">
                      <div
                        className="rpg-bar-fill rpg-bar-fill--mp"
                        style={{ width: '80%' }}
                      />
                    </div>
                    <span className="rpg-bar-val">800</span>
                  </div>
                </div>
              </TavernBoard>
            </div>

            {/* ── Scroll / Diary ── */}
            <div
              className="tavern-scroll-wrap"
              style={{ backgroundImage: `url(${bookBg})` }}
            >
              {/* Left nav button */}
              <button
                className="diary-btn diary-btn--side diary-btn--prev"
                onClick={() => turn('prev')}
                disabled={spreadIdx === 0 || !!turning}
                aria-label="Previous page"
              >
                ◄
              </button>

              {/* Right nav button */}
              <button
                className="diary-btn diary-btn--side diary-btn--next"
                onClick={() => turn('next')}
                disabled={spreadIdx === SPREADS.length - 1 || !!turning}
                aria-label="Next page"
              >
                ►
              </button>

              <div
                className={`tavern-scroll-body${turning ? ` tavern-scroll--${turning}` : ''}`}
              >
                {/* Left page */}
                <div className="diary-page diary-page--left">
                  <div className="diary-spread-num" aria-live="polite">
                    {spreadIdx * 2 + 1}
                  </div>
                  <div className="diary-heading">{spread.left.heading}</div>
                  <div className="diary-date">{spread.left.date}</div>
                  <div className="diary-text">
                    {spread.left.text.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Spine */}
                <div className="diary-spine" />

                {/* Right page */}
                <div className="diary-page diary-page--right">
                  <div className="diary-spread-num" aria-live="polite">
                    {spreadIdx * 2 + 2}
                  </div>
                  <div className="diary-heading">{spread.right.heading}</div>
                  <div className="diary-date">{spread.right.date}</div>
                  <div className="diary-text">
                    {spread.right.text.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Experience ── */}
            <TavernBoard title="✦ EXPERIENCE ✦" className="experience-panel" nailsBottom>
              <div className="quest-log">
                {EXPERIENCE.map((entry, i) => (
                  <div key={i} className="quest-entry">
                    <div className="quest-entry-header">
                      <div>
                        <span className="quest-company">{entry.company}</span>
                        <span className="quest-role"> · {entry.role}</span>
                      </div>
                      <span className="quest-period">{entry.period}</span>
                    </div>
                    <ul className="quest-bullets">
                      {entry.bullets.map((b, j) => (
                        <li key={j} className="quest-bullet">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TavernBoard>

          </Container>
        </Container>
      </section>
    </>
  );
}
