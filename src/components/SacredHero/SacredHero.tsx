import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FestivalEvent } from '../../types';
import { PARALLAX } from '../../motion/motionConfig';
import { useParallaxLayer } from '../../motion/pointerParallax';
import { GoddessCanvas } from './GoddessCanvas';
import { FallingPetals } from './FallingPetals';
import { HeroEventCard } from './HeroEventCard';
import { HeroValues } from './HeroValues';

interface SacredHeroProps {
  event: FestivalEvent;
  onViewDetails: (event: FestivalEvent) => void;
  onExplore: () => void;
}

const OrnamentDivider: React.FC = () => (
  <div className="sacred-hero__divider" aria-hidden="true">
    <span className="bg-gradient-to-r from-transparent to-[#D4A84F]/80" />
    <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#D4A84F]">
      <path d="M7 0.5 8.6 5.4 13.5 7 8.6 8.6 7 13.5 5.4 8.6 0.5 7 5.4 5.4Z" fill="currentColor" />
    </svg>
    <span className="bg-gradient-to-l from-transparent to-[#D4A84F]/80" />
  </div>
);

/**
 * Home hero. Layers, back to front (the night sky, stars, skyline, corner
 * mandalas and hanging ornaments are the fixed FestivalBackground behind it):
 *   falling petals → divine glow → goddess (fabric, jewellery motion)
 *   → hero text, festival values, event card → scroll cue.
 * Navigation is the Header above.
 *
 * From 1200px the left column (heading + values) and right column (heading +
 * event card) sit on a grid either side of the goddess; below that everything
 * stacks: heading, goddess, second heading, card, values.
 * Only the artwork layers react to the pointer — text and card stay anchored.
 */
export const SacredHero: React.FC<SacredHeroProps> = ({ event, onViewDetails, onExplore }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const glowRef = useParallaxLayer<HTMLDivElement>(PARALLAX.glow);
  const goddessRef = useParallaxLayer<HTMLDivElement>(PARALLAX.goddess);

  // Pause the goddess renderer while the hero is off-screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={sectionRef} aria-labelledby="sacred-hero-title" className="sacred-hero">
      <FallingPetals />

      {/* Divine glow + goddess artwork */}
      <div className="sacred-hero__stage">
        <div className="sacred-hero__art">
          <div ref={glowRef} className="sacred-hero__layer" aria-hidden="true">
            <div className="sacred-glow" />
          </div>
          <div ref={goddessRef} className="sacred-hero__layer">
            <GoddessCanvas active={inView} />
          </div>
        </div>
      </div>

      <div className="sacred-hero__content">
        <div className="sacred-hero__side sacred-hero__side--left">
          <div className="sacred-hero__intro sacred-hero__intro--left sacred-reveal">
            <h1 id="sacred-hero-title" className="sacred-hero__heading">
              Ten Sacred Days.<span className="sr-only"> Infinite Divine Grace.</span>
            </h1>
            <OrnamentDivider />
            <p className="sacred-hero__subtitle">
              Experience devotion, alankarams, <br className="hidden min-[1200px]:inline" />
              and sacred celebrations.
            </p>
          </div>

          <div className="sacred-hero__values sacred-reveal sacred-reveal--values">
            <HeroValues />
          </div>
        </div>

        <div className="sacred-hero__side sacred-hero__side--right">
          <div className="sacred-hero__intro sacred-hero__intro--right sacred-reveal sacred-reveal--late">
            <p aria-hidden="true" className="sacred-hero__heading">
              Infinite Divine Grace.
            </p>
            <OrnamentDivider />
            <p className="sacred-hero__subtitle">
              A journey of culture, faith, <br className="hidden min-[1200px]:inline" />
              and togetherness.
            </p>
          </div>

          <div className="sacred-hero__card sacred-reveal sacred-reveal--card">
            <HeroEventCard event={event} onViewDetails={onViewDetails} />
          </div>
        </div>
      </div>

      <button type="button" onClick={onExplore} className="sacred-scroll-cue">
        <span className="sacred-scroll-cue__mouse" aria-hidden="true">
          <span className="sacred-scroll-cue__wheel" />
        </span>
        <span className="sacred-scroll-cue__label">Scroll to explore</span>
        <ChevronDown size={16} className="sacred-scroll-cue__chevron" aria-hidden="true" />
      </button>
    </section>
  );
};
