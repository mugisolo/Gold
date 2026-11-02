import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Shield,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Lock,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ITINERARY_DAYS } from '../data/expeditionData';
import { useSiteConfig } from '../context/SiteConfigContext';

export const ItineraryPipeline: React.FC = () => {
  const { t } = useLanguage();
  const { setIsVettingOpen } = useSiteConfig();
  const [expandedDay, setExpandedDay] = useState<number>(1);

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? 0 : dayNum);
  };

  return (
    <section id="itinerary" className="py-20 md:py-28 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.itinerary.tag}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            {t.itinerary.title}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.itinerary.description}
          </p>
        </div>

        {/* 7-Day Day Selector Ribbon */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {ITINERARY_DAYS.map((day) => {
            const isCurrent = expandedDay === day.dayNumber;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setExpandedDay(day.dayNumber)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#131B2E] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                    : 'bg-[#0F172A]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#131B2E]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase block tracking-wider">
                  {t.itinerary.dayPrefix} 0{day.dayNumber}
                </span>
                <span className="text-xs font-cinzel font-bold text-[#FEF3C7] block mt-1 truncate">
                  {day.title.split('&')[0]}
                </span>
                <span className="text-[9px] font-mono text-[#94A3B8] block mt-1 truncate">
                  {day.location.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Timeline Accordion List */}
        <div className="mt-8 space-y-4">
          {ITINERARY_DAYS.map((day) => {
            const isOpen = expandedDay === day.dayNumber;
            return (
              <div
                key={day.dayNumber}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#131B2E] border-[#D4AF37] shadow-xl'
                    : 'bg-[#0F172A] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className="w-full text-left rtl:text-right p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center space-x-4 rtl:space-x-reverse">
                    <div
                      className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-cinzel font-black shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#D4AF37] text-[#0B0F17]'
                          : 'bg-[#1E293B] text-[#D4AF37] border border-[#D4AF37]/30'
                      }`}
                    >
                      <span className="text-[10px] leading-none uppercase">DAY</span>
                      <span className="text-lg leading-tight font-extrabold">{day.dayNumber}</span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-[#D4AF37] tracking-wider font-semibold">
                          {day.phaseCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {day.securityClassification}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#FEF3C7]">
                        {day.title}
                      </h3>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-[#94A3B8] mt-1 font-mono">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{day.location}</span>
                        </span>
                        <span>•</span>
                        <span className="text-[#64748B] hidden sm:inline">{day.coordinates}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-3 rtl:space-x-reverse self-stretch md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#1E293B]">
                    <span className="text-xs font-mono text-[#D4AF37]">
                      {isOpen ? 'Collapse Protocol' : 'Inspect Protocol'}
                    </span>
                    <div className="p-1 rounded-full bg-[#1E293B] text-[#FEF3C7]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Protocol Details */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#D4AF37]/20 space-y-6 bg-[#0B0F17]/50">
                    <p className="text-sm text-slate-300 italic border-l-2 border-[#D4AF37] pl-3 py-1">
                      "{day.summary}"
                    </p>

                    {/* Operational Chronology */}
                    <div>
                      <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-wider font-bold mb-3 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Tactical Chronology & Operational Pipeline</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {day.detailedProtocol.map((step, idx) => (
                          <div
                            key={idx}
                            className="bg-[#131B2E] p-3.5 rounded-lg border border-[#D4AF37]/15 text-xs text-slate-300 leading-relaxed font-sans"
                          >
                            <span className="text-[#D4AF37] font-mono font-bold block mb-1">
                              STEP 0{idx + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dual Box: Statutory Access vs Forensic Highlights */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Statutory Access */}
                      <div className="bg-[#0F172A] p-4 rounded-xl border border-emerald-500/30">
                        <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Statutory Access Points Granted</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {day.statutoryAccessPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Forensic Highlights */}
                      <div className="bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/30">
                        <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-bold mb-2 flex items-center space-x-1.5">
                          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Key Counter-Fraud Forensic Learnings</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {day.forensicHighlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                              <span className="text-[#D4AF37] mt-0.5">✦</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setIsVettingOpen(true)}
                        className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                      >
                        Enroll Delegation for Day {day.dayNumber} Protocol
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
