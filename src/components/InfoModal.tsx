import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Check, Heart, Users, Image as ImageIcon, Info } from 'lucide-react';

interface InfoModalProps {
  section: string | null;
  onClose: () => void;
  onRegister: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ section, onClose, onRegister }) => {
  const [suggestion, setSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  if (!section || section === 'events' || section === 'home') return null;

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSuggestionSubmitted(true);
    setTimeout(() => {
      setSuggestionSubmitted(false);
      setSuggestion('');
      onClose();
    }, 2000);
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
          className="relative w-full max-w-2xl bg-[#0B1F3A] border-2 border-[#D4A84F]/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 text-[#F8F2E3] max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#F8F2E3]/60 hover:text-[#F8F2E3] hover:bg-[#142B4F] transition-colors"
          >
            <X size={18} />
          </button>

          {/* About Section */}
          {section === 'about' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-widest">
                <Info size={14} />
                <span>ABOUT THE CELEBRATION</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F8F2E3]">
                Shakti Mahotsav 2026
              </h3>
              <p className="text-sm text-[#F8F2E3]/85 leading-relaxed">
                Shakti Mahotsav is the flagship annual cultural festival uniting over 15,000 university students, faculty, and cultural connoisseurs. Observed during the sacred autumn Navratri, the festival honors the divine feminine energy through music, classical arts, folk dance, gastronomy, and spiritual devotion.
              </p>
              <div className="p-4 rounded-xl bg-[#061426] border border-[#D4A84F]/30 space-y-2 text-xs">
                <div className="font-bold text-[#F5D58A]">The 9-Night Lunar Philosophy</div>
                <p className="text-[#F8F2E3]/75 leading-normal">
                  Each night follows the cosmic waxing and waning of the moon, corresponding to one of the nine sacred manifestations of Maa Durga (Navadurga). From Shailaputri’s steadfast grounding to Siddhidhatri’s ultimate realization, the festival is a lived journey of transformation.
                </p>
              </div>
              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => {
                    onClose();
                    onRegister();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84F] to-[#F5D58A] text-[#061426] font-bold text-xs uppercase tracking-wider"
                >
                  Join Us & Register →
                </button>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {section === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-widest">
                <ImageIcon size={14} />
                <span>SACRED VISUAL ARCHIVES</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#F8F2E3]">
                Festival Moments Through the Lens
              </h3>
              <p className="text-xs text-[#F8F2E3]/70">
                Glimpses of devotion, swirling Dandiya dresses, and midnight Maha Aarti.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { title: 'Garba Circles', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80' },
                  { title: 'Sacred Maha Aarti', img: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80' },
                  { title: 'Dandiya Percussion', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
                  { title: 'Classical Odissi', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
                  { title: 'Deepotsav Lamps', img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=600&q=80' },
                  { title: 'Grand Finale Sky', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80' },
                ].map((item, i) => (
                  <div key={i} className="group relative rounded-xl overflow-hidden border border-[#D4A84F]/20 h-32">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061426]/90 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] font-semibold text-[#F5D58A]">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Section */}
          {section === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A84F] uppercase tracking-widest">
                <Users size={14} />
                <span>FESTIVAL COMMITTEE</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#F8F2E3]">
                The Visionaries Behind Shakti Mahotsav
              </h3>
              <p className="text-xs text-[#F8F2E3]/70">
                Organized under the patronage of the University Cultural Affairs Council and Student Union.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {[
                  { name: 'Dr. Gayatri Ramanathan', role: 'Festival Director & Dean of Cultural Affairs' },
                  { name: 'Aditya Vardhan', role: 'Student President & Cultural Convener' },
                  { name: 'Ananya Deshmukh', role: 'Creative Director & Stage Curator' },
                  { name: 'Kavya Sengupta', role: 'Head of Traditional Arts & Music' },
                  { name: 'Rohan Mehta', role: 'Logistics & Security Head' },
                  { name: 'Pooja Bhatt', role: 'Hospitality & Prasadam Coordinator' },
                ].map((member, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#061426]/70 border border-[#D4A84F]/20">
                    <div className="font-bold text-[#F5D58A]">{member.name}</div>
                    <div className="text-[11px] text-[#F8F2E3]/70 mt-0.5">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions Section */}
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
                    className="w-full p-3 rounded-xl bg-[#061426] border border-[#D4A84F]/30 text-xs text-[#F8F2E3] placeholder-[#F8F2E3]/40 focus:border-[#D4A84F] focus:outline-none"
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
                <div className="p-6 text-center space-y-2 rounded-xl bg-[#061426] border border-emerald-500/40">
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
