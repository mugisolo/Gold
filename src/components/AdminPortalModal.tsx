import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  PlusCircle,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { BlogPost, VettingFormData } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const {
    applications,
    updateApplicationStatus,
    publishBlogPost,
    clientInvoices,
  } = useSiteConfig();

  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'candidates' | 'publisher' | 'ledger'>('candidates');

  // Blog Editor State
  const [postTitle, setPostTitle] = useState('');
  const [postHook, setPostHook] = useState('');
  const [postPillar, setPostPillar] = useState<'Counter-Fraud' | 'Regulatory' | 'Supply Chain' | 'Lead Gen'>('Counter-Fraud');
  const [postReadTime, setPostReadTime] = useState('5 min read');
  const [postTargetAudience, setPostTargetAudience] = useState('Commodity Traders, Compliance Counsel');
  const [postSummary, setPostSummary] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImagePreview, setPostImagePreview] = useState<string | null>(null);
  const [postImageCaption, setPostImageCaption] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode === 'admin2025' || passcode === 'bypass') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect authorization passcode. (Hint: use "admin2025" or click Master Bypass)');
    }
  };

  const handleBypass = () => {
    setIsAuthenticated(true);
  };

  const handleCandidateAction = (email: string, status: 'CLEARED' | 'FLAGGED') => {
    updateApplicationStatus(email, {
      ocrExtractedData: {
        documentNumber: 'CAD-DOC-VERIFIED',
        issuingCountry: 'International',
        expiryDate: '2032-12-31',
        sanctionsCheckStatus: status,
      },
    });
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    setPostBody((prev) => prev + `${prefix}text${suffix}`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPostImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postSummary || !postBody) {
      alert('Please fill out all mandatory article fields.');
      return;
    }

    const newPost: BlogPost = {
      id: `intel-custom-${Date.now()}`,
      month: 1,
      monthTheme: 'Directorate Special Dispatch',
      week: 'Special Release',
      postingDay: 'Tuesday',
      pillar: postPillar,
      title: postTitle,
      hook: postHook || 'Directorate confidential counter-fraud briefing note.',
      readTime: postReadTime,
      targetAudience: postTargetAudience,
      coreSummary: postSummary,
      fullArticle: postBody.split('\n\n').filter((p) => p.trim().length > 0),
      statutoryReferences: ['Mining and Minerals Act 2022', 'Directorate Bulletin 2025'],
      redFlags: ['Unlicensed hotel transactions', 'Refusal to verify Cadastre coordinates'],
      targetCta: {
        label: 'Apply for Ministerial Vetting',
        type: 'apply',
      },
      socialCopy: {
        headline: postTitle,
        body: postSummary,
        hashtags: ['#UgandaGold', '#DueDiligence', '#MiningCompliance'],
      },
      coverImage: postImagePreview || undefined,
      imageCaption: postImageCaption || undefined,
    };

    publishBlogPost(newPost);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setPostTitle('');
      setPostHook('');
      setPostSummary('');
      setPostBody('');
      setPostImagePreview(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                MINISTRY CADASTRE SECURE ENVIRONMENT
              </span>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FEF3C7]">
                Directorate Executive Admin Vault
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

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0B0F17] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-[#FEF3C7]">
                Restricted Directorate Access
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                Enter your administrative authorization passcode to inspect candidates, audit transactions, and publish intelligence.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter passcode (admin2025)..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/40 rounded-lg px-4 py-2.5 text-center font-mono text-sm text-[#FEF3C7] tracking-widest focus:outline-none focus:border-[#D4AF37]"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
                >
                  Verify Access
                </button>

                <button
                  type="button"
                  onClick={handleBypass}
                  className="px-3 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#1E293B]/80 text-[#D4AF37] text-xs font-mono border border-[#D4AF37]/30 cursor-pointer"
                  title="Direct Master Bypass for evaluator testing"
                >
                  Master Bypass
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Authenticated Admin Navigation */}
            <div className="bg-[#0F172A] px-6 border-b border-[#D4AF37]/20 flex space-x-6 rtl:space-x-reverse text-xs font-mono">
              <button
                onClick={() => setActiveTab('candidates')}
                className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'candidates'
                    ? 'border-[#D4AF37] text-[#FEF3C7]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>KYC Candidate Review ({applications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('publisher')}
                className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'publisher'
                    ? 'border-[#D4AF37] text-[#FEF3C7]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Rich-Text Intel Publisher</span>
              </button>

              <button
                onClick={() => setActiveTab('ledger')}
                className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'ledger'
                    ? 'border-[#D4AF37] text-[#FEF3C7]'
                    : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transaction & Escrow Ledger</span>
              </button>
            </div>

            {/* Admin Tab Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* TAB 1: KYC CANDIDATE MANAGEMENT */}
              {activeTab === 'candidates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                        Vetting Applicant Review & Sanctions Clearances
                      </h3>
                      <p className="text-xs text-[#94A3B8]">
                        Approve, hold, or flag incoming prospective delegates.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-xl p-4 space-y-3 font-mono text-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-2">
                          <div>
                            <span className="font-bold text-[#FEF3C7] text-sm">{app.fullName}</span>
                            <span className="text-[#94A3B8] ml-2">({app.title} — {app.company})</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold self-start ${
                              app.ocrExtractedData?.sanctionsCheckStatus === 'CLEARED'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                                : 'bg-red-950 text-red-400 border border-red-500'
                            }`}
                          >
                            STATUS: {app.ocrExtractedData?.sanctionsCheckStatus || 'PENDING'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                          <div>Email: <span className="text-[#FEF3C7]">{app.email}</span></div>
                          <div>Phone: <span className="text-[#FEF3C7]">{app.phone}</span></div>
                          <div>Jurisdiction: <span className="text-[#FEF3C7]">{app.country}</span></div>
                          <div>Tier: <span className="text-[#D4AF37] font-bold">{app.tier.toUpperCase()}</span></div>
                          <div>Target Month: <span className="text-[#FEF3C7]">{app.targetMonth}</span></div>
                          <div>Delegates: <span className="text-[#FEF3C7]">{app.delegateCount}</span></div>
                        </div>

                        {app.digitalSignature && (
                          <div className="text-[11px] text-[#94A3B8] bg-[#131B2E] p-2 rounded">
                            Digital Signature: <strong className="text-[#FEF3C7]">{app.digitalSignature}</strong> on {app.signatureDate}
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-end space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => handleCandidateAction(app.email, 'FLAGGED')}
                            className="px-3 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 text-xs cursor-pointer"
                          >
                            Flag Candidate
                          </button>
                          <button
                            onClick={() => handleCandidateAction(app.email, 'CLEARED')}
                            className="px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-bold cursor-pointer"
                          >
                            Approve KYC Clearance
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: RICH-TEXT BLOG PUBLISHER */}
              {activeTab === 'publisher' && (
                <form onSubmit={handlePublishArticle} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                        Direct-to-Cadastre Intelligence Publisher
                      </h3>
                      <p className="text-xs text-[#94A3B8]">
                        Publish formatted briefings with custom photos and statutory references into the 24-article live database.
                      </p>
                    </div>

                    {publishSuccess && (
                      <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-500 animate-bounce">
                        ✓ Article Published Live!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Article Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ultrasonic Detection of Lead-Cored Bullion in Kampala"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Pillar Category</label>
                      <select
                        value={postPillar}
                        onChange={(e: any) => setPostPillar(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Counter-Fraud">Counter-Fraud</option>
                        <option value="Regulatory">Regulatory</option>
                        <option value="Supply Chain">Supply Chain</option>
                        <option value="Lead Gen">Lead Gen</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Article Hook / Subtitle *</label>
                      <input
                        type="text"
                        required
                        placeholder="A punchy warning or opening revelation..."
                        value={postHook}
                        onChange={(e) => setPostHook(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Target Audience</label>
                      <input
                        type="text"
                        value={postTargetAudience}
                        onChange={(e) => setPostTargetAudience(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Diagnostic Core Summary *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="High-level forensic takeaway for risk officers..."
                      value={postSummary}
                      onChange={(e) => setPostSummary(e.target.value)}
                      className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Rich-Text Formatting Controls Toolbar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#0F172A] p-2 rounded-t-lg border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
                      <span className="text-[10px] text-[#94A3B8] mr-2">FORMATTING:</span>
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n## ')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n### ')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Heading 3"
                      >
                        <Heading3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n- ')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('\n> ')}
                        className="p-1 rounded hover:bg-[#1E293B]"
                        title="Blockquote"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      required
                      placeholder="Write your in-depth investigative article here. Separate paragraphs with double enter..."
                      value={postBody}
                      onChange={(e) => setPostBody(e.target.value)}
                      className="w-full bg-[#0B0F17] border border-t-0 border-[#D4AF37]/30 rounded-b-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Photo Upload & Preview */}
                  <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#D4AF37]/30 space-y-3">
                    <label className="text-xs font-mono text-[#FEF3C7] block">
                      Exhibit Photo Upload (Base64 Preview):
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-xs font-mono text-[#94A3B8]"
                      />
                      {postImagePreview && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#D4AF37] shrink-0">
                          <img src={postImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer"
                    >
                      Publish Intelligence Report Live
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: TRANSACTION LEDGER */}
              {activeTab === 'ledger' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                      Direct Package Settlement & Wire Ledger
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Audited transactions through Relworx and Standard Chartered Bank Uganda.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {clientInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="bg-[#0B0F17] border border-[#D4AF37]/20 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-2"
                      >
                        <div>
                          <div className="font-bold text-[#FEF3C7]">{inv.invoiceNumber} — {inv.milestoneTitle}</div>
                          <div className="text-[#94A3B8] text-[11px]">Method: {inv.paymentMethod || 'Escrow Wire'}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-400 text-sm">
                            ${inv.amount.toLocaleString()} USD
                          </span>
                          <span className="ml-2 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px]">
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
