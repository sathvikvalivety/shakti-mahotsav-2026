import React from 'react';

/**
 * Thin gold line icons drawn to match the page's ornament strokes. They use
 * `currentColor`, so colour and size come from the surrounding element.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

const lineProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const DiyaIcon: React.FC<IconProps> = (props) => (
  <svg {...lineProps} {...props}>
    <path d="M12 3.2c1.7 2 2.2 3.6 1.4 4.9-.4.7-1.4 1.1-1.4 1.1s-1-.4-1.4-1.1c-.8-1.3-.3-2.9 1.4-4.9Z" />
    <path d="M3.5 12.5h17c0 3.3-3.8 5.5-8.5 5.5s-8.5-2.2-8.5-5.5Z" />
    <path d="M20.5 12.5 22 11" />
    <path d="M9 18v2.3h6V18" />
  </svg>
);

export const LotusIcon: React.FC<IconProps> = (props) => (
  <svg {...lineProps} {...props}>
    <path d="M12 4.5c2.1 2.6 2.1 6.9 0 10.5-2.1-3.6-2.1-7.9 0-10.5Z" />
    <path d="M12 15c-1.1-3.5-3.8-5.6-7.2-6 .4 3.4 3 5.8 7.2 6Z" />
    <path d="M12 15c1.1-3.5 3.8-5.6 7.2-6-.4 3.4-3 5.8-7.2 6Z" />
    <path d="M12 15c-3.4 1.2-6.9.6-9.5-1.6 3-1.3 6.4-.7 9.5 1.6Z" />
    <path d="M12 15c3.4 1.2 6.9.6 9.5-1.6-3-1.3-6.4-.7-9.5 1.6Z" />
    <path d="M6 19.2h12" />
  </svg>
);

export const CommunityIcon: React.FC<IconProps> = (props) => (
  <svg {...lineProps} {...props}>
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="5.6" cy="9.2" r="1.9" />
    <circle cx="18.4" cy="9.2" r="1.9" />
    <path d="M7.6 19.5c0-3.1 2-5.6 4.4-5.6s4.4 2.5 4.4 5.6" />
    <path d="M2.4 18.5c0-2.4 1.4-4.3 3.2-4.3 .9 0 1.7.4 2.3 1.1" />
    <path d="M21.6 18.5c0-2.4-1.4-4.3-3.2-4.3-.9 0-1.7.4-2.3 1.1" />
  </svg>
);
