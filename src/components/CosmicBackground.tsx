import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 9000), 120);
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.3 ? '#F8F2E3' : '#F5D58A',
    }));

    // Floating golden dust particles
    const dustParticles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.3 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      for (const star of stars) {
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha > 0.9) {
          star.alpha = 0.9;
          star.direction = -1;
        } else if (star.alpha < 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      }

      // Render subtle drifting golden cosmic dust
      for (const p of dustParticles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#D4A84F';
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep celestial radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, #142B4F 0%, #0B1F3A 45%, #061426 85%),
            linear-gradient(to bottom, #061426 0%, #0B1F3A 50%, #061426 100%)
          `,
        }}
      />

      {/* Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block opacity-85" />

      {/* Golden horizon glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212, 168, 79, 0.4) 0%, rgba(180, 83, 9, 0.15) 40%, transparent 80%)',
        }}
      />

      {/* Subtle sacred mandala background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.035] pointer-events-none select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#D4A84F" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="#D4A84F" strokeWidth="0.75" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#D4A84F" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#D4A84F" strokeWidth="0.5" />
          {/* 12-petaled mandala rays */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M 200 200 L 200 20 Z"
              stroke="#D4A84F"
              strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      {/* Faint temple shikhar silhouettes at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-15 pointer-events-none overflow-hidden flex items-end justify-center">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24 text-[#061426] fill-current"
        >
          <path d="M0,120 L0,90 Q150,85 220,50 L240,20 L250,5 L260,20 L280,50 Q350,85 450,80 L480,40 L500,10 L520,40 L550,80 Q650,85 720,45 L740,15 L750,0 L760,15 L780,45 Q850,85 950,80 L980,35 L1000,12 L1020,35 L1050,80 Q1120,85 1200,90 L1200,120 Z" />
        </svg>
      </div>
    </div>
  );
};
