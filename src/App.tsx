/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FESTIVAL_CONFIG, FESTIVAL_EVENTS } from './data/festivalData';
import { FestivalEvent } from './types';
import { FestivalBackground } from './components/FestivalBackground';
import { SacredHero } from './components/SacredHero';
import { AboutSection } from './components/About';
import { Header } from './components/Header';
import { CenterEventInfo } from './components/CenterEventDisplay';
import { LunarOrbitTimeline } from './components/LunarOrbitTimeline';
import { NavadurgaGuide } from './components/NavadurgaGuide';
import { Footer } from './components/Footer';
import { EventDetailsModal } from './components/EventDetailsModal';
import { RegistrationModal } from './components/RegistrationModal';
import { InfoModal } from './components/InfoModal';
import { celestialAudio } from './utils/audio';
import { Sparkles, Play } from 'lucide-react';

export default function App() {
  // ====================================================
  // CONFIGURATION SECTION (Default fixed configuration)
  // ====================================================
  const [autoPlayInterval] = useState<number>(5000); // 5s play speed
  const [loopAtEnd] = useState<boolean>(true); // Option A: Loop to Day 1

  // ====================================================
  // REAL DATE DETECTION
  // ====================================================
  // Festival runs from October 11, 2026 to October 20, 2026 (10 Days)
  const getFestivalDayForDate = (date: Date): number | null => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed, Oct = 9
    const dayOfMonth = date.getDate();

    // Check if within October 11 to October 20
    if (month === 9 && dayOfMonth >= 11 && dayOfMonth <= 20) {
      return dayOfMonth - 11 + 1; // Oct 11 -> 1, Oct 12 -> 2, ..., Oct 20 -> 10
    }
    return null; // Outside festival dates
  };

  const [isRealDateMode] = useState<boolean>(true); // Real Calendar Mode enabled

  // Central active day state: defaults to Day 1 (Sri Bala Tripura Sundari Devi)
  const [activeDay, setActiveDayState] = useState<number>(() => {
    const detectedDay = getFestivalDayForDate(new Date());
    return detectedDay !== null ? detectedDay : 1;
  });

  // Timeline playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPausedByUser, setIsPausedByUser] = useState<boolean>(true);

  // Modals state
  const [selectedEventModal, setSelectedEventModal] = useState<FestivalEvent | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [activeInfoSection, setActiveInfoSection] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Navigation handler
  const handleNavigateSection = useCallback((section: string) => {
    setActiveSection(section);
    if (section === 'home') {
      setActiveInfoSection(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'about' || section === 'events' || section === 'schedule') {
      setActiveInfoSection(null);
      const targetId = { about: 'about-section', events: 'events-section', schedule: 'schedule-section' }[section];
      const eventsEl = document.getElementById(targetId);
      if (eventsEl) {
        eventsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } else {
      // 'gallery', 'sponsors', 'connect', 'team', 'suggestions'
      setActiveInfoSection(section);
    }
  }, []);

  // Sync active navigation state based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (activeInfoSection) return;
      const eventsEl = document.getElementById('events-section');
      const aboutEl = document.getElementById('about-section');
      if (eventsEl && eventsEl.getBoundingClientRect().top <= 250) {
        setActiveSection('events');
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= 250) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeInfoSection]);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false); // disable automatic transitions if reduced motion requested
    }
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // ====================================================
  // ANIMATION ENGINE CORE FUNCTIONS
  // ====================================================

  /**
   * Sets the active day and triggers smooth transition (1 to 10)
   */
  const setActiveDay = useCallback((day: number) => {
    if (day < 1) day = 10;
    if (day > 10) day = 1;
    setActiveDayState(day);
  }, []);

  /**
   * Advance to next day (Day 1 -> Day 2 -> ... -> Day 10)
   */
  const nextDay = useCallback(() => {
    setActiveDayState((current) => {
      if (current === 10) {
        if (loopAtEnd) {
          return 1;
        } else {
          // Option B: Stop at Day 10 and pause timeline
          setIsPlaying(false);
          return 10;
        }
      }
      return current + 1;
    });
  }, [loopAtEnd]);

  /**
   * Move to previous festival day
   */
  const previousDay = useCallback(() => {
    setActiveDayState((current) => (current === 1 ? 10 : current - 1));
  }, []);

  /**
   * Start or resume the timeline
   */
  const startTimeline = useCallback(() => {
    setIsPlaying(true);
    setIsPausedByUser(false);
  }, []);

  /**
   * Pause the automatic timeline
   */
  const pauseTimeline = useCallback(() => {
    setIsPlaying(false);
  }, []);

  /**
   * Resume the automatic animation after user manual interaction
   */
  const resumeTimeline = useCallback(() => {
    setIsPlaying(true);
    setIsPausedByUser(false);
  }, []);

  /**
   * Handle user manual moon click
   * Pauses auto timeline, activates selected moon, allows "Resume" later
   */
  const handleUserSelectMoon = useCallback(
    (day: number) => {
      setActiveDay(day);
      setIsPlaying(false);
      setIsPausedByUser(true);
    },
    [setActiveDay]
  );

  // Automatic timeline interval effect
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextDay();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, autoPlayInterval, nextDay, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextDay();
        setIsPlaying(false);
        setIsPausedByUser(true);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousDay();
        setIsPlaying(false);
        setIsPausedByUser(true);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (isPlaying) {
          pauseTimeline();
          setIsPausedByUser(true);
        } else {
          resumeTimeline();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextDay, previousDay, isPlaying, pauseTimeline, resumeTimeline]);

  // Audio atmosphere toggle
  const handleToggleAudio = () => {
    const active = celestialAudio.toggle();
    setIsAudioPlaying(active);
  };

  return (
    <div className="relative min-h-screen bg-[#020817] text-[#F8F2E3] overflow-x-hidden">
      {/* Fixed night-sky background behind every section */}
      <FestivalBackground />

      {/* Sticky Top Header / Menu Bar */}
      <Header
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Home hero: goddess stage with the hero heading and active event card */}
        <SacredHero
          event={FESTIVAL_EVENTS.find((e) => e.day === activeDay) || FESTIVAL_EVENTS[0]}
          onViewDetails={(evt) => setSelectedEventModal(evt)}
          onExplore={() => handleNavigateSection('about')}
        />

        {/* About: what Shakti Mahotsav is, and the "More Than a Festival" stories */}
        <AboutSection />

        {/* Main Content: Side-by-side Layout for Lunar Orbit Timeline & Navadurga Guide */}
        <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <section id="events-section" className="scroll-mt-28">
            {/* Event lineup label */}
            <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 select-none">
              {/* Small label: Manrope SemiBold — 10–11px */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A84F]/30 bg-[#0B1F3A]/60 backdrop-blur-md font-manrope font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#F5D58A]">
                <Sparkles size={13} className="text-[#D4A84F]" />
                <span>EVENT LINEUP · 10 SACRED DAYS · 10 ALANKARAMS</span>
              </div>

              {/* Timeline Playback Status Banner */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#F8F2E3]/70">
                {isPausedByUser && (
                  <button
                    onClick={resumeTimeline}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4A84F]/20 border border-[#D4A84F]/60 text-[#F5D58A] hover:bg-[#D4A84F]/30 transition-all font-medium animate-pulse cursor-pointer"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Resume Timeline</span>
                  </button>
                )}

                <div className="flex items-center gap-2 bg-[#0B1F3A]/70 px-3.5 py-1 rounded-full border border-[#D4A84F]/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[#F5D58A] font-semibold">Active Night {activeDay}</span>
                  <span className="text-[#F8F2E3]/40">·</span>
                  <span className="text-[#F8F2E3]/90">
                    {FESTIVAL_EVENTS.find((e) => e.day === activeDay)?.title || FESTIVAL_EVENTS[0].title}
                  </span>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT: LUNAR ORBIT LINEUP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start pb-12">
              {/* Left: Lunar Orbit Timeline (7 cols on desktop) */}
              <div id="schedule-section" className="scroll-mt-28 lg:col-span-7 xl:col-span-7 w-full">
                <LunarOrbitTimeline
                  events={FESTIVAL_EVENTS}
                  activeDay={activeDay}
                  onSelectDay={handleUserSelectMoon}
                  onPrevDay={() => {
                    previousDay();
                    setIsPlaying(false);
                    setIsPausedByUser(true);
                  }}
                  onNextDay={() => {
                    nextDay();
                    setIsPlaying(false);
                    setIsPausedByUser(true);
                  }}
                  isPlaying={isPlaying}
                  onTogglePlay={() => {
                    if (isPlaying) {
                      pauseTimeline();
                      setIsPausedByUser(true);
                    } else {
                      resumeTimeline();
                    }
                  }}
                  onViewDetails={(evt) => setSelectedEventModal(evt)}
                  isPausedByUser={isPausedByUser}
                  onResumeTimeline={resumeTimeline}
                />
              </div>

              {/* Right: Active Event Details (Top) + Synchronized Navadurga 1x1 Carousel (Bottom) */}
              <div className="lg:col-span-5 xl:col-span-5 w-full space-y-6">
                {/* Active Event Information Card */}
                <CenterEventInfo
                  event={FESTIVAL_EVENTS.find((e) => e.day === activeDay) || FESTIVAL_EVENTS[0]}
                  onViewDetails={(evt) => setSelectedEventModal(evt)}
                  isFinalNightReached={activeDay === 9 && !loopAtEnd && !isPlaying}
                />

                {/* 1x1 Carousel Card for Navadurga Guide */}
                <NavadurgaGuide
                  activeDay={activeDay}
                  onSelectDay={handleUserSelectMoon}
                  onViewDetails={(evt) => setSelectedEventModal(evt)}
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer onNavigateSection={handleNavigateSection} />
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEventModal}
        isOpen={Boolean(selectedEventModal)}
        onClose={() => setSelectedEventModal(null)}
        onRegister={(day) => {
          setSelectedEventModal(null);
          setIsRegisterOpen(true);
        }}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        selectedDay={activeDay}
      />

      {/* About / Gallery / Sponsors / Connect / Team / Suggestions Modal */}
      <InfoModal
        section={activeInfoSection}
        onClose={() => {
          setActiveInfoSection(null);
          const eventsEl = document.getElementById('events-section');
          if (eventsEl && eventsEl.getBoundingClientRect().top <= 250) {
            setActiveSection('events');
          } else {
            setActiveSection('home');
          }
        }}
        onRegister={() => setIsRegisterOpen(true)}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
