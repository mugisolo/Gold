import React, { useState } from 'react';
import {
  FileText,
  Search,
  Clock,
  ArrowRight,
  ShieldAlert,
  Scale,
  Sparkles,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { BlogPost } from '../types';
import { RichTextRenderer } from './RichTextRenderer';

export const BlogSection: React.FC = () => {
  const { blogPosts, selectedArticle, setSelectedArticle } = useSiteConfig();
  const [activePillar, setActivePillar] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pillars = [
    { id: 'all', label: 'All Intel Pillars' },
    { id: 'Counter-Fraud', label: 'Counter-Fraud & Scams' },
    { id: 'Regulatory', label: 'Mining Law & Tax Code' },
    { id: 'Supply Chain', label: 'Shafts & Refineries' },
    { id: 'Lead Gen', label: 'Delegation Operational' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesPillar = activePillar === 'all' || post.pillar === activePillar;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.coreSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <section id="intel" className="py-20 md:py-28 bg-[#0B0F17] border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full gold-badge text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>INSTITUTIONAL COUNTER-FRAUD INTELLIGENCE</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-[#FEF3C7] tracking-tight">
            Forensic Briefings & Regulatory Dispatches
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Written by senior mining cadastre advocates, chemical assayers, and anti-illicit trade intelligence officers to protect sovereign and corporate capital.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {pillars.map((pil) => (
              <button
                key={pil.id}
                onClick={() => setActivePillar(pil.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activePillar === pil.id
                    ? 'bg-[#D4AF37] text-[#0B0F17] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#131B2E] text-[#94A3B8] hover:text-[#FEF3C7] hover:bg-[#1E293B] border border-[#D4AF37]/20'
                }`}
              >
                {pil.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search forensic briefings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131B2E] border border-[#D4AF37]/30 rounded-lg pl-9 pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs font-mono text-[#FEF3C7] placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Intelligence Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#131B2E] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#0B0F17] text-[#D4AF37] border border-[#D4AF37]/30 uppercase font-semibold">
                    {post.pillar}
                  </span>
                  <span className="text-[#94A3B8] flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#FEF3C7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-amber-200/80 italic line-clamp-2">
                  "{post.hook}"
                </p>

                <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed font-sans">
                  {post.coreSummary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B]">
                  {post.postingDay} • Month 0{post.month}
                </span>

                <button
                  onClick={() => setSelectedArticle(post)}
                  className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs font-mono font-semibold text-[#D4AF37] hover:text-[#FEF3C7] transition-colors cursor-pointer"
                >
                  <span>Read Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <RichTextRenderer
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
