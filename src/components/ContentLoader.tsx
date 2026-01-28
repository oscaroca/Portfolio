import React from 'react';

export default function ContentLoader({ isLoading }: { isLoading: boolean }) {
  return <div id={isLoading ? 'content-loader' : 'content-loader-none'} />;
}
