"use strict";

// ════════════════════════════════════════════════════
// ⚠️  REPLACE THIS with your Render backend URL
// ════════════════════════════════════════════════════
const BASE_URL = "https://YOUR-RENDER-BACKEND-URL.onrender.com";

// ── KCSE SUBJECTS ────────────────────────────────────
const KCSE_SUBJECTS = [
  { id: "eng",   name: "English",           cluster: true },
  { id: "kis",   name: "Kiswahili",         cluster: true },
  { id: "math",  name: "Mathematics",       cluster: true },
  { id: "bio",   name: "Biology",           cluster: true },
  { id: "chem",  name: "Chemistry",         cluster: true },
  { id: "phy",   name: "Physics",           cluster: true },
  { id: "hist",  name: "History & Govt",    cluster: false },
  { id: "geo",   name: "Geography",         cluster: false },
  { id: "cre",   name: "C.R.E",            cluster: false },
  { id: "ire",   name: "I.R.E",            cluster: false },
  { id: "bst",   name: "Business Studies", cluster: false },
  { id: "agri",  name: "Agriculture",       cluster: true },
  { id: "cs",    name: "Computer Studies",  cluster: false },
  { id: "art",   name: "Art & Design",      cluster: false },
];

const GRADES = ["A","A-","B+","B","B-","C+","C","C-","D+","D","D-","E"];

const GRADE_POINTS = {
  "A":12,"A-":11,"B+":10,"B":9,"B-":8,
  "C+":7,"C":6,"C-":5,"D+":4,"D":3,"D-":2,"E":1,
};

// ── COURSES DATABASE ──────────────────────────────────
const COURSES_DB = {
  degree: [
    { name:"Bachelor of Medicine & Surgery (MBChB)", field:"Medicine & Health", subjects:["bio","chem","phy","math"] },
    { name:"Bachelor of Pharmacy", field:"Medicine & Health", subjects:["bio","chem","math"] },
    { name:"Bachelor of Science in Nursing", field:"Medicine & Health", subjects:["bio","chem","math"] },
    { name:"Bachelor of Engineering (Civil)", field:"Engineering", subjects:["math","phy","chem"] },
    { name:"Bachelor of Engineering (Electrical)", field:"Engineering", subjects:["math","phy"] },
    { name:"Bachelor of Engineering (Mechanical)", field:"Engineering", subjects:["math","phy"] },
    { name:"Bachelor of Science in Computer Science", field:"ICT", subjects:["math","phy","cs"] },
    { name:"Bachelor of Information Technology", field:"ICT", subjects:["math","cs"] },
    { name:"Bachelor of Laws (LLB)", field:"Law & Social Sciences", subjects:["eng","hist"] },
    { name:"Bachelor of Commerce", field:"Business", subjects:["math","bst","eng"] },
    { name:"Bachelor of Business Administration", field:"Business", subjects:["math","bst"] },
    { name:"Bachelor of Economics", field:"Business", subjects:["math","bst","geo"] },
    { name:"Bachelor of Education (Arts)", field:"Education", subjects:["eng","hist","geo","kis"] },
    { name:"Bachelor of Education (Science)", field:"Education", subjects:["math","bio","chem","phy"] },
    { name:"Bachelor of Science in Agriculture", field:"Agriculture", subjects:["bio","chem","agri"] },
    { name:"Bachelor of Architecture", field:"Engineering", subjects:["math","phy","art"] },
    { name:"Bachelor of Finance", field:"Business", subjects:["math","bst"] },
    { name:"Bachelor of Journalism & Mass Communication", field:"Media & Arts", subjects:["eng","kis"] },
    { name:"Bachelor of Social Work", field:"Social Sciences", subjects:["hist","cre"] },
    { name:"Bachelor of Actuarial Science", field:"Business", subjects:["math"] },
  ],
  diploma: [
    { name:"Diploma in Clinical Medicine", field:"Medicine & Health", subjects:["bio","chem"] },
    { name:"Diploma in Pharmacy", field:"Medicine & Health", subjects:["bio","chem"] },
    { name:"Diploma in Nursing", field:"Medicine & Health", subjects:["bio","chem"] },
    { name:"Diploma in ICT", field:"ICT", subjects:["math","cs"] },
    { name:"Diploma in Business Management", field:"Business", subjects:["math","bst"] },
    { name:"Diploma in Accounting", field:"Business", subjects:["math","bst"] },
    { name:"Diploma in Electrical Engineering", field:"Engineering", subjects:["math","phy"] },
    { name:"Diploma in Civil Engineering", field:"Engineering", subjects:["math","phy"] },
    { name:"Diploma in Agriculture", field:"Agriculture", subjects:["bio","agri"] },
    { name:"Diploma in Education", field:"Education", subjects:["eng"] },
    { name:"Diploma in Social Work & Community Dev", field:"Social Sciences", subjects:["hist"] },
    { name:"Diploma in Mass Communication", field:"Media & Arts", subjects:["eng","kis"] },
    { name:"Diploma in Supply Chain Management", field:"Business", subjects:["math","bst"] },
    { name:"Diploma in Hospitality Management", field:"Hospitality", subjects:["eng"] },
    { name:"Diploma in Fashion & Design", field:"Arts", subjects:["art"] },
  ],
  certificate: [
    { name:"Certificate in ICT", field:"ICT", subjects:["math","cs"] },
    { name:"Certificate in Business Management", field:"Business", subjects:["math","bst"] },
    { name:"Certificate in Catering & Hospitality", field:"Hospitality", subjects:["eng"] },
    { name:"Certificate in Electrical Installation", field:"Engineering", subjects:["math","phy"] },
    { name:"Certificate in Agriculture", field:"Agriculture", subjects:["bio","agri"] },
    { name:"Certificate in Hair Dressing & Cosmetology", field:"Arts", subjects:["art"] },
    { name:"Certificate in Motor Vehicle Mechanics", field:"Engineering", subjects:["math","phy"] },
    { name:"Certificate in Plumbing", field:"Engineering", subjects:["math","phy"] },
    { name:"Certificate in Social Work", field:"Social Sciences", subjects:["hist","cre"] },
    { name:"Certificate in Early Childhood Education", field:"Education", subjects:["eng","kis"] },
    { name:"Certificate in Records Management", field:"Business", subjects:["eng","bst"] },
    { name:"Certificate in Journalism", field:"Media & Arts", subjects:["eng","kis"] },
  ],
};

// ── CAREER TEST DATA ──────────────────────────────────
const INTERESTS = [
  { id:"science",     icon:"🔬", name:"Science & Research" },
  { id:"tech",        icon:"💻", name:"Technology & IT" },
  { id:"business",    icon:"📊", name:"Business & Finance" },
  { id:"arts",        icon:"🎨", name:"Arts & Creativity" },
  { id:"medicine",    icon:"🏥", name:"Medicine & Health" },
  { id:"law",         icon:"⚖️",  name:"Law & Governance" },
  { id:"education",   icon:"📚", name:"Teaching & Education" },
  { id:"agriculture", icon:"🌱", name:"Agriculture & Envt" },
  { id:"engineering", icon:"⚙️",  name:"Engineering & Build" },
  { id:"media",       icon:"📡", name:"Media & Journalism" },
  { id:"tourism",     icon:"✈️",  name:"Tourism & Hospitality" },
  { id:"social",      icon:"🤝", name:"Social Work & NGO" },
];

const CAREER_PATHS = {
  science:     { title:"Sciences & Research",         description:"Your love for discovery fits careers in research, pharmaceuticals, and laboratory sciences.", courses:["BSc Chemistry","BSc Physics","BSc Microbiology","Pharmacy","Medical Lab Science"] },
  tech:        { title:"Technology & Software",        description:"You're wired for the digital world — from apps and AI to networks and cybersecurity.",           courses:["BSc Computer Science","Software Engineering","IT","Cybersecurity","Data Science"] },
  business:    { title:"Business & Entrepreneurship",  description:"You have an eye for numbers and strategy — perfect for finance, management, and commerce.",      courses:["BCom","BBA","Actuarial Science","Economics","Finance & Banking"] },
  arts:        { title:"Creative Arts & Design",       description:"Your creativity can be a career — in design, media production, fine arts and more.",             courses:["Architecture","Fine Arts","Graphic Design","Fashion Design","Interior Design"] },
  medicine:    { title:"Healthcare & Medicine",        description:"Caring for others is your calling — explore paths in medicine, nursing, and therapy.",            courses:["MBChB","BSc Nursing","Pharmacy","Clinical Medicine","Physiotherapy"] },
  law:         { title:"Law & Public Administration",  description:"Your sense of justice points to careers in law, governance and human rights.",                   courses:["LLB Law","Public Administration","Political Science","Criminology","Paralegal"] },
  education:   { title:"Education & Training",         description:"Shaping minds is powerful — pursue teaching, curriculum development, or training.",               courses:["BEd Arts","BEd Science","Early Childhood Education","Special Education","Training & Dev"] },
  agriculture: { title:"Agriculture & Environment",    description:"Feed the nation and protect the planet through agri-business and environmental science.",         courses:["BSc Agriculture","Agribusiness Mgmt","Food Science","Environmental Science","Horticulture"] },
  engineering: { title:"Engineering & Construction",   description:"Build Kenya's infrastructure with skills in civil, electrical and mechanical engineering.",       courses:["Civil Engineering","Electrical Engineering","Mechanical Engineering","Architecture","QS"] },
  media:       { title:"Media & Communications",       description:"Tell stories, shape opinion, and inform the world through journalism and broadcasting.",          courses:["Journalism","Mass Communication","PR","Film & TV Production","Digital Marketing"] },
  tourism:     { title:"Tourism & Hospitality",        description:"Kenya's tourism sector offers vibrant careers in hotels, travel, and event management.",          courses:["Tourism Management","Hospitality Management","Culinary Arts","Hotel Mgmt","Travel & Tours"] },
  social:      { title:"Social Work & Community Dev",  description:"Transform communities through social work, counselling, and development work.",                  courses:["Social Work","Community Development","Psychology","Counselling","Gender & Development"] },
};

// ── INSTITUTIONS ──────────────────────────────────────
const PUBLIC_UNIVERSITIES = [
  { name:"University of Nairobi", county:"Nairobi" },
  { name:"Kenyatta University", county:"Nairobi" },
  { name:"Moi University", county:"Uasin Gishu" },
  { name:"Egerton University", county:"Nakuru" },
  { name:"Jomo Kenyatta University of Agriculture and Technology (JKUAT)", county:"Kiambu" },
  { name:"Maseno University", county:"Kisumu" },
  { name:"Masinde Muliro University of Science and Technology", county:"Kakamega" },
  { name:"Dedan Kimathi University of Technology", county:"Nyeri" },
  { name:"Kisii University", county:"Kisii" },
  { name:"South Eastern Kenya University (SEKU)", county:"Kitui" },
  { name:"Karatina University", county:"Nyeri" },
  { name:"Laikipia University", county:"Laikipia" },
  { name:"Murang'a University of Technology", county:"Murang'a" },
  { name:"Kirinyaga University", county:"Kirinyaga" },
  { name:"Machakos University", county:"Machakos" },
  { name:"Pwani University", county:"Kilifi" },
  { name:"Embu University", county:"Embu" },
  { name:"Chuka University", county:"Tharaka-Nithi" },
  { name:"Rongo University", county:"Migori" },
  { name:"Kibabii University", county:"Bungoma" },
  { name:"Bomet University College", county:"Bomet" },
  { name:"Garissa University", county:"Garissa" },
  { name:"Meru University of Science and Technology (MUST)", county:"Meru" },
  { name:"University of Eldoret", county:"Uasin Gishu" },
  { name:"Tom Mboya University", county:"Homa Bay" },
  { name:"Technical University of Kenya (TUK)", county:"Nairobi" },
  { name:"Technical University of Mombasa (TUM)", county:"Mombasa" },
  { name:"Cooperative University of Kenya (CUK)", county:"Nairobi" },
  { name:"Kenya Maritime University", county:"Mombasa" },
  { name:"Jaramogi Oginga Odinga University (JOOUST)", county:"Siaya" },
];

const PRIVATE_UNIVERSITIES = [
  { name:"Strathmore University", county:"Nairobi" },
  { name:"United States International University Africa (USIU-A)", county:"Nairobi" },
  { name:"Catholic University of Eastern Africa (CUEA)", county:"Nairobi" },
  { name:"Africa International University (AIU)", county:"Nairobi" },
  { name:"Daystar University", county:"Nairobi" },
  { name:"Scott Christian University", county:"Machakos" },
  { name:"Kenya Methodist University (KeMU)", county:"Meru" },
  { name:"Adventist University of Africa (AUA)", county:"Nairobi" },
  { name:"Mount Kenya University (MKU)", county:"Kirinyaga" },
  { name:"Kabarak University", county:"Nakuru" },
  { name:"Pan Africa Christian University (PAC)", county:"Nairobi" },
  { name:"African Nazarene University (ANU)", county:"Kajiado" },
  { name:"Aga Khan University", county:"Nairobi" },
  { name:"Zetech University", county:"Nairobi" },
  { name:"Management University of Africa (MUA)", county:"Nairobi" },
  { name:"KCA University", county:"Nairobi" },
  { name:"Multi-Media University of Kenya (MMU)", county:"Nairobi" },
  { name:"East Africa University", county:"Mandera" },
  { name:"Gretsa University", county:"Nairobi" },
  { name:"Pioneer International University", county:"Nairobi" },
  { name:"Riara University", county:"Nairobi" },
  { name:"St. Paul's University", county:"Kiambu" },
  { name:"University of Eastern Africa, Baraton", county:"Uasin Gishu" },
];

// ── GALLERY ───────────────────────────────────────────
const GALLERY_ITEMS = [
  { label:"Student Counselling Session", color:"#1a6b3c" },
  { label:"KUCCPS Application Drive", color:"#0d9488" },
  { label:"University Open Day 2023", color:"#0f2d4a" },
  { label:"Career Fair — Nairobi", color:"#e8b84b" },
  { label:"HELB Workshop", color:"#1a6b3c" },
  { label:"Student Graduation Celebration", color:"#0d9488" },
  { label:"Online Guidance Webinar", color:"#7c3aed" },
  { label:"County Outreach Programme", color:"#b45309" },
  { label:"Cluster Points Training", color:"#0f2d4a" },
];

// ── STATE ─────────────────────────────────────────────
let currentTab = "public";
let paymentInProgress = false;
let selectedInterests = new Set();

// ── INIT ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderSubjectGrid();
  renderInterestGrid();
  renderInstitutions("public");
  renderGallery();
  initHamburger();
});

// ── NAVBAR ────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// ── SUBJECT GRID ──────────────────────────────────────
function renderSubjectGrid() {
  const grid = document.getElementById("subjectGrid");
  grid.innerHTML = KCSE_SUBJECTS.map(s => `
    <div class="subject-row">
      <input type="checkbox" class="subject-checkbox" id="sub-${s.id}" value="${s.id}" onchange="toggleGrade('${s.id}', this.checked)" />
      <label for="sub-${s.id}" class="subject-name">${s.name}</label>
      <select class="grade-select" id="grade-${s.id}" disabled>
        <option value="">Grade</option>
        ${GRADES.map(g => `<option value="${g}">${g}</option>`).join("")}
      </select>
    </div>
  `).join("");
}

function toggleGrade(id, checked) {
  document.getElementById(`grade-${id}`).disabled = !checked;
}

// ── COURSE FINDER FLOW ────────────────────────────────
function goToPayment() {
  const subjects = getSelectedSubjects();
  if (subjects.length < 7)  return showToast("⚠️ Select at least 7 subjects.");
  if (subjects.length > 8)  return showToast("⚠️ Maximum 8 subjects allowed.");
  if (subjects.some(s => !s.grade)) return showToast("⚠️ Enter a grade for every selected subject.");
  if (!document.getElementById("meanGrade").value) return showToast("⚠️ Select your KCSE Mean Grade.");
  showStep(2);
}

function backToStep1() { clearPaymentStatus(); showStep(1); }

function resetFinder() {
  clearPaymentStatus();
  paymentInProgress = false;
  showStep(1);
}

function showStep(n) {
  [1,2,3].forEach(i => document.getElementById(`step${i}`).classList.toggle("hidden", i !== n));
}

// ── PAYMENT ───────────────────────────────────────────
async function initiatePayment() {
  if (paymentInProgress) return;

  const raw   = document.getElementById("phoneInput").value.trim();
  const phone = "254" + raw.replace(/^0/, "");

  if (!/^254[17]\d{8}$/.test(phone)) {
    return showPaymentStatus("error", "❌ Invalid number. Use format 07XXXXXXXX or 01XXXXXXXX.");
  }

  paymentInProgress = true;
  setPayLoading(true);
  clearPaymentStatus();

  try {
    showPaymentStatus("info", "⏳ Sending STK Push to your phone…");

    const res  = await fetch(`${BASE_URL}/stk-push`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ phone, amount: 50 }),
    });
    const data = await res.json();

    if (!res.ok || !data.success) throw new Error(data.message || "Payment failed.");

    showPaymentStatus("info", "📲 STK Push sent! Enter your M-Pesa PIN on your phone now.");

    // Wait 30 seconds for PIN entry then unlock
    await delay(30000);
    showPaymentStatus("success", "✅ Payment confirmed! Loading your results…");
    await delay(1500);
    unlockResults();

  } catch (err) {
    showPaymentStatus("error", `❌ ${err.message}`);
    paymentInProgress = false;
    setPayLoading(false);
  }
}

function unlockResults() {
  const subjects   = getSelectedSubjects();
  const meanGrade  = document.getElementById("meanGrade").value;
  const cluster    = calculateClusterPoints(subjects);
  const courses    = recommendCourses(meanGrade, subjects);
  renderResults(cluster, courses);
  showStep(3);
  setPayLoading(false);
  paymentInProgress = false;
}

// ── CLUSTER POINTS ────────────────────────────────────
// Formula: √(r/R) × (t/T) × 48
function calculateClusterPoints(subjects) {
  const pts    = subjects.map(s => ({ id: s.id, pts: GRADE_POINTS[s.grade] || 0 }));
  const total7 = pts.reduce((sum, s) => sum + s.pts, 0);

  const clusterSubjs = pts
    .filter(s => KCSE_SUBJECTS.find(k => k.id === s.id && k.cluster))
    .sort((a, b) => b.pts - a.pts);

  const top4       = clusterSubjs.slice(0, 4);
  const clusterSum = top4.reduce((sum, s) => sum + s.pts, 0);
  const score      = Math.sqrt(clusterSum / 48) * (total7 / 84) * 48;

  return {
    score:       Math.round(score * 100) / 100,
    clusterSum,
    total7,
    top4Subjects: top4.map(s => ({
      name: KCSE_SUBJECTS.find(k => k.id === s.id)?.name || s.id,
      pts:  s.pts,
    })),
  };
}

// ── COURSE RECOMMENDER ────────────────────────────────
function recommendCourses(meanGrade, subjects) {
  const ids   = new Set(subjects.map(s => s.id));
  const level = ["A","A-","B+","B","B-","C+"].includes(meanGrade) ? "degree"
              : ["C","C-","D+"].includes(meanGrade)               ? "diploma"
              :                                                      "certificate";

  let results = COURSES_DB[level]
    .map(c => ({ ...c, level, score: c.subjects.filter(s => ids.has(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // Pad to 10 if short
  if (results.length < 10 && level === "degree") {
    const extra = COURSES_DB.diploma.slice(0, 10 - results.length).map(c => ({ ...c, level:"diploma" }));
    results = [...results, ...extra];
  }
  return results;
}

// ── RENDER RESULTS ────────────────────────────────────
function renderResults(cluster, courses) {
  document.getElementById("clusterPoints").innerHTML = `
    <div class="cluster-display">
      <span class="cluster-score">${cluster.score}</span>
      <div class="cluster-label">Cluster Points (out of 48)</div>
      <div class="cluster-breakdown">
        <span>📊 7-subject total: ${cluster.total7}/84</span>
        <span>•</span>
        <span>🎯 Top 4 cluster sum: ${cluster.clusterSum}/48</span>
        <span>•</span>
        <span>📚 ${cluster.top4Subjects.map(s => `${s.name}(${s.pts})`).join(", ")}</span>
      </div>
    </div>
  `;

  document.getElementById("courseResults").innerHTML = `
    <h4 style="font-family:var(--font-head);margin:1rem 0 1rem;font-size:1.1rem;">📚 Recommended Courses (${courses.length})</h4>
    <div class="course-results">
      ${courses.map(c => `
        <div class="course-chip">
          <h5>${c.name}</h5>
          <span>${c.field}</span>
          <div class="level-badge level-${c.level}">${c.level.charAt(0).toUpperCase()+c.level.slice(1)}</div>
        </div>
      `).join("")}
    </div>
  `;
}

// ── CAREER TEST ───────────────────────────────────────
function renderInterestGrid() {
  document.getElementById("interestGrid").innerHTML = INTERESTS.map(i => `
    <div class="interest-chip" data-id="${i.id}" onclick="toggleInterest(this,'${i.id}')">
      <div class="interest-icon">${i.icon}</div>
      <div class="interest-name">${i.name}</div>
    </div>
  `).join("");
}

function toggleInterest(el, id) {
  if (selectedInterests.has(id)) { selectedInterests.delete(id); el.classList.remove("selected"); }
  else                           { selectedInterests.add(id);    el.classList.add("selected"); }
}

function runCareerTest() {
  if (!selectedInterests.size) return showToast("⚠️ Select at least one interest.");
  const matches = [...selectedInterests].map(id => CAREER_PATHS[id]).filter(Boolean);
  document.getElementById("careerMatchList").innerHTML = matches.map(r => `
    <div class="career-match">
      <h4>${r.title}</h4>
      <p>${r.description}</p>
      <div class="career-courses">${r.courses.map(c => `<span class="course-tag">${c}</span>`).join("")}</div>
    </div>
  `).join("");
  const el = document.getElementById("careerResults");
  el.classList.remove("hidden");
  el.scrollIntoView({ behavior:"smooth", block:"start" });
}

// ── INSTITUTIONS ──────────────────────────────────────
function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab-btn").forEach((btn, i) =>
    btn.classList.toggle("active", (i===0 && tab==="public")||(i===1 && tab==="private"))
  );
  document.getElementById("institutionSearch").value = "";
  renderInstitutions(tab);
}

function renderInstitutions(tab, filter="") {
  const data     = tab==="public" ? PUBLIC_UNIVERSITIES : PRIVATE_UNIVERSITIES;
  const filtered = filter ? data.filter(u => u.name.toLowerCase().includes(filter)||u.county.toLowerCase().includes(filter)) : data;
  const grid     = document.getElementById("institutionGrid");

  if (!filtered.length) {
    grid.innerHTML = `<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:2rem">No results for "${filter}".</p>`;
    return;
  }
  grid.innerHTML = filtered.map((u,i) => `
    <div class="institution-card ${tab==="private"?"private":""}" style="animation:fadeInUp 0.4s ease ${i*0.03}s both">
      <h4>${u.name}</h4>
      <span class="county">📍 ${u.county} County</span>
    </div>
  `).join("");
}

function filterInstitutions() {
  renderInstitutions(currentTab, document.getElementById("institutionSearch").value.toLowerCase().trim());
}

// ── GALLERY ───────────────────────────────────────────
function renderGallery() {
  document.getElementById("mediaGrid").innerHTML = GALLERY_ITEMS.map((item,i) => `
    <div class="media-item" style="animation:fadeInUp 0.5s ease ${i*0.07}s both">
      <div style="width:100%;height:100%;background:linear-gradient(135deg,${item.color}cc,${item.color}44);display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;color:white;padding:1.5rem;">
          <div style="font-size:3rem;margin-bottom:0.75rem">📸</div>
          <div style="font-weight:700;font-size:0.95rem;text-shadow:0 2px 8px rgba(0,0,0,0.4)">${item.label}</div>
          <div style="font-size:0.75rem;opacity:0.7;margin-top:0.4rem">Photo placeholder</div>
        </div>
      </div>
      <div class="media-overlay">${item.label}</div>
    </div>
  `).join("");
}

// ── HELPERS ───────────────────────────────────────────
function getSelectedSubjects() {
  return KCSE_SUBJECTS
    .filter(s => document.getElementById(`sub-${s.id}`)?.checked)
    .map(s => ({ id:s.id, name:s.name, grade: document.getElementById(`grade-${s.id}`)?.value||"" }));
}

function showPaymentStatus(type, msg) {
  const el = document.getElementById("paymentStatus");
  el.className = `payment-status ${type}`;
  el.textContent = msg;
  el.classList.remove("hidden");
}

function clearPaymentStatus() {
  const el = document.getElementById("paymentStatus");
  el.classList.add("hidden");
  el.textContent = "";
}

function setPayLoading(on) {
  document.getElementById("payBtn").disabled = on;
  document.getElementById("payBtnText").textContent = on ? "Processing…" : "Pay KES 50 via M-Pesa";
  document.getElementById("payBtnSpinner").classList.toggle("hidden", !on);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function showToast(msg, ms=3500) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), ms);
}