import React from 'react';
import './LofiBokeh.css';

const ORBS = [
  { size: 320, x: 8,  y: 12, color: 'rgba(245,200,66,0.07)',  dur: 22, delay: 0 },
  { size: 200, x: 75, y: 5,  color: 'rgba(232,165,152,0.06)', dur: 28, delay: -6 },
  { size: 260, x: 55, y: 70, color: 'rgba(126,200,160,0.05)', dur: 35, delay: -12 },
  { size: 180, x: 20, y: 80, color: 'rgba(245,200,66,0.06)',  dur: 20, delay: -4 },
  { size: 140, x: 88, y: 55, color: 'rgba(232,165,152,0.07)', dur: 26, delay: -9 },
  { size: 100, x: 42, y: 30, color: 'rgba(245,200,66,0.05)',  dur: 32, delay: -15 },
  { size: 80,  x: 65, y: 88, color: 'rgba(126,200,160,0.06)', dur: 18, delay: -2 },
];

const FIREFLIES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  dur: 4 + (i % 7),
  delay: -(i * 1.3),
  size: i % 3 === 0 ? 3 : 2,
}));

export default function LofiBokeh() {
  return (
    <div className="lofi-bokeh" aria-hidden="true">
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="lofi-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animationDuration: `${orb.dur}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
      {FIREFLIES.map((f) => (
        <div
          key={f.id}
          className="lofi-firefly"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
