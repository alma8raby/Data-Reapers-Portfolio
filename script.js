/**
 * Data Reapers - Main Script
 */

// --------------------------------------------------------------------------
// Navigation Scroll Shadow
// --------------------------------------------------------------------------
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40 ? '0 2px 20px rgba(44,33,18,.1)' : 'none';
});

// --------------------------------------------------------------------------
// Active Navigation Link Tracker
// --------------------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  threshold: 0.35
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// --------------------------------------------------------------------------
// Scroll Reveal Animations
// --------------------------------------------------------------------------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// --------------------------------------------------------------------------
// Staggered Animations for Grids
// --------------------------------------------------------------------------
const grids = document.querySelectorAll('.var-grid, .findings-grid, .rec-list, .team-grid');

grids.forEach(grid => {
  const gridReveals = grid.querySelectorAll('.reveal');
  gridReveals.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.07}s`;
  });
});

// --------------------------------------------------------------------------
// Theme & Language System
// --------------------------------------------------------------------------

const i18nElements = document.querySelectorAll('[data-i18n], [data-i18n-html]');

const translations = {
  en: {},
  ar: {
    nav_about: "حول",
    nav_results: "النتائج",
    nav_dashboard: "لوحة البيانات",
    nav_recs: "التوصيات",
    nav_team: "الفريق",
    hero_badge_text: "مشروع تحليل البيانات · الجيل زد · 2026",
    hero_title: "تأثير وسائل التواصل الاجتماعي<br/><em>على الصحة النفسية</em>",
    hero_sub: "تحقيق مبني على البيانات حول كيفية تشكيل العادات الرقمية للرفاهية النفسية لدى الجيل زد محليا وعالميا، مع تجاوز الافتراضات إلى الأدلة.",
    hero_cta_primary: "استكشف النتائج ←",
    hero_cta_secondary: "عرض لوحة البيانات",
    hero_stat_datasets: "مجموعات البيانات",
    hero_stat_variables: "المتغيرات المتتبعة",
    hero_stat_findings: "أهم النتائج",
    hero_stat_team: "أعضاء الفريق",
    about_label: "عن المشروع",
    about_title: "لماذا هذا مهم؟",
    about_p1: "أصبح استخدام وسائل التواصل ثابتا يوميا لدى الجيل زد، ومع ذلك غالبا ما تناقش علاقته بالصحة النفسية عبر الآراء لا البيانات. هذا المشروع جاء لتغيير ذلك.",
    about_p2: "درسنا ما إذا كانت عادات مثل وقت الشاشة، التصفح المفرط، فحص الهاتف صباحا، واستهلاك المحتوى القصير ترتبط بزيادة القلق والتفكير الزائد وعدم استقرار المزاج واضطراب النوم، عبر عينة محلية في مصر وعينة عالمية.",
    about_cta: "اطلع على النتائج ←",
    about_card_1_title: "سؤال البحث",
    about_card_1_desc: "هل يرتبط استخدام وسائل التواصل بضغط نفسي قابل للقياس لدى الجيل زد؟",
    about_card_2_title: "النطاق",
    about_card_2_desc: "مصر (عينة محلية) + بيانات سلوكية عالمية للجيل زد",
    about_card_3_title: "النهج",
    about_card_3_desc: "تحليل ارتباط كمي بقاعدة بيانات بوستجري إس كيو إل منظمة",
    about_card_4_title: "المخرجات",
    about_card_4_desc: "توصيات مبنية على الأدلة لعادات رقمية أكثر صحة",
    variables_label: "هندسة السمات",
    variables_title: "المتغيرات المتتبعة",
    variables_desc: "تم ربط كل نقطة بيانات ببعد سلوكي أو نفسي.",
    var_1_title: "استخدام الهاتف اليومي",
    var_1_desc: "إجمالي ساعات استخدام الهاتف يوميا",
    var_2_title: "ساعات وسائل التواصل",
    var_2_desc: "الساعات المقضية على المنصات الاجتماعية",
    var_3_title: "مدة النوم",
    var_3_desc: "متوسط ساعات النوم ليلا",
    var_4_title: "فحص الهاتف صباحا",
    var_4_desc: "هل يتم فحص الهاتف فور الاستيقاظ",
    var_5_title: "مستوى التوتر",
    var_5_desc: "التهيج والانفعال المبلغ عنه ذاتيا",
    var_6_title: "النشاط البدني",
    var_6_desc: "تكرار ونوع التمارين أسبوعيا",
    var_7_title: "التطبيقات الأكثر استخداما",
    var_7_desc: "أكثر التطبيقات استخداما بأسماء معيارية",
    var_8_title: "مستوى التصفح السلبي",
    var_8_desc: "الميل للتصفح المتواصل للمحتوى السلبي",
    var_9_title: "نوع المحتوى",
    var_9_desc: "فيديو قصير، أخبار، منشورات اجتماعية وغيرها",
    results_label: "أهم النتائج",
    results_title: "ما الذي كشفته البيانات",
    results_desc: "ستة ارتباطات مبنية على الأدلة مستخرجة من بيانات الجيل زد في مصر والعالم.",
    finding_1_title: "استخدام أعلى ← مقارنة اجتماعية أكثر",
    finding_1_desc: "زيادة استخدام وسائل التواصل ترتبط بقوة بارتفاع مستويات المقارنة الاجتماعية، ما يؤثر في تصور الذات والرضا الشخصي.",
    finding_2_title: "وقت شاشة أكثر ← تفكير زائد",
    finding_2_desc: "معدلات الاستخدام الأعلى ترتبط بزيادة ملحوظة في التفكير الزائد والاجترار، خصوصا قبل النوم.",
    finding_3_title: "وقت الشاشة يرفع مخاطر اضطراب النوم",
    finding_3_desc: "ارتفاع وقت الشاشة اليومي يرتبط بزيادة مخاطر مشاكل النوم مثل صعوبة النوم وتدني الجودة وقصر المدة.",
    finding_4_title: "اضطراب النوم ← عدم استقرار المزاج",
    finding_4_desc: "مع ارتفاع مخاطر اضطراب النوم ينخفض استقرار المزاج، ويشكل ضعف النوم مع اضطراب الانفعال دورة متكررة.",
    finding_5_title: "فحص الهاتف صباحا ← توتر أعلى",
    finding_5_desc: "الأشخاص الذين يفحصون الهاتف فور الاستيقاظ يسجلون مستويات أعلى من التوتر والانفعال طوال اليوم.",
    finding_6_title: "الفيديو القصير يرفع وقت الشاشة ويضعف النوم",
    finding_6_desc: "المحتوى القصير مثل ريلز وتيك توك وشورتس يرتبط بقوة بزيادة وقت الشاشة واضطراب النوم.",
    dashboard_label: "استكشاف البيانات",
    dashboard_title: "لوحة البيانات التفاعلية",
    dashboard_desc: "تعرض اللوحة نتائج المشروع من البيانات المحللة، مع إمكان التفاعل عبر المخططات والفلاتر لاستكشاف الإحصاءات.",
    dashboard_stat_1: "إجمالي السجلات",
    dashboard_stat_2: "متوسط وقت الشاشة",
    dashboard_stat_3: "أثر النوم",
    dashboard_stat_4: "ارتباط القلق",
    dashboard_file_title: "لوحة تأثير الصحة النفسية",
    recs_label: "رؤى قابلة للتطبيق",
    recs_title: "التوصيات",
    recs_desc: "عادات مبنية على الأدلة لحماية الصحة النفسية في عالم شديد الاتصال.",
    recs_1_title: "أخر فحص الهاتف صباحا",
    recs_1_desc: "تجنب فحص الهاتف في أول 30 إلى 60 دقيقة بعد الاستيقاظ. تظهر البيانات أن هذه العادة ترتبط بتوتر أقل واستقرار مزاجي أفضل طوال اليوم.",
    recs_2_title: "جدول فترات انفصال رقمي منتظمة",
    recs_2_desc: "تخصيص وقت يومي أو أسبوعي دون اتصال يقلل القلق ويحسن التركيز ويعيد توازن الانفعالات.",
    recs_3_title: "قلل استهلاك الفيديو القصير",
    recs_3_desc: "المحتوى القصير هو المحرك الأقوى لزيادة وقت الشاشة واضطراب النوم. اعتمد حدودا زمنية أو نوافذ مشاهدة محددة.",
    recs_4_title: "تتبع الأثر النفسي لتطبيقاتك",
    recs_4_desc: "راقب تأثير كل تطبيق على المزاج والقلق، واستخدم تقارير وقت الشاشة لاكتشاف الأنماط بين الاستخدام المكثف والحالة النفسية.",
    recs_5_title: "استخدم الوضع الرمادي لتقليل الاستخدام القهري",
    recs_5_desc: "تحويل الشاشة إلى التدرج الرمادي يقلل التحفيز اللوني ويحد من التصفح غير الواعي بشكل ملحوظ.",
    research_label: "الأساس العلمي",
    research_title: "الدراسات الداعمة",
    research_desc: "تتوافق النتائج مع دراسات محكمة حول السلوك الرقمي والصحة النفسية.",
    research_card_1_title: "دراسات تقليل استخدام وسائل التواصل",
    research_card_1_desc: "تشير الدراسات إلى أن تقليل استخدام وسائل التواصل أو تطبيق فترات انقطاع كامل يرتبط بتحسن واضح في مؤشرات الصحة النفسية والإدراكية.",
    research_out_1: "↓ انخفاض القلق",
    research_out_2: "↑ تحسن جودة النوم",
    research_out_3: "↑ زيادة التركيز",
    research_out_4: "↑ انضباط ذاتي أعلى",
    research_card_2_title: "وقت الشاشة وصحة اليافعين",
    research_card_2_desc: "توضح الأبحاث علاقة جرعة واستجابة بين وقت الشاشة ومؤشرات الرفاه النفسي لدى المراهقين والشباب، ما يدعم ارتباطاتنا بين ساعات الاستخدام واضطراب النوم وتقلب المزاج.",
    research_out_5: "📉 تقلب المزاج مع الاستخدام المرتفع",
    research_out_6: "😴 تدهور جودة النوم",
    research_out_7: "🧠 مؤشرات إرهاق إدراكي",
    team_label: "الفريق",
    team_title: "داتا ريبرز",
    team_desc: "أربعة محللين. مهمة واحدة: تحويل البيانات إلى وضوح.",
    team_role_1: "قائد الفريق · باحث",
    team_role_1_desc: "صياغة إطار البحث، تنسيق المشروع، وتركيب النتائج.",
    team_role_2: "نمذجة البيانات",
    team_role_2_desc: "نمذجة البيانات، تصميم المخططات، وتحسين البنية.",
    team_role_3: "تحليل البيانات",
    team_role_3_desc: "تحليل استكشافي، استخراج الرؤى، والتحقق من النتائج.",
    team_role_4: "تصور البيانات",
    team_role_4_desc: "تصميم المرئيات، سرد البيانات عبر اللوحات، وصقل العرض.",
    team_skill_1_1: "بحث",
    team_skill_1_2: "قيادة المشروع",
    team_skill_1_3: "رؤى",
    team_skill_2_1: "نمذجة البيانات",
    team_skill_2_2: "تصميم المخطط",
    team_skill_2_3: "تطبيع",
    team_skill_3_1: "تحليل استكشافي",
    team_skill_3_2: "إحصاء",
    team_skill_3_3: "رؤى",
    team_skill_4_1: "تصور",
    team_skill_4_2: "باور بي آي",
    team_skill_4_3: "سرد بصري",
    repo_title: "المستودع المفتوح",
    repo_desc: "استكشف الشفرة الكاملة ودفاتر جوبتر ونصوص إي تي إل وقواميس البيانات التي تقف خلف هذا التحليل.",
    repo_cta: "عرض مستودع المشروع",
    footer_text: "تأثير وسائل التواصل الاجتماعي على الصحة النفسية · الجيل زد · 2026<br/>مشروع تحليل البيانات — مصر والعالم"
  }
};

function cacheDefaultTranslations() {
  i18nElements.forEach((el) => {
    const key = el.dataset.i18n || el.dataset.i18nHtml;
    if (!key) return;

    if (el.hasAttribute('data-i18n-html')) {
      translations.en[key] = el.innerHTML.trim();
    } else {
      translations.en[key] = el.textContent.trim();
    }
  });
}

function applyTranslation(lang) {
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  i18nElements.forEach((el) => {
    const key = el.dataset.i18n || el.dataset.i18nHtml;
    const value = translations[lang][key] ?? translations.en[key];
    if (value === undefined) return;

    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  const langSpan = document.querySelector('.lang-text');
  if (langSpan) {
    langSpan.innerText = (lang === 'ar') ? 'EN' : 'AR';
  }
}

// Theme handling
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

function setTheme(isDark) {
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

function initSettings() {
  cacheDefaultTranslations();

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') setTheme(true);
  
  const savedLang = localStorage.getItem('lang') || 'en';
  applyTranslation(savedLang);

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  langToggle?.addEventListener('click', () => {
    const isAr = document.documentElement.lang === 'ar';
    const newLang = isAr ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    applyTranslation(newLang);
  });
}

document.addEventListener("DOMContentLoaded", initSettings);
