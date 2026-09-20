import React, { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  left: number; // percentage
  size: number; // in pixels
  color: string;
  opacity: number;
  duration: number; // in seconds
  delay: number; // in seconds
  driftX: number; // drift horizontal pixels
}

export const GoldenParticles: React.FC = () => {
  const [particleCount, setParticleCount] = useState<number>(26);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setParticleCount(10); // Mobile: ~10 particles
      } else if (window.innerWidth < 1024) {
        setParticleCount(18); // Tablet: ~18 particles
      } else {
        setParticleCount(28); // Desktop: ~28 particles (within 20-30 spec)
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    const colors = ['#D4A84F', '#F5D58A', '#E5BA63', '#FFE29A'];

    for (let i = 0; i < particleCount; i++) {
      const rand1 = ((i * 7919 + 104729) % 233280) / 233280;
      const rand2 = ((i * 12345 + 54321) % 233280) / 233280;
      const rand3 = ((i * 3571 + 99991) % 233280) / 233280;
      const rand4 = ((i * 9301 + 33331) % 233280) / 233280;

      const left = 3 + rand1 * 94; // across horizontal width
      const size = 1.4 + rand2 * 1.8; // 1.4px to 3.2px
      const color = colors[i % colors.length];
      const opacity = 0.25 + rand3 * 0.35; // low opacity (0.25 to 0.6)
      const duration = 16 + rand4 * 16; // 16s to 32s slow upward drift
      const delay = -(rand2 * 28); // Negative delay ensures particles are already mid-flight on mount
      const driftX = -25 + rand3 * 50; // -25px to +25px subtle sway

      list.push({
        id: i,
        left,
        size,
        color,
        opacity,
        duration,
        delay,
        driftX,
      });
    }
    return list;
  }, [particleCount]);

  return (
    <div
      id="golden-particles-layer"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-particle"
          style={{
            left: `${p.left}%`,
            bottom: '0px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            ['--p-opacity' as string]: p.opacity,
            ['--drift-x' as string]: `${p.driftX}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
