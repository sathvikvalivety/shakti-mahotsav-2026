import React from 'react';
import { Sparkles, Heart, MapPin, Mail, Phone, Calendar, Flame, ArrowUp, Compass, Users, Image as ImageIcon, Award, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-[#D4A84F]/25 bg-gradient-to-b from-[#040D1A]/95 via-[#020817]/98 to-[#01040D] text-[#F8F2E3] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20 backdrop-blur-md">
      {/* Decorative Golden Ambient Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D4A84F]/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D4A84F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* TOP BRANDING & SACRED MOTTO */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-[0.25em] text-[#F5D58A]">
            <Flame size={14} className="text-[#D4A84F]" />
            <span>AMRITA VISHWA VIDYAPEETHAM</span>
            <Flame size={14} className="text-[#D4A84F]" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F8F2E3] via-[#F5D58A] to-[#D4A84F]">
            SHAKTI MAHOTSAV 2026
          </h2>

          <p className="font-heading text-base sm:text-lg md:text-xl font-medium tracking-wide text-[#F5D58A]/90 italic">
            “Different People · Different Talents · One Shakti”
          </p>

          <p className="text-xs sm:text-sm text-[#F8F2E3]/70 font-subheading leading-relaxed max-w-2xl mx-auto">
            Celebrating ten celestial nights of divine energy, artistic devotion, classical rhythms, and sacred community across the ten Alankarams of Sri Durga Parameshwari.
          </p>
        </div>

        {/* 4-COLUMN RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-6 border-t border-[#D4A84F]/15">
          {/* Column 1: Festival Dates & Venue */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#F5D58A] flex items-center gap-2">
              <Calendar size={15} className="text-[#D4A84F]" />
              <span>Sacred Dates & Venue</span>
            </h4>
            <div className="space-y-2.5 text-xs text-[#F8F2E3]/80">
              <p className="font-medium text-[#F8F2E3] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A84F]" />
                October 11 – October 20, 2026
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4A84F] shrink-0 mt-0.5" />
                <span>Grand Amphitheater & Sacred Cultural Arena, Amrita Campus</span>
              </p>
              <p className="text-[#F8F2E3]/60 italic pl-5.5">
                Evening Celebrations start daily at 6:30 PM IST with sacred Maha Deeparadhana.
              </p>
            </div>
          </div>

          {/* Column 2: Festival Exploration */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#F5D58A] flex items-center gap-2">
              <Compass size={15} className="text-[#D4A84F]" />
              <span>Explore Mahotsav</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <span className="text-[#D4A84F]">›</span> Sacred Goddess Stage (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <span className="text-[#D4A84F]">›</span> Essence & 9 Divine Forms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('events')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150 font-medium text-[#F5D58A]"
                >
                  <span className="text-[#D4A84F]">›</span> 10 Sacred Night Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('schedule')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <span className="text-[#D4A84F]">›</span> Lunar Orbit Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Highlights */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#F5D58A] flex items-center gap-2">
              <Users size={15} className="text-[#D4A84F]" />
              <span>Community & Culture</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('gallery')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <ImageIcon size={13} className="text-[#D4A84F]" /> Sacred Moments Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('sponsors')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <Award size={13} className="text-[#D4A84F]" /> Patrons & University Sponsors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('team')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <Users size={13} className="text-[#D4A84F]" /> Organizing Committee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('suggestions')}
                  className="hover:text-[#F5D58A] transition-colors cursor-pointer text-[#F8F2E3]/80 hover:translate-x-1 inline-flex items-center gap-1.5 duration-150"
                >
                  <MessageSquare size={13} className="text-[#D4A84F]" /> Student Feedback & Ideas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Help Desk */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#F5D58A] flex items-center gap-2">
              <Sparkles size={15} className="text-[#D4A84F]" />
              <span>Festival Help Desk</span>
            </h4>
            <div className="space-y-2.5 text-xs text-[#F8F2E3]/80">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#D4A84F] shrink-0" />
                <a href="mailto:shaktimahotsav@amrita.edu" className="hover:text-[#F5D58A] transition-colors">
                  shaktimahotsav@amrita.edu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D4A84F] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#F5D58A] transition-colors">
                  +91 (0422) 2685 000
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateSection('connect')}
                  className="w-full py-2 px-3.5 rounded-lg bg-[#D4A84F]/15 border border-[#D4A84F]/40 text-[#F5D58A] hover:bg-[#D4A84F]/25 transition-all text-xs font-semibold text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Connect With Us</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SACRED BANNER & COPYRIGHT */}
        <div className="pt-8 border-t border-[#D4A84F]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F8F2E3]/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 Shakti Mahotsav Committee, Amrita Vishwa Vidyapeetham.</span>
            <span className="hidden sm:inline">·</span>
            <span>All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#F8F2E3]/70">
              <span>Celebrated with</span>
              <Heart size={13} className="text-rose-400 fill-current animate-pulse" />
              <span>under Divine Grace</span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-full bg-[#0B1F3A]/80 border border-[#D4A84F]/30 text-[#F5D58A] hover:bg-[#D4A84F]/20 hover:text-white transition-all cursor-pointer shadow-lg"
              title="Back to Top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
