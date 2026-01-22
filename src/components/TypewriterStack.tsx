import React from 'react';
import Typewriter from 'typewriter-effect';

type Props = {
  lines: string[];
  className?: string;
  style?: React.CSSProperties;
  typeSpeed?: number;
  deleteSpeed?: number;
  /** number of pixels to reserve per line (default 28px) */
  reserveLineHeight?: number;
  loop?: boolean;
};

export default function TypewriterStack({
  lines,
  className,
  style,
  typeSpeed = 60,
  deleteSpeed = 25,
  reserveLineHeight = 55,
  loop = true,
}: Props) {
  const combined = lines.join('\n');
  // Reserve vertical space so the page doesn't reflow while typing.
  const wrapperStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    ...(style || {}),
  };
  if (wrapperStyle.minHeight == null) {
    wrapperStyle.minHeight = `${lines.length * reserveLineHeight}px`;
  }

  return (
    <div className={className} style={wrapperStyle}>
      <Typewriter
        options={{
          strings: [combined],
          autoStart: true,
          loop,
          delay: typeSpeed,
          deleteSpeed,
        }}
      />
    </div>
  );
}
