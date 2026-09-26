import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenRegister?: () => void;
  onNavigateSection: (section: string) => void;
  activeSection: string;
}

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#E6C27A]';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'events',   label: 'Events' },
  { id: 'gallery',  label: 'Gallery' },
  { id: 'connect',  label: 'Contact' },
];

const AmritaLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center ${className}`}>
    <img
      src="/images/brand/amrita-logo.svg"
      alt="Amrita Vishwa Vidyapeetham"
      className="h-[clamp(22px,1.8vw,32px)] w-auto"
      width={244}
      height={55}
    />
  </div>
);

export const Header: React.FC<HeaderProps> = ({ onNavigateSection, activeSection }) => {
  const [open, setOpen] = useState(false);
  const routerNavigate = useNavigate();

  const navigate = (section: string) => {
    if (section === 'gallery') { routerNavigate('/gallery'); setOpen(false); return; }
    onNavigateSection(section);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[rgba(3,8,24,0.6)] backdrop-blur-md border-b border-[#D4A84F]/15 shadow-[0_4px_28px_rgba(0,0,0,0.4)]">

      <div className="relative mx-auto flex h-[var(--site-header-h)] max-w-[1920px] items-center gap-[clamp(10px,1.4vw,32px)] px-[clamp(14px,2.4vw,52px)]">

        {/* Logo — left side */}
        <button
          id="btn-brand-logo"
          onClick={() => navigate('home')}
          aria-label="Shakti Mahotsav 2026 — go to Home"
          className={`shrink-0 cursor-pointer rounded-sm ${FOCUS_RING}`}
        >
          <img
            src="/images/brand/shakti-mahotsav-logo.png"
            alt="Shakti Mahotsav"
            className="h-[clamp(60px,6.5vw,96px)] w-auto object-contain animate-logo-breathe"
          />
        </button>

        {/* Desktop navigation — center */}
        <nav
          aria-label="Primary"
          className="hidden min-[1200px]:flex flex-1 items-center justify-center gap-[clamp(4px,1.2vw,28px)]"
        >
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => navigate(item.id)}
                aria-current={active ? 'true' : undefined}
                className={`
                  relative py-2 px-1
                  font-cormorant font-semibold text-[clamp(15px,1.1vw,20px)] tracking-wide
                  transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING}
                  ${active
                    ? 'text-[#F5D58A] [text-shadow:0_0_14px_rgba(245,213,138,0.3)]'
                    : 'text-[#F8EFDD]/90 hover:text-[#E6C27A]'
                  }
                `}
              >
                {item.label}
                {/* Active underline */}
                <span
                  aria-hidden="true"
                  className={`
                    absolute -left-1 -right-1 bottom-0.5 h-px
                    bg-gradient-to-r from-transparent via-[#E6C27A] to-transparent
                    transition-opacity duration-[250ms]
                    ${active ? 'opacity-100 shadow-[0_0_6px_rgba(230,194,122,0.45)]' : 'opacity-0 group-hover:opacity-50'}
                  `}
                />
                {/* Bindi — sacred dot for active section */}
                {active && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 -bottom-px block w-1 h-1 rounded-full bg-[#D4A84F] shadow-[0_0_5px_rgba(212,168,79,0.9)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side: Amrita logo + hamburger */}
        <div className="ml-auto flex shrink-0 items-center gap-[clamp(10px,1.25vw,24px)] min-[1200px]:ml-0">
          <AmritaLogo className="hidden md:flex" />

          <button
            id="btn-mobile-menu"
            onClick={() => setOpen(!open)}
            className={`
              min-[1200px]:hidden rounded-[8px]
              border border-[#C9A55A]/55 bg-[rgba(3,12,32,0.45)]
              p-2 text-[#EBD3A0]
              hover:border-[#E6C27A] transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING}
            `}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} className="text-[#F5D58A]" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="relative min-[1200px]:hidden border-t border-[#D4A84F]/[0.12] bg-[rgba(3,8,24,0.95)] px-4 pt-3 pb-5 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav aria-label="Primary" className="grid sm:grid-cols-2 sm:gap-x-8">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`
                    flex w-full items-center gap-2 border-b border-[#D4A84F]/10
                    px-1 py-2.5 text-left
                    font-cormorant font-semibold text-lg
                    transition-colors duration-[250ms] cursor-pointer ${FOCUS_RING}
                    ${active ? 'text-[#F5D58A]' : 'text-[#F8EFDD]/90 hover:text-[#E6C27A]'}
                  `}
                >
                  {item.label}
                  {active && <span className="text-[0.6em] text-[#D4A84F]" aria-hidden="true">✦</span>}
                </button>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#D4A84F]/[0.12] pt-3 md:hidden">
            <AmritaLogo className="flex" />
          </div>
        </div>
      )}
    </header>
  );
};
