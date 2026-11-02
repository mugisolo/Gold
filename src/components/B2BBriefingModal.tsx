import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  Building,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  CalendarPlus,
  ListTodo,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { createCalendarEvent, createGoogleTask } from '../services/workspaceService';
import { googleSignIn, getAccessToken } from '../services/firebaseAuth';

interface B2BBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BBriefingModal: React.FC<B2BBriefingModalProps> = ({ isOpen, onClose }) => {
  const { bookB2BBriefing } = useSiteConfig();

  const [fullName, setFullName] = useState('');
  const [corporateEntity, setCorporateEntity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2025-11-20');
  const [timeSlot, setTimeSlot] = useState('14:00 GMT+3 (Kampala)');
  const [scopeNotes, setScopeNotes] = useState('');
  const [syncToCalendar, setSyncToCalendar] = useState(true);
  const [syncToTasks, setSyncToTasks] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !corporateEntity) {
      alert('Please fill out all required corporate fields.');
      return;
    }

    setLoading(true);
    setFeedbackMsg(null);

    try {
      // Create local booking & open checkout
      const booking = bookB2BBriefing({
        clientName: fullName,
        corporateEntity,
        email,
        phone,
        preferredDate,
        timeSlot,
        scopeNotes,
      });

      // Check if user requested Google Calendar sync
      if (syncToCalendar) {
        try {
          let token = await getAccessToken();
          if (!token) {
            const authResult = await googleSignIn();
            token = authResult?.accessToken || null;
          }

          if (token) {
            const startISO = `${preferredDate}T14:00:00Z`;
            const endISO = `${preferredDate}T15:00:00Z`;

            await createCalendarEvent({
              summary: `Uganda Gold Expedition — B2B Strategic Briefing (${corporateEntity})`,
              description: `Private 60-Minute Executive Anti-Fraud & Mining Cadastre Strategic Briefing.\nClient: ${fullName} (${corporateEntity})\nScope Notes: ${scopeNotes}\nBooking ID: ${booking.id}`,
              startDateTime: startISO,
              endDateTime: endISO,
              location: 'Virtual Secure Briefing Room (Encrypted Link)',
            });

            if (syncToTasks) {
              await createGoogleTask({
                title: `Review Cadastre Dossier for Briefing (${corporateEntity})`,
                notes: `Statutory preparation for Uganda Gold Expedition Strategic Briefing on ${preferredDate}. Verify mining lease coordinates and active case files.`,
                due: `${preferredDate}T12:00:00Z`,
              });
            }
          }
        } catch (calError: any) {
          console.warn('Google Workspace sync skipped or rejected:', calError);
        }
      }

      setLoading(false);
      onClose();
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setFeedbackMsg({ type: 'error', text: err.message || 'Error processing consultation request' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 sm:p-6 flex items-start justify-between z-10">
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="p-3 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                BESPOKE INSTITUTIONAL CONSULTATION
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
                Schedule 60-Min Strategic Video Briefing
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
                CONFIDENTIAL STRATEGIC CONSULTATION FEE
              </span>
              <span className="text-xs text-[#94A3B8]">
                One-on-one session with Senior Cadastre Dean & Chief Assayer
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-cinzel font-extrabold text-[#FEF3C7]">$2,500</span>
              <span className="text-[10px] font-mono text-[#94A3B8] block">Credited toward expedition</span>
            </div>
          </div>

          {feedbackMsg && (
            <div className="p-3 rounded-lg text-xs font-mono bg-red-950/50 border border-red-500/40 text-red-200">
              {feedbackMsg.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Julian Sterling"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Corporate Entity *</label>
              <input
                type="text"
                required
                placeholder="e.g. Geneva Commodity Partners SA"
                value={corporateEntity}
                onChange={(e) => setCorporateEntity(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Corporate Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. j.sterling@genevapartners.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Direct Telephone / Signal</label>
              <input
                type="tel"
                placeholder="e.g. +41 22 555 0198"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Preferred Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Time Slot (GMT+3 Kampala)</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="10:00 GMT+3 (Kampala)">10:00 AM (Kampala) / 07:00 AM (London)</option>
                <option value="14:00 GMT+3 (Kampala)">02:00 PM (Kampala) / 11:00 AM (London)</option>
                <option value="17:00 GMT+3 (Kampala)">05:00 PM (Kampala) / 02:00 PM (London) / 09:00 AM (New York)</option>
                <option value="20:00 GMT+3 (Kampala)">08:00 PM (Kampala) / 05:00 PM (London) / 12:00 PM (New York)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-[#FEF3C7] block mb-1">
              Case Scope, Suspicious Offer Details, or Due Diligence Objectives
            </label>
            <textarea
              rows={3}
              placeholder="Outline the specific transaction, suspected fraud offer, or mining title dispute you wish to review during the 60-minute briefing..."
              value={scopeNotes}
              onChange={(e) => setScopeNotes(e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Google Workspace Auto-Sync Checkboxes */}
          <div className="bg-[#0B0F17]/80 p-3.5 rounded-xl border border-[#D4AF37]/20 space-y-2">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block">
              Google Workspace Automated Synchronization:
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="syncCal"
                checked={syncToCalendar}
                onChange={(e) => setSyncToCalendar(e.target.checked)}
                className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="syncCal" className="text-xs text-slate-300 flex items-center space-x-1 cursor-pointer">
                <CalendarPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Add briefing directly to my Google Calendar (with reminders)</span>
              </label>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="syncTask"
                checked={syncToTasks}
                onChange={(e) => setSyncToTasks(e.target.checked)}
                className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="syncTask" className="text-xs text-slate-300 flex items-center space-x-1 cursor-pointer">
                <ListTodo className="w-3.5 h-3.5 text-emerald-400" />
                <span>Create briefing preparation checklist in my Google Tasks</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Confirming Protocol...' : 'Confirm Strategic Briefing & Proceed to Settlement ($2,500)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
