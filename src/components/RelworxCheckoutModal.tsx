import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building,
  Smartphone,
  Lock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { PaymentMethod } from '../types';

export const RelworxCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutPayload,
    recordPaymentSuccess,
  } = useSiteConfig();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('889');
  const [cardName, setCardName] = useState(checkoutPayload?.applicantName || 'Lord Alexander Wright');
  const [momoNumber, setMomoNumber] = useState('+256 772 000 000');
  const [processing, setProcessing] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [copiedWire, setCopiedWire] = useState(false);

  if (!isCheckoutOpen || !checkoutPayload) return null;

  const handlePayNow = () => {
    setProcessing(true);

    setTimeout(() => {
      const generatedRef = `REL-UG-${Date.now().toString().slice(-6)}-SEC`;
      setSuccessRef(generatedRef);
      setProcessing(false);
      recordPaymentSuccess(generatedRef, checkoutPayload.amount);
    }, 1800);
  };

  const handleClose = () => {
    setSuccessRef(null);
    setIsCheckoutOpen(false);
  };

  const handleCopyWire = () => {
    const wireInfo = `UGANDA GOLD EXPEDITION — CORPORATE SETTLEMENT WIRE
Beneficiary: Gold Safaris & Expedition Directorate Ltd
Bank: Standard Chartered Bank Uganda Ltd
Account Number: 0102088492010
Currency: USD
SWIFT / BIC: SCBLUGKX
Branch: Speke Road Branch, Kampala, Uganda
Payment Reference: ${checkoutPayload.applicantName || 'UGE-SETTLE'}-${Date.now().toString().slice(-4)}`;
    navigator.clipboard.writeText(wireInfo);
    setCopiedWire(true);
    setTimeout(() => setCopiedWire(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Modal Header */}
        <div className="bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                RELWORX DIRECT SETTLEMENT GATEWAY
              </span>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FEF3C7]">
                Secured Package Payment
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Success Screen */}
          {successRef ? (
            <div className="text-center py-6 space-y-4 font-sans animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
                Settlement Cleared Successfully
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your transaction has been confirmed by Relworx Escrow Gateway. An official receipt has been issued to your Client Portal.
              </p>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#D4AF37]/40 text-xs font-mono max-w-md mx-auto text-left space-y-1.5">
                <div className="text-[#D4AF37] font-bold">TRANSACTION RECEIPT METADATA:</div>
                <div className="text-slate-300">Reference: <strong className="text-[#FEF3C7]">{successRef}</strong></div>
                <div className="text-slate-300">Amount Paid: <strong className="text-emerald-400 font-bold">${checkoutPayload.amount.toLocaleString()} USD</strong></div>
                <div className="text-slate-300">Item: <span className="text-[#FEF3C7]">{checkoutPayload.title}</span></div>
                <div className="text-slate-300">Applicant: <span className="text-[#FEF3C7]">{checkoutPayload.applicantName || 'Verified Delegate'}</span></div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                >
                  Return to Expedition Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Order Invoice Summary */}
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold block">
                    INVOICED TRANSACTION ITEM:
                  </span>
                  <div className="font-cinzel text-sm sm:text-base font-bold text-[#FEF3C7]">
                    {checkoutPayload.title}
                  </div>
                  {checkoutPayload.applicantName && (
                    <div className="text-xs text-[#94A3B8] font-mono mt-0.5">
                      Client: {checkoutPayload.applicantName} ({checkoutPayload.applicantEmail})
                    </div>
                  )}
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-2xl sm:text-3xl font-extrabold font-cinzel text-emerald-400 block">
                    ${checkoutPayload.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">USD Curreny</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-[#D4AF37] font-bold block">
                  Select Settlement Rail:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#1E293B] border-[#D4AF37] text-[#FEF3C7] font-bold'
                        : 'bg-[#0F172A] border-[#D4AF37]/20 text-[#94A3B8] hover:bg-[#1E293B]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo_mtn')}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                      paymentMethod === 'momo_mtn'
                        ? 'bg-[#1E293B] border-amber-400 text-[#FEF3C7] font-bold'
                        : 'bg-[#0F172A] border-[#D4AF37]/20 text-[#94A3B8] hover:bg-[#1E293B]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo_airtel')}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                      paymentMethod === 'momo_airtel'
                        ? 'bg-[#1E293B] border-red-400 text-[#FEF3C7] font-bold'
                        : 'bg-[#0F172A] border-[#D4AF37]/20 text-[#94A3B8] hover:bg-[#1E293B]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-red-400" />
                    <span>Airtel Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('swift_wire')}
                    className={`p-2.5 rounded-lg border text-xs font-mono flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                      paymentMethod === 'swift_wire'
                        ? 'bg-[#1E293B] border-blue-400 text-[#FEF3C7] font-bold'
                        : 'bg-[#0F172A] border-[#D4AF37]/20 text-[#94A3B8] hover:bg-[#1E293B]'
                    }`}
                  >
                    <Building className="w-4 h-4 text-blue-400" />
                    <span>SWIFT Wire</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Details Area */}
              {paymentMethod === 'card' && (
                <div className="bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/25 space-y-3 font-sans">
                  <div>
                    <label className="text-[11px] font-mono text-[#FEF3C7] block mb-1">Cardholder Legal Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#FEF3C7] block mb-1">Card Number (Visa / Mastercard)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-[#FEF3C7] block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-[#FEF3C7] block mb-1">CVV / CVC Security</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'momo_mtn' || paymentMethod === 'momo_airtel') && (
                <div className="bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/25 space-y-3 font-sans">
                  <div className="text-xs text-slate-300">
                    Enter your East Africa Mobile Money registered phone number. A PIN push prompt will be dispatched to your handset.
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-[#FEF3C7] block mb-1">
                      {paymentMethod === 'momo_mtn' ? 'MTN MoMo Number (UG/KE/RW)' : 'Airtel Money Number (UG/KE/TZ)'}
                    </label>
                    <input
                      type="tel"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value)}
                      className="w-full bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'swift_wire' && (
                <div className="bg-[#0F172A] p-4 rounded-xl border border-[#D4AF37]/25 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#D4AF37] font-bold border-b border-[#1E293B] pb-2">
                    <span>STANDARD CHARTERED BANK ESCROW WIRE:</span>
                    <button
                      onClick={handleCopyWire}
                      className="text-[11px] text-[#FEF3C7] hover:text-[#D4AF37] flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedWire ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedWire ? 'Copied Wire Info' : 'Copy All Wire Details'}</span>
                    </button>
                  </div>
                  <div className="text-slate-300">Beneficiary: <strong>Gold Safaris & Expedition Directorate Ltd</strong></div>
                  <div className="text-slate-300">Account (USD): <strong>0102088492010</strong></div>
                  <div className="text-slate-300">SWIFT BIC: <strong>SCBLUGKX</strong></div>
                  <div className="text-slate-300">Branch: Speke Road Branch, Kampala, Uganda</div>
                  <div className="text-emerald-400 text-[11px]">
                    Reference: UGE-{checkoutPayload.applicantName?.slice(0, 4).toUpperCase() || 'CAD'}-{Date.now().toString().slice(-4)}
                  </div>
                </div>
              )}

              {/* Settlement Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={processing}
                  onClick={handlePayNow}
                  className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {processing
                      ? 'Authorizing Relworx Encrypted Settlement...'
                      : paymentMethod === 'swift_wire'
                      ? 'Confirm Wire Transfer Instruction & Generate Invoice'
                      : `Authorize Direct Payment of $${checkoutPayload.amount.toLocaleString()} USD`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#64748B]">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>256-bit TLS Military Grade Encryption • Relworx Financial Escrow</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
