import React, { useState } from 'react';
import { Sparkles, Calendar, Menu, X, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onOpenRegister: () => void;
  onNavigateSection: (section: string) => void;
  activeSection: string;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onNavigateSection,
  activeSection,
  isAudioPlaying = false,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'team', label: 'Team' },
    { id: 'suggestions', label: 'Suggestions' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#061426]/80 border-b border-[#D4A84F]/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="btn-brand-logo"
          onClick={() => onNavigateSection('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          {/* Sacred Diya / Lunar Emblem */}
          <div className="w-10 h-10 rounded-full border border-[#D4A84F]/40 flex items-center justify-center bg-[#0B1F3A] relative group-hover:border-[#F5D58A] transition-colors shadow-[0_0_15px_rgba(212,168,79,0.2)]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5D58A] animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-dashed border-[#D4A84F]/30 animate-spin-slow" />
          </div>

          <div>
            <div className="font-heading text-lg sm:text-xl font-bold tracking-wider text-[#F8F2E3] group-hover:text-[#F5D58A] transition-colors leading-tight">
              SHAKTI MAHOTSAV
            </div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#D4A84F] font-semibold flex items-center gap-1.5">
              <span>2026</span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#D4A84F]/60" />
              <span className="text-[#F8F2E3]/70 font-normal">Oct 11 – Oct 20</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isSelected = activeSection === item.id || (item.id === 'events' && activeSection === 'events');
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors ${
                  isSelected
                    ? 'text-[#F5D58A] font-semibold'
                    : 'text-[#F8F2E3]/80 hover:text-[#F8F2E3]'
                }`}
              >
                <span>{item.label}</span>
                {/* Elegant golden underline for Events / selected item */}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A84F] to-transparent shadow-[0_0_8px_rgba(212,168,79,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Ambient Chimes/Sound Toggle (Optional atmosphere) */}
          {onToggleAudio && (
            <button
              id="btn-toggle-sound"
              onClick={onToggleAudio}
              className="p-2.5 rounded-full border border-[#D4A84F]/25 bg-[#0B1F3A]/60 text-[#F5D58A] hover:bg-[#142B4F] hover:border-[#D4A84F]/50 transition-all text-xs flex items-center justify-center"
              title={isAudioPlaying ? "Mute Celestial Atmosphere" : "Play Celestial Atmosphere"}
              aria-label="Toggle ambient atmosphere sound"
            >
              {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          )}

          {/* REGISTER NOW Button */}
          <button
            id="btn-register-header"
            onClick={onOpenRegister}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F] text-[#061426] text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(212,168,79,0.35)] hover:shadow-[0_0_28px_rgba(245,213,138,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <span className="text-sm leading-none font-bold">→</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#F8F2E3] hover:bg-[#0B1F3A] border border-[#D4A84F]/20"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1F3A] border-b border-[#D4A84F]/25 px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigateSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-md text-base text-[#F8F2E3]/90 hover:bg-[#142B4F] hover:text-[#F5D58A] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#D4A84F]/15">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <span>REGISTER NOW</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
