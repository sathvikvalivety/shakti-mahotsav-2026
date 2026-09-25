import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { FestivalBackground } from '../components/FestivalBackground/FestivalBackground';

interface FacultyMember {
  name: string;
  role: string;
  initial: string;
  img?: string;
}

const FACULTY_ADVISORS: FacultyMember[] = [
  { name: 'Dr. Sabari Kumar', role: 'Faculty Coordinator', initial: 'SK', img: '/images/team/sabari.png' },
];

const TEAM_DEPARTMENTS = [
  'Coordinators',
  'Technical Team',
  'Decor Team',
  'Garba and Dandiya',
  'Finance and Reporting',
  'PR Team',
  'Mandapam Team',
  'Food Team',
  'Shopping Team',
  'Volunteers',
];

const LotusDivider: React.FC = () => (
  <div className="flex items-center gap-3" aria-hidden="true">
    <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4A84F]/40" />
    <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#D4A84F] shrink-0">
      <path d="M7 0.5 8.6 5.4 13.5 7 8.6 8.6 7 13.5 5.4 8.6 0.5 7 5.4 5.4Z" fill="currentColor" />
    </svg>
    <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4A84F]/40" />
  </div>
);

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="relative min-h-screen bg-[#020817] text-[#F8F2E3] overflow-x-clip">
      <FestivalBackground />

      {/* ── Desktop-only glass navbar ── */}
      <header className="hidden md:flex sticky top-0 z-40 w-full
        bg-[rgba(3,10,28,0.55)] backdrop-blur-md
        border-b border-[#D4A84F]/15 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center gap-4
          px-[clamp(14px,2.4vw,52px)]">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#E6C27A] hover:text-[#F5D58A]
              transition-colors cursor-pointer group"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-manrope text-[12px] font-semibold uppercase tracking-[0.2em]">Back</span>
          </button>
          <div className="h-5 w-px bg-[#D4A84F]/30 mx-1" />
          <span className="font-cormorant font-semibold text-[18px] tracking-wide text-[#F8EFDD]">
            Shakti Mahotsav 2026
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Users size={16} className="text-[#D4A84F]" />
            <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A84F]">
              The Team
            </span>
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-20">

        {/* Mobile back */}
        <button
          onClick={() => navigate('/')}
          aria-label="Back to home"
          className="md:hidden flex items-center gap-2 mb-8
            text-[#E6C27A] hover:text-[#F5D58A] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-manrope text-[11px] font-semibold uppercase tracking-[0.2em]">Back to Home</span>
        </button>

        {/* Hero heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-14">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.4em] text-[#E6C27A]">
            Shakti Mahotsav 2026
          </p>
          <LotusDivider />
          <h1 className="font-cormorant font-semibold text-[clamp(34px,6vw,64px)] leading-tight
            text-[#F0DDB0] [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
            Meet our Fabulous Team
          </h1>
          <p className="font-manrope text-[13px] sm:text-[15px] text-[#F8F2E3]/70
            max-w-sm sm:max-w-xl mx-auto leading-relaxed px-2">
            A passionate group of students, faculty, and cultural coordinators united
            by devotion and a love for celebration.
          </p>
          <LotusDivider />
        </div>

        {/* Faculty Advisor */}
        <section className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A84F] shrink-0" />
            <h2 className="font-manrope text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5D58A]">
              Faculty Advisor
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4A84F]/30 to-transparent" />
          </div>

          <div className="flex justify-center">
            {FACULTY_ADVISORS.map((member) => (
              <div
                key={member.name}
                className="relative rounded-2xl overflow-hidden border border-[#D4A84F]/30
                  hover:border-[#D4A84F]/60 transition-all group
                  w-full max-w-[260px] aspect-[3/4]"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top
                    transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 px-4 py-4
                  bg-gradient-to-t from-[#020817]/95 via-[#020817]/60 to-transparent">
                  <p className="font-cormorant font-semibold text-[18px] text-[#F8EFDD] leading-tight">
                    {member.name}
                  </p>
                  <p className="font-manrope text-[11px] text-[#D4A84F] mt-0.5 tracking-wide">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Departments */}
        <section className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#D4A84F] shrink-0" />
            <h2 className="font-manrope text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5D58A]">
              Coordinators
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#D4A84F]/30 to-transparent" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {TEAM_DEPARTMENTS.map((dept) => (
              <div
                key={dept}
                className="flex items-center justify-center text-center
                  px-4 py-5 rounded-2xl
                  bg-gradient-to-b from-[#0E2548]/60 to-[#040D1A]
                  border border-[#D4A84F]/20 hover:border-[#D4A84F]/50
                  hover:bg-[#07172E]/80 transition-all group cursor-default"
              >
                <div>
                  <span className="block text-[#D4A84F] text-[10px] mb-1.5" aria-hidden="true">✦</span>
                  <p className="font-cormorant font-semibold text-[15px] sm:text-[16px]
                    text-[#F8EFDD] leading-tight group-hover:text-[#F5D58A] transition-colors">
                    {dept}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <section>
          <div className="p-6 sm:p-10 rounded-2xl text-center
            bg-gradient-to-br from-[#0E2548]/80 via-[#07172E] to-[#040D1A]
            border border-[#D4A84F]/35 shadow-[0_0_40px_rgba(212,168,79,0.08)]">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A84F]/50" />
              <span className="text-[#D4A84F] text-xs">✦</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A84F]/50" />
            </div>
            <h3 className="font-cormorant font-semibold text-[22px] sm:text-[30px] text-[#F0DDB0] mb-3 leading-snug">
              Wanna organise? or Dance?<br className="hidden sm:block" /> or Lead from the front?
            </h3>
            <p className="font-manrope text-[12px] sm:text-[13px] text-[#F8F2E3]/60
              mb-7 max-w-md mx-auto leading-relaxed">
              Design stuff? Take part in spiritual recitations?<br />
              There's a place for every passion here.
            </p>
            <a
              href="mailto:shakthi.mahotsav@ch.amrita.edu"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full
                bg-gradient-to-r from-[#C9943E] via-[#F5D58A] to-[#C9943E]
                text-[#061426] font-manrope font-bold
                text-[11px] sm:text-[12px] uppercase tracking-widest
                shadow-[0_0_20px_rgba(212,168,79,0.3)]
                hover:shadow-[0_0_32px_rgba(245,213,138,0.5)]
                hover:scale-[1.04] active:scale-[0.97]
                transition-all cursor-pointer"
            >
              Join Us →
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};
