const titles = {
  patient: ["PATIENT EXPERIENCE", "Good afternoon, Maya"],
  staff: ["MATERNITY TEAM · SYNTHETIC DATA", "Clinical review workspace"],
  content: ["ADMINISTRATION", "Content & pathway configuration"],
  governance: ["OPERATING MODEL", "Governance boundaries"]
};

document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".nav-item,.view").forEach(el => el.classList.remove("active"));
  button.classList.add("active");
  document.getElementById(button.dataset.view).classList.add("active");
  document.getElementById("viewEyebrow").textContent = titles[button.dataset.view][0];
  document.getElementById("viewTitle").textContent = titles[button.dataset.view][1];
}));

function openPatientTab(tab) {
  document.querySelector('[data-view="patient"]').click();
  document.querySelectorAll(".mobile-tabs button,.patient-panel").forEach(el => el.classList.remove("active"));
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
  document.getElementById(tab).classList.add("active");
}
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => openPatientTab(b.dataset.tab)));
document.querySelectorAll("[data-tab-link]").forEach(b => b.addEventListener("click", () => openPatientTab(b.dataset.tabLink)));

const modal = document.getElementById("urgentModal");
document.querySelectorAll('[data-modal="urgent"]').forEach(b => b.addEventListener("click", () => modal.showModal()));
document.querySelector(".modal-close").addEventListener("click", () => modal.close());

const approvedAnswers = {
  "What happens at 15 weeks?": "At 15 weeks, approved guidance describes rapid growth, developing facial movement and early hearing. Your next routine visit is at week 16. Development varies, and your maternity team can answer questions about your individual pregnancy.",
  "When is my morphology scan?": "Your morphology scan is booked for 10 August 2026, when you will be around 20 weeks. This detailed ultrasound is generally offered between 18 and 22 weeks.",
  "What blood tests are coming next?": "Your timeline shows blood tests and glucose screening between 24 and 28 weeks. The maternity team will confirm which tests apply to you and explain preparation.",
  "What should I prepare for my appointment?": "Bring your maternity record and write down questions. Your week-16 visit usually includes blood pressure, urine and wellbeing checks.",
  "Who can accompany me during labour?": "This prototype pathway allows one nominated adult, subject to registration, identification, health screening, capacity and the labour team's assessment. Open Family & labour for the full criteria and check the current hospital notice before admission.",
  "Can children visit the postnatal ward?": "Children's access can vary by ward and infection-control arrangements. In this prototype, families should contact the postnatal ward before bringing a child and check the latest service notice.",
  "What are the visiting hours for the antenatal ward?": "The fictional prototype hours are 2:00–8:00 PM, with two registered visitors at a time. Hospital arrangements can change, so confirm the current ward notice before travelling.",
  "Can I change my nominated accompanying person?": "Changes may be possible before admission. Contact the maternity service so registration and screening can be updated; approval remains subject to local policy and the clinical team's assessment.",
  "What documents should my accompanying person bring?": "The prototype guidance asks for registration confirmation and photo identification. The ward may request additional health-screening information, so check the latest admission instructions.",
  "Can my partner stay during an emergency procedure?": "Not always. Accompaniment can be restricted during emergency or operative care because clinical safety, privacy, space and infection control take priority. The treating team makes the final decision.",
  "What does my reviewed swab result mean?": "I can explain clinician-reviewed information, but I cannot independently interpret an unreviewed result. Your recorded factsheet explains that a positive Group B Streptococcus swab may affect care during labour. Please follow the plan provided by your maternity team."
};

function addMessage(text, type="user") {
  const el = document.createElement("div"); el.className = `message ${type}`;
  el.innerHTML = type === "bot" ? `<span>✦</span><div><p>${text}</p></div>` : `<div><p>${text}</p></div>`;
  document.getElementById("chatMessages").append(el); el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function respond(question, concern) {
  addMessage(question);
  setTimeout(() => {
    if (concern || /bleed|watery|discharge|pain|movement|fever|vomit|headache|vision/i.test(question)) {
      addMessage("This symptom needs contact with a healthcare provider. I cannot determine urgency or confirm that it is harmless. If you feel seriously unwell, use emergency services now. Otherwise, call maternity triage while I structure the concern for clinical review.", "bot");
      setTimeout(() => modal.showModal(), 500);
    } else addMessage(approvedAnswers[question] || "I can help with approved pregnancy information, appointments and investigations. I cannot diagnose or make clinical decisions. Please rephrase your question, or contact the maternity team if this is a health concern.", "bot");
  }, 300);
}
document.querySelectorAll(".suggestions button").forEach(b => b.addEventListener("click", () => respond(b.textContent, b.dataset.concern)));
document.querySelectorAll("[data-ask-link]").forEach(b => b.addEventListener("click", () => { openPatientTab("ask"); respond(b.dataset.askLink); }));
document.querySelectorAll("[data-family-detail]").forEach(b => b.addEventListener("click", () => toast(`${b.textContent} · latest fictional guidance displayed`)));
document.getElementById("chatForm").addEventListener("submit", e => { e.preventDefault(); const input = document.getElementById("chatInput"); if (input.value.trim()) { respond(input.value.trim()); input.value = ""; } });

document.querySelectorAll(".row-action").forEach(b => b.addEventListener("click", () => document.getElementById("reviewDrawer").classList.add("open")));
document.querySelector(".drawer-close").addEventListener("click", () => document.getElementById("reviewDrawer").classList.remove("open"));
document.getElementById("acknowledge").addEventListener("click", e => { e.target.textContent = "✓ Acknowledged · assigned to you"; e.target.disabled = true; toast("Concern acknowledged and audit trail updated"); });

function filterQueue() {
  const q = document.getElementById("queueSearch").value.toLowerCase(), filter = document.getElementById("queueFilter").value;
  document.querySelectorAll("#queueBody tr").forEach(row => row.hidden = !row.textContent.toLowerCase().includes(q) || (filter !== "All concerns" && !row.dataset.status.includes(filter)));
}
document.getElementById("queueSearch").addEventListener("input", filterQueue); document.getElementById("queueFilter").addEventListener("change", filterQueue);
function toast(message) { const el = document.getElementById("toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 2400); }
document.getElementById("newContent").addEventListener("click", () => toast("Draft content item created · approval required before publishing"));
