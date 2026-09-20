import React, { useEffect, useState, useMemo } from 'react';

interface Star {
  id: number;
  top: number; // percentage
  left: number; // percentage
  size: number; // in pixels
  opacity: number;
  minOpacity: number;
  maxOpacity: number;
  duration: number; // in seconds
  delay: number; // in seconds
  isHeroStar?: boolean;
}

export const StarField: React.FC = () => {
  const [starCount, setStarCount] = useState<number>(120);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setStarCount(60); // Mobile: ~60 stars
      } else if (window.innerWidth < 1024) {
        setStarCount(95); // Tablet: ~95 stars
      } else {
        setStarCount(140); // Desktop: 140 stars (within 100-150 spec)
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Generate deterministic-feeling randomized stars once per count
  const stars: Star[] = useMemo(() => {
    const list: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      // Deterministic pseudorandom seed pattern based on index
      const rand1 = ((i * 9301 + 49297) % 233280) / 233280;
      const rand2 = ((i * 12345 + 1103515245) % 233280) / 233280;
      const rand3 = ((i * 7919 + 65537) % 233280) / 233280;
      const rand4 = ((i * 3571 + 179424673) % 233280) / 233280;

      // Keep stars mostly in the upper 80% of the sky so skyline and water remain distinct
      const top = rand1 * 82;
      const left = rand2 * 100;

      // Star sizes: most are 1px to 1.8px, few are 2.2px - 2.8px
      const isHeroStar = i % 25 === 0;
      const size = isHeroStar ? 2.6 : 1.0 + rand3 * 1.2;

      // Opacity bounds
      const minOpacity = 0.15 + rand4 * 0.25;
      const maxOpacity = isHeroStar ? 0.95 : 0.65 + rand1 * 0.3;
      const duration = 2.8 + rand2 * 3.8; // 2.8s to 6.6s
      const delay = rand3 * 6; // 0s to 6s

      list.push({
        id: i,
        top,
        left,
        size,
        opacity: minOpacity,
        minOpacity,
        maxOpacity,
        duration,
        delay,
        isHeroStar,
      });
    }
    return list;
  }, [starCount]);

  return (
    <div
      id="starfield-layer"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-twinkle bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            ['--min-opacity' as string]: star.minOpacity,
            ['--max-opacity' as string]: star.maxOpacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            boxShadow: star.isHeroStar
              ? `0 0 6px 1px rgba(245, 213, 138, 0.7), 0 0 12px 2px rgba(212, 168, 79, 0.4)`
              : `0 0 3px 0.5px rgba(255, 255, 255, 0.4)`,
          }}
        />
      ))}
    </div>
  );
};
