import React from 'react';
import { CalendarDays } from 'lucide-react';
import { ABOUT_HIGHLIGHTS, ABOUT_INTRO, AboutParagraph } from '../../data/aboutContent';
import { CommunityIcon, LotusIcon } from '../icons/FestivalIcons';
import { AboutCarousel } from './AboutCarousel';

const HIGHLIGHT_ICONS = {
  calendar: (props: { className?: string }) => <CalendarDays strokeWidth={1.2} aria-hidden="true" {...props} />,
  community: CommunityIcon,
  lotus: LotusIcon,
};

/** Thin gold line with a small lotus in the middle. */
const LotusDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-2.5 text-[#D4A84F] ${className}`} aria-hidden="true">
    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A84F]/75 sm:w-24" />
    <LotusIcon className="h-4 w-4" />
    <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A84F]/75 sm:w-24" />
  </div>
);

const Paragraph: React.FC<{ paragraph: AboutParagraph }> = ({ paragraph: { text, highlight } }) => {
  if (!highlight || !text.includes(highlight)) return <p>{text}</p>;
  const [before, after] = text.split(highlight);
  return (
    <p>
      {before}
      <span className="text-[#E6C27A]">{highlight}</span>
      {after}
    </p>
  );
};

/**
 * About — what Shakti Mahotsav is, three highlights, and the "More Than a
 * Festival" story carousel. Transparent: it sits on the site's fixed night-sky
 * background like every other section.
 */
export const AboutSection: React.FC = () => (
  <section
    id="about-section"
    aria-labelledby="about-title"
    className="relative scroll-mt-6 px-4 pt-12 pb-12 sm:px-6 md:pt-14 lg:px-8 lg:pb-12"
  >
    {/* Introduction */}
    <div className="mx-auto grid max-w-[1080px] items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
      <header className="mx-auto w-full max-w-md text-center lg:mx-0 lg:text-left">
        <div className="inline-flex flex-col items-center">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.4em] text-[#E6C27A]">About</p>
          <LotusDivider className="mt-2" />
        </div>
        <h2
          id="about-title"
          className="mt-4 font-cormorant font-semibold leading-[1.05] text-[#E9C47A] text-[clamp(40px,4.3vw,60px)] [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]"
        >
          What is <br className="hidden lg:inline" />
          Shakti Mahotsav?
        </h2>
        <p className="mt-6 font-manrope text-[11px] uppercase leading-[2] tracking-[0.38em] text-[#F8F2E3]/85 sm:text-xs">
          A Celebration of Shakti, <br />
          Culture and Community
        </p>
        <LotusDivider className="mt-4 lg:justify-start" />
      </header>

      <div className="mx-auto max-w-[34rem] space-y-4 text-center font-manrope text-[15px] leading-[1.75] text-[#F8F2E3]/85 lg:mx-0 lg:text-left">
        {ABOUT_INTRO.map((paragraph) => (
          <Paragraph key={paragraph.text.slice(0, 24)} paragraph={paragraph} />
        ))}
      </div>
    </div>

    {/* Highlights */}
    <ul className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12">
      {ABOUT_HIGHLIGHTS.map(({ icon, title, caption }, i) => {
        const Icon = HIGHLIGHT_ICONS[icon];
        return (
          <li
            key={title}
            className={`flex items-center gap-3 ${i === 2 ? 'col-span-2 justify-self-center' : 'justify-self-center'}`}
          >
            <Icon className="h-10 w-10 shrink-0 text-[#E6C27A]" />
            <div className="text-left">
              <p className="font-manrope text-[15px] font-semibold text-[#EBD3A0]">{title}</p>
              <p className="font-manrope text-[11px] text-[#F8F2E3]/70">{caption}</p>
            </div>
          </li>
        );
      })}
    </ul>

    {/* More Than a Festival */}
    <div className="mt-12 text-center md:mt-12">
      <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E6C27A] [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
        What makes it special?
      </p>
      <h2 className="mt-2 font-cormorant font-semibold leading-tight text-[#F0DDB0] text-[clamp(32px,2.9vw,46px)] [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
        More Than a Festival
      </h2>
      <LotusDivider className="mt-2" />
      <p className="mt-2 font-manrope text-[13px] text-[#F8F2E3]/85 sm:text-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
        A Tapestry of Culture, Devotion and Togetherness
      </p>
    </div>

    <AboutCarousel />
  </section>
);
