import React from 'react';
import { CommunityIcon, DiyaIcon, LotusIcon } from '../icons/FestivalIcons';

const VALUES = [
  { title: 'Culture', line: 'Rooted in heritage', Icon: DiyaIcon },
  { title: 'Devotion', line: 'Inspired by values', Icon: LotusIcon },
  { title: 'Togetherness', line: 'A stronger community', Icon: CommunityIcon },
];

const Divider: React.FC = () => (
  <div className="hero-values__divider" aria-hidden="true">
    <span />
    <svg width="10" height="10" viewBox="0 0 14 14">
      <path d="M7 0.5 8.6 5.4 13.5 7 8.6 8.6 7 13.5 5.4 8.6 0.5 7 5.4 5.4Z" fill="currentColor" />
    </svg>
    <span />
  </div>
);

/**
 * The festival's three values, shown under the left hero heading on desktop
 * and after the event card on smaller screens. Static apart from a one-time
 * fade-in and a soft glow on hover.
 */
export const HeroValues: React.FC = () => (
  <section className="hero-values" aria-label="What Shakti Mahotsav stands for">
    <Divider />
    <ul className="hero-values__list">
      {VALUES.map(({ title, line, Icon }) => (
        <li key={title} className="hero-values__item">
          <span className="hero-values__icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="hero-values__text">
            <span className="hero-values__title">{title}</span>
            <span className="hero-values__line">{line}</span>
          </span>
        </li>
      ))}
    </ul>
    <Divider />
    <p className="hero-values__quote">
      Where Tradition
      <br />
      Meets Tomorrow
    </p>
  </section>
);
