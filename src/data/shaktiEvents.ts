export interface ProgramItem {
  name: string;
  category?: string;
  description?: string;
}

export interface ShaktiFestivalEvent {
  id: string;
  day: number;
  title: string;
  tagline: string; // Cultural phrase
  subtitle: string;
  description: string;
  culturalContext?: string;
  highlights: string[];
  programs: ProgramItem[];
  images: string[];
  imagePositions?: string[];
  date?: string;
  timing?: string;
  location?: string;
  participation?: string;
}

export const SHAKTI_FESTIVAL_EVENTS: ShaktiFestivalEvent[] = [
  {
    id: 'day-01',
    day: 1,
    title: 'Procession (Jathara)',
    tagline: 'Avahana & Raksha',
    subtitle: 'Sacred Telugu Procession',
    description: 'Inaugural ceremonial procession invoking the sacred energy and divine protection across the university campus with traditional folk ensembles.',
    culturalContext: 'The sacred Jathara procession marks the solemn invocation (Avahana) and protective blessing (Raksha) of the Divine Mother, welcoming traditional rhythms and ceremonial folk dances.',
    highlights: [
      'Potharajulu',
      'Kalimatha Dance',
      'Kadapa Teenmar',
      'Sri Kalahasti Ganga Harathi',
      'Crackers Finale',
    ],
    programs: [
      { name: 'Potharajulu', category: 'Traditional Folk Dance', description: 'Vibrant ritualistic dance invoking divine vigor and cultural sanctity.' },
      { name: 'Kalimatha Dance', category: 'Sacred Performance', description: 'Graceful and intense dramatic tribute portraying the fierce Mother.' },
      { name: 'Kadapa Teenmar', category: 'Folk Percussion', description: 'Energetic regional beats and high-octane drumming celebration.' },
      { name: 'Sri Kalahasti Ganga Harathi', category: 'Sacred Harathi', description: 'Solemn river harathi ritual illuminating the evening with sacred lamps.' },
      { name: 'Crackers Finale', category: 'Celebration', description: 'Auspicious display lighting up the night sky to mark Day 1 commencement.' },
    ],
    images: [
      '/images/events/day-01/pothuraju.jpg',
      '/images/events/day-01/gangamma-1.jpg',
      '/images/events/day-01/gangamma-2.jpg',
    ],
    date: 'October 11, 2026',
    timing: '5:00 PM Onwards',
    location: 'Flag Pole',
    participation: 'Open for all students, faculty, and devotees',
  },
  {
    id: 'day-02',
    day: 2,
    title: 'Kala Samarpan — Culturals',
    tagline: 'Nada & Nritya',
    subtitle: 'Music & Dance Showcase',
    description: 'An evening of artistic dedication through classical and contemporary music and dance performances celebrating rhythmic devotion.',
    culturalContext: 'Kala Samarpan translates to the sacred offering of the fine arts. Through Nada (sound and melody) and Nritya (dance), artists surrender their creative spirit to Shakti.',
    highlights: [
      'Team Raaga / Music',
      'Team Aurora / Dance',
    ],
    programs: [
      { name: 'Team Raaga / Music', category: 'Musical Concert', description: 'Devotional fusion, classical ragas, and soulful orchestral compositions.' },
      { name: 'Team Aurora / Dance', category: 'Choreography', description: 'Dynamic classical and thematic dance expressions celebrating Navadurga.' },
    ],
    images: [
      '/images/events/day-02/day2-main.jpg',
      '/images/events/day-02/day2-dance.webp',
      '/images/events/day-02/raaga-music.webp',
      '/images/events/day-02/krishna-devotion.webp',
    ],
    date: 'October 12, 2026',
    timing: '6:00 PM – 9:00 PM',
    location: 'Flag Pole',
    participation: 'Open Audience & Registered Cultural Teams',
  },
  {
    id: 'day-03',
    day: 3,
    title: 'Bathukamma Floral Festival',
    tagline: 'Prakriti & Shakti',
    subtitle: 'Floral Celebration & Tradition',
    description: 'Telangana’s vibrant floral festival celebrating nature, womanhood, and ecological harmony through majestic flower stacks and folk songs.',
    culturalContext: 'Bathukamma represents Prakriti (Mother Nature) and Shakti. Women assemble colorful native flowers in concentric tiered towers, singing traditional choral hymns honoring life and nature.',
    highlights: [
      'Bathukamma Floral Towers',
      'Traditional Choral Circles',
      'Shobha Yatra & Immersion',
    ],
    programs: [
      { name: 'Bathukamma Floral Towers', category: 'Floral Artistry', description: 'Crafting towering concentric arrangements using seasonal indigenous flowers.' },
      { name: 'Traditional Choral Circles', category: 'Folk Singing & Dance', description: 'Synchronized clapping, rhythmic singing, and traditional circular dances.' },
      { name: 'Shobha Yatra & Immersion', category: 'Sacred Immersion', description: 'Procession carrying the Bathukammas for respectful water immersion.' },
    ],
    images: [
      '/images/events/day-03/bathukamma-1.bmp',
      '/images/events/day-03/bathukamma-2.jpeg',
    ],
    date: 'October 13, 2026',
    timing: '4:30 PM – 8:00 PM',
    location: 'Flag Pole',
    participation: 'Open to all women, faculty, students, and guests',
  },
  {
    id: 'day-04',
    day: 4,
    title: 'Uttar Bharat Parv',
    tagline: 'Aikyam',
    subtitle: 'Unity in Cultural Diversity',
    description: 'A vibrant cross-cultural celebration showcasing the distinctive Navratri traditions, folk heritage, and authentic arts of North and Eastern India.',
    culturalContext: 'Aikyam represents divine oneness amidst manifold traditions. Uttar Bharat Parv weaves together the distinct spiritual flavors of Bengali, Nepali, and Bihari festivities.',
    highlights: [
      'Bengali Tradition',
      'Nepali Tradition',
      'Bihari Tradition',
    ],
    programs: [
      { name: 'Bengali Tradition', category: 'Durgotsav Heritage', description: 'Dhunuchi Naach, Shankha Dhwani, and traditional Bengali Durgotsav aesthetics.' },
      { name: 'Nepali Tradition', category: 'Dashain Heritage', description: 'Jamara offerings, Dashain blessings, and Himalayan folk cultural expressions.' },
      { name: 'Bihari Tradition', category: 'Folk Heritage', description: 'Maithili folklore, devotional songs, and traditional regional rituals.' },
    ],
    images: [
      '/images/events/day-04/north-1.jpg',
      '/images/events/day-04/north-2.jpg',
      '/images/events/day-04/north-3.jpg',
      '/images/events/day-04/north-4.jpg',
      '/images/events/day-04/dhunuchi-naach-1.jpg',
      '/images/events/day-04/dhunuchi-naach-2.jpg',
      '/images/events/day-04/durga-puja.jpg',
    ],
    date: 'October 14, 2026',
    timing: '5:30 PM – 9:00 PM',
    location: 'Flag Pole',
    participation: 'All university community members & regional clubs',
  },
  {
    id: 'day-05',
    day: 5,
    title: 'Garba & Dandiya Utsav',
    tagline: 'Raas & Utsav',
    subtitle: 'Folk Dance & Rhythm',
    description: 'An exhilarating night of Gujarati folk dances with synchronized Dandiya sticks, Maha Garba swirls, and live acoustic dhol beats.',
    culturalContext: 'Raas and Utsav celebrate cosmic harmony and joyful devotion. Dancing in circles symbolizes the circle of life and continuous divine presence in all existence.',
    highlights: [
      'Traditional Maha Garba',
      'Paired Dandiya Raas',
      'Live Dhol & Folk Ensemble',
    ],
    programs: [
      { name: 'Traditional Maha Garba', category: 'Circle Dance', description: 'Massive concentric circles moving in sync around the sacred lamp.' },
      { name: 'Paired Dandiya Raas', category: 'Rhythm Dance', description: 'Vibrant dual stick choreography with intricate rhythmic patterns.' },
      { name: 'Live Dhol & Folk Ensemble', category: 'Live Folk Music', description: 'Authentic high-energy folk vocalists and live percussion masters.' },
    ],
    images: [
      '/images/events/day-05/dandiya-2.jpg',
      '/images/events/day-05/dandiya-3.jpg',
      '/images/events/day-05/dandiya-4.jpg',
      '/images/events/day-05/dandiya-5.jpg',
    ],
    imagePositions: ['object-center', 'object-top', 'object-center', 'object-center'],
    date: 'October 15, 2026',
    timing: '6:30 PM – 10:00 PM',
    location: 'Flag Pole',
    participation: 'Traditional attire mandatory · Dandiya sticks provided',
  },
  {
    id: 'day-06',
    day: 6,
    title: 'Khel Din & Shilpa Kala Art Expo',
    tagline: 'Utsaha & Hastakala',
    subtitle: 'Sports, Craft & Creativity',
    description: 'Day-long celebration of indigenous crafts, hands-on pottery workshops, traditional games, and live artistic expression.',
    culturalContext: 'Utsaha (enthusiasm) and Hastakala (handicrafts) honor the sacred divinity in human hands and creative ingenuity, bridging sporting vigor with artisan traditions.',
    highlights: [
      'Tabletop Sports',
      'Community Games',
      'Mrittika Pottery Expo & Workshop',
      'Traditional Lac Bangles Crafting',
      'On-Spot Sketching & Caricature',
    ],
    programs: [
      { name: 'Tabletop Sports', category: 'Indoor Games', description: 'Carrom tournaments, traditional board games, and strategic contests.' },
      { name: 'Community Games', category: 'Outdoor Spirit', description: 'Tug of war, Housie, and friendly inter-departmental community challenges.' },
      { name: 'Mrittika Pottery Expo & Workshop', category: 'Clay Art', description: 'Hands-on clay wheel throwing and sculpting guided by master potters.' },
      { name: 'Traditional Lac Bangles Crafting', category: 'Heritage Craft', description: 'Demonstration and creation of ornate handmade lac bangles.' },
      { name: 'On-Spot Sketching & Caricature', category: 'Visual Arts', description: 'Live portraits, thematic charcoal sketches, and caricature kiosks.' },
    ],
    images: [
      'https://ik.imagekit.io/2ecf22k5j/shakti%20mahotsav/14.png',
      '/images/events/day-06/housie.png',
      'https://ik.imagekit.io/2ecf22k5j/shakti%20mahotsav/7.png',
      '/images/events/day-06/pot-1.jpeg',
      '/images/events/day-06/pottery-2.jpg',
      '/images/events/day-06/live-drawing.webp',
    ],
    date: 'October 16, 2026',
    timing: '10:00 AM – 5:30 PM',
    location: 'Flag Pole',
    participation: 'Open entry for all workshops and competitive games',
  },
  {
    id: 'day-07',
    day: 7,
    title: 'Maha Yajna & Sri Kumkum Pooja',
    tagline: 'Yajna & Archana',
    subtitle: 'Sacred Rituals & Divine Blessings',
    description: 'Solemn Vedic fire oblations followed by collective Lalita Sahasranama Kumkum archana for auspiciousness, harmony, and prosperity.',
    culturalContext: 'Yajna (Vedic fire ritual) and Archana (devotional worship) purify the environment and invoke divine motherly grace through sacred chants and vermilion offerings.',
    highlights: [
      'Morning Vedic Homam',
      'Divya Alankaram & Darshan',
      'Sri Kumkum Pooja & Mahaharathi',
    ],
    programs: [
      { name: 'Morning Vedic Homam', category: 'Vedic Yajna', description: 'Chanting of sacred hymns with ghee and medicinal herb offerings in the sacrificial altar.' },
      { name: 'Divya Alankaram & Darshan', category: 'Darshanam', description: 'Special adorned deity darshan with auspicious flower garlands.' },
      { name: 'Sri Kumkum Pooja & Mahaharathi', category: 'Collective Archana', description: 'Hundreds of devotees participating in sacred kumkuma archana chanting.' },
    ],
    images: [
      '/images/events/day-07/homam.jpg',
      '/images/events/day-07/kukuma.jpg',
      '/images/events/day-07/kukumarchana.jpg',
    ],
    date: 'October 17, 2026',
    timing: '8:00 AM – 1:00 PM',
    location: 'Flag Pole',
    participation: 'Devotees & families welcome · Pooja items arranged',
  },
  {
    id: 'day-08',
    day: 8,
    title: 'Annapoorna Rasoi',
    tagline: 'Annam Parabrahma',
    subtitle: 'Sacred Culinary Heritage',
    description: 'A grand celebration of sacred culinary traditions, featuring diverse regional festive delicacies, prasadam distribution, and no-fire culinary craft.',
    culturalContext: 'Annam Parabrahma honors food as the direct manifestation of the supreme divine. Annapoorna Rasoi celebrates mindful cooking, nourishing life, and sharing sanctified food.',
    highlights: [
      'Festive Delicacies Display',
      'Regional Indian Cuisine',
      'Healthy No-Fire Gastronomy',
    ],
    programs: [
      { name: 'Festive Delicacies Display', category: 'Gastronomy Expo', description: 'Exhibition of authentic traditional Navratri sweets and savory prasadam recipes.' },
      { name: 'Regional Indian Cuisine', category: 'Food Heritage', description: 'Live food stalls showcasing state-wise authentic delicacies from across India.' },
      { name: 'Healthy No-Fire Gastronomy', category: 'Culinary Workshop', description: 'Creative and nutritious culinary preparation without fire by student teams.' },
    ],
    images: [
      '/images/events/day-08/cooking-1.jpg',
      '/images/events/day-08/cooking-2.jpeg',
    ],
    date: 'October 18, 2026',
    timing: '11:00 AM – 4:00 PM',
    location: 'Flag Pole',
    participation: 'Tasting open to all · Student cooking competitions',
  },
  {
    id: 'day-09',
    day: 9,
    title: 'Ayudha Pooja & Saraswati Vandana',
    tagline: 'Karmasu Kaushalam',
    subtitle: 'Consecration of Instruments & Wisdom',
    description: 'Reverent consecration of academic tools, engineering instruments, laboratory apparatus, arts equipment, and university vehicles.',
    culturalContext: 'Karmasu Kaushalam (Excellence in Action) teaches reverence for one’s tools and instruments of work. Honoring books, computers, machines, and transport expresses deep gratitude for knowledge and service.',
    highlights: [
      'Academic Blocks & Library',
      'Engineering Labs & Workshops',
      'Cultural Studios & Sports',
      'University Transport Fleet',
    ],
    programs: [
      { name: 'Academic Blocks & Library', category: 'Vandana', description: 'Saraswati Puja, book blessings, and sacred floral offerings in study halls.' },
      { name: 'Engineering Labs & Workshops', category: 'Consecration', description: 'Traditional puja for machinery, research apparatus, and computer labs.' },
      { name: 'Cultural Studios & Sports', category: 'Sanctification', description: 'Blessings of musical instruments, dance accessories, and athletic gear.' },
      { name: 'University Transport Fleet', category: 'Vahana Puja', description: 'Ceremonial cleaning and garland adornment of campus buses and emergency fleet.' },
    ],
    images: [
      '/images/events/day-09/ayudha-pooja-min.webp',
      '/images/events/day-09/360_F_1715339706_lXW14KIXy6Um6MIoNPVu9OSs0bwkjatG.jpg',
      '/images/events/day-09/Kshitija-MruthyunjayaHand-written-music-book-tamboori-music-instrument-and-IPad-worshipped-on-Ayudha-Puja2019.jpg',
    ],
    date: 'October 19, 2026',
    timing: '9:00 AM – 2:00 PM',
    location: 'Flag Pole',
    participation: 'All faculty, research scholars, staff, and students',
  },
  {
    id: 'day-10',
    day: 10,
    title: 'Vijayadashami Grand Finale',
    tagline: 'Vijaya Prapti',
    subtitle: 'Triumph of Dharma & Culmination',
    description: 'The triumphant culmination of the 10-day Shakti Mahotsav featuring final auspicious alankaram, grand Visarjan procession, and Ram Leela enactments.',
    culturalContext: 'Vijaya Prapti celebrates the final victory of righteousness over ignorance. The sacred immersion (Visarjan) marks a fond farewell filled with gratitude and blessings.',
    highlights: [
      'Farewell Maha Alankaram',
      'Grand Visarjan Shobha Yatra',
      'Ram Leela & Ravan Dahan',
    ],
    programs: [
      { name: 'Farewell Maha Alankaram', category: 'Divine Darshan', description: 'Grand final darshan of the sovereign Mother Sri Raja Rajeswari Devi.' },
      { name: 'Grand Visarjan Shobha Yatra', category: 'Procession', description: 'Color-filled university-wide farewell procession with celebratory music and flowers.' },
      { name: 'Ram Leela & Ravan Dahan', category: 'Dramatic Finale', description: 'Theatrical depiction of victory and symbolic effigy illumination.' },
    ],
    images: [
      '/images/events/day-10/visarjan.jpg',
      '/images/events/day-10/dfa5c2f8-dee6-49d7-b65e-b2eee43bacec.jpg',
      '/images/events/day-10/SaveClip.App_653398678_17988930617785769_2596859082433635963_n.jpg',
    ],
    date: 'October 20, 2026',
    timing: '4:00 PM – 9:30 PM',
    location: 'Flag Pole',
    participation: 'All university community, families, and honored dignitaries',
  },
];
