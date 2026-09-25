import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenRegister?: () => void;
  onNavigateSection: (section: string) => void;
  activeSection: string;
}

// Visible keyboard focus for every control in the bar.
const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#E6C27A]';

// Contact opens the existing "connect" panel; Sponsors stays in the footer.
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'team', label: 'Team' },
  { id: 'connect', label: 'Contact' },
];

const AmritaLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`items-center ${className}`}>
    <img
      src="/images/brand/amrita-logo.svg"
      alt="Amrita Vishwa Vidyapeetham"
      className="h-[clamp(24px,2vw,36px)] w-auto"
      width={244}
      height={55}
    />
  </div>
);

export const Header: React.FC<HeaderProps> = ({
  onNavigateSection,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerNavigate = useNavigate();

  const navigate = (section: string) => {
    if (section === 'team') {
      routerNavigate('/team');
      setMobileMenuOpen(false);
      return;
    }
    if (section === 'gallery') {
      routerNavigate('/gallery');
      setMobileMenuOpen(false);
      return;
    }
    onNavigateSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[rgba(3,10,28,0.55)] backdrop-blur-md border-b border-[#D4A84F]/15 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">

      <div className="relative mx-auto flex h-[var(--site-header-h)] max-w-[1920px] items-center gap-[clamp(10px,1.4vw,32px)] px-[clamp(14px,2.4vw,52px)]">
        {/* Festival branding */}
        <button
          id="btn-brand-logo"
          onClick={() => navigate('home')}
          className={`group flex shrink-0 flex-col items-center rounded-sm text-center leading-none cursor-pointer ${FOCUS_RING}`}
          aria-label="Shakti Mahotsav 2026 — go to Home"
        >
          <span className="hidden md:block font-manrope font-semibold uppercase text-[clamp(7.5px,0.55vw,10px)] tracking-[0.28em] text-[#D4A84F]">
            A Festival of Culture &amp; Community
          </span>
          <span className="font-heading text-[15px] min-[400px]:text-[17px] md:text-[clamp(18px,1.6vw,30px)] tracking-[0.06em] text-[#F8F2E3] group-hover:text-[#F5D58A] transition-colors md:mt-[0.3em]">
            SHAKTI MAHOTSAV
          </span>
          <span className="mt-[0.25em] flex items-center gap-1.5 font-heading text-[11px] md:text-[clamp(11px,0.9vw,16px)] tracking-[0.2em] text-[#E6C27A]">
            <span className="h-px w-[clamp(14px,1.9vw,38px)] bg-gradient-to-r from-transparent to-[#D4A84F]" />
            <span className="text-[0.7em]">✦</span>
            <span>2026</span>
            <span className="text-[0.7em]">✦</span>
            <span className="h-px w-[clamp(14px,1.9vw,38px)] bg-gradient-to-l from-transparent to-[#D4A84F]" />
          </span>
          <span className="hidden md:block mt-[0.45em] font-manrope uppercase text-[clamp(7px,0.5vw,9.5px)] tracking-[0.34em] text-[#F8F2E3]/80">
            Culture · Devotion · Togetherness
          </span>
        </button>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden min-[1200px]:flex flex-1 items-center justify-center gap-[clamp(14px,1.9vw,40px)]"
        >
          {NAV_ITEMS.map((item) => {
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => navigate(item.id)}
                aria-current={isSelected ? 'true' : undefined}
                className={`group relative py-2 font-cormorant font-semibold text-[clamp(16px,1.12vw,21px)] tracking-wide transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING} ${
                  isSelected
                    ? 'text-[#F5D58A] [text-shadow:0_0_14px_rgba(245,213,138,0.3)]'
                    : 'text-[#F8EFDD]/90 hover:text-[#E6C27A]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -left-1 -right-1 bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#E6C27A] to-transparent transition-opacity duration-[250ms] ${
                    isSelected ? 'opacity-100 shadow-[0_0_6px_rgba(230,194,122,0.45)]' : 'opacity-0 group-hover:opacity-50'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-[clamp(10px,1.25vw,24px)] min-[1200px]:ml-0">
          <AmritaLogo className="hidden md:flex" />

          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`min-[1200px]:hidden rounded-[8px] border border-[#C9A55A]/55 bg-[rgba(3,12,32,0.45)] p-2 text-[#EBD3A0] hover:border-[#E6C27A] transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING}`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} className="text-[#F5D58A]" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu drawer (below 1200px) */}
      {mobileMenuOpen && (
        <div className="relative min-[1200px]:hidden border-t border-[#D4A84F]/[0.12] bg-[rgba(3,12,32,0.9)] px-4 pt-3 pb-5 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav aria-label="Primary" className="grid sm:grid-cols-2 sm:gap-x-8">
            {NAV_ITEMS.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`flex w-full items-center gap-2 border-b border-[#D4A84F]/10 px-1 py-2.5 text-left font-cormorant font-semibold text-lg transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING} ${
                    isSelected ? 'text-[#F5D58A]' : 'text-[#F8EFDD]/90 hover:text-[#E6C27A]'
                  }`}
                >
                  {item.label}
                  {isSelected && <span className="text-[0.6em] text-[#D4A84F]" aria-hidden="true">✦</span>}
                </button>
              );
            })}
          </nav>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#D4A84F]/[0.12] pt-3 md:hidden">
            <AmritaLogo className="flex md:hidden" />
          </div>
        </div>
      )}
    </header>
  );
};
