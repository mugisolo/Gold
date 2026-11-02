import React from 'react';
import {
  Users,
  ShieldAlert,
  Award,
  BadgeCheck,
  Scale,
  FlaskConical,
  Radio,
} from 'lucide-react';
import { EXECUTIVE_LEADERSHIP } from '../data/expeditionData';

export const ExecutiveLeadership: React.FC = () => {
  return (
    <section id="directorate" className="py-20 md:py-28 bg-[#0F172A] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EXECUTIVE LEADERSHIP & GOVERNANCE</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            Directorate Deanery & Senior Cadastre Counsel
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            The delegation is directed by veteran mining economists, High Court advocates, military tactical liaison commanders, and senior metallurgical assayers.
          </p>
        </div>

        {/* 4 Directorate Profiles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXECUTIVE_LEADERSHIP.map((leader) => (
            <div
              key={leader.id}
              className="bg-[#131B2E] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-xl relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Avatar Insignia */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-[#D4AF37]/50 flex items-center justify-center font-cinzel text-2xl font-black text-[#FEF3C7] shadow-lg group-hover:border-[#D4AF37] transition-all">
                    {leader.imageFallbackLetter}
                  </div>
                  <span className="px-2 py-1 rounded text-[9px] font-mono bg-[#0B0F17] text-[#D4AF37] border border-[#D4AF37]/30 uppercase">
                    {leader.department.split('&')[0]}
                  </span>
                </div>

                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#FEF3C7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-mono text-[#D4AF37] mt-1 font-medium">
                    {leader.role}
                  </div>
                </div>

                {/* Credentials Pills */}
                <div className="space-y-1.5 pt-2 border-t border-[#1E293B]">
                  {leader.credentials.map((cred, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 rtl:space-x-reverse text-[11px] font-mono text-slate-300">
                      <BadgeCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{cred}</span>
                    </div>
                  ))}
                </div>

                {/* Bio text */}
                <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-[#1E293B]">
                  {leader.bio}
                </p>
              </div>

              {/* Clearance tag */}
              <div className="mt-6 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <span>CLEARANCE:</span>
                <span className="text-[#D4AF37] font-semibold">{leader.securityClearance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
