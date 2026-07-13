const STORAGE_KEY = "pregnancy-companion-bilingual-content-v3";
const LANGUAGE_KEY = "pregnancy-companion-language";
const EDC_KEY = "pregnancy-companion-hospital-edc";
const EDC_UPDATED_KEY = "pregnancy-companion-edc-updated-at";
const ACCOUNT_KEY = "pregnancy-companion-patient-account";
const DEFAULT_EDC = "2027-01-02";
const CLINICAL_MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC",
];
const demoAccounts = [
  { name: "Maya Patel", id: "A1234", edc: "2026-09-18", recordDate: "2026-08-23", babySize: "a honeydew melon", development: "Your baby is gaining weight, practising breathing movements and preparing for birth.", appointment: ["2026-08-27", "10:30 AM", "Late pregnancy assessment"], investigation: ["2026-08-28", "9:20 AM", "Presentation and growth scan", "Confirms the baby's position, growth and fluid volume."], followUp: ["2026-09-03", "Delivery planning review", "Confirms birth preferences and labour arrangements."] },
  { name: "Chloe Wong", id: "B2345", edc: "2026-10-23", recordDate: "2026-09-01", babySize: "a squash", development: "Your baby's lungs and nervous system continue to mature while movements remain strong.", appointment: ["2026-09-07", "2:15 PM", "Third-trimester clinic"], investigation: ["2026-09-15", "11:00 AM", "Fetal growth scan", "Measures fetal growth, fluid and placental blood flow."], followUp: ["2026-10-02", "Group B streptococcus discussion", "Explains testing and intrapartum care options."] },
  { name: "Sophie Chan", id: "C3456", edc: "2026-11-20", recordDate: "2026-08-29", babySize: "an aubergine", development: "Your baby can open the eyes, respond to sound and is steadily gaining body fat.", appointment: ["2026-09-04", "9:45 AM", "Obstetric clinic review"], investigation: ["2026-09-10", "3:10 PM", "Gestational diabetes screening", "Glucose testing with timed blood samples."], followUp: ["2026-10-01", "Full blood count", "Checks haemoglobin, iron status and platelet levels."] },
  { name: "Emma Lee", id: "D4567", edc: "2026-12-18", recordDate: "2026-09-02", babySize: "an ear of corn", development: "Your baby's hearing is developing and regular sleep and wake patterns are beginning.", appointment: ["2026-09-08", "4:00 PM", "Maternal medicine review"], investigation: ["2026-09-18", "1:30 PM", "Oral glucose tolerance test", "Screens for gestational diabetes with timed blood samples."], followUp: ["2026-10-16", "Fetal growth review", "Reviews fetal growth and placental function where indicated."] },
  { name: "Olivia Lam", id: "E5678", edc: "2027-01-15", recordDate: "2026-08-31", babySize: "a banana", development: "Your baby can swallow and movements are becoming stronger and easier to notice.", appointment: ["2026-09-05", "10:00 AM", "Midwife continuity visit"], investigation: ["2026-09-14", "8:30 AM", "Morphology scan", "A detailed ultrasound review of fetal anatomy and growth."], followUp: ["2026-10-23", "Antenatal clinic review", "Reviews wellbeing, results and the next stage of care."] },
  { name: "Grace Ho", id: "F6789", edc: "2027-02-19", recordDate: "2026-09-11", babySize: "a pomegranate", development: "Your baby is moving actively and hearing is continuing to develop.", appointment: ["2026-09-17", "11:20 AM", "Routine antenatal appointment"], investigation: ["2026-09-25", "2:40 PM", "Detailed anomaly scan", "A detailed review of fetal structures and growth."], followUp: ["2026-10-30", "Ultrasound review clinic", "Reviews scan findings and ongoing pregnancy care."] },
  { name: "Hannah Ng", id: "G7890", edc: "2027-03-12", recordDate: "2026-09-13", babySize: "a lemon", development: "Your baby's facial movements are becoming more active and the body is growing quickly.", appointment: ["2026-09-18", "9:10 AM", "Early pregnancy clinic review"], investigation: ["2026-10-02", "10:50 AM", "Early anatomy scan", "Reviews early fetal anatomy, growth and placental position."], followUp: ["2026-11-06", "Midwife appointment", "Reviews wellbeing and preparation for the next trimester."] },
  { name: "Isabella Cheung", id: "H8901", edc: "2027-03-26", recordDate: "2026-09-11", babySize: "a plum", development: "Your baby's reflexes are developing and tiny movements are becoming more coordinated.", appointment: ["2026-09-15", "3:00 PM", "Booking review appointment"], investigation: ["2026-09-21", "9:30 AM", "Nuchal translucency scan", "Reviews early development and screening measurements."], followUp: ["2026-11-06", "Morphology scan planning", "Confirms preparation and timing for the detailed anatomy scan."] },
  { name: "Zoe Lau", id: "J9012", edc: "2027-04-09", recordDate: "2026-09-15", babySize: "a strawberry", development: "Your baby's main organs are formed and the limbs are moving more freely.", appointment: ["2026-09-18", "1:45 PM", "Booking blood test review"], investigation: ["2026-10-02", "10:15 AM", "Dating and screening scan", "Confirms gestation and reviews early screening measurements."], followUp: ["2026-11-20", "Detailed anatomy scan", "Reviews fetal structures, growth and placental position."] },
  { name: "Natalie Yip", id: "K0123", edc: "2027-04-30", recordDate: "2026-09-19", babySize: "a raspberry", development: "Your baby's arms and legs are forming and the heart is beating steadily.", appointment: ["2026-09-24", "8:50 AM", "Early pregnancy appointment"], investigation: ["2026-10-20", "11:40 AM", "First-trimester screening scan", "Reviews early development, dating and screening measurements."], followUp: ["2026-12-11", "Morphology scan", "A detailed ultrasound review of fetal anatomy and growth."] },
];

const defaults = {
  en: {
    babyDevelopment:
      "About 10 cm from head to bottom. Tiny facial movements are beginning and your baby can hear sounds from inside your body.",
    appointmentTitle: "Midwife appointment",
    appointmentDate: "18 JUL 2026 · 10:30 AM",
    appointmentPreparation:
      "Bring your maternity record\nWrite down questions you want to ask\nRoutine blood pressure and urine check",
    hospitalGuidelines:
      "Check the latest ward notice before travelling. Arrangements may change according to hospital operations and infection-control requirements.",
    familyBoundary:
      "Accompaniment may be restricted because of clinical condition, capacity, infection control, privacy, emergency procedures or professional assessment.",
    antenatalHours: "2:00–8:00 PM",
    antenatalVisitors: "Two registered visitors at a time",
    antenatalChildren: "Check with the ward before visiting",
    antenatalRegistration: "Photo identification at reception",
    postnatalPartner: "Access during designated hours",
    postnatalVisitors: "Two registered visitors at a time",
    postnatalSafety: "Clean hands before contact",
    postnatalChanges: "Shown in current hospital notices",
    labourNomination: "One designated adult",
    labourBring: "Registration confirmation and photo ID",
    labourScreening: "Health and infection-control check",
    labourEntry: "When invited by the labour team",
  },
  zh: {
    babyDevelopment:
      "寶寶頭臀長約 10 厘米，面部開始出現細微動作，亦能聽到媽媽身體內的聲音。",
    appointmentTitle: "助產士產前檢查",
    appointmentDate: "2026 年 7 月 18 日 · 上午 10:30",
    appointmentPreparation:
      "攜帶產科紀錄\n預先寫下想詢問的問題\n接受例行血壓及尿液檢查",
    hospitalGuidelines:
      "前往醫院前請查閱最新病房通告。安排或會因醫院運作及感染控制要求而更改。",
    familyBoundary:
      "陪產安排可能因臨床狀況、病房容量、感染控制、私隱、緊急程序或專業評估而受到限制。",
    antenatalHours: "下午 2:00 至晚上 8:00",
    antenatalVisitors: "每次最多兩名已登記訪客",
    antenatalChildren: "兒童探訪前請先向病房查詢",
    antenatalRegistration: "於接待處出示附相片身份證明",
    postnatalPartner: "可於指定時段內進入",
    postnatalVisitors: "每次最多兩名已登記訪客",
    postnatalSafety: "接觸嬰兒前請清潔雙手",
    postnatalChanges: "請參閱醫院最新通告",
    labourNomination: "一名指定成年人",
    labourBring: "登記確認及附相片身份證明",
    labourScreening: "健康及感染控制篩查",
    labourEntry: "由產房團隊通知後方可進入",
  },
};

const zh = {
  "CONCEPT PROTOTYPE": "概念原型",
  "Fictional maternity data · Not connected to a live clinical system · Not intended for clinical use":
    "虛構產科資料 · 未連接真實臨床系統 · 不可用作臨床用途",
  Antenatal: "產前",
  "Care Companion": "護理夥伴",
  "Patient Mobile": "病人流動版",
  Governance: "內容管理",
  English: "English",
  "Log out": "登出",
  "PATIENT EXPERIENCE": "病人體驗",
  "Good afternoon, Maya": "你好",
  "Clear, approved guidance for every stage of your pregnancy.":
    "為懷孕每個階段提供清晰、經審核的指引。",
  Home: "首頁",
  Timeline: "懷孕時間線",
  Ask: "問一問",
  "Family & labour": "家人及分娩",
  "My information": "我的資訊",
  "WEEK 15 OF 40": "懷孕第 15 週（共 40 週）",
  "Your baby is about": "寶寶大小約如",
  "the size of an apple.": "一個蘋果。",
  "Trimester 2": "第二孕期",
  "25 weeks to go": "尚餘 25 週",
  weeks: "週",
  NEXT: "下一項",
  "PREPARE FOR YOUR VISIT": "就診準備",
  "COMING UP": "即將到來",
  "Your next milestones": "下一個重要階段",
  "WEEK 16": "第 16 週",
  "Routine antenatal visit": "例行產前檢查",
  "Blood pressure, urine and wellbeing check.":
    "檢查血壓、尿液及整體健康狀況。",
  "WEEKS 18–22": "第 18–22 週",
  "Morphology scan": "結構超聲波檢查",
  "A detailed ultrasound to check your baby's development.":
    "以詳細超聲波檢查寶寶發育情況。",
  "WEEKS 24–28": "第 24–28 週",
  "Glucose screening & blood tests": "血糖篩查及驗血",
  "Checks for gestational diabetes and anaemia.": "檢查妊娠糖尿病及貧血。",
  "PERSONALISED JOURNEY": "個人化旅程",
  "Your pregnancy timeline": "你的懷孕時間線",
  "Approved milestones based on your current gestational profile.":
    "根據目前孕週提供經審核的重要階段。",
  "WEEKS 11–14 · COMPLETED": "第 11–14 週 · 已完成",
  "Dating and Down's syndrome screening": "孕期及唐氏綜合症篩查",
  "Ultrasound and approved screening information.":
    "超聲波及經審核的篩查資訊。",
  "WEEK 15 · YOU ARE HERE": "第 15 週 · 目前階段",
  "Second trimester begins": "進入第二孕期",
  "Gestation-specific guidance and appointment preparation.":
    "孕週專屬指引及覆診準備。",
  "Detailed ultrasound generally offered at 18–22 weeks.":
    "一般於第 18–22 週安排詳細超聲波。",
  "Blood tests and glucose screening": "驗血及血糖篩查",
  "Checks may include anaemia and gestational diabetes.":
    "檢查項目可能包括貧血及妊娠糖尿病。",
  "APPROVED INFORMATION": "經審核資訊",
  "Ask the Companion": "詢問護理夥伴",
  "Ask about pregnancy stages, appointments, investigations and hospital guidance.":
    "查詢孕期階段、覆診、檢查及醫院指引。",
  "Hello Maya. I can explain approved pregnancy and hospital information.":
    "你好。我可以解釋經審核的懷孕及醫院資訊。",
  "I cannot diagnose, assess urgency or contact hospital staff for you.":
    "我不能作出診斷、評估緊急程度或代你聯絡醫院職員。",
  "What happens at 15 weeks?": "懷孕 15 週會有甚麼變化？",
  "When is my morphology scan?": "何時進行結構超聲波？",
  "What are the visiting hours for the antenatal ward?":
    "產前病房的探訪時間是甚麼？",
  "Who can accompany me during labour?": "分娩時誰可陪伴我？",
  "I have vaginal bleeding.": "我有陰道出血。",
  "Contact a healthcare provider": "聯絡醫護人員",
  "Please approach your hospital or obstetric department for:":
    "如有以下情況，請聯絡醫院或產科部門：",
  "Vaginal bleeding": "陰道出血",
  "Abdominal pain": "腹痛",
  "Watery or clear discharge": "水狀或透明分泌物",
  "Reduced fetal movement, when relevant": "胎動減少（如適用）",
  "Fever or severe vomiting": "發燒或嚴重嘔吐",
  "Headache or visual disturbance": "頭痛或視力異常",
  "Any other clinical concern": "任何其他臨床疑慮",
  "Do not rely on this app for urgent or clinical assessment.":
    "請勿依賴本應用程式作緊急或臨床評估。",
  "VISITOR & LABOUR SUPPORT": "訪客及分娩支援",
  "Practical guidance for your family": "給家人的實用指引",
  "Hospital-specific arrangements for ward visits and your nominated labour support person.":
    "有關病房探訪及指定陪產人士的醫院安排。",
  "Hospital guidelines": "醫院指引",
  Updated: "已更新",
  "ANTENATAL WARD": "產前病房",
  "Visiting information": "探訪資訊",
  "Visiting hours": "探訪時間",
  Visitors: "訪客人數",
  Children: "兒童",
  Registration: "登記要求",
  "POSTNATAL WARD": "產後病房",
  "After delivery": "分娩後",
  "Partner or carer": "伴侶或照顧者",
  "Other visitors": "其他訪客",
  "Baby safety": "嬰兒安全",
  "Temporary changes": "臨時安排",
  "LABOUR ROOM": "產房",
  "Your accompanying person": "陪產人士",
  Nomination: "指定人士",
  Bring: "攜帶文件",
  Screening: "篩查要求",
  Entry: "進入安排",
  "Clinical care and safety come first": "臨床護理及安全為先",
  "APPROVED RESOURCES": "經審核資源",
  "Information reviewed and approved by the fictional maternity service.":
    "資訊由虛構產科服務審閱及批准。",
  FACTSHEET: "資料單張",
  "Your second trimester": "你的第二孕期",
  "Approved pregnancy guidance": "經審核懷孕指引",
  INVESTIGATION: "檢查",
  "Morphology scan explained": "結構超聲波說明",
  "What it checks and how to prepare": "檢查內容及準備方法",
  APPOINTMENT: "覆診",
  "Preparing for your visit": "覆診前準備",
  "Your appointment checklist": "覆診清單",
  HOSPITAL: "醫院",
  "Ward and visitor information": "病房及訪客資訊",
  "Current hospital guidance": "現行醫院指引",
  "PATIENT MOBILE CONTENT": "病人流動版內容",
  "Update the hospital-approved information shown in Patient Mobile. Changes are saved locally in this concept prototype.":
    "更新病人流動版顯示的醫院核准資訊。此概念原型會在本機儲存變更。",
  "Content sections": "內容章節",
  "Pregnancy Overview": "懷孕概覽",
  "Hospital Guidelines": "醫院指引",
  "Antenatal Ward": "產前病房",
  "Labour Room": "產房",
  "Postnatal Ward": "產後病房",
  "Publish to Patient Mobile": "發布至病人流動版",
  "Reset draft": "重設草稿",
  "Pregnancy overview": "懷孕概覽",
  "Baby development": "寶寶發育",
  "Next appointment": "下一次覆診",
  "Date and time": "日期及時間",
  "Preparation checklist": "準備清單",
  "One item per line": "每行一項",
  "Current patient-facing notice": "現行病人通告",
  "Safety and accompaniment notice": "安全及陪產通告",
  "Visitors permitted": "允許訪客",
  "What to bring": "需攜帶物品",
  "Screening criteria": "篩查準則",
  "Entry arrangements": "進入安排",
  "Published to Patient Mobile": "已發布至病人流動版",
  "Welcome to your maternity journey": "歡迎進入你的產科旅程",
  "Sign in to view your personalised Patient Mobile experience.":
    "登入以查看你的個人化病人流動版。",
  "Patient name": "病人姓名",
  "First 5 characters of identity document": "身份證明文件首 5 個字元",
  "Enter exactly five letters or numbers.": "請輸入剛好五個英文字母或數字。",
  "Sign in to Patient Mobile": "登入病人流動版",
  "Prototype only. Identity characters are checked locally and are not stored.":
    "僅供原型使用。身份證字元只會在本機核對，不會被儲存。",
};
Object.assign(zh, {
  "PREGNANCY COMPANION": "懷孕夥伴",
  "STAFF PREVIEW CONTROLS": "職員預覽控制",
  "Not visible in the patient-facing app": "病人使用版本不會顯示",
  "Demo login IDs & passwords": "示範登入帳戶及密碼",
  "Tap to reveal and choose an account": "撳一下展開並選擇帳戶",
  "Choose any fictional account below. The selected name and five-character demo password will be filled in for you.": "請選擇以下任何虛構帳戶；系統會自動填入姓名及五個字元的示範密碼。",
  Pregnancy: "懷孕",
  Companion: "夥伴",
  "Hong Kong identity document (first five characters):":
    "香港身份證明文件（首五個字元）：",
  "Demo logins": "示範登入帳戶",
  "Choose any fictional account to try the app.":
    "選擇任何虛構帳戶試用應用程式。",
  "FACT SHEETS": "資料單張",
  "Pregnancy fact sheets": "懷孕資料單張",
  "Investigation information": "檢查資訊",
  "Appointment preparation": "覆診準備",
  "Guidelines & Fact Sheets": "指引及資料單張",
  "Document title": "文件標題",
  Category: "類別",
  "Fact sheet": "資料單張",
  "Pregnancy stage or topic": "孕期階段或主題",
  "Chatbot keywords": "聊天機械人關鍵字",
  "PDF file": "PDF 文件",
  "Upload & Publish PDF": "上載及發布 PDF",
  "No published documents yet.": "尚未有已發布文件。",
  "Open PDF": "開啟 PDF",
  Delete: "刪除",
  "Not yet scheduled": "尚未安排",
  Completed: "已完成",
  "2 JUL 2026": "2026 年 7 月 2 日",
  "10 AUG 2026": "2026 年 8 月 10 日",
  "9:20 AM": "上午 9:20",
  "10:30 AM": "上午 10:30",
});

let activeLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";
let contentByLanguage = {
  en: { ...defaults.en },
  zh: { ...defaults.zh },
  ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
};
let content = contentByLanguage[activeLanguage];
const originalTextNodes = [];

function captureTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (
      !node.nodeValue.trim() ||
      ["SCRIPT", "STYLE"].includes(node.parentElement?.tagName)
    )
      continue;
    originalTextNodes.push({ node, english: node.nodeValue });
  }
}

function translateStatic(language) {
  originalTextNodes.forEach(({ node, english }) => {
    const trimmed = english.trim();
    const translated = language === "zh" ? zh[trimmed] : trimmed;
    node.nodeValue = english.replace(trimmed, translated || trimmed);
  });
  const placeholders =
    language === "zh"
      ? {
          loginName: "輸入病人全名",
          loginIdentity: "只限英文字母及數字",
          chatInput: "輸入問題……",
        }
      : {
          loginName: "Enter your full name",
          loginIdentity: "Letters and numbers only",
          chatInput: "Ask a question…",
        };
  Object.entries(placeholders).forEach(
    ([id, value]) => (document.getElementById(id).placeholder = value),
  );
}

function setLanguage(language) {
  activeLanguage = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  document.documentElement.lang = language === "zh" ? "zh-HK" : "en";
  document
    .querySelectorAll("[data-language]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.language === language),
    );
  translateStatic(language);
  content = contentByLanguage[language];
  applyContent();
  populateEditor();
  renderDemoAccounts();
  renderDocumentLibrary().catch(() => {});
  const signedInName = sessionStorage.getItem(
    "pregnancy-companion-patient-name",
  );
  if (signedInName) unlockApp(signedInName);
}

function renderDemoAccounts() {
  const container = document.getElementById("demoAccounts");
  container.replaceChildren(
    ...demoAccounts.map((account, index) => {
      const card = document.createElement("div");
      card.className = "demo-account";
      const details = document.createElement("span");
      const name = document.createElement("b");
      name.textContent = account.name;
      const id = document.createElement("small");
      id.textContent = account.id;
      const profile = document.createElement("em");
      const ga = gestationAt(calendarDate(account.recordDate), calendarDate(account.edc));
      profile.textContent = activeLanguage === "zh" ? `EDC ${formatClinicalDate(calendarDate(account.edc))} · ${ga.weeks}週${ga.days}日` : `EDC ${formatClinicalDate(calendarDate(account.edc))} · ${ga.weeks}w ${ga.days}d`;
      details.append(name, id, profile);
      const use = document.createElement("button");
      use.type = "button";
      use.textContent = activeLanguage === "zh" ? "使用" : "Use demo";
      use.dataset.demoIndex = String(index);
      use.addEventListener("click", () => {
        document.getElementById("loginName").value = account.name;
        document.getElementById("loginIdentity").value = account.id;
        document.getElementById("loginError").textContent = "";
      });
      card.append(details, use);
      return card;
    }),
  );
}

function showView(id) {
  document
    .querySelectorAll(".view, .view-nav button")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelector(`[data-view="${id}"]`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showPatientPage(id) {
  document
    .querySelectorAll(".patient-page, [data-patient-page]")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelector(`[data-patient-page="${id}"]`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDocumentDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("antenatal-document-library", 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("documents"))
        request.result.createObjectStore("documents", { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function documentTransaction(mode, action) {
  const database = await openDocumentDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("documents", mode);
    const store = transaction.objectStore("documents");
    const request = action(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
  });
}

const getDocuments = () =>
  documentTransaction("readonly", (store) => store.getAll());
const saveDocument = (document) =>
  documentTransaction("readwrite", (store) => store.put(document));
const removeDocument = (id) =>
  documentTransaction("readwrite", (store) => store.delete(id));

async function openPublishedDocument(id) {
  const documents = await getDocuments();
  const documentRecord = documents.find((item) => item.id === id);
  if (!documentRecord) return;
  const url = URL.createObjectURL(documentRecord.file);
  window.open(url, "_blank", "noopener");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

async function renderDocumentLibrary() {
  const documents = (await getDocuments()).filter(
    (item) => item.language === activeLanguage,
  );
  ["factsheet", "investigation", "appointment", "hospital"].forEach(
    (category) => {
      const container = document.getElementById(`resourceList-${category}`);
      const matches = documents.filter((item) => item.category === category);
      if (!matches.length) {
        const empty = document.createElement("p");
        empty.className = "document-empty";
        empty.textContent =
          activeLanguage === "zh"
            ? "尚未有已發布文件。"
            : "No published documents yet.";
        container.replaceChildren(empty);
        return;
      }
      container.replaceChildren(
        ...matches.map((item) => {
          const row = document.createElement("div");
          row.className = "document-item";
          const details = document.createElement("div");
          const title = document.createElement("b");
          title.textContent = item.title;
          const meta = document.createElement("small");
          meta.textContent =
            item.stage ||
            (activeLanguage === "zh" ? "經審核 PDF" : "Approved PDF");
          const open = document.createElement("button");
          open.type = "button";
          open.textContent = activeLanguage === "zh" ? "開啟 PDF" : "Open PDF";
          open.addEventListener("click", () => openPublishedDocument(item.id));
          details.append(title, meta);
          row.append(details, open);
          return row;
        }),
      );
    },
  );
  const governance = document.getElementById("governanceDocumentList");
  if (!documents.length) {
    const empty = document.createElement("p");
    empty.className = "document-empty";
    empty.textContent =
      activeLanguage === "zh"
        ? "尚未有已發布文件。"
        : "No published documents yet.";
    governance.replaceChildren(empty);
  } else
    governance.replaceChildren(
      ...documents.map((item) => {
        const row = document.createElement("div");
        row.className = "governance-document";
        const details = document.createElement("div");
        const title = document.createElement("b");
        title.textContent = item.title;
        const meta = document.createElement("small");
        meta.textContent = `${item.category} · ${item.stage || "—"}`;
        details.append(title, meta);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = activeLanguage === "zh" ? "刪除" : "Delete";
        remove.addEventListener("click", async () => {
          await removeDocument(item.id);
          await renderDocumentLibrary();
        });
        row.append(details, remove);
        return row;
      }),
    );
}

async function matchingDocuments(topic) {
  const normalized = topic.toLowerCase();
  return (await getDocuments()).filter(
    (item) =>
      item.language === activeLanguage &&
      `${item.title} ${item.stage} ${item.keywords}`
        .toLowerCase()
        .includes(normalized),
  );
}

function applyContent() {
  Object.entries(content).forEach(([key, value]) => {
    const target = document.getElementById(key);
    if (!target) return;
    if (key === "appointmentPreparation")
      target.replaceChildren(
        ...value
          .split("\n")
          .filter(Boolean)
          .map((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            return li;
          }),
      );
    else target.textContent = value;
  });
  const appointmentParts = content.appointmentDate
    .split("·")
    .map((part) => part.trim());
  document.getElementById("timelineAppointmentDate").textContent =
    appointmentParts[0] || content.appointmentDate;
  document.getElementById("timelineAppointmentTime").textContent =
    appointmentParts[1] || "";
  const parsedAppointment = new Date(appointmentParts[0]);
  if (!Number.isNaN(parsedAppointment.getTime())) {
    const iso = `${parsedAppointment.getFullYear()}-${String(parsedAppointment.getMonth() + 1).padStart(2, "0")}-${String(parsedAppointment.getDate()).padStart(2, "0")}`;
    document
      .querySelectorAll(
        "#appointmentDate + .appointment-ga, #timelineAppointmentTime + .appointment-ga",
      )
      .forEach((node) => (node.dataset.appointmentDate = iso));
  }
  updateGestationalProfile();
}

function populateEditor() {
  const form = document.getElementById("governanceForm");
  Object.entries(content).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  document.getElementById("hospitalEdc").value = currentEdcValue();
}

function activeDemoAccount() {
  const accountId = sessionStorage.getItem(ACCOUNT_KEY);
  return demoAccounts.find((account) => account.id === accountId) || demoAccounts[0];
}

function accountStorageKey(baseKey) {
  return `${baseKey}-${activeDemoAccount().id}`;
}

function currentEdcValue() {
  const account = activeDemoAccount();
  return localStorage.getItem(accountStorageKey(EDC_KEY)) || account.edc || DEFAULT_EDC;
}

function calendarDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function hongKongTodayDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return calendarDate(`${values.year}-${values.month}-${values.day}`);
}

function gestationAt(date, edc) {
  const pregnancyStart = new Date(edc.getTime() - 280 * 86400000);
  const totalDays = Math.max(
    0,
    Math.min(280, Math.round((date - pregnancyStart) / 86400000)),
  );
  return { totalDays, weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

function formatClinicalDate(date) {
  if (activeLanguage === "zh") {
    return new Intl.DateTimeFormat("zh-HK", {
      timeZone: "UTC",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  }
  return `${date.getUTCDate()} ${CLINICAL_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function gestationLabel(ga, upper = false) {
  const english = `${ga.weeks} weeks + ${ga.days} days`;
  const chinese = `${ga.weeks} 週 + ${ga.days} 日`;
  return (activeLanguage === "zh" ? chinese : english)[
    upper ? "toUpperCase" : "toString"
  ]();
}

function milestoneParts(item, type) {
  if (type === "appointment") return { date: item[0], time: item[1], title: item[2], description: "Blood pressure, urine and wellbeing review." };
  if (type === "investigation") return { date: item[0], time: item[1], title: item[2], description: item[3] };
  return { date: item[0], time: "", title: item[1], description: item[2] };
}

function dateTile(dateValue) {
  const date = calendarDate(dateValue);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = CLINICAL_MONTHS[date.getUTCMonth()];
  return `<span class="date-tile">${day}<small>${month}</small></span>`;
}

function renderDemoJourney(account) {
  const appointment = milestoneParts(account.appointment, "appointment");
  const investigation = milestoneParts(account.investigation, "investigation");
  const followUp = milestoneParts(account.followUp, "followUp");
  const recordDate = calendarDate(account.recordDate);
  const previousDate = new Date(recordDate.getTime() - 21 * 86400000);
  const previousIso = previousDate.toISOString().slice(0, 10);
  document.getElementById("appointmentTitle").textContent = appointment.title;
  document.getElementById("appointmentDate").textContent = `${formatClinicalDate(calendarDate(appointment.date))} · ${appointment.time}`;
  document.getElementById("appointmentPreparation").replaceChildren(...[
    "Bring your maternity record", `Prepare questions about ${appointment.title.toLowerCase()}`, "Bring a urine specimen if requested"
  ].map((text) => { const li = document.createElement("li"); li.textContent = text; return li; }));
  const nextGa = document.querySelector(".next-card .appointment-ga");
  nextGa.dataset.appointmentDate = appointment.date;

  const milestones = [appointment, investigation, followUp];
  document.querySelector(".milestone-grid").innerHTML = milestones.map((item, index) => `<article class="card milestone${index === 1 ? " featured" : ""}">${dateTile(item.date)}<div><small class="appointment-ga" data-appointment-date="${item.date}"></small><h3>${item.title}</h3><p>${item.description}</p></div></article>`).join("");

  document.querySelector(".timeline-list").innerHTML = `
    <article class="timeline-row complete"><aside class="timeline-appointment"><small>APPOINTMENT</small><b>${formatClinicalDate(previousDate)}</b><span>Completed</span><strong class="appointment-ga" data-appointment-date="${previousIso}"></strong></aside><span>✓</span><div><small>PREVIOUS REVIEW · COMPLETED</small><h3>Routine pregnancy review</h3><p>Clinical observations and pregnancy progress reviewed.</p></div></article>
    <article class="timeline-row current"><aside class="timeline-appointment unscheduled"><small>CLINICAL RECORD DATE</small><b id="timelineCurrentGa"></b><span id="timelineCurrentDate"></span></aside><span id="timelineCurrentWeek"></span><div><small id="timelineYouAreHere"></small><h3>Current pregnancy stage</h3><p>${account.development}</p></div></article>
    <article class="timeline-row"><aside class="timeline-appointment"><small>APPOINTMENT</small><b id="timelineAppointmentDate">${formatClinicalDate(calendarDate(appointment.date))}</b><span id="timelineAppointmentTime">${appointment.time}</span><strong class="appointment-ga" data-appointment-date="${appointment.date}"></strong></aside><span>${gestationAt(calendarDate(appointment.date), calendarDate(currentEdcValue())).weeks}</span><div><small>NEXT VISIT</small><h3>${appointment.title}</h3><p>${appointment.description}</p></div></article>
    <article class="timeline-row"><aside class="timeline-appointment"><small>INVESTIGATION</small><b>${formatClinicalDate(calendarDate(investigation.date))}</b><span>${investigation.time}</span><strong class="appointment-ga" data-appointment-date="${investigation.date}"></strong></aside><span>${gestationAt(calendarDate(investigation.date), calendarDate(currentEdcValue())).weeks}</span><div><small>PERSONALISED INVESTIGATION</small><h3>${investigation.title}</h3><p>${investigation.description}</p></div></article>
    <article class="timeline-row"><aside class="timeline-appointment"><small>FOLLOW-UP</small><b>${formatClinicalDate(calendarDate(followUp.date))}</b><strong class="appointment-ga" data-appointment-date="${followUp.date}"></strong></aside><span>${gestationAt(calendarDate(followUp.date), calendarDate(currentEdcValue())).weeks}</span><div><small>PLANNED CARE</small><h3>${followUp.title}</h3><p>${followUp.description}</p></div></article>`;
}

function applyDemoProfile(account) {
  document.getElementById("babySizeHeadline").textContent = activeLanguage === "zh" ? `寶寶現在約有 ${account.babySize} 的大小。` : `Your baby is about the size of ${account.babySize}.`;
  document.getElementById("babyDevelopment").textContent = account.development;
  const firstBotMessage = document.querySelector("#chatMessages .message.bot p");
  if (firstBotMessage) firstBotMessage.textContent = activeLanguage === "zh" ? `你好 ${account.name}。我可以解釋經審核的懷孕及醫院資訊。` : `Hello ${account.name}. I can explain approved pregnancy and hospital information.`;
  const firstSuggestion = document.querySelector(".suggestions button");
  const investigationSuggestion = document.querySelectorAll(".suggestions button")[1];
  const ga = gestationAt(calendarDate(account.recordDate), calendarDate(currentEdcValue()));
  if (firstSuggestion) firstSuggestion.textContent = activeLanguage === "zh" ? `懷孕 ${ga.weeks} 週會有甚麼變化？` : `What happens at ${ga.weeks} weeks?`;
  if (investigationSuggestion) investigationSuggestion.textContent = activeLanguage === "zh" ? `我的 ${account.investigation[2]} 何時進行？` : `When is my ${account.investigation[2]}?`;
  renderDemoJourney(account);
}

function updateGestationalProfile() {
  const account = activeDemoAccount();
  const edcValue = currentEdcValue();
  const edc = calendarDate(edcValue);
  const today = calendarDate(account.recordDate);
  const current = gestationAt(today, edc);
  const remainingDays = Math.max(0, 280 - current.totalDays);
  const remaining = {
    weeks: Math.floor(remainingDays / 7),
    days: remainingDays % 7,
  };
  document.getElementById("patientEdc").textContent = formatClinicalDate(edc);
  let edcNotice = document.getElementById("edcUpdateNotice");
  if (!edcNotice) {
    edcNotice = document.createElement("em");
    edcNotice.id = "edcUpdateNotice";
    document.getElementById("patientEdc").after(edcNotice);
  }
  Object.assign(edcNotice.style, {
    display: "block",
    marginTop: "3px",
    color: "#bcd7d0",
    fontSize: "9px",
    fontStyle: "normal",
  });
  const updatedAt = localStorage.getItem(accountStorageKey(EDC_UPDATED_KEY));
  edcNotice.textContent = updatedAt
    ? activeLanguage === "zh"
      ? "EDC 已由產科團隊更新"
      : "EDC updated by your maternity team"
    : activeLanguage === "zh"
      ? "由醫院確認 · 病人只讀"
      : "Hospital confirmed · Patient read-only";
  document.getElementById("patientToday").textContent =
    formatClinicalDate(today);
  document.getElementById("gestationPill").textContent = gestationLabel(
    current,
    true,
  );
  document.getElementById("orbitWeek").textContent = current.weeks;
  document.getElementById("orbitDays").textContent =
    activeLanguage === "zh" ? `+ ${current.days} 日` : `+ ${current.days} days`;
  document.getElementById("pregnancyProgress").style.width =
    `${(current.totalDays / 280) * 100}%`;
  document.getElementById("pregnancyRemaining").textContent =
    activeLanguage === "zh"
      ? `距離 EDC 尚餘 ${remaining.weeks} 週 + ${remaining.days} 日`
      : `${remaining.weeks} weeks + ${remaining.days} days to EDC`;
  document.getElementById("trimesterLabel").textContent = activeLanguage === "zh" ? `第 ${current.weeks < 14 ? 1 : current.weeks < 28 ? 2 : 3} 孕期` : `Trimester ${current.weeks < 14 ? 1 : current.weeks < 28 ? 2 : 3}`;
  document.getElementById("timelineCurrentGa").textContent =
    gestationLabel(current);
  document.getElementById("timelineCurrentDate").textContent =
    formatClinicalDate(today);
  document.getElementById("timelineCurrentWeek").textContent = current.weeks;
  document.getElementById("timelineYouAreHere").textContent =
    `${gestationLabel(current, true)} · ${activeLanguage === "zh" ? "你目前的位置" : "YOU ARE HERE"}`;
  document.querySelectorAll("[data-appointment-date]").forEach((node) => {
    const ga = gestationAt(calendarDate(node.dataset.appointmentDate), edc);
    node.textContent = `${node.closest(".next-card") ? (activeLanguage === "zh" ? "到診時：" : "At ") : ""}${gestationLabel(ga)}`;
  });
}

function initials(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "P"
  );
}

function hongKongClock() {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Hong_Kong",
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  );
  const timeText = activeLanguage === "zh"
    ? new Intl.DateTimeFormat("zh-HK", {
      timeZone: "Asia/Hong_Kong",
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(now)
    : (() => {
      const dateParts = Object.fromEntries(
        new Intl.DateTimeFormat("en-HK", {
          timeZone: "Asia/Hong_Kong",
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .formatToParts(now)
          .filter((part) => part.type !== "literal")
          .map((part) => [part.type, part.value]),
      );
      const clockTime = new Intl.DateTimeFormat("en-HK", {
        timeZone: "Asia/Hong_Kong",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);
      return `${dateParts.weekday}, ${Number(dateParts.day)} ${CLINICAL_MONTHS[Number(dateParts.month) - 1]} ${dateParts.year} at ${clockTime}`;
    })();
  return { hour, timeText };
}

function updateHongKongGreeting(
  name = sessionStorage.getItem("pregnancy-companion-patient-name") ||
    "Patient",
) {
  const { hour, timeText } = hongKongClock();
  const englishGreeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const chineseGreeting = hour < 12 ? "早晨" : hour < 18 ? "午安" : "晚上好";
  const clock = document.getElementById("hongKongTime");
  clock.textContent =
    activeLanguage === "zh"
      ? `香港時間 · ${timeText}`
      : `Hong Kong time · ${timeText}`;
  clock.dateTime = new Date().toISOString();
  document.getElementById("patientGreeting").textContent =
    `${activeLanguage === "zh" ? chineseGreeting : englishGreeting}, ${name}`;
}

function unlockApp(name) {
  const account = demoAccounts.find((item) => item.name === name) || activeDemoAccount();
  document.getElementById("patientDisplayName").textContent = name;
  document.getElementById("patientInitials").textContent = initials(name);
  applyDemoProfile(account);
  updateGestationalProfile();
  updateHongKongGreeting(name);
  document.getElementById("loginGate").classList.add("hidden");
  document.getElementById("appRoot").classList.remove("locked");
  document.getElementById("appRoot").setAttribute("aria-hidden", "false");
  history.scrollRestoration = "manual";
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

const answers = {
  en: {
    "What happens at 15 weeks?": () => content.babyDevelopment,
    "When is my morphology scan?": () =>
      "A morphology scan is generally offered between 18 and 22 weeks. Check your appointment record for the confirmed date.",
    "What are the visiting hours for the antenatal ward?": () =>
      `Current visiting hours are ${content.antenatalHours}. ${content.antenatalVisitors}.`,
    "Who can accompany me during labour?": () =>
      `${content.labourNomination}. ${content.labourBring}. Entry: ${content.labourEntry}.`,
  },
  zh: {
    "懷孕 15 週會有甚麼變化？": () => content.babyDevelopment,
    "何時進行結構超聲波？": () =>
      "結構超聲波一般於懷孕第 18 至 22 週進行。請查閱覆診紀錄確認日期。",
    "產前病房的探訪時間是甚麼？": () =>
      `現行探訪時間為${content.antenatalHours}。${content.antenatalVisitors}。`,
    "分娩時誰可陪伴我？": () =>
      `${content.labourNomination}。${content.labourBring}。進入安排：${content.labourEntry}。`,
  },
};

function addMessage(text, type = "user") {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  if (type === "bot") {
    const mark = document.createElement("span");
    mark.textContent = "✦";
    message.append(mark);
  }
  const body = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = text;
  body.append(p);
  message.append(body);
  document.getElementById("chatMessages").append(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function addFactSheetOffer(topic) {
  const message = document.createElement("div");
  message.className = "message bot";
  const mark = document.createElement("span");
  mark.textContent = "✦";
  const body = document.createElement("div");
  const prompt = document.createElement("p");
  prompt.textContent =
    activeLanguage === "zh"
      ? "你想唔想睇相關嘅資料單張？"
      : "Would you like the related fact sheet?";
  const choices = document.createElement("div");
  choices.className = "choice-buttons";
  const yes = document.createElement("button");
  yes.type = "button";
  yes.textContent = activeLanguage === "zh" ? "要" : "Yes";
  const no = document.createElement("button");
  no.type = "button";
  no.textContent = activeLanguage === "zh" ? "唔要" : "No";
  yes.addEventListener("click", async () => {
    choices.remove();
    const documents = await matchingDocuments(topic);
    if (!documents.length) {
      addMessage(
        activeLanguage === "zh"
          ? "目前未有相關已發布資料單張。你可以喺「我的資訊」查看其他文件。"
          : "There is no published fact sheet for this topic yet. You can check My Information for other documents.",
        "bot",
      );
      return;
    }
    const documentMessage = document.createElement("div");
    documentMessage.className = "message bot";
    const documentMark = document.createElement("span");
    documentMark.textContent = "✦";
    const documentBody = document.createElement("div");
    const text = document.createElement("p");
    text.textContent =
      activeLanguage === "zh"
        ? "以下係相關資料單張："
        : "Here is the related fact sheet:";
    const links = document.createElement("div");
    links.className = "fact-sheet-links";
    documents.forEach((item) => {
      const link = document.createElement("button");
      link.type = "button";
      link.className = "fact-sheet-link";
      link.textContent = `PDF · ${item.title}`;
      link.addEventListener("click", () => openPublishedDocument(item.id));
      links.append(link);
    });
    documentBody.append(text, links);
    documentMessage.append(documentMark, documentBody);
    document.getElementById("chatMessages").append(documentMessage);
    documentMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  no.addEventListener("click", () => {
    choices.remove();
    addMessage(
      activeLanguage === "zh"
        ? "冇問題。仲有冇其他問題或者有咩可以幫到你？"
        : "No problem. Is there anything else I can help you with?",
      "bot",
    );
  });
  choices.append(yes, no);
  body.append(prompt, choices);
  message.append(mark, body);
  document.getElementById("chatMessages").append(message);
  message.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function respond(question) {
  addMessage(question);
  setTimeout(() => {
    const isConcern =
      /bleed|出血|watery|分泌物|pain|腹痛|movement|胎動|fever|發燒|vomit|嘔吐|headache|頭痛|vision|視力|unwell/i.test(
        question,
      );
    const fallback =
      activeLanguage === "zh"
        ? "我可以解釋經審核的懷孕、覆診、訪客及陪產資訊。如需個別臨床意見，請聯絡醫院或產科部門。"
        : "I can explain approved pregnancy, appointment, visitor and labour-support information. Please approach your hospital or obstetric department for individual clinical advice.";
    const concern =
      activeLanguage === "zh"
        ? "請聯絡你的醫院或產科部門接受臨床評估。本應用程式不能評估緊急程度、聯絡職員或安排護理。"
        : "Please approach your hospital or obstetric department for clinical assessment. This app cannot assess urgency, contact staff or arrange care.";
    const account = activeDemoAccount();
    const profileAnswer = /what happens at|懷孕\s*\d+\s*週/i.test(question)
      ? account.development
      : /when is my|何時進行/i.test(question)
        ? `${account.investigation[2]}: ${formatClinicalDate(calendarDate(account.investigation[0]))} · ${account.investigation[1]}. ${account.investigation[3]}`
        : null;
    addMessage(
      isConcern ? concern : profileAnswer || answers[activeLanguage][question]?.() || fallback,
      "bot",
    );
    if (!isConcern && /morphology|結構超聲波/i.test(question))
      setTimeout(
        () =>
          addFactSheetOffer(
            activeLanguage === "zh" ? "結構超聲波" : "morphology",
          ),
        180,
      );
  }, 250);
}

document
  .querySelectorAll("[data-view]")
  .forEach((button) =>
    button.addEventListener("click", () => showView(button.dataset.view)),
  );
document
  .querySelectorAll("[data-patient-page]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      showPatientPage(button.dataset.patientPage),
    ),
  );
document
  .querySelectorAll("[data-language]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      setLanguage(button.dataset.language),
    ),
  );
document
  .querySelectorAll(".suggestions button")
  .forEach((button) =>
    button.addEventListener("click", () => respond(button.textContent)),
  );
document.getElementById("chatForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  if (input.value.trim()) {
    respond(input.value.trim());
    input.value = "";
  }
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("loginName").value.trim();
  const identity = document.getElementById("loginIdentity").value.trim();
  const error = document.getElementById("loginError");
  const demo = demoAccounts.find(
    (account) =>
      account.name.toLowerCase() === name.toLowerCase() &&
      account.id === identity.toUpperCase(),
  );
  if (!demo) {
    error.textContent =
      activeLanguage === "zh"
        ? "登入資料不正確。請使用下列其中一組示範帳戶。"
        : "The login details do not match. Use one of the demo accounts below.";
    return;
  }
  error.textContent = "";
  sessionStorage.setItem("pregnancy-companion-patient-name", demo.name);
  sessionStorage.setItem(ACCOUNT_KEY, demo.id);
  document.getElementById("loginIdentity").value = "";
  unlockApp(demo.name);
});

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("pregnancy-companion-patient-name");
  sessionStorage.removeItem(ACCOUNT_KEY);
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  location.reload();
});
document
  .getElementById("governanceForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formValues = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    const edcKey = accountStorageKey(EDC_KEY);
    const updatedKey = accountStorageKey(EDC_UPDATED_KEY);
    const previousEdc = currentEdcValue();
    const nextEdc = formValues.edc || previousEdc;
    delete formValues.edc;
    if (nextEdc !== previousEdc) {
      localStorage.setItem(edcKey, nextEdc);
      localStorage.setItem(updatedKey, new Date().toISOString());
    }
    content = { ...content, ...formValues };
    contentByLanguage[activeLanguage] = content;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contentByLanguage));
    applyContent();
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  });
document.getElementById("resetContent").addEventListener("click", () => {
  contentByLanguage[activeLanguage] = { ...defaults[activeLanguage] };
  content = contentByLanguage[activeLanguage];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contentByLanguage));
  localStorage.removeItem(accountStorageKey(EDC_KEY));
  localStorage.removeItem(accountStorageKey(EDC_UPDATED_KEY));
  populateEditor();
  applyContent();
});
document
  .getElementById("uploadDocument")
  .addEventListener("click", async () => {
    const title = document.getElementById("documentTitle").value.trim();
    const category = document.getElementById("documentCategory").value;
    const stage = document.getElementById("documentStage").value.trim();
    const keywords = document.getElementById("documentKeywords").value.trim();
    const file = document.getElementById("documentFile").files[0];
    const message = document.getElementById("uploadMessage");
    if (!title || !file || (file.type && file.type !== "application/pdf")) {
      message.textContent =
        activeLanguage === "zh"
          ? "請輸入文件標題並選擇 PDF 檔案。"
          : "Enter a document title and choose a PDF file.";
      return;
    }
    await saveDocument({
      id: crypto.randomUUID(),
      title,
      category,
      stage,
      keywords,
      language: activeLanguage,
      file,
      uploadedAt: new Date().toISOString(),
    });
    message.textContent =
      activeLanguage === "zh"
        ? "PDF 已上載並發布至病人流動版。"
        : "PDF uploaded and published to Patient Mobile.";
    [
      "documentTitle",
      "documentStage",
      "documentKeywords",
      "documentFile",
    ].forEach((id) => (document.getElementById(id).value = ""));
    await renderDocumentLibrary();
  });

captureTextNodes();
setLanguage(activeLanguage);
const signedInName = sessionStorage.getItem("pregnancy-companion-patient-name");
if (signedInName) unlockApp(signedInName);
else {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
}
renderDocumentLibrary().catch(() => {});
setInterval(() => updateHongKongGreeting(), 1000);
