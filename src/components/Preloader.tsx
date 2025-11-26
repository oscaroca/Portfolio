import React from 'react';
export default function Preloader({ loaded }: { loaded: boolean }) {
  return <div id={loaded ? 'preloader' : 'preloader-none'} />;
}
