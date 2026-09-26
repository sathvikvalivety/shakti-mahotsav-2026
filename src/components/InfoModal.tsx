import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Send,
  Check,
  Info,
  Handshake,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Award,
  HeartHandshake,
  Flame,
  Globe,
  Share2,
} from 'lucide-react';
import { submitToGoogleSheets } from '../utils/formSubmit';

interface InfoModalProps {
  section: string | null;
  onClose: () => void;
  onRegister: () => void;
  onNavigateSection?: (section: string) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  section,
  onClose,
  onRegister,
  onNavigateSection,
}) => {
  // Suggestions form state
  const [suggestion, setSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  // Connect form state
  const [connectName, setConnectName] = useState('');
  const [connectContact, setConnectContact] = useState('');
  const [connectTopic, setConnectTopic] = useState('passes');
  const [connectMessage, setConnectMessage] = useState('');
  const [connectSubmitted, setConnectSubmitted] = useState(false);

  // Gallery active filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'garba' | 'alankaram' | 'aarti'>('all');

  if (!section || section === 'events' || section === 'home' || section === 'gallery') return null;

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSuggestionSubmitted(true);

    await submitToGoogleSheets({
      formType: 'suggestion',
      category: 'Festival Idea & Recommendation',
      message: suggestion,
    });

    setTimeout(() => {
      setSuggestionSubmitted(false);
      setSuggestion('');
      onClose();
    }, 2000);
  };

  const handleConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectName.trim() || !connectContact.trim()) return;
    setConnectSubmitted(true);

    await submitToGoogleSheets({
      formType: 'contact',
      name: connectName,
      contact: connectContact,
      topic: connectTopic,
      message: connectMessage,
    });

    setTimeout(() => {
      setConnectSubmitted(false);
      setConnectName('');
      setConnectContact('');
      setConnectMessage('');
      onClose();
    }, 2500);
  };

  const galleryItems = [
    {
      title: 'Grand Maha Aarti',
      category: 'aarti',
      tag: 'Sacred Ritual',
      img: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Midnight Garba Circles',
      category: 'garba',
      tag: 'Folk Dance',
      img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Devi Alankaram & Floral Darshan',
      category: 'alankaram',
      tag: 'Daily Darshan',
      img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Dandiya Percussion Nights',
      category: 'garba',
      tag: 'Youth Rhythms',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Classical Odissi Dance Recital',
      category: 'alankaram',
      tag: 'Cultural Stage',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Deepotsav — 10,000 Sacred Lamps',
      category: 'aarti',
      tag: 'Grand Finale',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredGallery =
    galleryFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020817]/90 backdrop-blur-xl"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-[#07172E] border-2 border-[#D4A84F]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 z-10 my-8 text-[#F8F2E3] max-h-[88vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full text-[#F8F2E3]/60 hover:text-[#F8F2E3] hover:bg-[#0E2548] border border-transparent hover:border-[#D4A84F]/30 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* ============================================================ */}
          {/* ABOUT SECTION                                                */}
          {/* ============================================================ */}
          {section === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-[0.25em]">
                <Info size={15} />
                <span>ABOUT THE CELEBRATION</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F8F2E3] leading-snug">
                Shakti Mahotsav 2026
              </h3>
              <p className="text-sm text-[#F8F2E3]/90 leading-relaxed font-sans">
                Shakti Mahotsav is the flagship annual cultural and spiritual confluence uniting over 15,000 university students, traditional artists, scholars, and devotees. Commencing on October 11, 2026 and concluding on Vijayadashami October 20, 2026, this ten-day festival celebrates the eternal feminine principle through sacred alankarams, classical arts, garba, folk music, and divine harmony.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#F5D58A] text-xs uppercase tracking-wider">
                    <Sparkles size={14} className="text-[#D4A84F]" />
                    <span>10 Sacred Lunar Nights</span>
                  </div>
                  <p className="text-[12px] text-[#F8F2E3]/75 leading-relaxed">
                    Synchronized with the lunar phases from New Moon (Amavasya) to Full Moon (Poornima), honoring the 10 distinct alankarams of the Goddess.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#F5D58A] text-xs uppercase tracking-wider">
                    <Flame size={14} className="text-[#D4A84F]" />
                    <span>Maha Annadanam & Aarti</span>
                  </div>
                  <p className="text-[12px] text-[#F8F2E3]/75 leading-relaxed">
                    Daily evening Maha Aarti with 108 lamps, traditional temple bells, sacred conch chants, and satvik prasadam served to all guests.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E2548]/80 to-[#07172E] border border-[#D4A84F]/40 space-y-2 text-xs">
                <div className="font-bold text-[#F5D58A] font-heading text-sm">
                  “Different People · Different Talents · One Shakti”
                </div>
                <p className="text-[#F8F2E3]/80 leading-normal">
                  Our core philosophy invites every student, faculty member, and family to bring their unique creative light to our shared sacred celebration.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#D4A84F]/20">
                <div className="text-xs text-[#D4A84F]">
                  Venue: University Grand Amphitheater
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onRegister();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F] text-[#061426] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-[0_0_16px_rgba(212,168,79,0.35)] hover:scale-105 transition-all"
                >
                  Register Free Pass →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* GALLERY SECTION                                              */}
          {/* ============================================================ */}
          {section === 'gallery' && (
            <div className="space-y-5">
              {/* Header: minimal title + filter pills */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-[3px] h-10 rounded-full bg-gradient-to-b from-[#D4A84F] via-[#F5D58A] to-[#D4A84F]/10 shrink-0" />
                  <div>
                    <p className="font-manrope text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A84F] leading-none mb-1">
                      Photo Gallery
                    </p>
                    <p className="font-cormorant text-2xl font-bold text-[#F8F2E3] leading-tight">
                      Moments of Shakti
                    </p>
                  </div>
                </div>

                {/* Filter pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(['all', 'garba', 'alankaram', 'aarti'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setGalleryFilter(filter)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                        galleryFilter === filter
                          ? 'bg-[#D4A84F] text-[#061426] shadow-[0_0_12px_rgba(212,168,79,0.4)]'
                          : 'text-[#F8F2E3]/55 hover:text-[#F8F2E3] border border-[#D4A84F]/25 hover:border-[#D4A84F]/55'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Grid — portrait editorial layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {filteredGallery.map((item, i) => (
                  <motion.div
                    key={`${galleryFilter}-${i}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.28, delay: i * 0.06 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] bg-[#050E1D]"
                  >
                    {/* Image */}
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Base gradient — keeps bottom legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020B18]/92 via-[#020B18]/15 to-transparent" />

                    {/* Hover warm shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7B5A10]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Tag badge — top left */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-black/55 backdrop-blur-md border border-[#D4A84F]/25 text-[#F5D58A]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      {/* Animated accent bar */}
                      <div className="h-[1.5px] w-5 rounded-full bg-[#D4A84F] mb-2 group-hover:w-10 transition-all duration-500 ease-out" />
                      <p className="font-cormorant font-semibold text-[13px] sm:text-[15px] leading-tight text-[#F8EFDD] group-hover:text-[#F5D58A] transition-colors duration-300">
                        {item.title}
                      </p>
                    </div>

                    {/* Gold ring on hover */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#D4A84F]/40 transition-all duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </div>

              {/* Instagram callout */}
              <div className="flex items-center gap-3 pt-0.5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4A84F]/20" />
                <p className="text-[11px] text-center text-[#F8F2E3]/45 shrink-0 px-1">
                  Have photos? Tag{' '}
                  <span className="text-[#F5D58A] font-semibold">#ShaktiMahotsav2026</span>
                  {' '}on Instagram to get featured
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4A84F]/20" />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SPONSORS SECTION ("sonsery")                                 */}
          {/* ============================================================ */}
          {section === 'sponsors' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-[0.25em]">
                <Handshake size={15} />
                <span>FESTIVAL PATRONS & PARTNERS</span>
              </div>

              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F8F2E3] leading-snug">
                  Our Divine Benefactors & Sponsors
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F2E3]/80 mt-1">
                  We express our heartfelt gratitude to the cultural trusts, philanthropic foundations, and corporate partners whose generous support brings Shakti Mahotsav 2026 to life.
                </p>
              </div>

              {/* Tier 1: Grand Title Patrons */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F5D58A]">
                  <Award size={14} className="text-[#D4A84F]" />
                  <span>Grand Title Patrons</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#0E2548] to-[#040D1A] border border-[#D4A84F]/50 shadow-md">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4A84F]">
                      Chief Cultural Benefactor
                    </div>
                    <div className="font-heading text-base font-bold text-[#FFF4D6] mt-1">
                      Sri Mahalakshmi Cultural Foundation
                    </div>
                    <div className="text-xs text-[#F8F2E3]/70 mt-1">
                      Pillar support for traditional stage curation, floral alankarams, and heritage illumination.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#0E2548] to-[#040D1A] border border-[#D4A84F]/50 shadow-md">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4A84F]">
                      Heritage & Arts Patron
                    </div>
                    <div className="font-heading text-base font-bold text-[#FFF4D6] mt-1">
                      National Classical Arts Council
                    </div>
                    <div className="text-xs text-[#F8F2E3]/70 mt-1">
                      Sponsoring master classical vocalists, Odissi, and Bharatanatyam exponents.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier 2: Maha Annadanam & Community Partners */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F5D58A]">
                  <HeartHandshake size={14} className="text-[#D4A84F]" />
                  <span>Annadanam & Community Partners</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30">
                    <div className="font-bold text-[#F5D58A]">Sri Annapoorna Seva Trust</div>
                    <div className="text-[11px] text-[#D4A84F] mt-0.5">Maha Prasadam Benefactor</div>
                    <p className="text-[11px] text-[#F8F2E3]/65 mt-1">
                      Providing fresh satvik meals and sacred prasadam to 10,000+ daily visitors.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30">
                    <div className="font-bold text-[#F5D58A]">Bharatiya Sangeet Sansthan</div>
                    <div className="text-[11px] text-[#D4A84F] mt-0.5">Folk Instruments & Sound</div>
                    <p className="text-[11px] text-[#F8F2E3]/65 mt-1">
                      Curating 50+ Dhol, Nagada, and Shenai musicians across all 10 nights.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30">
                    <div className="font-bold text-[#F5D58A]">Campus Pulse Network</div>
                    <div className="text-[11px] text-[#D4A84F] mt-0.5">Youth & Media Partner</div>
                    <p className="text-[11px] text-[#F8F2E3]/65 mt-1">
                      4K Live streaming, interactive digital voting, and festival broadcasts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Become a Sponsor Call-To-Action Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#040D1A] via-[#0E2548] to-[#040D1A] border border-[#D4A84F]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-[#F5D58A]">
                    Interested in Sponsoring or Setting up a Stall?
                  </div>
                  <div className="text-xs text-[#F8F2E3]/75 mt-0.5">
                    Explore Alankaram sponsorship, brand stalls, cultural awards, and hospitality partnerships.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateSection) {
                      onNavigateSection('connect');
                    }
                  }}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] font-bold text-xs uppercase tracking-wider flex-shrink-0 cursor-pointer shadow-[0_0_15px_rgba(212,168,79,0.3)] hover:scale-105 transition-all"
                >
                  Partner With Us →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* CONNECT WITH US SECTION ("connter with us thigns")           */}
          {/* ============================================================ */}
          {section === 'connect' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-[0.25em]">
                <MessageCircle size={15} />
                <span>CONTACT & COMMUNITY</span>
              </div>

              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F8F2E3] leading-snug">
                  Connect with Shakti Mahotsav
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F2E3]/80 mt-1">
                  Have questions regarding passes, performance registrations, campus directions, or volunteering? Reach out to our 24/7 student council & secretariat.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 space-y-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#0E2548] flex items-center justify-center text-[#D4A84F] mb-2">
                      <MapPin size={15} />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#D4A84F] font-bold">
                      FESTIVAL VENUE
                    </div>
                    <div className="text-xs font-semibold text-[#FFF4D6]">
                      Amrita Vishwa Vidyapeetham
                    </div>
                    <div className="text-[11px] text-[#F8F2E3]/70 leading-relaxed pt-0.5">
                      337/1A, Vengal Village, Thiruvallur Taluk, Tamil Nadu 601103
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 space-y-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#0E2548] flex items-center justify-center text-[#D4A84F] mb-2">
                      <Phone size={15} />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#D4A84F] font-bold">
                      HELPLINE &amp; WHATSAPP
                    </div>
                    <div className="text-xs font-semibold text-[#FFF4D6] pt-0.5">
                      <a href="tel:+919182260650" className="hover:text-[#F5D58A] transition-colors">
                        +91 91822 60650
                      </a>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#F8F2E3]/65 pt-1">
                    Helpline: +91 91822 60650
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 space-y-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-full bg-[#0E2548] flex items-center justify-center text-[#D4A84F] mb-2">
                      <Mail size={15} />
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-[#D4A84F] font-bold">
                      OFFICIAL EMAIL
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#FFF4D6] break-all leading-snug pt-0.5">
                      <a href="mailto:shaktimahotsav.amritachennai@gmail.com" className="hover:text-[#F5D58A] transition-colors">
                        shaktimahotsav.amritachennai@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#F8F2E3]/65 pt-1">
                    Response time &lt; 24 hours
                  </div>
                </div>
              </div>

              {/* Direct Message & Volunteer Form */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#040D1A] border border-[#D4A84F]/40 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F5D58A] uppercase tracking-wider">
                  <Send size={14} className="text-[#D4A84F]" />
                  <span>Send a Message or Volunteer Inquiry</span>
                </div>

                {!connectSubmitted ? (
                  <form onSubmit={handleConnectSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#D4A84F] font-semibold mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={connectName}
                          onChange={(e) => setConnectName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3 py-2 rounded-lg bg-[#07172E] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#D4A84F] font-semibold mb-1">
                          Email / Phone Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={connectContact}
                          onChange={(e) => setConnectContact(e.target.value)}
                          placeholder="e.g. priya@university.edu or +91 98..."
                          className="w-full px-3 py-2 rounded-lg bg-[#07172E] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#D4A84F] font-semibold mb-1">
                        Topic / Nature of Inquiry
                      </label>
                      <select
                        value={connectTopic}
                        onChange={(e) => setConnectTopic(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#07172E] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] focus:border-[#D4A84F] focus:outline-none"
                      >
                        <option value="passes">Free Festival Passes & Attendance</option>
                        <option value="volunteer">Volunteer Seva & Committee Joining</option>
                        <option value="performance">Cultural Performance / Artist Registration</option>
                        <option value="sponsorship">Sponsorship & Food Stalls</option>
                        <option value="general">General Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#D4A84F] font-semibold mb-1">
                        Your Message / Query
                      </label>
                      <textarea
                        rows={3}
                        value={connectMessage}
                        onChange={(e) => setConnectMessage(e.target.value)}
                        placeholder="Write your query or how you would like to participate..."
                        className="w-full px-3 py-2 rounded-lg bg-[#07172E] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F] text-[#061426] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(212,168,79,0.3)] hover:scale-105 transition-all"
                      >
                        <Send size={13} />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 text-center space-y-2 rounded-xl bg-[#07172E] border border-emerald-500/40">
                    <Check size={32} className="text-emerald-400 mx-auto" />
                    <div className="font-bold text-[#F8F2E3] text-sm">
                      Thank You, {connectName}!
                    </div>
                    <div className="text-xs text-[#F8F2E3]/75">
                      Your message regarding <span className="text-[#F5D58A] font-semibold">{connectTopic}</span> has been received. Our secretariat will connect with you via {connectContact} shortly.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* ============================================================ */}
          {/* SUGGESTIONS SECTION                                          */}
          {/* ============================================================ */}
          {section === 'suggestions' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-widest">
                <Sparkles size={14} />
                <span>VOICE OF THE COMMUNITY</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#F8F2E3]">
                Suggestions & Artist Recommendations
              </h3>
              <p className="text-xs text-[#F8F2E3]/75">
                Have an idea for a folk performance, workshop, or volunteer activity during the 10 days? We’d love to hear from you.
              </p>

              {!suggestionSubmitted ? (
                <form onSubmit={handleSuggestionSubmit} className="space-y-3 pt-2">
                  <textarea
                    required
                    rows={4}
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Share your thoughts, festival suggestions, or artist requests..."
                    className="w-full p-3 rounded-xl bg-[#040D1A] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Submit Suggestion</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center space-y-2 rounded-xl bg-[#040D1A] border border-emerald-500/40">
                  <Check size={28} className="text-emerald-400 mx-auto" />
                  <div className="font-bold text-[#F8F2E3]">Thank you for your feedback!</div>
                  <div className="text-xs text-[#F8F2E3]/70">Our committee will review your note for Shakti Mahotsav 2026.</div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
