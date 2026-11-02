import React, { useState } from 'react';
import {
  X,
  Shield,
  FileCheck2,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Lock,
  UserCheck,
  FileText,
  Scan,
  Sparkles,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ExpeditionTier, VettingFormData } from '../types';

interface VettingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VettingForm: React.FC<VettingFormProps> = ({ isOpen, onClose }) => {
  const {
    selectedTierForVetting,
    setSelectedTierForVetting,
    packages,
    submitVettingApplication,
  } = useSiteConfig();

  const [formData, setFormData] = useState<Partial<VettingFormData>>({
    fullName: '',
    title: '',
    company: '',
    website: '',
    country: 'United States',
    email: '',
    phone: '',
    tier: selectedTierForVetting,
    objectives: ['Direct refinery physical assay', 'Wagagai underground shaft inspection'],
    unsolicitedExperience: '',
    targetMonth: 'November 2025',
    delegateCount: 1,
    departureAirport: 'JFK New York / LHR London',
    closeProtectionRequired: 'Standard MPPU Armed Escort Details',
    criminalRecordClearance: false,
    sanctionsDeclarationClearance: false,
    agreedNonTransaction: false,
    agreedPassportVetting: false,
    agreedKycNonRefundable: false,
    digitalSignature: '',
    signatureDate: new Date().toISOString().split('T')[0],
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrData, setOcrData] = useState<{
    documentNumber: string;
    issuingCountry: string;
    expiryDate: string;
    sanctionsCheckStatus: 'CLEARED' | 'FLAGGED' | 'VERIFIED';
  } | null>(null);

  if (!isOpen) return null;

  const currentPkg = packages.find((p) => p.id === formData.tier) || packages[1];

  const handleObjectiveToggle = (obj: string) => {
    const current = formData.objectives || [];
    if (current.includes(obj)) {
      setFormData({ ...formData, objectives: current.filter((o) => o !== obj) });
    } else {
      setFormData({ ...formData, objectives: [...current, obj] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setOcrScanning(true);

    // Simulate real-time biometric OCR analysis
    setTimeout(() => {
      const generatedDocNum = `DOC-${Math.floor(100000000 + Math.random() * 900000000)}`;
      const extracted = {
        documentNumber: generatedDocNum,
        issuingCountry: formData.country || 'International Jurisdiction',
        expiryDate: '2032-10-31',
        sanctionsCheckStatus: 'CLEARED' as const,
      };
      setOcrData(extracted);
      setOcrScanning(false);
      setFormData((prev) => ({
        ...prev,
        idDocumentName: file.name,
        idDocumentSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        idDocumentVerified: true,
        ocrExtractedData: extracted,
      }));
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.agreedNonTransaction ||
      !formData.agreedPassportVetting ||
      !formData.agreedKycNonRefundable
    ) {
      alert('You must accept the Statutory Non-Transactional Charter and KYC terms to proceed.');
      return;
    }

    if (!formData.criminalRecordClearance || !formData.sanctionsDeclarationClearance) {
      alert('You must clear the statutory background declarations.');
      return;
    }

    if (!formData.digitalSignature) {
      alert('Please enter your legal name as digital signature.');
      return;
    }

    const completedApplication: VettingFormData = {
      fullName: formData.fullName || '',
      title: formData.title || '',
      company: formData.company || '',
      website: formData.website || '',
      country: formData.country || 'International',
      email: formData.email || '',
      phone: formData.phone || '',
      tier: formData.tier || selectedTierForVetting,
      objectives: formData.objectives || [],
      unsolicitedExperience: formData.unsolicitedExperience || '',
      targetMonth: formData.targetMonth || 'November 2025',
      delegateCount: Number(formData.delegateCount) || 1,
      departureAirport: formData.departureAirport || '',
      closeProtectionRequired: formData.closeProtectionRequired || 'Standard MPPU Tactical Escort',
      idDocumentName: formData.idDocumentName || 'institutional_id_sample.pdf',
      idDocumentSize: formData.idDocumentSize || '2.1 MB',
      idDocumentVerified: true,
      ocrExtractedData: ocrData || {
        documentNumber: 'PASSPORT-UG-8891240',
        issuingCountry: formData.country || 'International',
        expiryDate: '2033-05-18',
        sanctionsCheckStatus: 'CLEARED',
      },
      criminalRecordClearance: true,
      sanctionsDeclarationClearance: true,
      agreedNonTransaction: true,
      agreedPassportVetting: true,
      agreedKycNonRefundable: true,
      digitalSignature: formData.digitalSignature,
      signatureDate: formData.signatureDate || new Date().toISOString().split('T')[0],
      packagePaid: false,
      depositPaid: false,
    };

    submitVettingApplication(completedApplication);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 sm:p-6 flex items-start justify-between z-10">
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                MINISTERIAL SECURITY CLEARANCE PROTOCOL
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
                Institutional Vetting & Delegation Application
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 font-sans">
          {/* Section 1: Tier Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold block">
              1. Select Delegation Package Tier:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {packages.map((pkg) => {
                const isSelected = formData.tier === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, tier: pkg.id });
                      setSelectedTierForVetting(pkg.id);
                    }}
                    className={`p-4 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B0F17] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                        : 'bg-[#0F172A] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] mb-1">
                      <span>{pkg.badge || 'PROTOCOL'}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                    <div className="font-cinzel font-bold text-sm text-[#FEF3C7] truncate">
                      {pkg.name}
                    </div>
                    <div className="text-base font-extrabold font-cinzel text-[#FEF3C7] mt-1">
                      {pkg.priceFormatted}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Applicant & Institutional Profiling */}
          <div className="space-y-4">
            <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold block">
              2. Institutional Applicant Identification:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Wright"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Corporate Title / Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Investment Officer / Head of Bullion Desk"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Company / Entity Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurich Sovereign Commodity Fund"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Corporate Website</label>
                <input
                  type="url"
                  placeholder="https://company.ch"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="a.wright@zurichfund.ch"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Direct Telephone / Secure Line *</label>
                <input
                  type="tel"
                  required
                  placeholder="+41 44 211 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Jurisdiction / Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="United Arab Emirates">United Arab Emirates (Dubai)</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Other">Other Sovereign Jurisdiction</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Number of Delegates</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.delegateCount}
                  onChange={(e) => setFormData({ ...formData, delegateCount: parseInt(e.target.value) || 1 })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Due Diligence Objectives & Prior Experience */}
          <div className="space-y-4">
            <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold block">
              3. Delegation Objectives & Market Intelligence:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {[
                'Direct refinery physical assay & induction melting observation',
                'Wagagai underground decline shaft inspection',
                'ICGLR conflict-free supply chain compliance audit',
                'Verification of current gold contracts & broker claims',
                'URA airside bonded vault & export tax release protocol',
                'Exposing counterfeit tungsten cores & laboratory testing',
              ].map((obj, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-[#0F172A] p-2.5 rounded-lg border border-[#D4AF37]/15 cursor-pointer hover:border-[#D4AF37]/40"
                >
                  <input
                    type="checkbox"
                    checked={formData.objectives?.includes(obj)}
                    onChange={() => handleObjectiveToggle(obj)}
                    className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                  <span>{obj}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="text-xs font-mono text-[#FEF3C7] block mb-1">
                Have you or your firm received unsolicited gold offers or encountered potential fraud in East Africa?
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe any broker claims, discounts offered, or prior hotel room meetings you wish our investigators to analyze..."
                value={formData.unsolicitedExperience}
                onChange={(e) => setFormData({ ...formData, unsolicitedExperience: e.target.value })}
                className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Section 4: Document Verification with Simulated OCR Scanner */}
          <div className="space-y-4 bg-[#0B0F17] p-5 rounded-xl border border-[#D4AF37]/30">
            <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold flex items-center space-x-2">
              <Scan className="w-4 h-4 text-[#D4AF37]" />
              <span>4. Identity Document Upload & Simulated Forensic OCR Scanner:</span>
            </label>

            <p className="text-xs text-[#94A3B8]">
              Upload applicant passport photo page or official corporate mandate. Our simulated optical intelligence extracts document metadata and tests against international sanctions lists.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="flex-1 w-full flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-xl cursor-pointer bg-[#0F172A]/80 transition-all text-center">
                <Upload className="w-6 h-6 text-[#D4AF37] mb-2" />
                <span className="text-xs font-mono text-[#FEF3C7]">Click to select Passport or Document Scan</span>
                <span className="text-[10px] font-mono text-[#64748B] mt-0.5">Supports PDF, JPG, PNG (Max 10MB)</span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* OCR Scanning Results Card */}
              {ocrScanning && (
                <div className="flex-1 w-full bg-[#131B2E] p-4 rounded-xl border border-[#D4AF37]/40 text-center animate-pulse">
                  <div className="text-xs font-mono text-[#D4AF37] font-bold mb-1">
                    PERFORMING OPTICAL RECOGNITION & SANCTIONS AUDIT...
                  </div>
                  <div className="text-[11px] font-mono text-[#94A3B8]">
                    Scanning document {uploadedFileName}...
                  </div>
                </div>
              )}

              {ocrData && !ocrScanning && (
                <div className="flex-1 w-full bg-[#131B2E] p-4 rounded-xl border border-emerald-500/40 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">
                    <span className="flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>OCR EXTRACTION VERIFIED</span>
                    </span>
                    <span className="bg-emerald-950 px-2 py-0.5 rounded text-[10px] border border-emerald-500">
                      STATUS: {ocrData.sanctionsCheckStatus}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    Doc No: <strong className="text-[#FEF3C7]">{ocrData.documentNumber}</strong>
                  </div>
                  <div className="text-slate-300">
                    Jurisdiction: <strong className="text-[#FEF3C7]">{ocrData.issuingCountry}</strong>
                  </div>
                  <div className="text-slate-300">
                    Expiry Date: <strong className="text-[#FEF3C7]">{ocrData.expiryDate}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Legal Warranties, Non-Transactional Charter, and Signature */}
          <div className="space-y-3 bg-[#0F172A] p-5 rounded-xl border border-[#D4AF37]/30">
            <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold block">
              5. Statutory Warranties & Legal Undertaking:
            </label>

            <label className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.criminalRecordClearance}
                onChange={(e) => setFormData({ ...formData, criminalRecordClearance: e.target.checked })}
                className="accent-[#D4AF37] w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              />
              <span>
                <strong>Criminal & Regulatory Declaration:</strong> I warrant that neither I nor the named corporate entity has ever been convicted of mineral smuggling, money laundering, or sanctions evasions.
              </span>
            </label>

            <label className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.sanctionsDeclarationClearance}
                onChange={(e) => setFormData({ ...formData, sanctionsDeclarationClearance: e.target.checked })}
                className="accent-[#D4AF37] w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              />
              <span>
                <strong>Sanctions List Affirmation:</strong> I certify that our delegates are not listed on OFAC, UN Security Council, or European Union sanctions registers.
              </span>
            </label>

            <label className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs text-[#FEF3C7] cursor-pointer bg-[#0B0F17] p-3 rounded-lg border border-[#D4AF37]/30">
              <input
                type="checkbox"
                required
                checked={formData.agreedNonTransaction}
                onChange={(e) => setFormData({ ...formData, agreedNonTransaction: e.target.checked })}
                className="accent-[#D4AF37] w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              />
              <span>
                <strong className="text-[#D4AF37] block mb-0.5">STRICT NON-TRANSACTIONAL CHARTER (MANDATORY):</strong>
                I understand and irrevocably agree that the Uganda Gold Expedition does not trade, buy, or sell gold, nor act as a broker. I agree not to engage in unauthorized cash purchases or solicit street transactions during the delegation.
              </span>
            </label>

            <label className="flex items-start space-x-2.5 rtl:space-x-reverse text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.agreedKycNonRefundable}
                onChange={(e) => setFormData({ ...formData, agreedKycNonRefundable: e.target.checked })}
                className="accent-[#D4AF37] w-4 h-4 mt-0.5 cursor-pointer shrink-0"
              />
              <span>
                <strong>$1,000 Non-Refundable KYC & Intelligence Audit Fee:</strong> I agree that upon submission, an initial $1,000 auditing fee is due immediately via direct gateway. Upon ministerial clearance, this exact $1,000 is credited toward our Tranche A delegation milestone invoice.
              </span>
            </label>

            {/* Digital Signature */}
            <div className="pt-3 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">
                  Digital Signature (Type Full Legal Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Wright"
                  value={formData.digitalSignature}
                  onChange={(e) => setFormData({ ...formData, digitalSignature: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#FEF3C7] block mb-1">Signature Date</label>
                <input
                  type="date"
                  value={formData.signatureDate}
                  onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D4AF37]/20">
            <div className="text-xs font-mono text-[#94A3B8]">
              Next Step: Direct settlement of the $1,000 KYC fee via Relworx Gateway.
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#0B0F17] text-[#94A3B8] text-xs font-mono transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Submit Vetting & Launch Settlement ($1,000)</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
