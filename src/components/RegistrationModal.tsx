import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Ticket, Sparkles, Shield, QrCode, User, Mail, Phone } from 'lucide-react';
import { FESTIVAL_EVENTS } from '../data/festivalData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay?: number;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  selectedDay = 1,
}) => {
  const [tier, setTier] = useState<'season' | 'single' | 'vip'>('season');
  const [dayChoice, setDayChoice] = useState<number>(selectedDay);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const generatedId = `SM26-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#061426]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#0B1F3A] border-2 border-[#D4A84F]/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 text-[#F8F2E3]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#F8F2E3]/60 hover:text-[#F8F2E3] hover:bg-[#142B4F] transition-colors"
          >
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="text-center space-y-1 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4A84F]/15 border border-[#D4A84F]/30 text-[11px] font-bold text-[#F5D58A] uppercase tracking-widest">
                  <Sparkles size={12} />
                  <span>SHAKTI MAHOTSAV 2026</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#F8F2E3]">
                  Reserve Festival Pass
                </h3>
                <p className="text-xs text-[#F8F2E3]/70">
                  Oct 11 – Oct 20, 2026 · University Cultural Grounds
                </p>
              </div>

              {/* Pass Tier Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: 'season', title: 'Season Pass', sub: 'All 10 Days', tag: 'Most Popular' },
                  { id: 'single', title: 'Single Day', sub: 'Choose 1 Day', tag: 'Flexible' },
                  { id: 'vip', title: 'VIP Cultural', sub: 'Front Row + Prasadam', tag: 'Exclusive' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTier(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      tier === item.id
                        ? 'border-[#D4A84F] bg-[#142B4F] shadow-[0_0_15px_rgba(212,168,79,0.25)]'
                        : 'border-[#D4A84F]/20 bg-[#061426]/50 hover:border-[#D4A84F]/40'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-[#D4A84F] font-bold block mb-1">
                      {item.tag}
                    </span>
                    <div className="text-xs font-bold text-[#F8F2E3] leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#F8F2E3]/60 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>

              {/* Day selection if Single Night */}
              {tier === 'single' && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#F5D58A] mb-1.5">
                    Select Festival Night:
                  </label>
                  <select
                    value={dayChoice}
                    onChange={(e) => setDayChoice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#061426] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] focus:border-[#D4A84F] focus:outline-none"
                  >
                    {FESTIVAL_EVENTS.map((evt) => (
                      <option key={evt.day} value={evt.day}>
                        Day {evt.day} — {evt.title} ({evt.date})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-[#F8F2E3]/90 mb-1">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-2.5 text-[#D4A84F]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#061426] border border-[#D4A84F]/30 text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#F8F2E3]/90 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-2.5 text-[#D4A84F]" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#061426] border border-[#D4A84F]/30 text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#F8F2E3]/90 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#061426] border border-[#D4A84F]/30 text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#F8F2E3]/90 mb-1">Student / Affiliation ID</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#061426] border border-[#D4A84F]/30 text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-[#F8F2E3]/60 pt-1">
                  * Entry is free for enrolled university students and community guests with pre-registered pass.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 rounded-full bg-gradient-to-r from-[#D4A84F] via-[#F5D58A] to-[#D4A84F] text-[#061426] text-xs uppercase tracking-widest font-extrabold shadow-[0_0_20px_rgba(212,168,79,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  CONFIRM & GENERATE PASS →
                </button>
              </form>
            </div>
          ) : (
            /* Ticket Confirmation View */
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                <Check size={28} />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-[#F8F2E3]">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-[#F5D58A] mt-1">
                  Your digital festival credential has been generated.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-4 rounded-xl bg-[#061426] border border-[#D4A84F]/50 shadow-inner space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-[#D4A84F]/20 pb-2.5">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#D4A84F]">
                      PASS CREDENTIAL
                    </div>
                    <div className="font-mono text-sm font-bold text-[#F8F2E3]">
                      {ticketId}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#142B4F] text-[#F5D58A] text-[10px] font-bold uppercase">
                    {tier === 'season' ? '9-Night Season' : tier === 'vip' ? 'VIP Cultural' : `Day ${dayChoice}`}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-[#F8F2E3]/60">Holder</div>
                    <div className="font-semibold text-[#F8F2E3]">{name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-[#F8F2E3]/60">Festival Dates</div>
                    <div className="font-semibold text-[#F8F2E3]">Oct 12–20, 2026</div>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="flex items-center justify-center p-3 bg-white rounded-lg">
                  <QrCode size={90} className="text-[#061426]" />
                </div>
                <div className="text-center text-[10px] text-[#F8F2E3]/60">
                  Present this QR at the Sacred Courtyard entry gates.
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-full bg-[#142B4F] hover:bg-[#1D3B6C] text-xs font-semibold text-[#F8F2E3] border border-[#D4A84F]/30 transition-colors cursor-pointer"
              >
                Done & Return to Events Page
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
