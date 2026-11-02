import React, { useState } from 'react';
import {
  Building2,
  Search,
  ShieldCheck,
  FileCheck,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import { PartnerProfile } from '../types';
import { PartnerLogoEmblem } from './PartnerLogoEmblem';
import { PartnerDetailModal } from './PartnerDetailModal';

export const PartnersSection: React.FC = () => {
  const { t } = useLanguage();
  const { partners, selectedPartner, setSelectedPartner } = useSiteConfig();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t.partners.allFilter },
    { id: 'mines', label: t.partners.mines },
    { id: 'refineries', label: t.partners.refineries },
    { id: 'regulators', label: t.partners.regulators },
    { id: 'logistics', label: t.partners.logistics },
    { id: 'laboratories', label: t.partners.laboratories },
  ];

  const filteredPartners = partners.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="partners" className="py-20 md:py-28 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.partners.tag}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            {t.partners.title}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t.partners.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#131B2E] text-[#94A3B8] hover:text-[#FEF3C7] hover:bg-[#1E293B] border border-[#D4AF37]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by license or entity name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131B2E] border border-[#D4AF37]/30 rounded-lg pl-9 pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs font-mono text-[#FEF3C7] placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#131B2E]/90 border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0F172A] border border-[#D4AF37]/40 flex items-center justify-center p-2 group-hover:border-[#D4AF37] transition-all">
                    <PartnerLogoEmblem type={partner.logoType} className="w-8 h-8" name={partner.name} />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#0B0F17] text-[#D4AF37] border border-[#D4AF37]/30 uppercase">
                    {partner.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-base font-bold text-[#FEF3C7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {partner.name}
                </h3>

                <div className="my-2.5 inline-block bg-[#0B0F17] px-2.5 py-1 rounded text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/20 truncate max-w-full">
                  {partner.licenseNumber}
                </div>

                <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed mb-4">
                  {partner.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">
                  {partner.location.split(',')[0]}
                </span>

                <button
                  onClick={() => setSelectedPartner(partner)}
                  className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs font-mono font-semibold text-[#D4AF37] hover:text-[#FEF3C7] transition-colors cursor-pointer"
                >
                  <span>{t.partners.viewDossier}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12 text-sm font-mono text-[#94A3B8]">
            No verified statutory entities matched your search query.
          </div>
        )}
      </div>

      {/* Official Partner Dossier Modal */}
      <PartnerDetailModal
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />
    </section>
  );
};
