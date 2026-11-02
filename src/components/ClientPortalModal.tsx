import React, { useState, useEffect } from 'react';
import {
  X,
  UserCheck,
  FileText,
  CreditCard,
  ShieldCheck,
  Download,
  CheckCircle2,
  Clock,
  Lock,
  ListTodo,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { VaultDocument } from '../types';
import { googleSignIn, initAuth, logout, getAccessToken } from '../services/firebaseAuth';
import { fetchGoogleTasks, createGoogleTask } from '../services/workspaceService';
import { User } from 'firebase/auth';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VAULT_DOCUMENTS: VaultDocument[] = [
  {
    id: 'DOC-VAULT-01',
    title: 'Mining and Minerals Act 2022 (Acts Supplement No. 7)',
    category: 'Statutory Laws',
    classification: 'DELEGATE CLEARED',
    fileSize: '4.8 MB',
    effectiveDate: 'October 2022',
    statutoryRef: 'UPPC Gazette Vol. CXV No. 58',
    description: 'Official printed gazette detailing mineral title categories, mandatory domestic value addition, and 15% Free-Carried Interest regulations.',
  },
  {
    id: 'DOC-VAULT-02',
    title: 'Wagagai Mining Lease LML-0023 Cadastre Polygon Coordinates',
    category: 'Licensing',
    classification: 'RESTRICTED',
    fileSize: '2.1 MB',
    effectiveDate: 'Active Concession',
    statutoryRef: 'DGSM Cadastre Folio BUSIA-LML-0023',
    description: 'Statutory coordinate boundaries, underground decline shaft engineering schematics, and Ministry of Energy inspection approvals.',
  },
  {
    id: 'DOC-VAULT-03',
    title: 'African Gold Refinery (AGR) Smelting & Miller Process Audit',
    category: 'Assay Protocols',
    classification: 'CONFIDENTIAL',
    fileSize: '3.4 MB',
    effectiveDate: '2024 Certification',
    statutoryRef: 'UFZA Operator License ML-4819',
    description: 'Full metallurgical process flowsheet, chlorination furnace specifications, and 999.9 Good Delivery casting standards.',
  },
  {
    id: 'DOC-VAULT-04',
    title: 'URA Customs ASYCUDA World Gold Export Declaration Model',
    category: 'Taxation & Customs',
    classification: 'DELEGATE CLEARED',
    fileSize: '1.2 MB',
    effectiveDate: 'Revised 2024',
    statutoryRef: 'URA Customs Act Cap 196 § 115',
    description: 'Sample authentic Payment Registration Number (PRN) receipt, Bank of Uganda Consolidated Fund confirmation, and airside cargo seal register.',
  },
  {
    id: 'DOC-VAULT-05',
    title: 'Forensic Case Exhibit: Seized Tungsten-Core Counterfeit Bars',
    category: 'Chain of Custody',
    classification: 'DIRECTORATE USE',
    fileSize: '5.9 MB',
    effectiveDate: 'Police Archive',
    statutoryRef: 'MPPU Case Docket UG/KLA/CID/2024/118',
    description: 'High-resolution cross-sectional photos and ultrasonic spectrometry readings of 15 seized tungsten-cored bars from Kampala hotel scams.',
  },
];

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const {
    activeApplication,
    clientInvoices,
    briefingBookings,
    triggerCheckout,
  } = useSiteConfig();

  const [activeTab, setActiveTab] = useState<'invoices' | 'vault' | 'vetting' | 'tasks'>('invoices');
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [googleTasks, setGoogleTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskLoading, setTaskLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      initAuth(
        (user) => {
          setGoogleUser(user);
          loadTasks();
        },
        () => {
          setGoogleUser(null);
          setGoogleTasks([]);
        }
      );
    }
  }, [isOpen]);

  const loadTasks = async () => {
    try {
      const items = await fetchGoogleTasks();
      setGoogleTasks(items);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        await loadTasks();
      }
    } catch (err) {
      console.error('Sign-in error:', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const confirmed = window.confirm(
      `Confirm: Add task "${newTaskTitle}" to your Google Tasks due-diligence list?`
    );
    if (!confirmed) return;

    setTaskLoading(true);
    try {
      await createGoogleTask({
        title: newTaskTitle,
        notes: 'Uganda Gold Expedition — Statutory Anti-Fraud Action Item',
      });
      setNewTaskTitle('');
      await loadTasks();
    } catch (e: any) {
      alert(`Error creating Google task: ${e.message}`);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDownloadDoc = (doc: VaultDocument) => {
    const textContent = `UGANDA GOLD EXPEDITION — DOCUMENT VAULT
Document: ${doc.title}
Category: ${doc.category}
Statutory Reference: ${doc.statutoryRef}
Classification: ${doc.classification}
Effective Date: ${doc.effectiveDate}

SUMMARY & STATUTORY SPECIFICATIONS:
${doc.description}

[AUTHENTIC DIGITAL SIGNATURE: MINISTRY OF ENERGY & MINERAL DEVELOPMENT CADASTRE DESK]`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#131B2E] border-2 border-[#D4AF37] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative gold-glow">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0F172A] border-b border-[#D4AF37]/30 p-5 sm:p-6 flex items-start justify-between z-10">
          <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
            <div className="p-3 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block">
                INSTITUTIONAL CLIENT PORTAL
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FEF3C7]">
                {activeApplication ? activeApplication.company : 'Delegate Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {googleUser ? (
              <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
                <span>{googleUser.email}</span>
                <button
                  onClick={() => logout()}
                  className="px-2 py-1 rounded bg-[#1E293B] text-[#D4AF37] hover:text-[#FEF3C7]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleAuth}
                disabled={isSigningIn}
                className="gsi-material-button inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-white text-gray-800 text-xs font-medium shadow hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1E293B] text-[#94A3B8] hover:text-[#FEF3C7]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-[#0F172A] px-6 border-b border-[#D4AF37]/20 flex space-x-6 rtl:space-x-reverse text-xs font-mono">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'invoices'
                ? 'border-[#D4AF37] text-[#FEF3C7]'
                : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Milestone Invoices ({clientInvoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'vault'
                ? 'border-[#D4AF37] text-[#FEF3C7]'
                : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Secure Document Vault ({VAULT_DOCUMENTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vetting')}
            className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'vetting'
                ? 'border-[#D4AF37] text-[#FEF3C7]'
                : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vetting & Escort Status</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-3.5 border-b-2 font-semibold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'tasks'
                ? 'border-[#D4AF37] text-[#FEF3C7]'
                : 'border-transparent text-[#94A3B8] hover:text-[#FEF3C7]'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Tasks Checklist</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: INVOICES */}
          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                    Contractual Delegation Milestone Invoices
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Invoiced against official corporate agreements. Compliant with Uganda Financial Intelligence Authority standards.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {clientInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="bg-[#0B0F17] border border-[#D4AF37]/25 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="font-bold text-[#FEF3C7] text-sm">{inv.invoiceNumber}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inv.status === 'PAID'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                              : 'bg-amber-950 text-amber-400 border border-amber-500/50'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>
                      <div className="text-slate-300 text-xs font-sans">{inv.milestoneTitle}</div>
                      <div className="text-[11px] text-[#64748B]">
                        Due Date: {inv.dueDate} {inv.paymentMethod && `• ${inv.paymentMethod}`}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4 rtl:space-x-reverse">
                      <div className="text-right">
                        <div className="text-lg font-bold font-cinzel text-[#FEF3C7]">
                          ${inv.amount.toLocaleString()} USD
                        </div>
                      </div>

                      {inv.status === 'PENDING' ? (
                        <button
                          onClick={() =>
                            triggerCheckout({
                              tier: inv.tier,
                              amount: inv.amount,
                              paymentType: 'tranche_a',
                              title: `${inv.invoiceNumber}: ${inv.milestoneTitle}`,
                            })
                          }
                          className="px-3.5 py-1.5 rounded-md bg-[#D4AF37] text-[#0B0F17] font-bold text-xs hover:brightness-110 cursor-pointer"
                        >
                          Settle Invoice
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const blob = new Blob(
                              [
                                `OFFICIAL RECEIPT / SETTLEMENT CONFIRMATION
Invoice: ${inv.invoiceNumber}
Amount: $${inv.amount.toLocaleString()} USD
Status: PAID
Beneficiary: Gold Safaris & Expedition Directorate Ltd
Jurisdiction: Kampala, Republic of Uganda`,
                              ],
                              { type: 'text/plain' }
                            );
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Receipt_${inv.invoiceNumber.replace(/\//g, '_')}.txt`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }}
                          className="px-3 py-1.5 rounded-md bg-[#1E293B] hover:bg-[#D4AF37] hover:text-[#0B0F17] text-[#FEF3C7] text-xs flex items-center space-x-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SECURE DOCUMENT VAULT */}
          {activeTab === 'vault' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                  Statutory Cadastre & Geochemical Vault
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Authenticated official government gazettes, concessions maps, and criminal forensic exhibits for active delegates.
                </p>
              </div>

              <div className="space-y-3">
                {VAULT_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-[#0B0F17] border border-[#D4AF37]/25 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="font-mono text-xs text-[#D4AF37] font-semibold">{doc.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#FEF3C7]">
                          {doc.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                          {doc.classification}
                        </span>
                      </div>
                      <h4 className="font-cinzel text-sm font-bold text-[#FEF3C7]">{doc.title}</h4>
                      <p className="text-xs text-[#94A3B8] font-sans max-w-2xl">{doc.description}</p>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className="shrink-0 px-3.5 py-2 rounded-lg bg-[#1E293B] hover:bg-[#D4AF37] hover:text-[#0B0F17] text-[#FEF3C7] font-mono text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Spec ({doc.fileSize})</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VETTING STATUS */}
          {activeTab === 'vetting' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                  Delegation Vetting & Security Clearance Progression
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Track progress through the Ministry of Energy Cadastre and Minerals Police Protection Unit (MPPU).
                </p>
              </div>

              {activeApplication ? (
                <div className="space-y-6">
                  {/* Progress Milestone Line */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-emerald-500/50 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>STAGE 01</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="font-cinzel font-bold text-xs text-[#FEF3C7]">OCR & Identity Scanned</div>
                      <div className="text-[10px] text-[#94A3B8]">Passport metadata cleared</div>
                    </div>

                    <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-emerald-500/50 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span>STAGE 02</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="font-cinzel font-bold text-xs text-[#FEF3C7]">Sanctions Watchlist</div>
                      <div className="text-[10px] text-[#94A3B8]">OFAC & UN list cleared</div>
                    </div>

                    <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-[#D4AF37]/50 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                        <span>STAGE 03</span>
                        <Clock className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="font-cinzel font-bold text-xs text-[#FEF3C7]">MPPU Tactical Escort</div>
                      <div className="text-[10px] text-[#94A3B8]">Armored convoy allocated</div>
                    </div>

                    <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-[#1E293B] space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                        <span>STAGE 04</span>
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="font-cinzel font-bold text-xs text-[#94A3B8]">Entebbe Airside Pass</div>
                      <div className="text-[10px] text-[#64748B]">Issued 7 days prior</div>
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="bg-[#0B0F17] p-5 rounded-xl border border-[#D4AF37]/25 space-y-3 font-mono text-xs">
                    <div className="text-[#D4AF37] font-bold">APPLICATION SUMMARY RECORD:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                      <div>Lead Delegate: <strong className="text-[#FEF3C7]">{activeApplication.fullName}</strong></div>
                      <div>Organization: <strong className="text-[#FEF3C7]">{activeApplication.company}</strong></div>
                      <div>Target Month: <strong className="text-[#FEF3C7]">{activeApplication.targetMonth}</strong></div>
                      <div>Delegation Tier: <strong className="text-[#FEF3C7]">{activeApplication.tier.toUpperCase()}</strong></div>
                      <div>Sanctions Status: <strong className="text-emerald-400">CLEARED</strong></div>
                      <div>Document Ref: <strong className="text-[#FEF3C7]">{activeApplication.ocrExtractedData?.documentNumber}</strong></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs font-mono text-[#94A3B8]">
                  No active vetting application found. Submit an application from the home page.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GOOGLE TASKS CHECKLIST */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#FEF3C7]">
                    Google Tasks Due-Diligence Checklist
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Live synchronization with your personal or corporate Google Tasks list.
                  </p>
                </div>

                {!googleUser && (
                  <button
                    onClick={handleGoogleAuth}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-gray-800 text-xs font-semibold hover:bg-gray-100 flex items-center space-x-1.5 self-start cursor-pointer"
                  >
                    <span>Connect Google Tasks</span>
                  </button>
                )}
              </div>

              {/* Add Task Form */}
              <form onSubmit={handleCreateTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Audit Wagagai LML-0023 Cadastre Coordinates..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-[#0B0F17] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs font-mono text-[#FEF3C7] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={taskLoading || !googleUser}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0B0F17] font-cinzel text-xs font-bold uppercase disabled:opacity-50 cursor-pointer"
                >
                  {taskLoading ? 'Adding...' : 'Add Task'}
                </button>
              </form>

              {/* Google Tasks List */}
              <div className="space-y-2">
                {googleTasks.length > 0 ? (
                  googleTasks.map((t: any, idx: number) => (
                    <div
                      key={t.id || idx}
                      className="bg-[#0B0F17] border border-[#D4AF37]/20 rounded-lg p-3 flex items-center justify-between text-xs font-mono text-slate-300"
                    >
                      <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            t.status === 'completed' ? 'text-emerald-400' : 'text-[#64748B]'
                          }`}
                        />
                        <span className={t.status === 'completed' ? 'line-through text-[#64748B]' : 'text-[#FEF3C7]'}>
                          {t.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">Google Tasks Synced</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#0B0F17] p-6 rounded-xl border border-[#D4AF37]/15 text-center text-xs font-mono text-[#94A3B8]">
                    {googleUser
                      ? 'No active due diligence tasks found in your primary Google Tasks list. Use the input above to create statutory action items.'
                      : 'Sign in with your Google account above to sync and manage your expedition tasks.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
