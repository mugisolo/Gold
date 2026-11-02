import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  nav: {
    expedition: string;
    reality: string;
    itinerary: string;
    tiers: string;
    partners: string;
    directorate: string;
    legal: string;
    intel: string;
    advisorChat: string;
    clientPortal: string;
    adminVault: string;
    applyNow: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    nonTransactionalNotice: string;
    nonTransactionalDetail: string;
    applyBtn: string;
    dossierBtn: string;
    directCheckoutNotice: string;
    statutoryAssurance: string;
  };
  reality: {
    tag: string;
    title: string;
    description: string;
    scamTitle: string;
    statutoryTitle: string;
    viewMatrix: string;
  };
  itinerary: {
    tag: string;
    title: string;
    description: string;
    dayPrefix: string;
    statutoryClearance: string;
  };
  pricing: {
    tag: string;
    title: string;
    subtitle: string;
    kycNoticeTitle: string;
    kycNoticeBody: string;
    perHead: string;
    applyForTier: string;
    popularBadge: string;
    milestoneA: string;
    milestoneB: string;
  };
  partners: {
    tag: string;
    title: string;
    subtitle: string;
    allFilter: string;
    mines: string;
    refineries: string;
    regulators: string;
    logistics: string;
    laboratories: string;
    viewDossier: string;
  };
  common: {
    close: string;
    download: string;
    copyLicense: string;
    copied: string;
    status: string;
    verified: string;
    submit: string;
    loading: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      expedition: 'Expedition',
      reality: 'Market Reality',
      itinerary: '7-Day Itinerary',
      tiers: 'Delegation Tiers',
      partners: 'Statutory Directory',
      directorate: 'Directorate',
      legal: 'Legal Charter',
      intel: 'Forensic Intel',
      advisorChat: 'Cadastre AI Officer',
      clientPortal: 'Client Portal',
      adminVault: 'Admin Vault',
      applyNow: 'Apply for Vetting',
    },
    hero: {
      badge: 'PRESIDENTIAL MINING CADASTRE PROTOCOL • REPUBLIC OF UGANDA',
      headline: "Don't Wire A Single Dollar Until You",
      headlineHighlight: 'Walk The Supply Chain.',
      subheadline: "The world's only hands-on anti-fraud and physical due-diligence delegation across East Africa's statutory gold trade architecture. Direct access to large-scale industrial shafts, accredited LBMA-standard refineries, Directorate of Mines vaults, and Entebbe airside bonded customs.",
      nonTransactionalNotice: 'STRICT NON-TRANSACTIONAL CHARTER',
      nonTransactionalDetail: 'Gold Safaris & Expedition does not buy, sell, broker, or hold gold. We are an educational, investigative delegation ensuring zero illicit street exposure.',
      applyBtn: 'Apply for Institutional Vetting',
      dossierBtn: 'Download Protocol Dossier',
      directCheckoutNotice: 'Direct Settlement via Visa/Mastercard, MTN/Airtel MoMo, & SWIFT Escrow Wire.',
      statutoryAssurance: 'Governed by Mining & Minerals Act 2022 • ICGLR Regional Certification Mechanism',
    },
    reality: {
      tag: 'FORENSIC COMPARISON MATRIX',
      title: 'Scam Architecture vs. Statutory Institutional Chain',
      description: 'Over 92% of international buyers contacting Kampala lose capital to fraudulent hotel-suite smelts, forged URA certificates, or counterfeit brass bars. Contrast the street illusions with statutory reality.',
      scamTitle: 'The Hotel Room & WhatsApp Scam Trap',
      statutoryTitle: 'The Statutory Institutional Chain',
      viewMatrix: 'Inspect Full Reality Matrix',
    },
    itinerary: {
      tag: '7-DAY TACTICAL DEPLOYMENT',
      title: 'From Deep Shaft Extraction to Entebbe Bonded Vaults',
      description: 'An exhaustive, high-security 7-day protocol verifying every physical weigh-in, metallurgical smelting, XRF spectrometry assay, and export valuation.',
      dayPrefix: 'DAY',
      statutoryClearance: 'DGSM & MPPU Clearance Protocol Active',
    },
    pricing: {
      tag: 'INSTITUTIONAL PACKAGES',
      title: 'Transparent Delegation Pricing & Settlement',
      subtitle: 'All packages operate under structured milestone billing. Direct checkout with no intermediary markups.',
      kycNoticeTitle: 'MANDATORY $1,000 NON-REFUNDABLE KYC & INTELLIGENCE AUDIT FEE',
      kycNoticeBody: 'All prospective delegates must undergo criminal background screening, sanctions watchlist auditing, and passport forensic verification. Upon clearance, the $1,000 fee is credited toward Tranche A.',
      perHead: '/ delegate',
      applyForTier: 'Select Package & Initiate Vetting',
      popularBadge: 'FLAGSHIP DELEGATION',
      milestoneA: 'Tranche A (50%): Due upon vetting approval & security clearance',
      milestoneB: 'Tranche B (50%): Due 14 days prior to Kampala deployment',
    },
    partners: {
      tag: 'VERIFIED STATUTORY OPERATORS',
      title: 'Statutory Mining Cadastre & Institutional Directory',
      subtitle: 'Real licensed entities, verified large-scale mining leases (LML), and official government ministries visited during delegation.',
      allFilter: 'All Institutions',
      mines: 'Industrial Mines',
      refineries: 'Refineries',
      regulators: 'Regulators & Police',
      logistics: 'Armored Airside Logistics',
      laboratories: 'Spectrometry Labs',
      viewDossier: 'View Statutory Dossier',
    },
    common: {
      close: 'Close',
      download: 'Download PDF',
      copyLicense: 'Copy License No.',
      copied: 'Copied to Clipboard!',
      status: 'Status',
      verified: 'Verified Official',
      submit: 'Submit Application',
      loading: 'Processing forensic data...',
    },
  },
  ar: {
    nav: {
      expedition: 'البعثة الاستكشافية',
      reality: 'واقع السوق',
      itinerary: 'جدول الـ 7 أيام',
      tiers: 'فئات الوفود',
      partners: 'الدليل القانوني',
      directorate: 'المديرية',
      legal: 'الميثاق القانوني',
      intel: 'استخبارات مكافحة الاحتيال',
      advisorChat: 'مستشار الذكاء الاصطناعي',
      clientPortal: 'بوابة العميل',
      adminVault: 'خزانة الإدارة',
      applyNow: 'التقديم للتدقيق الأمني',
    },
    hero: {
      badge: 'بروتوكول سجل التعدين الرئاسي • جمهورية أوغندا',
      headline: 'لا تقم بتحويل دولار واحد حتى',
      headlineHighlight: 'تعاين سلسلة التوريد ميدانياً.',
      subheadline: 'البعثة الميدانية الأولى والوحيدة عالمياً للتدقيق ومكافحة الاحتيال عبر البنية القانونية لتجارة الذهب في شرق أفريقيا. وصول مباشر إلى مناجم التعدين الصناعية الكبرى، ومصافي الذهب المعتمدة، وخزائن مديرية المناجم، وجمارك مطار عنتيبي الجوية المؤمنة.',
      nonTransactionalNotice: 'ميثاق قانوني صارم: غير تجاري إطلاقاً',
      nonTransactionalDetail: 'لا تقوم بعثة الذهب في أوغندا ببيع أو شراء أو وساطة أو تخزين الذهب. نحن وفد تدقيقي وتعليمي حصري لضمان حماية المستثمرين من الاحتيال.',
      applyBtn: 'التقديم للتدقيق والتحقق المؤسسي',
      dossierBtn: 'تحميل ملف البروتوكول الرسمي',
      directCheckoutNotice: 'تسوية مباشرة عبر البطاقات المصرفية، محافظ إم تي إن/إيرتل، وتحويلات سويفت البنكية.',
      statutoryAssurance: 'خاضع لقانون التعدين والمعادن لعام 2022 • آلية شهادة الإقليم ICGLR',
    },
    reality: {
      tag: 'مصفوفة المقارنة الجنائية',
      title: 'هندسة الاحتيال في الفنادق مقابل السلسلة المؤسسية القانونية',
      description: 'أكثر من 92% من المشترين الدوليين يخسرون أموالهم في صفقات غرف الفنادق الوهمية والشهادات المزورة. قارن بين أوهام الشارع والواقع القانوني الرسمي.',
      scamTitle: 'فخاخ غرف الفنادق ورسائل الواتساب',
      statutoryTitle: 'السلسلة المؤسسية الرسمية المعتمدة',
      viewMatrix: 'فحص مصفوفة المقارنة الكاملة',
    },
    itinerary: {
      tag: 'برنامج العمليات التكتيكي (7 أيام)',
      title: 'من أعماق مناجم الذهب إلى خزائن عنتيبي المؤمنة',
      description: 'بروتوكول أمني متكامل على مدار 7 أيام للتحقق من أوزان الذهب، وعمليات الصهر الميدانية، والتحليل الطيفي بالأشعة السينية، والتقييم الجمركي الرسمي.',
      dayPrefix: 'اليوم',
      statutoryClearance: 'تصاريح وزارة الطاقة ووحدة حماية المعادن نشطة',
    },
    pricing: {
      tag: 'الباقات المؤسسية',
      title: 'أسعار الوفود وتسوية التكاليف بشفافية',
      subtitle: 'نظام فواتير مرحلي مباشر بدون أي وساطة أو رسوم مخفية.',
      kycNoticeTitle: 'رسوم تدقيق أمني واستخباراتي إلزامية غير قابلة للاسترداد: 1,000 دولار',
      kycNoticeBody: 'يخضع جميع المتقدمين للفحص الجنائي وقوائم العقوبات الدولية والتحقق البيومتري من جواز السفر. بعد القبول، يتم خصم هذا المبلغ بالكامل من الدفعة الأولى.',
      perHead: '/ لكل مندوب',
      applyForTier: 'اختيار الباقة والبدء في التدقيق',
      popularBadge: 'الباقة الأكثر طلباً',
      milestoneA: 'الدفعة الأولى (50%): تستحق عند القبول والتصريح الأمني',
      milestoneB: 'الدفعة الثانية (50%): تستحق قبل 14 يوماً من الوصول لكمبالا',
    },
    partners: {
      tag: 'الجهات والشركات الرسمية المرخصة',
      title: 'سجل التعدين الرسمي والدليل المؤسسي المعتمد',
      subtitle: 'كيانات مرخصة رسمياً، مناجم تعدين صناعية كبرى، ومؤسسات حكومية معتمدة تزورها البعثة.',
      allFilter: 'جميع المؤسسات',
      mines: 'المناجم الصناعية',
      refineries: 'المصافي المعتمدة',
      regulators: 'الهيئات التنظيمية والشرطة',
      logistics: 'اللوجستيات والطيران الجوي المؤمن',
      laboratories: 'مختبرات القياس الطيفي',
      viewDossier: 'عرض الملف القانوني',
    },
    common: {
      close: 'إغلاق',
      download: 'تحميل كملف PDF',
      copyLicense: 'نسخ رقم الترخيص',
      copied: 'تم النسخ للحافظة!',
      status: 'الحالة',
      verified: 'موثق ورسمي',
      submit: 'إرسال طلب الانضمام',
      loading: 'جاري معالجة البيانات الجنائية...',
    },
  },
  zh: {
    nav: {
      expedition: '考察团概述',
      reality: '市场真相',
      itinerary: '7日行动日程',
      tiers: '代表团级别',
      partners: '法定名录',
      directorate: '矿业领导层',
      legal: '法律章程',
      intel: '情报与反欺诈',
      advisorChat: 'AI矿业顾问',
      clientPortal: '客户门户',
      adminVault: '管理保险库',
      applyNow: '申请资格审查',
    },
    hero: {
      badge: '总统矿业地籍协议 • 乌干达共和国',
      headline: '在亲眼核实黄金供应链之前，',
      headlineHighlight: '请勿汇出一美元。',
      subheadline: '全球唯一针对东非法定黄金贸易架构的实地反欺诈与尽职调查代表团。直通大型工业矿山、符合国际LBMA标准的官方炼金厂、国家矿业局金库以及恩德培机场保税海关。',
      nonTransactionalNotice: '严格的非交易章程',
      nonTransactionalDetail: '乌干达黄金考察团不买卖、不经纪、不托管黄金。我们是独立的教育与调查代表团，确保零非法黑市风险。',
      applyBtn: '申请机构尽调与背景审查',
      dossierBtn: '下载协议档案文件',
      directCheckoutNotice: '支持 Visa/万事达卡、MTN/Airtel 移动支付及国际 SWIFT 电汇结算。',
      statutoryAssurance: '遵循《2022年矿业与矿产法》• 落实大湖地区国际会议 (ICGLR) 区域认证机制',
    },
    reality: {
      tag: '法医级对比矩阵',
      title: '酒店房间骗局 vs 法定合规供应链',
      description: '超过92%接触坎帕拉黄金贸易的国际买家因酒店熔炼表演、伪造税务凭证或假黄铜实心条遭受巨额损失。辨识街头骗局与国家正规架构的本质差别。',
      scamTitle: '酒店套房与社交软件骗局架构',
      statutoryTitle: '国家法定机构合规链条',
      viewMatrix: '查看完整真相矩阵',
    },
    itinerary: {
      tag: '7日战术部署日程',
      title: '从矿井原矿开采到恩德培海关保税金库',
      description: '高规格安全安保下的7日流程，全面验证实物称重、高温冶炼、XRF荧光光谱化验与海关出口估价全过程。',
      dayPrefix: '第',
      statutoryClearance: '矿产能源部与矿产警察保护局通行保障中',
    },
    pricing: {
      tag: '机构级代表团方案',
      title: '公开透明的考察定价与里程碑结算',
      subtitle: '所有方案均按清晰的里程碑阶段开具发票，直接结算，杜绝任何中间商溢价。',
      kycNoticeTitle: '强制性 1,000 美元不可退还 KYC 与情报审查费',
      kycNoticeBody: '所有候选代表必须接受无犯罪记录核实、国际制裁名单比对和护照防伪审查。审查通过后，该费用将全额抵扣首阶段款项。',
      perHead: '/ 代表人次',
      applyForTier: '选择级别并提交审查',
      popularBadge: '旗舰推荐方案',
      milestoneA: '第一期款项 (50%)：审查通过并完成安保排期后支付',
      milestoneB: '第二期款项 (50%)：坎帕拉集结前14天支付',
    },
    partners: {
      tag: '官方认证法定机构',
      title: '乌干达国家矿业地籍与法定企业名录',
      subtitle: '实地走访正规持牌矿业企业、大型采矿租约 (LML) 拥有者与官方政府部门。',
      allFilter: '全部机构',
      mines: '大型工业矿山',
      refineries: '认证精炼厂',
      regulators: '监管机构与安保',
      logistics: '武装安保航空物流',
      laboratories: '光谱分析实验室',
      viewDossier: '查看法定档案',
    },
    common: {
      close: '关闭',
      download: '下载完整PDF',
      copyLicense: '复制许可牌照号',
      copied: '已复制至剪贴板！',
      status: '状态',
      verified: '官方真实认证',
      submit: '提交资格申请',
      loading: '正在调取法医级情报...',
    },
  },
  fr: {
    nav: {
      expedition: 'Expédition',
      reality: 'Réalité du Marché',
      itinerary: 'Itinéraire 7 Jours',
      tiers: 'Niveaux de Délégation',
      partners: 'Répertoire Légal',
      directorate: 'Direction',
      legal: 'Charte Juridique',
      intel: 'Renseignements Anti-Fraude',
      advisorChat: 'Officier IA Cadastre',
      clientPortal: 'Portail Client',
      adminVault: 'Coffre Direction',
      applyNow: 'Demande de Vetting',
    },
    hero: {
      badge: 'PROTOCOLE DU CADASTRE MINIER PRÉSIDENTIEL • RÉPUBLIQUE DE L’OUGANDA',
      headline: 'Ne Transférez Pas Un Seul Dollar Avant De',
      headlineHighlight: 'Parcourir La Chaîne Logistique.',
      subheadline: 'La seule expédition terrain de diligence raisonnable et de lutte contre la fraude dans l’architecture statutaire du commerce de l’or en Afrique de l’Est. Accès direct aux puits industriels, raffineries homologuées, coffres de la Direction des Mines et fret sous douane d’Entebbe.',
      nonTransactionalNotice: 'CHARTE STRICTE DE NON-TRANSACTION',
      nonTransactionalDetail: 'Gold Safaris & Expedition n’achète, ne vend, ne négocie ni ne conserve d’or. Nous sommes une délégation d’enquête et de conformité pour protéger les capitaux institutionnels.',
      applyBtn: 'Postuler pour le Vetting Institutionnel',
      dossierBtn: 'Télécharger le Dossier Officiel',
      directCheckoutNotice: 'Règlement direct par Carte Bancaire, MTN/Airtel MoMo, et Virement Bancaire SWIFT.',
      statutoryAssurance: 'Régulée par la Loi Minière 2022 • Mécanisme de Certification Régionale CIRGL',
    },
    reality: {
      tag: 'MATRICE COMPARATIVE MÉDICO-LÉGALE',
      title: 'Pièges des Chambres d’Hôtel vs Chaîne Institutionnelle Légale',
      description: 'Plus de 92% des acheteurs internationaux perdent leurs fonds dans des escroqueries d’hôtels et faux certificats. Distinguez l’illusion des rues de la réalité juridique.',
      scamTitle: 'Le Piège des Salons d’Hôtel & WhatsApp',
      statutoryTitle: 'La Chaîne Statutaire et Réglementée',
      viewMatrix: 'Consulter la Matrice Complète',
    },
    itinerary: {
      tag: 'DÉPLOIEMENT TACTIQUE DE 7 JOURS',
      title: 'De l’Extraction Souterraine aux Coffres Sécurisés d’Entebbe',
      description: 'Un protocole sécurisé de 7 jours certifiant pesées physiques, fonderie métallurgique, spectrométrie XRF et dédouanement à l’export.',
      dayPrefix: 'JOUR',
      statutoryClearance: 'Accréditations DGSM & Protection Policière Actives',
    },
    pricing: {
      tag: 'FORFAITS INSTITUTIONNELS',
      title: 'Tarification et Échéancier de Règlement',
      subtitle: 'Facturation transparente par jalons contractuels. Règlement direct sans intermédiaire.',
      kycNoticeTitle: 'AUDIT DE VETTING & KYC DE 1 000 $ NON REMBOURSABLE',
      kycNoticeBody: 'Chaque délégué fait l’objet d’un contrôle d’antécédents criminels, de vérification des listes de sanctions et d’analyse de passeport. Après validation, les 1 000 $ sont déduits de la Tranche A.',
      perHead: '/ délégué',
      applyForTier: 'Sélectionner le Forfait & Postuler',
      popularBadge: 'DÉLÉGATION PHARE',
      milestoneA: 'Tranche A (50%) : Due après validation du vetting et sécurité',
      milestoneB: 'Tranche B (50%) : Due 14 jours avant le déploiement à Kampala',
    },
    partners: {
      tag: 'OPÉRATEURS LÉGAUX VÉRIFIÉS',
      title: 'Cadastre Minier & Répertoire Institutionnel',
      subtitle: 'Entités titulaires de baux miniers industriels (LML), raffineries agréées et ministères d’État visités.',
      allFilter: 'Toutes les Institutions',
      mines: 'Mines Industrielles',
      refineries: 'Raffineries Homologuées',
      regulators: 'Régulateurs & Police des Mines',
      logistics: 'Logistique Armée & Fret Aérien',
      laboratories: 'Laboratoires de Spectrométrie',
      viewDossier: 'Consulter le Dossier Légal',
    },
    common: {
      close: 'Fermer',
      download: 'Télécharger le PDF',
      copyLicense: 'Copier le N° de Licence',
      copied: 'Copié dans le presse-papier !',
      status: 'Statut',
      verified: 'Vérifié Conforme',
      submit: 'Transmettre la Candidature',
      loading: 'Traitement des données judiciaires...',
    },
  },
  es: {
    nav: {
      expedition: 'Expedición',
      reality: 'Realidad del Mercado',
      itinerary: 'Itinerario 7 Días',
      tiers: 'Niveles de Delegación',
      partners: 'Directorio Legal',
      directorate: 'Directorio',
      legal: 'Carta Jurídica',
      intel: 'Inteligencia Antifraude',
      advisorChat: 'Oficial IA Catastro',
      clientPortal: 'Portal del Cliente',
      adminVault: 'Bóveda de Administración',
      applyNow: 'Solicitar Vetting',
    },
    hero: {
      badge: 'PROTOCOLO DEL CATASTRO MINERO PRESIDENCIAL • REPÚBLICA DE UGANDA',
      headline: 'No Transfiera Un Solo Dólar Hasta',
      headlineHighlight: 'Caminar La Cadena De Suministro.',
      subheadline: 'La única expedición de debida diligencia e investigación antifraude sobre el terreno en la arquitectura legal del comercio de oro en África Oriental. Acceso directo a minas a cielo abierto y subterráneas, refinerías certificadas, bóvedas del Ministerio de Minas y aduana aérea de Entebbe.',
      nonTransactionalNotice: 'ESTRICTA CARTA NO TRANSACCIONAL',
      nonTransactionalDetail: 'Gold Safaris & Expedition no compra, vende, intermedia ni custodia oro. Somos una delegación educativa y de auditoría para proteger el capital institucional.',
      applyBtn: 'Solicitar Verificación Institucional',
      dossierBtn: 'Descargar Dossier del Protocolo',
      directCheckoutNotice: 'Liquidación directa con Tarjeta de Crédito, MTN/Airtel MoMo y Transferencia Bancaria SWIFT.',
      statutoryAssurance: 'Regulado por la Ley de Minería 2022 • Mecanismo de Certificación Regional CIRGL',
    },
    reality: {
      tag: 'MATRIZ FORENSE DE CONTRASTE',
      title: 'Trampas de Hotel vs Cadena Institucional Regulada',
      description: 'Más del 92% de los compradores internacionales pierden su capital en estafas de habitaciones de hotel y certificados falsos. Conozca el contraste entre el engaño y la legalidad.',
      scamTitle: 'La Trampa de Hoteles y WhatsApp',
      statutoryTitle: 'La Cadena Oficial e Institucional',
      viewMatrix: 'Inspeccionar Matriz Completa',
    },
    itinerary: {
      tag: 'DESPLIEGUE TÁCTICO DE 7 DÍAS',
      title: 'De la Extracción Minera a las Bóvedas de Entebbe',
      description: 'Un protocolo exhaustivo de seguridad de 7 días verificando el pesaje físico, fundición metalúrgica, espectrometría XRF y aforo aduanero.',
      dayPrefix: 'DÍA',
      statutoryClearance: 'Protocolo DGSM y Escolta Policial Activos',
    },
    pricing: {
      tag: 'PAQUETES INSTITUCIONALES',
      title: 'Tarifas Transparentes y Liquidación por Hitos',
      subtitle: 'Facturación directa por fases verificables sin intermediarios ni recargos ocultos.',
      kycNoticeTitle: 'AUDITORÍA DE VETTING Y KYC DE $1,000 NO REEMBOLSABLE',
      kycNoticeBody: 'Todos los delegados pasan por filtros de antecedentes penales, listas de sanciones internacionales y verificación forense de pasaporte. Una vez aprobado, se acredita al Tramo A.',
      perHead: '/ delegado',
      applyForTier: 'Seleccionar Nivel y Postular',
      popularBadge: 'DELEGACIÓN PRINCIPAL',
      milestoneA: 'Tramo A (50%): Al aprobar el vetting y la seguridad',
      milestoneB: 'Tramo B (50%): 14 días antes del arribo a Kampala',
    },
    partners: {
      tag: 'OPERADORES LEGALES VERIFICADOS',
      title: 'Catastro Minero y Directorio Oficial',
      subtitle: 'Entidades con licencias mineras verificadas (LML), refinerías de metales preciosos y entidades gubernamentales.',
      allFilter: 'Todas las Entidades',
      mines: 'Minas Industriales',
      refineries: 'Refinerías Acreditadas',
      regulators: 'Entidades Reguladoras y Policía',
      logistics: 'Logística Blindada y Carga Aérea',
      laboratories: 'Laboratorios de Espectrometría',
      viewDossier: 'Ver Dossier Legal',
    },
    common: {
      close: 'Cerrar',
      download: 'Descargar PDF',
      copyLicense: 'Copiar Licencia',
      copied: '¡Copiado al portapapeles!',
      status: 'Estado',
      verified: 'Verificado Oficial',
      submit: 'Enviar Solicitud',
      loading: 'Analizando datos forenses...',
    },
  },
};
