import { FestivalConfig, FestivalEvent } from '../types';

export const FESTIVAL_CONFIG: FestivalConfig = {
  name: 'SHAKTI MAHOTSAV 2026',
  year: 2026,
  startDate: '2026-10-11',
  endDate: '2026-10-20',
  autoPlayInterval: 5000, // 5000ms (5s) default play speed
  loopAtEnd: true, // Loop to Day 1
};

export const FESTIVAL_EVENTS: FestivalEvent[] = [
  {
    day: 1,
    title: 'Sri Bala Tripura Sundari Devi',
    subTitle: 'The Youthful Divine Beauty',
    date: 'October 11, 2026',
    isoDate: '2026-10-11',
    dayOfWeek: 'Sunday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The radiant innocence and eternal beauty of the Divine Mother.',
    description: 'Sri Bala Tripura Sundari Devi represents the divine innocence, beauty, and youthful radiance of Shakti, embodying purity, grace, and spiritual awakening.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%201.png',
    navadurga: {
      name: 'Sri Bala Tripura Sundari Devi',
      title: 'The Youthful Divine Beauty',
      virtues: 'Innocence, Purity, Grace & Divine Wisdom',
      color: 'Light Pink',
      colorHex: '#F472B6',
      significance: 'Bala Tripura Sundari is revered as the youthful manifestation of the Divine Mother, symbolizing pure and radiant consciousness, spiritual awakening, and divine grace.'
    },
    lunarPhase: {
      phaseName: 'New Moon (Prathama)',
      illumination: 0.05,
      type: 'new'
    },
    highlights: ['DEVI ALANKARAM: Light Pink Saree (Vastram)', 'Naivedyam: Sweet Boondi and Chickpeas (Senagalu)', 'Alankaram Darshanam after 4:00 PM', 'Special Sahasranama Archana'],
    dressCode: 'Light Pink / Silk Traditional Attire',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 2,
    title: 'Sri Gayatri Devi',
    subTitle: 'Mother of the Vedas',
    date: 'October 12, 2026',
    isoDate: '2026-10-12',
    dayOfWeek: 'Monday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The sacred light of wisdom that awakens the soul.',
    description: 'Sri Gayatri Devi embodies the radiant power of sacred knowledge, wisdom, and spiritual illumination, guiding devotees toward truth and higher consciousness.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%202.png',
    navadurga: {
      name: 'Sri Gayatri Devi',
      title: 'Mother of the Vedas',
      virtues: 'Wisdom, Knowledge, Purity & Spiritual Illumination',
      color: 'Orange',
      colorHex: '#EA580C',
      significance: 'Gayatri Devi is revered as the divine embodiment of sacred wisdom and spiritual illumination, symbolizing the light of knowledge that dispels ignorance.'
    },
    lunarPhase: {
      phaseName: 'Waxing Crescent (Dvitiya)',
      illumination: 0.15,
      type: 'waxing-crescent'
    },
    highlights: ['DEVI ALANKARAM: Orange Saree (Vastram)', 'Naivedyam: Pulihora (Tamarind Rice) and Ravva Kesari', 'Gayatri Mantra Maha Japam', 'Veda Parayanam'],
    dressCode: 'Orange / Saffron Traditional Attire',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 3,
    title: 'Sri Annapurna Devi',
    subTitle: 'Goddess of Nourishment',
    date: 'October 13, 2026',
    isoDate: '2026-10-13',
    dayOfWeek: 'Tuesday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The boundless grace that nourishes every life.',
    description: 'Sri Annapurna Devi is the divine mother of nourishment and abundance, blessing devotees with food, sustenance, compassion, and prosperity.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%203.png',
    navadurga: {
      name: 'Sri Annapurna Devi',
      title: 'Goddess of Nourishment',
      virtues: 'Nourishment, Compassion, Generosity & Abundance',
      color: 'Sandalwood Yellow',
      colorHex: '#FBBF24',
      significance: 'Annapurna Devi represents the sacred principle of nourishment and the divine grace of food and sustenance, symbolizing abundance, generosity, and compassionate care.'
    },
    lunarPhase: {
      phaseName: 'Waxing Crescent (Tritiya)',
      illumination: 0.28,
      type: 'waxing-crescent'
    },
    highlights: ['DEVI ALANKARAM: Sandalwood Yellow Saree (Vastram)', 'Naivedyam: Katte Pongali (Spiced Rice and Lentil Pongal)', 'Annadanam Distribution', 'Laksha Kumkumarchana'],
    dressCode: 'Sandalwood Yellow / Golden Yellow Silk',
    entryType: 'Open for All Devotees · Anna Prasadam'
  },
  {
    day: 4,
    title: 'Sri Maha Chandi Devi',
    subTitle: 'The Fierce Protector',
    date: 'October 14, 2026',
    isoDate: '2026-10-14',
    dayOfWeek: 'Wednesday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The fierce flame of Shakti that protects and conquers.',
    description: 'Sri Maha Chandi Devi represents the fierce and protective power of the Divine Mother, destroying negativity and protecting devotees from adversity.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%204.png',
    navadurga: {
      name: 'Sri Maha Chandi Devi',
      title: 'The Fierce Protector',
      virtues: 'Courage, Protection, Strength & Righteousness',
      color: 'Maroon / Dark Red',
      colorHex: '#881337',
      significance: 'Maha Chandi embodies the fierce aspect of Shakti, representing divine strength, protection, courage, and the destruction of negative and harmful forces.'
    },
    lunarPhase: {
      phaseName: 'First Quarter (Chaturthi)',
      illumination: 0.42,
      type: 'first-quarter'
    },
    highlights: ['DEVI ALANKARAM: Maroon / Dark Red Saree (Vastram)', 'Naivedyam: Kadambam (Mix Vegetable Rice) or Laddu', 'Chandi Parayanam', 'Deeparadhana'],
    dressCode: 'Maroon or Dark Red Ethnic Wear',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 5,
    title: 'Sri Lalita Tripura Sundari Devi',
    subTitle: 'The Supreme Beauty of the Three Worlds',
    date: 'October 15, 2026',
    isoDate: '2026-10-15',
    dayOfWeek: 'Thursday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'Where supreme beauty becomes the expression of divine grace.',
    description: 'Sri Lalita Tripura Sundari Devi represents supreme beauty, grace, compassion, and the sovereign power of the Divine Mother, embodying divine love and wisdom.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%205.png',
    navadurga: {
      name: 'Sri Lalita Tripura Sundari Devi',
      title: 'The Supreme Beauty of the Three Worlds',
      virtues: 'Beauty, Compassion, Wisdom & Divine Grace',
      color: 'Pure Gold Colour / Yellow',
      colorHex: '#D4A84F',
      significance: 'Lalita Tripura Sundari represents the supreme beauty and blissful consciousness of Shakti, symbolizing divine love, wisdom, grace, and spiritual sovereignty.'
    },
    lunarPhase: {
      phaseName: 'Waxing Gibbous (Panchami)',
      illumination: 0.58,
      type: 'waxing-gibbous'
    },
    highlights: ['DEVI ALANKARAM: Pure Gold Colour / Yellow Saree (Vastram)', 'Naivedyam: Pulihora and Pesara Boorelu (Green Gram Sweets)', 'Sri Chakra Navavarana Puja', 'Lalita Sahasranama Stotram'],
    dressCode: 'Pure Gold / Vibrant Yellow Handloom',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 6,
    title: 'Sri Saraswati Devi',
    subTitle: 'Moola Nakshatram · Goddess of Knowledge & Arts',
    date: 'October 16, 2026',
    isoDate: '2026-10-16',
    dayOfWeek: 'Friday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The eternal stream of knowledge, music, and divine wisdom.',
    description: 'Sri Saraswati Devi is the radiant embodiment of knowledge, wisdom, music, learning, and the arts, guiding devotees toward intellectual and spiritual enlightenment.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%206.png',
    navadurga: {
      name: 'Sri Saraswati Devi',
      title: 'Goddess of Knowledge and Arts',
      virtues: 'Knowledge, Wisdom, Creativity & Purity',
      color: 'White',
      colorHex: '#F8FAFC',
      significance: 'Saraswati Devi represents the illuminating power of knowledge and learning, inspiring wisdom, eloquence, music, literature, artistic expression, and the pursuit of truth.'
    },
    lunarPhase: {
      phaseName: 'Waxing Gibbous (Shashti - Moola)',
      illumination: 0.72,
      type: 'waxing-gibbous'
    },
    highlights: ['DEVI ALANKARAM: White Saree (Vastram)', 'Naivedyam: Atukulu (Beaten Rice), Bellam (Jaggery), Sanagapappu (Bengal Gram), and Coconut Payasam', 'Aksharabhyasam for Children', 'Veena Recital & Classical Chants'],
    dressCode: 'Pure White or Light Ivory Silk',
    entryType: 'Open for All Devotees · Vidyarambham'
  },
  {
    day: 7,
    title: 'Sri Maha Lakshmi Devi',
    subTitle: 'Goddess of Wealth and Prosperity',
    date: 'October 17, 2026',
    isoDate: '2026-10-17',
    dayOfWeek: 'Saturday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The divine abundance that brings prosperity, harmony, and grace.',
    description: 'Sri Maha Lakshmi Devi represents abundance, prosperity, beauty, auspiciousness, and the generous blessings of the Divine Mother.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%207.png',
    navadurga: {
      name: 'Sri Maha Lakshmi Devi',
      title: 'Goddess of Wealth and Prosperity',
      virtues: 'Prosperity, Abundance, Compassion & Auspiciousness',
      color: 'Pink / Rose',
      colorHex: '#EC4899',
      significance: 'Maha Lakshmi represents divine prosperity and well-being, encompassing material abundance, spiritual richness, harmony, generosity, and auspiciousness.'
    },
    lunarPhase: {
      phaseName: 'Waxing Gibbous (Saptami)',
      illumination: 0.85,
      type: 'waxing-gibbous'
    },
    highlights: ['DEVI ALANKARAM: Pink / Rose Saree (Vastram)', 'Naivedyam: Ksheerannam (Milk Kheer / Payasam)', 'Dhana Lakshmi Puja & Suvasini Puja', 'Golden Deepotsav'],
    dressCode: 'Pink / Rose or Gold Bordered Attire',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 8,
    title: 'Sri Durga Devi',
    subTitle: 'The Invincible Warrior Goddess',
    date: 'October 18, 2026',
    isoDate: '2026-10-18',
    dayOfWeek: 'Sunday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The fearless strength that protects dharma and destroys every obstacle.',
    description: 'Sri Durga Devi embodies the protective and invincible power of Shakti, guiding devotees through difficulties and overcoming forces of fear and negativity.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%208.png',
    navadurga: {
      name: 'Sri Durga Devi',
      title: 'The Invincible Warrior Goddess',
      virtues: 'Courage, Strength, Protection & Fearlessness',
      color: 'Red',
      colorHex: '#DC2626',
      significance: 'Durga Devi represents divine protective power, inspiring courage and fearlessness while overcoming obstacles and protecting righteousness.'
    },
    lunarPhase: {
      phaseName: 'Full Moon (Ashtami - Durgashtami)',
      illumination: 0.95,
      type: 'full'
    },
    highlights: ['DEVI ALANKARAM: Red Saree (Vastram)', 'Naivedyam: Garelu (Vada) and Lemon Juice (Nimma Rasam)', 'Durgashtami Maha Havan', 'Kumkuma Archana with 108 Suvasinis'],
    dressCode: 'Bright Red / Crimson Traditional Attire',
    entryType: 'Open for All Devotees · Maha Prasadam'
  },
  {
    day: 9,
    title: 'Sri Mahishasura Mardhini Devi',
    subTitle: 'Slayer of the Buffalo Demon (Mahanavami)',
    date: 'October 19, 2026',
    isoDate: '2026-10-19',
    dayOfWeek: 'Monday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The triumphant power of divine courage over darkness and evil.',
    description: 'Sri Mahishasura Mardhini Devi represents the victorious power of divine righteousness, overcoming arrogance, ignorance, and destructive forces.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%209.png',
    navadurga: {
      name: 'Sri Mahishasura Mardhini Devi',
      title: 'Slayer of the Buffalo Demon',
      virtues: 'Valor, Determination, Righteousness & Victory',
      color: 'Dark Brown or Red Handloom',
      colorHex: '#7C2D12',
      significance: 'Mahishasura Mardhini symbolizes the triumph of dharma over adharma and divine strength over arrogance, ignorance, and destructive tendencies.'
    },
    lunarPhase: {
      phaseName: 'Waning Gibbous (Navami - Mahanavami)',
      illumination: 0.88,
      type: 'waning-gibbous'
    },
    highlights: ['DEVI ALANKARAM: Dark Brown or Red Handloom Saree (Vastram)', 'Naivedyam: Chakra Pongali (Sweet Pongal)', 'Ayudha Puja & Vahana Puja', 'Chandi Maha Yajna Purnahuti'],
    dressCode: 'Dark Brown or Red Handloom Silk',
    entryType: 'Open for All Devotees · Sacred Darshan'
  },
  {
    day: 10,
    title: 'Sri Raja Rajeswari Devi',
    subTitle: 'Vijayadashami · Queen of Queens, Supreme Sovereign',
    date: 'October 20, 2026',
    isoDate: '2026-10-20',
    dayOfWeek: 'Tuesday',
    time: 'After 4:00 PM',
    location: 'Near Flag Pole',
    category: 'Alankaram',
    tagline: 'The supreme culmination of divine grace, wisdom, and victory.',
    description: 'Sri Raja Rajeswari Devi represents supreme sovereignty, grace, wisdom, and the complete manifestation of the Divine Mother, marking the auspicious culmination of the ten-day celebration.',
    image: 'https://ik.imagekit.io/z9bvr2bzc/all%20days%20images/day%2010.png?updatedAt=1789903643237',
    navadurga: {
      name: 'Sri Raja Rajeswari Devi',
      title: 'Queen of Queens, Supreme Sovereign',
      virtues: 'Sovereignty, Wisdom, Compassion & Divine Grace',
      color: 'Green',
      colorHex: '#059669',
      significance: 'Raja Rajeswari Devi represents the supreme and all-encompassing power of the Divine Mother, symbolizing spiritual sovereignty, divine beauty, wisdom, and harmonious fulfillment.'
    },
    lunarPhase: {
      phaseName: 'Vijayadashami (Dashami Finale)',
      illumination: 0.80,
      type: 'eclipse'
    },
    highlights: ['DEVI ALANKARAM: Green Saree (Vastram)', 'Naivedyam: Pulihora, Garelu, and Maha Naivedyam', 'Shami Puja (Jammi Chettu Puja)', 'Grand Teppotsavam & Vijayotsavam'],
    dressCode: 'Royal Green / Gold Zari Traditional Attire',
    entryType: 'All Access · Grand Vijayotsavam'
  }
];
