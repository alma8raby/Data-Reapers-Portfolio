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
const grids = document.querySelectorAll('.findings-grid, .rec-list, .team-grid');

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
    nav_research: "الأبحاث",
    nav_team: "الفريق",
    hero_badge_text: "مشروع تحليل البيانات · الجيل زد · 2026",
    hero_title: "تأثير وسائل التواصل الاجتماعي<br/><em>على الصحة النفسية</em>",
    hero_sub: "تحقيق مبني على البيانات حول كيفية تشكيل العادات الرقمية للرفاهية النفسية لدى الجيل زد محليا وعالميا، مع تجاوز الافتراضات إلى الأدلة.",
    hero_cta_primary: "استكشف النتائج ←",
    hero_cta_secondary: "عرض لوحة البيانات",
    hero_stat_datasets: "مجموعات البيانات",
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
    about_card_3_desc: "تحليل البيانات لاكتشاف تأثير العادات الرقمية على الصحة النفسية",
    about_card_4_title: "المخرجات",
    about_card_4_desc: "توصيات مبنية على الأدلة لعادات رقمية أكثر صحة",
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
    research_title: "الأبحاث الداعمة",
    research_desc: "تتوافق نتائجنا وتتكامل مع الدراسات والأبحاث المحكّمة علمياً في مجالات السلوك الرقمي والصحة النفسية.",
    
    // Study 1
    research_s1_badge_1: "الصحة النفسية",
    research_s1_badge_2: "العادات الرقمية",
    research_s1_source_badge: "شبكة JAMA",
    research_s1_title: "ديتوكس وسائل التواصل وصحة الشباب النفسية",
    research_s1_subtitle: "أثر تقييد الاستخدام بـ 30 دقيقة يومياً على الشباب",
    research_s1_summary: "تجربة سريرية محكّمة تحلل كيف يسهم تقييد استهلاك وسائل التواصل إلى 30 دقيقة يومياً في تحسين مستويات القلق والاكتئاب وجودة النوم خلال أسبوع واحد.",
    research_s1_stat_val: "أسبوع واحد",
    research_s1_stat_label: "فترة التعافي",
    research_meta_cohort: "الفئة والخصائص الديموغرافية",
    research_s1_meta_cohort_val: "الشباب، الفئة العمرية 18-24 عاماً",
    research_meta_methodology: "الإطار الأساسي",
    research_s1_meta_methodology_val: "النمط الظاهري الرقمي وتطبيق EMA",
    research_meta_intervention: "التدخل العلاجي",
    research_s1_meta_intervention_val: "تحديد الاستخدام بـ 30 دقيقة/يومياً",
    research_meta_year: "سنة النشر",
    
    research_s1_meta_participants_title: "المشاركون في الدراسة",
    research_s1_p_enrolled: "417 مسجلاً",
    research_s1_p_baseline: "373 أكملوا التقييم الأساسي",
    research_s1_p_detox: "295 انضموا إلى الديتوكس",
    research_s1_p_age: "الفئة العمرية: 18-24 عاماً",
    research_s1_p_reqs: "شروط الانضمام: امتلاك هاتف ذكي وإجادة الإنجليزية",
    
    research_sec_intro: "مقدمة الدراسة",
    research_s1_intro: "بحثت هذه الدراسة في العلاقة بين استخدام وسائل التواصل الاجتماعي والصحة النفسية لدى البالغين الشباب الذين تتراوح أعمارهم بين 18 و24 عاماً. هدف الباحثون إلى فهم ما إذا كان تقليل التفاعل على وسائل التواصل يمكن أن يحسن الرفاهية النفسية باستخدام التتبع السلوكي الموضوعي بدلاً من الاعتماد فقط على البيانات المبلغ عنها ذاتياً.",
    research_sec_objective: "الهدف والغاية",
    research_s1_objective_1: "استكشاف كيفية تأثير سلوك وسائل التواصل الاجتماعي على الصحة النفسية",
    research_s1_objective_2: "قياس الأثر النفسي لديتوكس وسائل التواصل الاجتماعي قصير المدى",
    research_s1_objective_3: "تحديد ما إذا كانت أنماط التفاعل الإشكالية أكثر ضرراً من إجمالي وقت الشاشة",
    
    research_sec_methodology: "المنهجية العلمية",
    research_s1_phase1_title: "المرحلة الأولى — الملاحظة الأساسية (أسبوعان)",
    research_s1_phase1_desc: "قام الباحثون بتتبع سلوك المشاركين بشكل موضوعي عبر منصات التواصل الاجتماعي الرئيسية: إنستغرام، تيك توك، سناب شات، فيسبوك، وإكس.",
    research_s1_phase1_tracked_label: "وشملت المقاييس المتتبعة ما يلي:",
    research_s1_phase1_metric1: "وقت الشاشة",
    research_s1_phase1_metric2: "مرات فتح التطبيق",
    research_s1_phase1_metric3: "معدل الإشعارات",
    research_s1_phase1_metric4: "التقييمات اليومية للصحة النفسية باستخدام EMAs",
    
    research_s1_phase2_title: "المرحلة الثانية — ديتوكس وسائل التواصل الاجتماعي (أسبوع واحد)",
    research_s1_phase2_desc: "قام المشاركون طواعية بتقليل استخدامهم لمنصات التواصل الاجتماعي المحددة مع استمرار الباحثين في مراقبة التغيرات السلوكية والنفسية.",
    
    research_sec_results: "النتائج الرئيسية",
    research_s1_results_mh_title: "تحسينات الصحة النفسية",
    research_s1_results_mh_1: "انخفاض أعراض الاكتئاب بنسبة 24.8%",
    research_s1_results_mh_2: "انخفاض أعراض القلق بنسبة 16.1%",
    research_s1_results_mh_3: "انخفاض أعراض الأرق بنسبة 14.5%",
    research_s1_results_beh_title: "التغيرات السلوكية",
    research_s1_results_beh_1: "انخفاض ملحوظ في التفاعل مع وسائل التواصل الاجتماعي",
    research_s1_results_beh_2: "زيادة طفيفة في الأنشطة عبر الشاشة غير الاجتماعية",
    research_s1_results_beh_3: "زيادة الوقت الذي يقضونه في المنزل بنحو 42.8 دقيقة/يومياً",
    
    research_sec_findings: "الخلاصات الأساسية",
    research_s1_finding_1: "جودة التفاعل مع وسائل التواصل الاجتماعي تهم أكثر من إجمالي وقت الاستخدام",
    research_s1_finding_2: "المقارنة الاجتماعية السلبية وأنماط التفاعل القهرية ترتبط بقوة بنواتج الصحة النفسية السيئة",
    research_s1_finding_3: "المشاركون الذين يعانون من أعراض صحة نفسية أساسية أعلى استفادوا أكثر من تدخل ديتوكس وسائل التواصل",
    
    research_sec_conclusion: "الاستنتاج العلمي",
    research_s1_conclusion: "حتى التقليل قصير المدى من التعرض لوسائل التواصل الاجتماعي يمكن أن يؤدي إلى تحسينات ذات مغزى في الرفاهية العاطفية والقلق الاكتئاب وجودة النوم. وتشير النتائج إلى أن العادات الرقمية الأكثر صحة قد تلعب دوراً هاماً في تحسين الصحة النفسية للشباب.",
    research_btn_source: "استكشف ورقة الدراسة الكاملة",
    research_s1_source_badge_info: "دورية جاما المفتوحة، 2025",
    
    // Study 2
    research_s2_badge_1: "التركيز",
    research_s2_badge_2: "الرفاهية الرقمية",
    research_s2_source_badge: "PNAS Nexus",
    research_s2_title: "حظر إنترنت الهاتف يحسن التركيز والرفاهية",
    research_s2_subtitle: "أثر إزالة الوصول المستمر لإنترنت الهاتف المحمول",
    research_s2_summary: "تجربة عشوائية محكومة ومتقاطعة تقيم ما إذا كان الانفصال عن اتصال الإنترنت المتنقل المستمر يحسن مدى الانتباه المستدام ويحد من التشتت الإدراكي ويعزز الرفاهية العاطفية.",
    research_s2_stat_val: "أسبوعان",
    research_s2_stat_label: "فترة الانفصال",
    research_s2_meta_cohort_val: "مستخدمو هواتف iPhone، الولايات المتحدة وكندا",
    research_s2_meta_methodology_val: "تجربة عشوائية محكومة ومتقاطعة",
    research_s2_meta_intervention_val: "حظر الإنترنت والـ Wi-Fi عبر تطبيق Freedom",
    research_s2_meta_participants_title: "المشاركون في الدراسة",
    research_s2_p_enrolled: "467 مشاركاً",
    research_s2_p_location: "موقع الدراسة: الولايات المتحدة وكندا",
    research_s2_p_device: "شرط الجهاز: مستخدمو هواتف iPhone",
    research_s2_p_gender: "التوزيع الجنسي: 63% إناث",
    research_s2_p_motivation: "حافز المشاركين: لديهم الرغبة في تقليل الاستخدام",
    research_s2_intro: "بحثت هذه التجربة العشوائية المحكومة في الآثار النفسية والإدراكية لإزالة الوصول المستمر إلى إنترنت الهاتف المحمول من الهواتف الذكية. واستهدفت الدراسة فهم ما إذا كان الانفصال عن الاتصال المستمر بالإنترنت يمكن أن يحسن مدى الانتباه والصحة النفسية والرفاهية العامة.",
    research_s2_objective_1: "تقديم أدلة سببية حول الآثار النفسية للوصول إلى إنترنت الهاتف المحمول",
    research_s2_objective_2: "قياس كيفية تأثير الاتصال المستمر بالإنترنت على الانتباه والصحة النفسية",
    research_s2_objective_3: "تقييم ما إذا كان تقليل استخدام إنترنت الهواتف الذكية يشجع على سلوكيات غير متصلة أكثر صحة",
    research_s2_phase1_title: "فترة التدخل (أسبوعان)",
    research_s2_phase1_desc: "قام المشاركون بتثبيت تطبيق Freedom، الذي قام بحظر الوصول إلى إنترنت الهاتف المحمول، واتصالات الـ Wi-Fi، واستخدام البيانات. وظلت الهواتف صالحة للمكالمات والرسائل النصية فقط، مع السماح بالإنترنت عبر الحواسيب المحمولة والمكتبية.",
    research_s2_phase1_blocked_label: "الاتصالات المحظورة شملت:",
    research_s2_phase1_block1: "الوصول لإنترنت الهاتف المحمول",
    research_s2_phase1_block2: "اتصالات الـ Wi-Fi عبر الهاتف",
    research_s2_phase1_block3: "استخدام بيانات الهاتف المحمول",
    research_s2_phase2_title: "تصميم الدراسة والمقاييس",
    research_s2_phase2_desc: "استخدمت التجربة تصميماً عشوائياً محكوماً ومتقاطعاً، مع تتبع موضوعي لمدى الامتثال لشروط الحظر من خلال التطبيق.",
    research_s2_phase2_measured_label: "وقام الباحثون بقياس المقاييس التالية:",
    research_s2_phase2_measure1: "التركيز والانتباه المستدام",
    research_s2_phase2_measure2: "مؤشرات الصحة النفسية المتنوعة",
    research_s2_phase2_measure3: "الرفاهية الشخصية والرضا العام",
    research_s2_phase2_measure4: "التغيرات السلوكية والنشاط اليومي",
    research_s2_results_mh_title: "الصحة النفسية والرفاهية",
    research_s2_results_mh_1: "تحسينات ملحوظة في الرفاهية العاطفية وتخفيف التوتر",
    research_s2_results_mh_2: "انخفاض دال إحصائياً في أعراض القلق والاكتئاب",
    research_s2_results_mh_3: "وصف الباحثون حجم الأثر النفسي بأنه مماثل لـ (وفي بعض الحالات أقوى من) التدخلات بمضادات الاكتئاب",
    research_s2_results_beh_title: "التغيرات المعرفية والسلوكية",
    research_s2_results_beh_1: "تحسن الانتباه المستدام بشكل كبير (ما يعادل استعادة حيوية معرفية أصغر بـ 10 سنوات)",
    research_s2_results_beh_2: "زيادة في التفاعلات الاجتماعية المباشرة والأنشطة البدنية",
    research_s2_results_beh_3: "جودة نوم أفضل، وزيادة الوقت في الهواء الطلق، والقراءة، وممارسة الهوايات",
    research_s2_finding_1: "الاتصال المستمر بإنترنت الهاتف يخلق تشتتاً معرفياً مستمراً",
    research_s2_finding_2: "الحد من إمكانية الوصول الفوري للإنترنت يشجع على ممارسة سلوكيات أوفلاين نشطة وأكثر صحة",
    research_s2_finding_3: "المشاركون الذين يعانون من مستويات أعلى من الخوف من فوات الفرص (FoMO) حققوا الفوائد الأكبر",
    research_s2_conclusion: "إن حظر الوصول إلى إنترنت الهاتف المحمول لمدة أسبوعين فقط أدى إلى تحسينات كبيرة في مدى الانتباه، والصحة النفسية، وأنماط الحياة اليومية. وتقدم النتائج دليلاً قوياً على أن الاتصال الدائم بالهاتف الذكي قد يؤثر سلباً على الأداء النفسي والقدرات المعرفية.",
    research_s2_source_badge_info: "دورية PNAS Nexus، 2025",
    team_label: "الفريق",
    team_title: "داتا ريبرز",
    team_desc: "طاقم عمل متعدد التخصصات من المحللين والباحثين يربط بين الأدلة التجريبية والرؤى السلوكية.",
    team_role_1: "جمع البيانات · باحث",
    team_role_1_desc: "هيكلة المنهجيات الأكاديمية، تنسيق عملية جمع البيانات، وتركيب نتائج التوافق مع الدراسات السريرية.",
    team_role_2: "نمذجة البيانات",
    team_role_2_desc: "هندسة المخططات العلاقاتية، بناء هياكل قواعد البيانات الطبيعية، وتحسين أداء خطوط معالجة البيانات.",
    team_role_3: "تحليل البيانات",
    team_role_3_desc: "إجراء التحليلات الاستكشافية متعددة الأبعاد، استخلاص الرؤى السلوكية، والتحقق من النماذج الإحصائية.",
    team_role_4: "تصور البيانات",
    team_role_4_desc: "تصميم واجهات تفاعلية عالية الدقة، صياغة سرديات بصرية تفاعلية، وتحسين تجربة مستخدم لوحات البيانات.",
    team_skill_1_1: "بحث",
    team_skill_1_2: "جمع البيانات",
    team_skill_1_3: "الربط التحليلي",
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
    
    // Smoothly update the expanded accordion heights since text sizes change between languages
    const activeCard = document.querySelector('.res-accordion-card.active');
    if (activeCard) {
      const activeWrapper = activeCard.querySelector('.res-body-wrapper');
      if (activeWrapper) {
        setTimeout(() => {
          activeWrapper.style.maxHeight = activeWrapper.scrollHeight + 'px';
        }, 30);
      }
    }
  });

  // Mobile Menu Toggling
  const menuToggle = document.getElementById('menuToggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const menuIcon = menuToggle?.querySelector('.menu-icon');
  const closeIcon = menuToggle?.querySelector('.close-icon');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    if (isOpen) {
      if (menuIcon) menuIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
    } else {
      if (menuIcon) menuIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  });

  // Close menu when clicking a link
  navLinksContainer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (menuIcon) menuIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    });
  });

  // Initialize the premium Research Accordion system
  initResearchAccordion();
}

// --------------------------------------------------------------------------
// Research Accordion Controller
// --------------------------------------------------------------------------
function initResearchAccordion() {
  const cards = document.querySelectorAll('.res-accordion-card');
  
  cards.forEach(card => {
    const header = card.querySelector('.res-card-header');
    const wrapper = card.querySelector('.res-body-wrapper');
    
    if (!header || !wrapper) return;
    
    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close all other cards first to enforce clean accordion behavior
      cards.forEach(otherCard => {
        if (otherCard === card) return; // Skip the clicked one for now
        
        const otherHeader = otherCard.querySelector('.res-card-header');
        const otherWrapper = otherCard.querySelector('.res-body-wrapper');
        
        otherCard.classList.remove('active');
        if (otherWrapper) {
          otherWrapper.style.maxHeight = '0px';
          otherWrapper.style.opacity = '0';
          otherWrapper.setAttribute('aria-hidden', 'true');
        }
        if (otherHeader) {
          otherHeader.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle the clicked card
      if (isActive) {
        // Collapse active card
        card.classList.remove('active');
        wrapper.style.maxHeight = '0px';
        wrapper.style.opacity = '0';
        header.setAttribute('aria-expanded', 'false');
        wrapper.setAttribute('aria-hidden', 'true');
      } else {
        // Expand card
        card.classList.add('active');
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        wrapper.style.opacity = '1';
        header.setAttribute('aria-expanded', 'true');
        wrapper.setAttribute('aria-hidden', 'false');
      }
    });
  });
  
  // Adapt heights dynamically during resize events (e.g. mobile rotation)
  window.addEventListener('resize', () => {
    const activeCard = document.querySelector('.res-accordion-card.active');
    if (activeCard) {
      const activeWrapper = activeCard.querySelector('.res-body-wrapper');
      if (activeWrapper) {
        activeWrapper.style.maxHeight = activeWrapper.scrollHeight + 'px';
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", initSettings);
