import React from 'react';
import {
  Briefcase,
  Video,
  FileSearch,
  Lock,
  CalendarCheck,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { B2BBriefingModal } from './B2BBriefingModal';

export const B2BAdvisorySection: React.FC = () => {
  const { isB2BBriefingOpen, setIsB2BBriefingOpen } = useSiteConfig();

  return (
    <section className="py-20 md:py-28 bg-[#0B0F17] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#131B2E] via-[#0F172A] to-[#131B2E] border-2 border-[#D4AF37]/50 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden gold-glow">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>BESPOKE CORPORATE INTELLIGENCE</span>
              </div>

              <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight leading-tight">
                Private 60-Minute Strategic Video Briefing
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Before deploying an in-person delegation or wiring funds to an East African counterpart, consult directly with our Directorate Dean and Senior Mining Advocates. We examine the exact contracts, certificates, and company claims on your desk.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="bg-[#0B0F17]/70 p-3.5 rounded-lg border border-[#D4AF37]/20 flex items-start space-x-2.5 rtl:space-x-reverse">
                  <FileSearch className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FEF3C7] font-semibold block">Contract & Assay Audit</span>
                    <span className="text-[#94A3B8] text-[11px]">Forensic analysis of seller SPA agreements & assay stamps.</span>
                  </div>
                </div>

                <div className="bg-[#0B0F17]/70 p-3.5 rounded-lg border border-[#D4AF37]/20 flex items-start space-x-2.5 rtl:space-x-reverse">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FEF3C7] font-semibold block">Syndicate Interdiction</span>
                    <span className="text-[#94A3B8] text-[11px]">Cross-referencing entities against MPPU criminal fraud case files.</span>
                  </div>
                </div>

                <div className="bg-[#0B0F17]/70 p-3.5 rounded-lg border border-[#D4AF37]/20 flex items-start space-x-2.5 rtl:space-x-reverse">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FEF3C7] font-semibold block">Live Cadastre Registry Query</span>
                    <span className="text-[#94A3B8] text-[11px]">Direct screen-share query into the official DGSM database.</span>
                  </div>
                </div>

                <div className="bg-[#0B0F17]/70 p-3.5 rounded-lg border border-[#D4AF37]/20 flex items-start space-x-2.5 rtl:space-x-reverse">
                  <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#FEF3C7] font-semibold block">Google Calendar & Tasks</span>
                    <span className="text-[#94A3B8] text-[11px]">Automatic calendar booking and due-diligence task syncing.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Card */}
            <div className="lg:col-span-5 bg-[#0B0F17] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#D4AF37] tracking-widest block mb-1">
                  SECURE VIDEO SESSION
                </span>
                <div className="text-4xl font-extrabold font-cinzel text-[#FEF3C7]">
                  $2,500
                </div>
                <span className="text-xs text-[#94A3B8] mt-1 block">
                  100% credited toward your selected delegation tier
                </span>
              </div>

              <div className="border-t border-b border-[#1E293B] py-3 text-xs font-mono text-slate-300 space-y-1">
                <div>Duration: 60 Minutes (Encrypted Link)</div>
                <div>Panel: 2 Senior Directorate Officers</div>
                <div>Deliverable: Written Forensic Diagnostic Memorandum</div>
              </div>

              <button
                onClick={() => setIsB2BBriefingOpen(true)}
                className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>Schedule Confidential Briefing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] font-mono text-[#64748B]">
                Conducted under strict mutual non-disclosure (NDA) standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <B2BBriefingModal
        isOpen={isB2BBriefingOpen}
        onClose={() => setIsB2BBriefingOpen(false)}
      />
    </section>
  );
};
