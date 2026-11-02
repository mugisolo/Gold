import React from 'react';
import {
  X,
  Clock,
  Tag,
  AlertTriangle,
  Scale,
  Share2,
  Bookmark,
  FileCheck2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { BlogPost } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface RichTextRendererProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ post, onClose }) => {
  const { setIsVettingOpen, setIsB2BBriefingOpen } = useSiteConfig();

  if (!post) return null;

  const handleCtaClick = () => {
    onClose();
    if (post.targetCta.type === 'consultation') {
      setIsB2BBriefingOpen(true);
    } else {
      setIsVettingOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 uppercase">
              {post.pillar}
            </span>
            <span className="text-xs font-mono text-[#94A3B8] flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2">
              MONTH 0{post.month} DISPATCH • {post.monthTheme} • {post.postingDay}
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FEF3C7] leading-tight">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-amber-200/90 font-medium italic mt-3 bg-[#0B0F17] p-4 rounded-xl border border-[#D4AF37]/30">
              "{post.hook}"
            </p>
          </div>

          {/* Meta Bar */}
          <div className="bg-[#0F172A] p-3 rounded-lg border border-[#D4AF37]/15 flex flex-wrap items-center justify-between text-xs font-mono text-[#94A3B8] gap-2">
            <span>TARGET AUDIENCE: {post.targetAudience}</span>
            <span className="text-[#D4AF37]">FORENSIC GRADE BRIEFING</span>
          </div>

          {/* Core Summary Callout */}
          <div className="bg-[#0B0F17] p-4 rounded-xl border-l-4 border-[#D4AF37] text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <strong className="text-[#FEF3C7] block mb-1 font-mono uppercase text-xs">
              Executive Diagnostic Summary:
            </strong>
            {post.coreSummary}
          </div>

          {/* Full Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            {post.fullArticle.map((para, idx) => (
              <p key={idx} className="text-justify">
                {para}
              </p>
            ))}
          </div>

          {/* Red Flags Callout Box */}
          {post.redFlags && post.redFlags.length > 0 && (
            <div className="bg-red-950/30 border border-red-500/40 rounded-xl p-5 space-y-2">
              <h3 className="text-xs font-mono uppercase text-red-400 font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Forensic Red Flags To Interdict Immediately:</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-red-200/90 font-sans">
                {post.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-red-400 mt-0.5">⚠</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Statutory References Box */}
          {post.statutoryReferences && post.statutoryReferences.length > 0 && (
            <div className="bg-[#0F172A] border border-[#D4AF37]/30 rounded-xl p-5 space-y-2">
              <h3 className="text-xs font-mono uppercase text-[#D4AF37] font-bold flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>Statutory Authority & Precedents Cited:</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
                {post.statutoryReferences.map((ref, idx) => (
                  <li key={idx} className="flex items-start space-x-2 rtl:space-x-reverse">
                    <span className="text-[#D4AF37]">§</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Copy Box */}
          {post.socialCopy && (
            <div className="bg-[#0B0F17] border border-[#1E293B] rounded-xl p-4 text-xs font-mono space-y-1 text-[#94A3B8]">
              <div className="text-[#FEF3C7] font-semibold flex items-center space-x-1">
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Institutional Share Headline:</span>
              </div>
              <p className="text-slate-300 italic">{post.socialCopy.headline}</p>
              <div className="text-[11px] text-[#D4AF37] pt-1">
                {post.socialCopy.hashtags.join(' ')}
              </div>
            </div>
          )}

          {/* Dynamic Article CTA Button */}
          <div className="pt-4 border-t border-[#D4AF37]/25 text-center">
            <button
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{post.targetCta.label}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
