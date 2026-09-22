import { FESTIVAL_EVENTS } from './festivalData';

/** A paragraph with an optional phrase shown in gold. */
export interface AboutParagraph {
  text: string;
  highlight?: string;
}

export interface AboutStory {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: {
    src: string;
    alt: string;
    /** CSS object-position, so the subject stays in frame. */
    position: string;
  };
}

export const ABOUT_INTRO: AboutParagraph[] = [
  {
    text: 'Shakti Mahotsav 2026 is a 10-day cultural and spiritual celebration at Amrita Vishwa Vidyapeetham, Chennai Campus, dedicated to the Divine Mother, Parashakti, and Her diverse manifestations across Indian traditions.',
    highlight: 'Shakti Mahotsav 2026',
  },
  {
    text: 'The festival brings together sacred Vedic rituals, regional folk traditions, music, dance, art, food, games, and student participation into one shared celebration of culture, devotion, creativity, and togetherness.',
    highlight: 'culture, devotion, creativity, and togetherness',
  },
  {
    text: "From traditional processions and Bathukamma to Garba & Dandiya, Vedic rituals, Ayudha Pooja, culinary heritage, and the Vijayadashami finale, every day represents a different expression of India's living cultural heritage.",
  },
];

export const ABOUT_HIGHLIGHTS = [
  { icon: 'calendar', title: '10 Days', caption: 'A Grand Celebration' },
  { icon: 'community', title: 'One Community', caption: 'Students, Faculty, Society' },
  { icon: 'lotus', title: 'Infinite Expressions', caption: 'Of Shakti' },
] as const;

const dayImage = (day: number) => FESTIVAL_EVENTS.find((e) => e.day === day)?.image ?? FESTIVAL_EVENTS[0].image;

/**
 * Story cards for "More Than a Festival".
 *
 * Images: until event photography exists (Bathukamma, Homam, dance, the
 * procession), each story uses the alankaram artwork whose theme matches it,
 * taken from the festival lineup data. To use a photo instead, replace
 * `image.src` (and `alt`) here — nothing else needs to change.
 */
export const ABOUT_STORIES: AboutStory[] = [
  {
    id: 'tapestry',
    title: 'A Tapestry of India',
    tags: ['Culture', 'Unity', 'Heritage'],
    description:
      'From Telugu and Telangana traditions to Bengali, Nepali, Bihari and Gujarati celebrations, Shakti Mahotsav brings diverse cultural expressions together on one campus.',
    image: { src: dayImage(3), alt: 'Sri Annapurna Devi alankaram in a golden saree', position: 'center 14%' },
  },
  {
    id: 'traditions',
    title: 'Sacred Traditions',
    tags: ['Ritual', 'Reflection', 'Reverence'],
    description:
      "Experience sacred processions, Ganga Harathi, Vedic Homam, Kumkum Pooja, Darshan and Ayudha Pooja as part of the festival's spiritual journey.",
    image: { src: dayImage(2), alt: 'Sri Gayatri Devi, Mother of the Vedas, seated on a lotus', position: 'center 12%' },
  },
  {
    id: 'spirit',
    title: 'The Spirit of Shakti',
    tags: ['Parashakti', 'Devotion', 'Celebration'],
    description:
      'A celebration dedicated to the Divine Mother, bringing together sacred traditions, cultural heritage, and the vibrant spirit of the Amrita community.',
    image: { src: dayImage(8), alt: 'Sri Durga Devi, the Divine Mother, in a red saree with her lion', position: 'center 16%' },
  },
  {
    id: 'expression',
    title: 'Art, Music & Expression',
    tags: ['Rhythm', 'Creativity', 'Celebration'],
    description:
      'Classical music, Bharatanatyam, regional folk traditions, Garba, Dandiya, student performances, traditional crafts and visual art become expressions of culture and devotion.',
    image: { src: dayImage(6), alt: 'Sri Saraswati Devi playing the veena', position: 'center 14%' },
  },
  {
    id: 'journey',
    title: 'Ten Days. One Journey.',
    tags: ['Invocation', 'Harmony', 'Consecration'],
    description:
      'The festival unfolds across three broad phases — Invocation & Folk Heritage, Pan-Indian Harmony & Recreation, and Vedic Consecration & Grand Finale.',
    image: { src: dayImage(10), alt: 'Sri Raja Rajeswari Devi, the Vijayadashami alankaram', position: 'center 14%' },
  },
];

/** "The Spirit of Shakti" opens in the centre. */
export const ABOUT_DEFAULT_STORY = ABOUT_STORIES.findIndex((s) => s.id === 'spirit');

/** Card-sized variant of an image. ImageKit URLs are resized on the CDN. */
export function sizedImage(src: string, width: number): string {
  if (!src.includes('ik.imagekit.io')) return src;
  const url = new URL(src);
  url.searchParams.set('tr', `w-${width}`);
  return url.toString();
}
