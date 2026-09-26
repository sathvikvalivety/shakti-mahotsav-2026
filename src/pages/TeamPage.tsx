import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { FestivalBackground } from '../components/FestivalBackground/FestivalBackground';

interface TeamMember {
  name: string;
}

interface TeamDepartment {
  title: string;
  members: TeamMember[];
}

const TEAM: TeamDepartment[] = [
  {
    title: 'Faculty Coordinator',
    members: [
      { name: 'K Sabari' },
      { name: 'Sitadevi Bharatula' },
    ],
  },
  {
    title: 'Core',
    members: [
      { name: 'Praveen Preetham' },
      { name: 'Vivek Reddy' },
      { name: 'Monish' },
      { name: 'Phani Chandan Reddy' },
      { name: 'Ajay' },
    ],
  },
  {
    title: 'Technical Team',
    members: [
      { name: 'Jaswanth Satya' },
      { name: 'Valivety Sathvik' },
      { name: 'Sai Keerthan' },
      { name: 'Ketan' },
      { name: 'Varshit Reddy' },
      { name: 'Marisetti Avinash' },
    ],
  },
  {
    title: 'Finance',
    members: [
      { name: 'Durga Prasad' },
    ],
  },
  {
    title: 'Sponsors',
    members: [
      { name: 'Bhoomika M' },
    ],
  },
  {
    title: 'Videography & Photo',
    members: [
      { name: 'Abhijith Reddy' },
      { name: 'Raj Kushal' },
      { name: 'Shreyas Reddy' },
      { name: 'Brahmadath' },
    ],
  },
  {
    title: 'Decoration',
    members: [
      { name: 'Ayila Susmitha' },
      { name: 'Bhoomika' },
      { name: 'Manisree' },
      { name: 'Archanaa' },
      { name: 'Moulyasri' },
      { name: 'Madhumita' },
      { name: 'Hema' },
      { name: 'Chaarvi Sree' },
    ],
  },
  {
    title: 'Discipline',
    members: [
      { name: 'Navaneeswar Reddy' },
      { name: 'Abishek' },
      { name: 'Sanjay' },
    ],
  },
  {
    title: 'Management',
    members: [
      { name: 'Ravi' },
      { name: 'Koushik' },
      { name: 'Jenith Sai' },
      { name: 'Adarsh' },
      { name: 'Akshay' },
      { name: 'Shafique' },
      { name: 'Siddhesh' },
      { name: 'Pavan Ganesh' },
    ],
  },
  {
    title: 'Events',
    members: [
      { name: 'Sri Dhanya' },
      { name: 'Mimansa' },
      { name: 'Samridhi' },
    ],
  },
];

const SpotlightCard: React.FC<{ isLarge: boolean; index: number; children: React.ReactNode }> = ({ isLarge, index, children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(s => ({ ...s, opacity: 0 }))}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl border border-[#D4A84F]/20 bg-[#0B1A30]/60 backdrop-blur-sm p-4 sm:p-6 transition-colors duration-300 hover:border-[#D4A84F]/50
        ${isLarge ? 'col-span-2 lg:col-span-2' : 'col-span-1'}`}
    >
      {/* Spotlight radial glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(180px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212,168,79,0.12), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020817] text-[#F8F2E3] overflow-x-hidden">
      <FestivalBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[#D4A84F] hover:text-[#F5D58A] transition-colors text-sm font-manrope font-medium mb-10 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.25em] text-[#F5D58A]">
            <Flame size={13} className="text-[#D4A84F]" />
            <span>Shakti Mahotsav 2026</span>
            <Flame size={13} className="text-[#D4A84F]" />
          </div>

          <h1 className="font-heading text-[clamp(32px,5vw,60px)] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F8F2E3] via-[#F5D58A] to-[#D4A84F]">
            Our Team
          </h1>

          <p className="font-cormorant text-lg text-[#F8F2E3]/60 italic max-w-xl mx-auto">
            The dedicated souls behind every sacred night
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4A84F]/50" />
            <span className="text-[#D4A84F] text-sm">✦</span>
            <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4A84F]/50" />
          </div>
        </div>

        {/* Faculty Coordinator — full-width hero card */}
        {TEAM.filter(d => d.title === 'Faculty Coordinator').map((dept) => (
          <div
            key={dept.title}
            className="mb-6 rounded-2xl border border-[#D4A84F]/40 bg-gradient-to-r from-[#0B1A30]/80 via-[#0F2040]/80 to-[#0B1A30]/80 backdrop-blur-sm px-8 py-6 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-[#F5D58A] to-[#D4A84F]" />
              <h2 className="font-heading text-sm font-bold uppercase tracking-[0.22em] text-[#F5D58A]">
                {dept.title}
              </h2>
            </div>
            <span className="hidden sm:block h-8 w-px bg-[#D4A84F]/25" />
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {dept.members.map((member) => (
                <li key={member.name} className="flex items-center gap-2 text-sm text-[#F8F2E3]/90 font-manrope font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]/80 shrink-0" />
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Department grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 [grid-auto-flow:dense]">
          {TEAM.filter(d => d.title !== 'Faculty Coordinator').map((dept, i) => {
            const isLarge = dept.members.length >= 6;
            return (
              <SpotlightCard
                key={dept.title}
                isLarge={isLarge}
                index={i}
              >
                {/* Department title */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#F5D58A] to-[#D4A84F] shrink-0" />
                  <h2 className="font-heading text-[11px] sm:text-sm font-bold uppercase tracking-[0.18em] text-[#F5D58A] leading-tight">
                    {dept.title}
                  </h2>
                  <span className="ml-auto text-[10px] text-[#D4A84F]/50 font-manrope shrink-0">{dept.members.length}</span>
                </div>

                {/* Members */}
                <ul className={`gap-2 ${isLarge ? 'grid grid-cols-2' : 'flex flex-col'}`}>
                  {dept.members.map((member) => (
                    <li
                      key={member.name}
                      className="flex items-center gap-2 text-[12px] sm:text-sm text-[#F8F2E3]/85 font-manrope"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]/70 shrink-0" />
                      <span className="leading-snug">{member.name}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 text-sm sm:text-base font-manrope text-transparent bg-clip-text bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F]">
          Made with ♥ by Shakti Mahotsav Tech Team
        </div>
      </div>
    </div>
  );
};
