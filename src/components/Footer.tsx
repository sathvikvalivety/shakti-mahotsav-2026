import React from 'react';
import { Sparkles, Heart, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="relative z-20 border-t border-[#D4A84F]/20 bg-[#040D1A]/95 text-[#F8F2E3] py-14 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Core Philosophical Motto from prompt */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84F]">
            <Sparkles size={14} />
            <span>ANNUAL CULTURAL MAHOTSAV</span>
            <Sparkles size={14} />
          </div>

          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#F8F2E3]">
            “Different People · Different Talents · One Shakti”
          </h3>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#F8F2E3]/70 font-subheading italic">
            Celebrating ten days of divine rhythm, boundless cultural expression, and sacred community under the celestial lunar cycle.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F8F2E3]/80 pt-2">
          <button onClick={() => onNavigateSection('home')} className="hover:text-[#F5D58A] transition-colors">
            Home
          </button>
          <span>·</span>
          <button onClick={() => onNavigateSection('about')} className="hover:text-[#F5D58A] transition-colors">
            About Festival
          </button>
          <span>·</span>
          <button onClick={() => onNavigateSection('events')} className="hover:text-[#F5D58A] transition-colors text-[#F5D58A] font-semibold">
            10 Alankarams Lineup
          </button>
          <span>·</span>
          <button onClick={() => onNavigateSection('gallery')} className="hover:text-[#F5D58A] transition-colors">
            Sacred Gallery
          </button>
          <span>·</span>
          <button onClick={() => onNavigateSection('team')} className="hover:text-[#F5D58A] transition-colors">
            Organizing Committee
          </button>
          <span>·</span>
          <button onClick={() => onNavigateSection('suggestions')} className="hover:text-[#F5D58A] transition-colors">
            Student Suggestions
          </button>
        </div>

        {/* Festival Venue & Timing Stamp */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F8F2E3]/60 pt-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#D4A84F]" />
            <span>Central University Amphitheater & Sacred Grounds</span>
          </div>
          <span>|</span>
          <div>October 11 – October 20, 2026</div>
        </div>

        {/* Bottom Fine Print */}
        <div className="pt-6 border-t border-[#D4A84F]/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F8F2E3]/50 gap-3">
          <div>
            © 2026 Shakti Mahotsav Cultural Council. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Devotedly curated with</span>
            <Heart size={11} className="text-rose-400 fill-current" />
            <span>for the ten sacred days of Navratri Mahotsav.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
