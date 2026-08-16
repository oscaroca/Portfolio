import React from 'react';
import waterfallGif from '../assets/waterfall_bg.webp';

export default function PixelBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(${waterfallGif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        imageRendering: 'pixelated',
        opacity: 0.16,
        pointerEvents: 'none',
      }}
    />
  );
}
