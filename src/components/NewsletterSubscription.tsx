import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWarning(null);

    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();

    if (publicDomains.includes(domain)) {
      setWarning('Note: You are subscribing with a public webmail provider. Institutional corporate domains receive enhanced ministerial circulars.');
    }

    setSubscribed(true);
  };

  return (
    <div className="bg-[#131B2E] border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-10 shadow-xl max-w-4xl mx-auto my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left rtl:md:text-right">
          <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-mono text-[#D4AF37] uppercase font-bold">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>MONTHLY REGULATORY INTELLIGENCE CIRCULAR</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
            Subscribe to the East Africa Cadastre Gazette
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg leading-relaxed">
            Receive monthly ministerial gazette updates, newly registered Large-Scale Mining Leases (LML), active criminal syndicate alerts, and ICGLR certification summaries.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0">
          {subscribed ? (
            <div className="bg-[#0B0F17] border border-emerald-500/40 rounded-xl p-4 text-xs font-mono text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Subscribed! Monthly regulatory dispatch active.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@institution.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-4 py-2.5 text-xs font-mono text-[#FEF3C7] placeholder-[#64748B] focus:outline-none focus:border-[#D4AF37] w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer flex items-center justify-center space-x-1 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {warning && (
                <div className="text-[10px] font-mono text-amber-300/90 leading-tight">
                  {warning}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
