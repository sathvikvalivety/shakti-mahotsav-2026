import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { ABOUT_DEFAULT_STORY, ABOUT_STORIES, AboutStory, sizedImage } from '../../data/aboutContent';

type Layout = 'mobile' | 'tablet' | 'desktop';

interface Slot {
  /** Horizontal offset, % of the card's own width. */
  x: number;
  y: number;
  scale: number;
  rotateY: number;
  opacity: number;
}

/**
 * Where each card sits relative to the active one (index = |offset|). Side
 * cards turn their outer edge toward the viewer, like the reference, and on
 * desktop they recede by turning rather than overlapping: each slot's x
 * leaves a small gap after the (scaled, turned) card before it.
 */
const SLOTS: Record<Layout, Slot[]> = {
  desktop: [
    { x: 0, y: -10, scale: 1, rotateY: 0, opacity: 1 },
    { x: 88, y: 0, scale: 0.9, rotateY: 44, opacity: 0.85 },
    { x: 163, y: 4, scale: 0.84, rotateY: 50, opacity: 0.6 },
  ],
  tablet: [
    { x: 0, y: -8, scale: 1, rotateY: 0, opacity: 1 },
    { x: 78, y: 0, scale: 0.82, rotateY: 34, opacity: 0.75 },
    { x: 128, y: 4, scale: 0.7, rotateY: 40, opacity: 0.45 },
  ],
  mobile: [
    { x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1 },
    { x: 88, y: 0, scale: 0.84, rotateY: 12, opacity: 0.45 },
    { x: 150, y: 0, scale: 0.7, rotateY: 12, opacity: 0 },
  ],
};

const EASE = [0.22, 1, 0.36, 1] as const;
const COUNT = ABOUT_STORIES.length;

/** Signed distance from the active card, wrapped to -2..2. */
const offsetOf = (index: number, active: number) => ((index - active + COUNT + 2) % COUNT) - 2;

function useLayout(): Layout {
  const get = (): Layout =>
    window.matchMedia('(min-width: 1280px)').matches
      ? 'desktop'
      : window.matchMedia('(min-width: 640px)').matches
        ? 'tablet'
        : 'mobile';
  const [layout, setLayout] = useState<Layout>(get);
  useEffect(() => {
    const queries = ['(min-width: 1280px)', '(min-width: 640px)'].map((q) => window.matchMedia(q));
    const update = () => setLayout(get());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);
  return layout;
}

const Arrow: React.FC<{ direction: 'prev' | 'next'; onClick: () => void; className?: string }> = ({
  direction,
  onClick,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Previous story' : 'Next story'}
    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#D4A84F]/60 bg-[rgba(3,12,32,0.55)] text-[#E6C27A] shadow-[0_0_14px_rgba(212,168,79,0.12)] transition-[border-color,color,box-shadow,transform] duration-300 hover:scale-105 hover:border-[#F5D58A] hover:text-[#F5D58A] hover:shadow-[0_0_18px_rgba(245,213,138,0.3)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#E6C27A] cursor-pointer ${className}`}
  >
    <svg viewBox="0 0 12 12" className={`h-3 w-3 ${direction === 'prev' ? 'rotate-180' : ''}`} aria-hidden="true">
      <path d="M3 1.5 10 6 3 10.5Z" fill="currentColor" />
    </svg>
  </button>
);

interface CardProps {
  story: AboutStory;
  offset: number;
  slot: Slot;
  wrapped: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
}

const StoryCard: React.FC<CardProps> = ({ story, offset, slot, wrapped, reduceMotion, onSelect }) => {
  const isActive = offset === 0;
  const direction = Math.sign(offset);
  const target = {
    x: `${direction * slot.x}%`,
    y: slot.y,
    scale: slot.scale,
    // Left cards turn right and vice versa, so outer edges come forward.
    rotateY: reduceMotion ? 0 : -direction * slot.rotateY,
    opacity: slot.opacity,
  };

  // A card wrapping from one end to the other jumps and fades in, rather than
  // sweeping across the whole row behind the others.
  const transition = wrapped
    ? { default: { duration: 0 }, opacity: { duration: 0.6, ease: EASE } }
    : { duration: reduceMotion ? 0.35 : 0.85, ease: EASE };

  return (
    <motion.article
      className="absolute left-1/2 top-3 -ml-[calc(var(--about-card-w)/2)] w-[var(--about-card-w)] aspect-[400/336] [transform-style:preserve-3d]"
      style={{ zIndex: 10 - Math.abs(offset) }}
      initial={false}
      animate={wrapped ? { ...target, opacity: [0, slot.opacity] } : target}
      transition={transition}
      aria-hidden={!isActive}
      aria-roledescription="slide"
      aria-label={`${story.title}`}
      onClick={isActive ? undefined : onSelect}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[14px] border bg-[#050C1C] transition-[border-color,box-shadow] duration-700 ${
          isActive
            ? 'border-[#E6C27A]/90 shadow-[0_0_0_1px_rgba(245,213,138,0.25),0_0_36px_rgba(212,168,79,0.32),0_24px_50px_rgba(0,0,0,0.55)]'
            : 'border-[#D4A84F]/35 shadow-[0_18px_40px_rgba(0,0,0,0.5)] cursor-pointer'
        }`}
      >
        <img
          src={sizedImage(story.image.src, 480)}
          srcSet={`${sizedImage(story.image.src, 480)} 480w, ${sizedImage(story.image.src, 800)} 800w`}
          sizes="(min-width: 1024px) 400px, 360px"
          alt={story.image.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: story.image.position }}
        />

        {/* Legibility gradient, plus a veil that quiets inactive cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030A18] via-[#030A18]/70 via-45% to-transparent to-75%" />
        <div
          className={`absolute inset-0 bg-[#030A18] transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-35'}`}
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-[7%] pb-[6%] text-center">
          <h3 className="font-cormorant font-semibold leading-tight text-[#F8EFDD] text-[clamp(20px,calc(var(--about-card-w)*0.072),29px)] [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
            {story.title}
          </h3>
          <p className="mt-1 font-manrope font-medium text-[#E6C27A] text-[clamp(11px,calc(var(--about-card-w)*0.034),13.5px)]">
            {story.tags.join('  •  ')}
          </p>
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ${
              isActive ? 'grid-rows-[1fr] opacity-100 delay-150' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <p className="min-h-0 overflow-hidden pt-2 font-manrope leading-snug text-[#F8F2E3]/88 text-[clamp(11.5px,calc(var(--about-card-w)*0.037),14px)]">
              {story.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * "More Than a Festival" — five story cards with one large active card in
 * the centre. State lives here, so changing slides re-renders only this.
 */
export const AboutCarousel: React.FC = () => {
  const [active, setActive] = useState(ABOUT_DEFAULT_STORY);
  const layout = useLayout();
  const reduceMotion = useReducedMotion() ?? false;
  const previousOffsets = useRef<number[]>(ABOUT_STORIES.map((_, i) => offsetOf(i, ABOUT_DEFAULT_STORY)));

  const goTo = useCallback((index: number) => setActive(((index % COUNT) + COUNT) % COUNT), []);
  const next = useCallback(() => setActive((a) => (a + 1) % COUNT), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + COUNT) % COUNT), []);

  const offsets = ABOUT_STORIES.map((_, i) => offsetOf(i, active));
  const wrappedFlags = offsets.map((o, i) => Math.abs(o - previousOffsets.current[i]) > 2);
  useEffect(() => {
    previousOffsets.current = offsets;
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    // Keep the arrows from also stepping the Home page's day timeline.
    e.stopPropagation();
    if (e.key === 'ArrowLeft') prev();
    else next();
  };

  const slots = SLOTS[layout];
  const activeStory = ABOUT_STORIES[active];

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="What makes Shakti Mahotsav special"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mx-auto mt-4 max-w-[1680px] rounded-2xl [--about-card-w:min(80vw,340px)] sm:[--about-card-w:clamp(270px,37vw,340px)] xl:[--about-card-w:clamp(260px,21vw,380px)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#E6C27A]/60"
      >
        <p className="sr-only" aria-live="polite">
          {`Story ${active + 1} of ${COUNT}: ${activeStory.title}`}
        </p>

        <div className="relative">
          <motion.div
            className="relative h-[calc(var(--about-card-w)*0.84_+_22px)] [perspective:2400px] touch-pan-y"
            onPanEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
          >
            {ABOUT_STORIES.map((story, i) => (
              <StoryCard
                key={story.id}
                story={story}
                offset={offsets[i]}
                slot={slots[Math.abs(offsets[i])]}
                wrapped={wrappedFlags[i]}
                reduceMotion={reduceMotion}
                onSelect={() => goTo(i)}
              />
            ))}
          </motion.div>

          {/* Desktop: arrows just outside the outermost cards */}
          <Arrow
            direction="prev"
            onClick={prev}
            className="absolute left-[calc(50%_-_var(--about-card-w)_*_2_-_60px)] top-1/2 z-20 hidden -translate-y-1/2 xl:grid"
          />
          <Arrow
            direction="next"
            onClick={next}
            className="absolute right-[calc(50%_-_var(--about-card-w)_*_2_-_60px)] top-1/2 z-20 hidden -translate-y-1/2 xl:grid"
          />
        </div>

        {/* Smaller screens: arrows under the card */}
        <div className="mt-5 flex items-center justify-center gap-6 xl:hidden">
          <Arrow direction="prev" onClick={prev} />
          <Arrow direction="next" onClick={next} />
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 xl:mt-3" role="group" aria-label="Choose a story">
          {ABOUT_STORIES.map((story, i) => (
            <button
              key={story.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show story ${i + 1}: ${story.title}`}
              aria-current={i === active ? 'true' : undefined}
              className="relative grid h-5 w-5 place-items-center rounded-full cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#E6C27A]"
            >
              <span className="h-2.5 w-2.5 rounded-full border border-[#D4A84F]/55" />
              {i === active && (
                <motion.span
                  layoutId="about-story-dot"
                  className="absolute h-2.5 w-2.5 rounded-full bg-[#E6C27A] shadow-[0_0_8px_rgba(245,213,138,0.6)]"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
};
