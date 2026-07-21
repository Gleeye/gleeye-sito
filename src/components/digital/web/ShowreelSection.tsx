'use client';

import SharedShowreel from '@/components/subpage/ShowreelSection';

export default function WebShowreelSection() {
  return (
    <SharedShowreel
      data={{
        videoSrc: '/upload/web-showreel-edilporta.mp4',
        poster: '/upload/web-showreel-edilporta-poster.jpg',
      }}
    />
  );
}
