import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { GridIcon, InboxIcon, CompassIcon, ChartIcon, GearIcon } from "./components/icons.jsx";
import Overview from "./pages/Overview.jsx";
import Live from "./pages/Live.jsx";
import QueueList from "./pages/QueueList.jsx";
import QueueDetail from "./pages/QueueDetail.jsx";
import Governance from "./pages/Governance.jsx";
import Lifecycle from "./pages/Lifecycle.jsx";
import Fairness from "./pages/Fairness.jsx";
import Appeal from "./pages/Appeal.jsx";
import Profile from "./pages/Profile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import { OFFICERS, PROVINCES } from "./data/constants.js";
import { exportDecisionPdf } from "./pdf.js";

const ROLE = "Investigator";

const TITLES = {
  overview: "Operations Overview",
  live: "Live Monitoring",
  governance: "AI Governance Overview",
  lifecycle: "AI Lifecycle",
  fairness: "Fairness Review",
  appeal: "Internal Evidence Review",
  profile: "โปรไฟล์ผู้ใช้งาน",
  analytics: "Analytics",
  reports: "Reports",
  settings: "Settings",
};

const fmtClock = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const seededRand = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const MAP_ROADS = [
  { x1: 280, y1: 120, x2: 330, y2: 220 },
  { x1: 330, y1: 220, x2: 340, y2: 420 },
  { x1: 340, y1: 420, x2: 400, y2: 460 },
  { x1: 400, y1: 460, x2: 480, y2: 520 },
  { x1: 480, y1: 520, x2: 500, y2: 560 },
  { x1: 340, y1: 420, x2: 450, y2: 380 },
  { x1: 450, y1: 380, x2: 520, y2: 280 },
  { x1: 520, y1: 280, x2: 600, y2: 340 },
  { x1: 340, y1: 420, x2: 120, y2: 600 },
  { x1: 120, y1: 600, x2: 200, y2: 820 },
  { x1: 200, y1: 820, x2: 160, y2: 1000 },
  { x1: 330, y1: 220, x2: 520, y2: 280 },
  { x1: 450, y1: 380, x2: 600, y2: 340 },
  { x1: 400, y1: 460, x2: 120, y2: 600 },
];

const MAP_STATIONS = [
  { x: 340, y: 420, color: "#B5301E", label: "สระบุรี" },
  { x: 400, y: 460, color: "#9A6400", label: "บางปะอิน" },
  { x: 480, y: 520, color: "#1E7A3C", label: "ศรีราชา" },
  { x: 450, y: 380, color: "#1E7A3C", label: "นครราชสีมา" },
  { x: 500, y: 560, color: "#1E7A3C", label: "ชลบุรี" },
  { x: 200, y: 820, color: "#1E7A3C", label: "สุราษฎร์ธานี" },
  { x: 280, y: 120, color: "#1E7A3C", label: "เชียงใหม่" },
  { x: 520, y: 280, color: "#1E7A3C", label: "ขอนแก่น" },
  { x: 160, y: 1000, color: "#1E7A3C", label: "สงขลา" },
  { x: 330, y: 220, color: "#1E7A3C", label: "พิษณุโลก" },
  { x: 600, y: 340, color: "#1E7A3C", label: "อุบลราชธานี" },
  { x: 120, y: 600, color: "#1E7A3C", label: "ระนอง" },
];

const CAM_DEFS = [
  { id: "cam1", name: "กล้องขาเข้า สระบุรี", speed: 22 },
  { id: "cam2", name: "กล้อง WIM บางปะอิน", speed: 15 },
  { id: "cam3", name: "กล้องขาออก ศรีราชา", speed: 30 },
  { id: "cam4", name: "กล้องขาเข้า นครราชสีมา", speed: 18 },
  { id: "cam5", name: "กล้องขาออก ชลบุรี", speed: 26 },
  { id: "cam6", name: "กล้อง WIM สุราษฎร์ธานี", speed: 12 },
  { id: "cam7", name: "กล้องขาเข้า เชียงใหม่", speed: 20 },
  { id: "cam8", name: "กล้องขาออก ขอนแก่น", speed: 24 },
  { id: "cam9", name: "กล้อง WIM สงขลา", speed: 16 },
  { id: "cam10", name: "กล้องขาเข้า พิษณุโลก", speed: 19 },
];

const STATION_PROVINCE = {
  "ด่านสระบุรี ขาเข้า": "สระบุรี",
  "ด่านบางปะอิน": "พระนครศรีอยุธยา",
  "ด่านศรีราชา": "ชลบุรี",
  "ด่านสระบุรี ขาออก": "สระบุรี",
  "ด่านนครราชสีมา": "นครราชสีมา",
};

const SLA_BASE = { "LL-0447": 312, "LL-0446": 1360, "LL-0445": 118, "LL-0444": 3250 };

const PRIORITY_COLORS = { Critical: "#B5301E", Medium: "#9A6400", Normal: "#1E7A3C" };
const PRIORITY_RADII = { Critical: "50%", Medium: "50%", Normal: "2px" };

const DISPOSITION_DEFS = [
  { key: "proceed", label: "Proceed" },
  { key: "false_alarm", label: "Case Disposition: False Alarm" },
  { key: "citation", label: "Issue Citation" },
  { key: "escalate", label: "Escalate" },
];

const TIMELINE = [
  { label: "รถเข้าสู่จุดชั่งน้ำหนัก (WIM)", time: "07:42:08", color: "#1E4FD6", radius: "2px" },
  { label: "บันทึกน้ำหนักเพลา + OCR ป้ายทะเบียน", time: "07:42:09", color: "#1E4FD6", radius: "2px" },
  { label: "ระบบตรวจพบ Anomaly Pattern", time: "07:42:11", color: "#8A5CD6", radius: "50%" },
  { label: "จัดเป็น Case Candidate — Critical", time: "07:42:12", color: "#8A5CD6", radius: "50%" },
  { label: "รอมอบหมายเจ้าหน้าที่", time: "07:42:15", color: "#12151C", radius: "2px" },
];

const FACTORS = [
  { label: "น้ำหนักเกินเกณฑ์เพลาที่ 2", desc: "สูงกว่าค่าเฉลี่ยรุ่นรถ 34%" },
  { label: "ความเร็วผ่านจุดชั่งผิดปกติ", desc: "ต่ำกว่าปกติ 3 เท่า — เข้าข่ายพยายามเลี่ยง" },
  { label: "ป้ายทะเบียนซ้ำ 4 ครั้ง/วัน", desc: "ผ่านด่านเดียวกันถี่กว่าค่าปกติ" },
];

const NETWORK_FACTS = [
  "ทะเบียนนี้ผ่านด่านสระบุรี 37 ครั้งใน 90 วัน",
  "จดทะเบียนภายใต้ บ.ขนส่ง จำกัด",
  "ผ่านด่านบางปะอินเมื่อ 3 วันก่อน เวลา 06:12",
];

const NETWORK_INFERENCES = [
  { label: "รูปแบบน้ำหนักคล้ายกับ Case Candidate อีก 2 เคสของบริษัทเดียวกัน", score: "ใกล้เคียงสูง" },
  { label: "ช่วงเวลาผ่านด่านผิดปกติเมื่อเทียบกับสถิติปกติของรถประเภทนี้", score: "ปานกลาง" },
  { label: "ทะเบียนนี้เคยเกี่ยวข้องกับ Case Candidate ที่ถูกยกเลิก 1 ครั้ง", score: "ต่ำ" },
];

const AUDIT_LOG = [
  { who: "อ.วิชัย", what: "ข้อมูลเจ้าของรถของเคสนี้", when: "2 นาทีที่แล้ว" },
  { who: "นายวรากร (Auditor)", what: "Audit Log ของเคสนี้", when: "1 ชม.ที่แล้ว" },
];

const INITIAL_AUDIT_TRAIL = [
  { who: "อ.วิชัย", action: "ยืนยันคำตัดสิน Issue Citation — เคส LL-0431", when: "30/07/2569 14:12" },
  { who: "นายวรากร", action: "ปิดเรื่องอุทธรณ์ — เคส LL-0398 (ยืนตามคำตัดสินเดิม)", when: "29/07/2569 09:40" },
  { who: "อ.มานะ", action: "เปิดดูข้อมูลเจ้าของรถ — เคส LL-0446", when: "29/07/2569 08:15" },
];

const CASE_TAB_DEFS = [
  { id: "investigation", label: "Investigation" },
  { id: "network", label: "Evidence Network" },
  { id: "decision", label: "Decision" },
  { id: "integrity", label: "Integrity & Access" },
];

const GOV_KPI_DEFS = {
  "Overall Accuracy": "สัดส่วน Case Candidate ที่ระบบจัดประเภทตรงกับผลตัดสินใจสุดท้ายของเจ้าหน้าที่",
  "False Positive Rate": "สัดส่วน Case Candidate ที่ระบบแจ้งเตือนแต่เจ้าหน้าที่ตัดสินเป็น False Alarm",
  "Officer Override Rate": "สัดส่วนที่เจ้าหน้าที่ตัดสินใจต่างจากที่ Review Priority ของระบบชี้แนะ",
  "Evidence Integrity Rate": "สัดส่วนหลักฐานที่ผ่านการยืนยัน hash ว่าไม่ถูกแก้ไข",
};
const GOV_KPI_VALUES = [
  { label: "Overall Accuracy", value: "94.1%" },
  { label: "False Positive Rate", value: "3.8%" },
  { label: "Officer Override Rate", value: "11.2%" },
  { label: "Evidence Integrity Rate", value: "99.98%" },
];

const LIFECYCLE_DETAILS = [
  "เทรนโมเดลด้วยข้อมูล 90 วันล่าสุด ผ่าน validation set แล้ว",
  "รันคู่ขนานกับ production โดยไม่ส่งผลต่อผู้ใช้จริง เพื่อเทียบผลลัพธ์ 14 วัน",
  "ปล่อยให้ทำงานจริง 5% ของ traffic เพื่อสังเกตผลก่อนขยาย",
  "ทำงานเต็มรูปแบบ (v2.2.0) กับ traffic ที่เหลือ",
];
const LIFECYCLE_DEFS = [
  { label: "Train", sub: "v2.3.1", bg: "#E7E9EC", fg: "#5B6472" },
  { label: "Shadow", sub: "เสร็จสิ้น", bg: "#E7E9EC", fg: "#5B6472" },
  { label: "Canary", sub: "5% traffic", bg: "#FEF1DC", fg: "#9A6400" },
  { label: "Production", sub: "v2.2.0", bg: "#E4F3E7", fg: "#1E7A3C" },
];
const RELEASE_NOTES = [
  "ปรับ threshold anomaly ลดค่า False Positive 1.2%",
  "เพิ่มปัจจัยความเร็วผ่านจุดชั่งใน Evidence Explanation",
  "แก้ไข OCR รองรับป้ายทะเบียนแบบใหม่",
];

const APPEAL_STEP_LABELS = ["ยื่นอุทธรณ์", "มอบหมายผู้ทบทวน", "ทบทวนหลักฐาน", "มีคำวินิจฉัย", "ปิดเรื่อง"];
const APPEAL_CASES = [
  { id: "LL-0431", station: "ด่านสระบุรี ขาเข้า", originalOfficer: "อ.วิชัย", disposition: "Issue Citation", reason: "เจ้าของรถอ้างว่าเครื่องชั่งคลาดเคลื่อน", filedAt: "2 วันที่แล้ว" },
  { id: "LL-0398", station: "ด่านศรีราชา", originalOfficer: "อ.มานะ", disposition: "Issue Citation", reason: "บริษัทขนส่งยื่นเอกสารซ่อมบำรุงโต้แย้งน้ำหนักบรรทุก", filedAt: "5 วันที่แล้ว" },
];
const REVIEWER_NAME = "นายวรากร";

function mkCase(id, station, priority, time, openCase, switchCase) {
  return {
    id,
    station,
    priority,
    time,
    priorityColor: PRIORITY_COLORS[priority],
    priorityRadius: PRIORITY_RADII[priority],
    open: () => openCase(id),
    select: () => switchCase(id),
  };
}

const initialState = {
  page: "overview",
  queueView: "list",
  caseTab: "investigation",
  selectedCaseId: null,
  decisionConfirmed: false,
  showCaseSwitcher: false,
  openFilter: null,
  activeFilters: {},
  search: "",
  showNotifs: false,
  selectedIds: [],
  assignOpenId: null,
  toast: null,
  tick: 0,
  assignments: {},
  auditTrail: INITIAL_AUDIT_TRAIL,
  mapZoom: 1,
  mapPan: { x: 0, y: 0 },
  expandedCam: null,
  camSearch: "",
  lifecycleDetail: null,
  fairnessDetail: null,
  openKpi: null,
  fairnessSearch: "",
  fairnessSort: "group",
  fairnessSortDir: "asc",
  appealView: "list",
  appealCaseId: null,
  appealStep: 1,
  appealRuling: null,
  violationType: null,
  legalRef: "",
  evidenceChecklist: {},
  officerNote: "",
  selectedDisposition: null,
};

export default function App() {
  const [state, setState] = useState(initialState);
  const patch = (upd) => setState((s) => ({ ...s, ...(typeof upd === "function" ? upd(s) : upd) }));
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  useEffect(() => {
    const t = setInterval(() => patch((s) => ({ tick: s.tick + 1 })), 300);
    return () => clearInterval(t);
  }, []);

  // ---- handlers ----
  const navigateTab = (page) => patch({ page, queueView: "list", decisionConfirmed: false, showCaseSwitcher: false });
  const openCase = (id) => patch({ page: "queue", queueView: "detail", caseTab: "investigation", selectedCaseId: id, showCaseSwitcher: false });
  const toggleCaseSwitcher = () => patch((s) => ({ showCaseSwitcher: !s.showCaseSwitcher }));
  const switchCase = (id) => patch({ selectedCaseId: id, showCaseSwitcher: false });
  const setCaseTab = (t) => patch({ caseTab: t });
  const backToQueueList = () => patch({ queueView: "list" });
  const toggleFilter = (key) => patch((s) => ({ openFilter: s.openFilter === key ? null : key }));
  const setFilter = (key, val) =>
    patch((s) => ({ activeFilters: { ...s.activeFilters, [key]: s.activeFilters[key] === val ? null : val }, openFilter: null }));
  const clearFilters = () => patch({ activeFilters: {} });
  const toggleNotifs = () => patch((s) => ({ showNotifs: !s.showNotifs }));
  const toggleSelect = (id) =>
    patch((s) => ({ selectedIds: s.selectedIds.includes(id) ? s.selectedIds.filter((x) => x !== id) : [...s.selectedIds, id] }));
  const toggleAssignMenu = (id) => patch((s) => ({ assignOpenId: s.assignOpenId === id ? null : id }));
  const assignOfficer = (id, officer) =>
    patch((s) => ({
      assignments: { ...s.assignments, [id]: officer },
      assignOpenId: null,
      toast: `มอบหมาย ${id} ให้ ${officer}`,
      auditTrail: [{ who: "อ.วิชัย", action: `มอบหมายเคส ${id} ให้ ${officer}`, when: new Date().toLocaleString("th-TH") }, ...s.auditTrail],
    }));
  const bulkAssign = (officer) =>
    patch((s) => {
      const a = { ...s.assignments };
      s.selectedIds.forEach((id) => (a[id] = officer));
      return { assignments: a, selectedIds: [], toast: `มอบหมาย ${s.selectedIds.length} เคสให้ ${officer}` };
    });
  const clearToast = () => patch({ toast: null });
  const goProfile = () => patch({ page: "profile" });
  const zoomMap = (delta) => patch((s) => ({ mapZoom: Math.min(3, Math.max(1, (s.mapZoom || 1) + delta)) }));
  const mapDragStart = (e) => {
    draggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: state.mapPan.x, panY: state.mapPan.y };
  };
  const mapDragMove = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    patch({ mapPan: { x: dragStartRef.current.panX + dx, y: dragStartRef.current.panY + dy } });
  };
  const mapDragEnd = () => {
    draggingRef.current = false;
  };
  const expandCam = (id) => patch({ expandedCam: id });
  const setCamSearch = (e) => patch({ camSearch: e.target.value });
  const closeExpand = () => patch({ expandedCam: null });
  const selectLifecycleStage = (i) => patch({ lifecycleDetail: i });
  const selectFairnessRow = (i) => patch((s) => ({ fairnessDetail: s.fairnessDetail === i ? null : i }));
  const toggleKpiDef = (k) => patch((s) => ({ openKpi: s.openKpi === k ? null : k }));
  const setFairnessSearch = (e) => patch({ fairnessSearch: e.target.value });
  const setFairnessSort = (key) =>
    patch((s) => ({ fairnessSort: key, fairnessSortDir: s.fairnessSort === key && s.fairnessSortDir === "desc" ? "asc" : "desc" }));
  const advanceAppeal = () => patch((s) => ({ appealStep: Math.min((s.appealStep || 1) + 1, 5) }));
  const openAppealCase = (id) => patch({ appealView: "detail", appealCaseId: id, appealStep: 1, appealRuling: null });
  const backToAppealList = () => patch({ appealView: "list" });
  const setAppealRuling = (r) => patch({ appealRuling: r });
  const setViolationType = (v) => patch({ violationType: v });
  const setLegalRef = (e) => patch({ legalRef: e.target.value });
  const toggleEvidenceItem = (k) => patch((s) => ({ evidenceChecklist: { ...s.evidenceChecklist, [k]: !s.evidenceChecklist[k] } }));
  const setOfficerNote = (e) => patch({ officerNote: e.target.value });
  const goTabInvestigation = () => setCaseTab("investigation");
  const goQueueList = () => navigateTab("queue");
  const goLive = () => navigateTab("live");

  const goBack = () => {
    const { page, queueView } = state;
    if (page === "live") navigateTab("overview");
    else if (page === "queue" && queueView === "detail") backToQueueList();
    else if (["lifecycle", "fairness", "appeal"].includes(page)) navigateTab("governance");
    else if (["reports", "settings"].includes(page)) navigateTab("analytics");
    else if (page === "profile") navigateTab("overview");
  };

  // ---- derived data (mirrors the prototype's renderVals()) ----
  const { page, queueView, caseTab, selectedCaseId, tick } = state;
  const secs = tick * 0.3;
  const nowStr = new Date(Date.now()).toLocaleTimeString("th-TH", { hour12: false });

  const canSee = {
    Monitor: ROLE !== "Auditor",
    Govern: true,
    Appeal: ROLE === "Appeals Reviewer" || ROLE === "Auditor",
  };
  const navItem = (id, label, icon, children) => ({
    label,
    icon,
    iconOpacity: page === id ? 1 : 0.75,
    bg: page === id ? "#1E4FD6" : "transparent",
    fg: page === id ? "#fff" : "#B7BECC",
    onClick: () => navigateTab(id),
    children: children.map(([cid, clabel]) => ({
      label: clabel,
      fg: page === cid ? "#fff" : "#7C8598",
      bg: page === cid ? "#1E4FD6" : "transparent",
      onClick: () => navigateTab(cid),
    })),
  });
  const navItems = [];
  if (canSee.Monitor) navItems.push(navItem("overview", "Operations Overview", <GridIcon />, [["live", "Live Monitoring"]]));
  navItems.push(navItem("queue", "Case Queue", <InboxIcon />, []));
  navItems.push(
    navItem(
      "governance",
      "AI Governance Overview",
      <CompassIcon />,
      ROLE === "Auditor"
        ? [
            ["lifecycle", "AI Lifecycle"],
            ["fairness", "Fairness Review"],
          ]
        : [
            ["lifecycle", "AI Lifecycle"],
            ["fairness", "Fairness Review"],
            ["appeal", "Internal Evidence Review"],
          ]
    )
  );
  navItems.push(navItem("analytics", "Analytics", <ChartIcon />, [["reports", "Reports"]]));
  navItems.push(navItem("settings", "Settings", <GearIcon />, []));

  const legendItems = [
    { color: "#1E4FD6", radius: "2px", label: "Observation" },
    { color: "#8A5CD6", radius: "50%", label: "Assessment" },
    { color: "#12151C", radius: "2px", label: "Decision" },
  ];

  const vehiclesToday = 18402 + Math.floor(secs * 0.8);
  const stats = [
    { markerColor: "#1E4FD6", markerRadius: "2px", label: "รถผ่านด่านวันนี้", value: vehiclesToday.toLocaleString(), delta: "+4.2% จากเมื่อวาน", deltaColor: "#1E7A3C" },
    { markerColor: "#8A5CD6", markerRadius: "50%", label: "Case Candidate ใหม่", value: String(132 + Math.floor(secs / 6)), delta: "+18 ใน 1 ชม.", deltaColor: "#9A6400" },
    { markerColor: "#D3402B", markerRadius: "50%", label: "Critical", value: String(14 + (Math.floor(secs / 7) % 3)), delta: "รอตรวจสอบ", deltaColor: "#B5301E" },
    { markerColor: "#12151C", markerRadius: "2px", label: "กำลังตรวจสอบ", value: String(47 + (Math.floor(secs / 4) % 4)), delta: "โดยเจ้าหน้าที่ 9 คน", deltaColor: "#5B6472" },
  ];

  const liveVehicleCount = 312 + (Math.floor(secs) % 7);

  const cases = [
    mkCase("LL-0447", "ด่านสระบุรี ขาเข้า", "Critical", "2 นาทีที่แล้ว", openCase, switchCase),
    mkCase("LL-0446", "ด่านบางปะอิน", "Medium", "6 นาทีที่แล้ว", openCase, switchCase),
    mkCase("LL-0445", "ด่านศรีราชา", "Critical", "9 นาทีที่แล้ว", openCase, switchCase),
    mkCase("LL-0444", "ด่านสระบุรี ขาออก", "Normal", "14 นาทีที่แล้ว", openCase, switchCase),
    mkCase("LL-0443", "ด่านบางปะอิน", "Medium", "21 นาทีที่แล้ว", openCase, switchCase),
    mkCase("LL-0442", "ด่านศรีราชา", "Normal", "33 นาทีที่แล้ว", openCase, switchCase),
  ];

  const queueCases = [
    { ...cases[0], sla: "05:12", slaColor: "#B5301E", status: "Awaiting Review", owner: "อ.วิชัย" },
    { ...cases[1], sla: "22:40", slaColor: "#9A6400", status: "In Progress", owner: "อ.มานะ" },
    { ...cases[2], sla: "01:58", slaColor: "#B5301E", status: "Awaiting Review", owner: "—" },
    { ...cases[3], sla: "54:10", slaColor: "#1E7A3C", status: "In Progress", owner: "อ.สมชาย" },
    { ...mkCase("LL-0441", "ด่านสระบุรี ขาเข้า", "Critical", "41 นาทีที่แล้ว", openCase, switchCase), sla: "00:47", slaColor: "#B5301E", status: "Awaiting Review", owner: "—" },
    { ...mkCase("LL-0440", "ด่านนครราชสีมา", "Medium", "52 นาทีที่แล้ว", openCase, switchCase), sla: "18:03", slaColor: "#9A6400", status: "In Progress", owner: "อ.ประไพ" },
    { ...mkCase("LL-0439", "ด่านบางปะอิน", "Normal", "1 ชม.ที่แล้ว", openCase, switchCase), sla: "2:10:00", slaColor: "#1E7A3C", status: "In Progress", owner: "อ.มานะ" },
    { ...mkCase("LL-0438", "ด่านศรีราชา", "Critical", "1 ชม. 12 นาทีที่แล้ว", openCase, switchCase), sla: "03:29", slaColor: "#B5301E", status: "Awaiting Review", owner: "—" },
    { ...mkCase("LL-0437", "ด่านสระบุรี ขาออก", "Medium", "1 ชม. 30 นาทีที่แล้ว", openCase, switchCase), sla: "40:55", slaColor: "#9A6400", status: "Awaiting Review", owner: "—" },
    { ...mkCase("LL-0436", "ด่านนครราชสีมา", "Normal", "2 ชม.ที่แล้ว", openCase, switchCase), sla: "ปิดแล้ว", slaColor: "#94A0B2", status: "Closed", owner: "อ.สมชาย" },
  ];

  const af = state.activeFilters;
  const makeFilter = (key, label, options) => {
    const active = !!af[key];
    return {
      label: active ? `${label}: ${af[key]}` : label,
      bg: active ? "#1E4FD6" : "#fff",
      fg: active ? "#fff" : "#12151C",
      toggle: () => toggleFilter(key),
      open: state.openFilter === key,
      options: options.map((op) => ({ label: op, active: af[key] === op, select: () => setFilter(key, op) })),
    };
  };
  const queueFilters = [
    makeFilter("priority", "Review Priority", ["Critical", "Medium", "Normal"]),
    makeFilter("province", "จังหวัด", PROVINCES),
    makeFilter("assign", "สถานะมอบหมาย", ["ยังไม่มอบหมาย", "มอบหมายแล้ว"]),
    makeFilter("shift", "กะ", ["กะของฉัน", "กะอื่น"]),
  ];

  const queueCasesAssigned = queueCases.map((c) => {
    const owner = state.assignments[c.id] || c.owner;
    const remain = SLA_BASE[c.id] !== undefined ? Math.max(0, SLA_BASE[c.id] - Math.floor(secs)) : null;
    return {
      ...c,
      owner,
      sla: remain !== null ? fmtClock(remain) : c.sla,
      slaColor: remain !== null ? (remain < 300 ? "#B5301E" : remain < 1800 ? "#9A6400" : "#1E7A3C") : c.slaColor,
    };
  });

  const filteredQueueCases = queueCasesAssigned
    .filter((c) => {
      if (af.priority && c.priority !== af.priority) return false;
      if (af.province && STATION_PROVINCE[c.station] !== af.province) return false;
      if (af.assign === "ยังไม่มอบหมาย" && c.owner !== "—") return false;
      if (af.assign === "มอบหมายแล้ว" && c.owner === "—") return false;
      if (af.shift === "กะของฉัน" && c.owner !== "อ.วิชัย") return false;
      const q = (state.search || "").trim();
      if (q && !(c.id.includes(q) || c.station.includes(q))) return false;
      return true;
    })
    .map((c) => ({
      ...c,
      checked: state.selectedIds.includes(c.id),
      toggleCheck: (e) => {
        e.stopPropagation();
        toggleSelect(c.id);
      },
      assignOpen: state.assignOpenId === c.id,
      openAssign: (e) => {
        e.stopPropagation();
        toggleAssignMenu(c.id);
      },
      officerOptions: OFFICERS.map((o) => ({
        label: o,
        select: (e) => {
          e.stopPropagation();
          assignOfficer(c.id, o);
        },
      })),
    }));
  const hasActiveFilters = Object.values(af).some(Boolean) || !!state.search;

  const camSearch = (state.camSearch || "").trim();
  const cameras = CAM_DEFS.filter((c) => !camSearch || c.name.includes(camSearch)).map((c) => ({
    id: c.id,
    name: c.name,
    ts: nowStr,
    truckX: ((secs * c.speed) % 340) - 40,
    expand: () => expandCam(c.id),
  }));
  const expandedCamera = state.expandedCam
    ? CAM_DEFS.filter((c) => c.id === state.expandedCam).map((c) => ({ id: c.id, name: c.name, ts: nowStr, truckX: ((secs * c.speed) % 340) - 40 }))[0]
    : null;
  const noCamerasFound = cameras.length === 0;

  const bgRoads = useMemo(() => {
    const bgNodes = [];
    let bi = 0;
    for (let row = -8; row <= 8; row++) {
      for (let col = -8; col <= 8; col++) {
        const jx = (seededRand(bi * 3 + 1) - 0.5) * 160;
        const jy = (seededRand(bi * 3 + 2) - 0.5) * 160;
        bgNodes.push({ x: col * 260 + (row % 2 ? 100 : 0) + jx, y: row * 260 + jy, i: bi });
        bi++;
      }
    }
    const roads = [];
    const cols = 17;
    bgNodes.forEach((n, idx) => {
      const rand = seededRand(idx * 7 + 3);
      if (idx >= cols && rand > 0.35) {
        const up = bgNodes[idx - cols];
        roads.push({ x1: n.x, y1: n.y, x2: up.x, y2: up.y });
      }
      const randR = seededRand(idx * 7 + 5);
      if (idx % cols !== 0 && randR > 0.4) {
        const left = bgNodes[idx - 1];
        roads.push({ x1: n.x, y1: n.y, x2: left.x, y2: left.y });
      }
    });
    return roads;
  }, []);

  const caseTabs = CASE_TAB_DEFS.map((t) => ({
    label: t.label,
    color: caseTab === t.id ? "#12151C" : "#94A0B2",
    border: caseTab === t.id ? "#1E4FD6" : "transparent",
    onClick: () => setCaseTab(t.id),
  }));

  const govKpis = GOV_KPI_VALUES.map((k) => ({ ...k, open: state.openKpi === k.label, def: GOV_KPI_DEFS[k.label], toggle: () => toggleKpiDef(k.label) }));

  const lifecycleStages = LIFECYCLE_DEFS.map((s, i) => ({
    ...s,
    select: () => selectLifecycleStage(i),
    active: state.lifecycleDetail === i,
    outline: state.lifecycleDetail === i ? "2px solid #1E4FD6" : "none",
    detail: LIFECYCLE_DETAILS[i],
  }));

  const allFairnessData = useMemo(
    () =>
      PROVINCES.map((p, i) => {
        const seed = (i * 53 + 17) % 100;
        const n = 12 + ((seed * 4.3) % 440 | 0);
        const avg = ["Normal", "Medium", "Critical"][(seed + i) % 3];
        const overrideRate = n < 30 ? null : (5 + (seed % 12)) + "." + (seed % 10) + "%";
        return { group: p, n, avg, overrideRate, low: n < 30 };
      }),
    []
  );
  const totalCases = allFairnessData.reduce((s, r) => s + r.n, 0);
  const lowSampleCount = allFairnessData.filter((r) => r.low).length;
  const validOverrides = allFairnessData.filter((r) => !r.low).map((r) => parseFloat(r.overrideRate));
  const avgOverride = (validOverrides.reduce((a, b) => a + b, 0) / validOverrides.length).toFixed(1);
  const topOverride = [...allFairnessData].filter((r) => !r.low).sort((a, b) => parseFloat(b.overrideRate) - parseFloat(a.overrideRate))[0];
  const fairnessSummary = [
    { label: "จำนวนเคสทั้งหมด (77 จังหวัด)", value: totalCases.toLocaleString() },
    { label: "จังหวัดที่ข้อมูลน้อยเกินไป (n<30)", value: lowSampleCount + " จังหวัด" },
    { label: "Override Rate เฉลี่ยทั่วประเทศ", value: avgOverride + "%" },
    { label: "จังหวัดที่ Override Rate สูงสุด", value: topOverride ? `${topOverride.group} (${topOverride.overrideRate})` : "—" },
  ];
  const fSearch = (state.fairnessSearch || "").trim();
  const fSortKey = state.fairnessSort || "group";
  const fSortDir = state.fairnessSortDir || "asc";
  let fairnessRows = allFairnessData.filter((r) => !fSearch || r.group.includes(fSearch));
  fairnessRows = [...fairnessRows].sort((a, b) => {
    let av = a[fSortKey];
    let bv = b[fSortKey];
    if (fSortKey === "overrideRate") {
      av = av ? parseFloat(av) : -1;
      bv = bv ? parseFloat(bv) : -1;
    }
    if (typeof av === "string") return fSortDir === "asc" ? av.localeCompare(bv, "th") : bv.localeCompare(av, "th");
    return fSortDir === "asc" ? av - bv : bv - av;
  });
  fairnessRows = fairnessRows.map((r, i) => ({
    ...r,
    nColor: r.low ? "#B5301E" : "#12151C",
    overrideRate: r.overrideRate || "—",
    select: () => selectFairnessRow(i),
    open: state.fairnessDetail === i,
  }));
  const fairnessSortOptions = [
    { key: "group", label: "จังหวัด" },
    { key: "n", label: "จำนวนเคส" },
    { key: "overrideRate", label: "Override Rate" },
  ].map((o) => ({ ...o, active: fSortKey === o.key, onClick: () => setFairnessSort(o.key) }));

  const appealStep = state.appealStep || 1;
  const appealSteps = APPEAL_STEP_LABELS.map((label, i) => ({
    n: i + 1,
    label,
    bg: i + 1 < appealStep ? "#1E7A3C" : i + 1 === appealStep ? "#1E4FD6" : "#E7E9EC",
    fg: i + 1 <= appealStep ? "#fff" : "#5B6472",
  }));
  const currentAppealCase = APPEAL_CASES.find((c) => c.id === state.appealCaseId);
  const appealCases = APPEAL_CASES.map((c) => ({ ...c, open: () => openAppealCase(c.id) }));
  const rulingOptions = [
    { key: "uphold", label: "ยืนตามคำตัดสินเดิม", select: () => setAppealRuling("uphold") },
    { key: "overturn", label: "กลับคำตัดสิน — False Alarm", select: () => setAppealRuling("overturn") },
  ].map((r) => ({ ...r, active: state.appealRuling === r.key }));

  const provinceStats = PROVINCES.slice(0, 10).map((p, i) => ({ name: p, count: 40 + ((i * 37) % 260) }));

  const dispositions = DISPOSITION_DEFS.map((d) => {
    const active = state.selectedDisposition === d.key;
    return { label: d.label, border: active ? "#1E4FD6" : "#E7E9EC", bg: active ? "#1E4FD6" : "#fff", fg: active ? "#fff" : "#12151C", select: () => patch({ selectedDisposition: d.key }) };
  });
  const violationTypes = ["น้ำหนักเกินกำหนด", "ฝ่าฝืนความเร็ว", "เอกสารไม่ครบ", "อื่นๆ"].map((v) => {
    const active = state.violationType === v;
    return { label: v, active, select: () => setViolationType(v), border: active ? "#1E4FD6" : "#E7E9EC", bg: active ? "#1E4FD6" : "#fff", fg: active ? "#fff" : "#12151C" };
  });
  const evidenceChecklistItems = ["ภาพถ่าย WIM", "วิดีโอกล้องหน้าด่าน", "บันทึกน้ำหนักเพลา", "ประวัติผ่านด่านย้อนหลัง"].map((k) => ({
    label: k,
    checked: !!state.evidenceChecklist[k],
    toggle: () => toggleEvidenceItem(k),
  }));

  const confirmDecision = () => {
    exportDecisionPdf({
      caseId: state.selectedCaseId,
      disposition: state.selectedDisposition,
      violationType: state.violationType,
      legalRef: state.legalRef,
      checklist: state.evidenceChecklist,
      note: state.officerNote,
      evidenceItems: FACTORS,
    });
    patch((s) => ({
      decisionConfirmed: true,
      auditTrail: [{ who: "อ.วิชัย", action: `ยืนยันคำตัดสิน ${s.selectedDisposition || ""} — เคส ${s.selectedCaseId}`, when: new Date().toLocaleString("th-TH") }, ...s.auditTrail],
    }));
  };

  const notifications = [
    {
      text: "Case Candidate ใหม่ #LL-0447 — Critical",
      time: "เมื่อสักครู่",
      onClick: () => {
        patch({ showNotifs: false });
        openCase("LL-0447");
      },
    },
    {
      text: "Case #LL-0446 ใกล้เกิน SLA (22:40 เหลือ)",
      time: "6 นาทีที่แล้ว",
      onClick: () => {
        patch({ showNotifs: false });
        openCase("LL-0446");
      },
    },
    {
      text: "Model v2.3.1 เข้าสู่ canary 5%",
      time: "1 ชม.ที่แล้ว",
      onClick: () => patch({ showNotifs: false, page: "lifecycle" }),
    },
  ];

  const liveSlaRemaining = fmtClock(Math.max(0, (SLA_BASE[selectedCaseId] !== undefined ? SLA_BASE[selectedCaseId] : 312) - Math.floor(secs)));

  const isOverview = page === "overview";
  const isLive = page === "live";
  const isQueueList = page === "queue" && queueView === "list";
  const isQueueDetail = page === "queue" && queueView === "detail";

  return (
    <div style={{ fontFamily: "'IBM Plex Sans Thai','Space Grotesk',sans-serif", color: "#12151C", minHeight: "100vh", display: "flex", WebkitFontSmoothing: "antialiased" }}>
      <Sidebar navItems={navItems} currentRole={ROLE} goProfile={goProfile} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Header
          pageTitle={page === "queue" ? (queueView === "list" ? "Case Queue" : "Case Queue — รายละเอียดเคส") : TITLES[page]}
          goBack={goBack}
          backCursor={page === "overview" ? "default" : "pointer"}
          backOpacity={page === "overview" ? 0.25 : 1}
          searchValue={state.search}
          onSearch={(e) => patch({ search: e.target.value })}
          showNotifs={state.showNotifs}
          toggleNotifs={toggleNotifs}
          notifications={notifications}
          legendItems={legendItems}
        />
        {state.toast && (
          <div onClick={clearToast} className="toast-anim" style={{ background: "#12151C", color: "#fff", fontSize: 12.5, padding: "10px 32px", cursor: "pointer" }}>
            ✓ {state.toast} — คลิกเพื่อปิด
          </div>
        )}
        <div className="page-anim" key={page + queueView + caseTab} style={{ padding: 32, overflow: "auto", flex: 1 }}>
          {isOverview && <Overview stats={stats} cases={cases} goQueueList={goQueueList} goLive={goLive} liveVehicleCount={liveVehicleCount} />}
          {isLive && (
            <Live
              mapPan={state.mapPan}
              mapZoom={state.mapZoom}
              mapDragStart={mapDragStart}
              mapDragMove={mapDragMove}
              mapDragEnd={mapDragEnd}
              bgRoads={bgRoads}
              mapRoads={MAP_ROADS}
              mapStations={MAP_STATIONS}
              zoomIn={() => zoomMap(0.4)}
              zoomOut={() => zoomMap(-0.4)}
              camSearch={state.camSearch}
              onCamSearch={setCamSearch}
              noCamerasFound={noCamerasFound}
              cameras={cameras}
              expandedCamera={expandedCamera}
              closeExpand={closeExpand}
            />
          )}
          {isQueueList && (
            <QueueList
              queueFilters={queueFilters}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
              hasSelection={state.selectedIds.length > 0}
              selectionCount={state.selectedIds.length}
              bulkOfficers={OFFICERS.map((o) => ({ label: o, select: () => bulkAssign(o) }))}
              filteredQueueCases={filteredQueueCases}
              noFilteredCases={filteredQueueCases.length === 0}
            />
          )}
          {isQueueDetail && (
            <QueueDetail
              selectedCaseId={selectedCaseId}
              toggleCaseSwitcher={toggleCaseSwitcher}
              showCaseSwitcher={state.showCaseSwitcher}
              cases={cases}
              liveSlaRemaining={liveSlaRemaining}
              caseTabs={caseTabs}
              isTabInvestigation={caseTab === "investigation"}
              isTabNetwork={caseTab === "network"}
              isTabDecision={caseTab === "decision"}
              isTabIntegrity={caseTab === "integrity"}
              timeline={TIMELINE}
              factors={FACTORS}
              networkFacts={NETWORK_FACTS}
              networkInferences={NETWORK_INFERENCES}
              dispositions={dispositions}
              violationTypes={violationTypes}
              legalRef={state.legalRef}
              onLegalRef={setLegalRef}
              evidenceChecklistItems={evidenceChecklistItems}
              officerNote={state.officerNote}
              onOfficerNote={setOfficerNote}
              confirmDecision={confirmDecision}
              decisionConfirmed={state.decisionConfirmed}
              goTabInvestigation={goTabInvestigation}
              auditLog={AUDIT_LOG}
            />
          )}
          {page === "governance" && <Governance govKpis={govKpis} />}
          {page === "lifecycle" && <Lifecycle lifecycleStages={lifecycleStages} releaseNotes={RELEASE_NOTES} />}
          {page === "fairness" && (
            <Fairness
              fairnessSummary={fairnessSummary}
              fairnessSearch={state.fairnessSearch}
              onFairnessSearch={setFairnessSearch}
              fairnessSortOptions={fairnessSortOptions}
              fairnessRows={fairnessRows}
            />
          )}
          {page === "appeal" && (
            <Appeal
              isAppealList={state.appealView === "list"}
              isAppealDetail={state.appealView === "detail"}
              appealCases={appealCases}
              backToAppealList={backToAppealList}
              appealSteps={appealSteps}
              showStep1={appealStep === 1}
              showStep2={appealStep === 2}
              showStep3plus={appealStep >= 3}
              currentAppealCase={currentAppealCase}
              reviewerName={REVIEWER_NAME}
              showRulingPanel={appealStep === 4}
              rulingOptions={rulingOptions}
              appealDone={appealStep >= 5}
              appealRuling={state.appealRuling}
              showPreRulingAdvance={appealStep < 4}
              advanceAppeal={advanceAppeal}
              canConfirmRuling={appealStep === 4 && !!state.appealRuling}
              confirmRuling={advanceAppeal}
            />
          )}
          {page === "profile" && <Profile currentRole={ROLE} />}
          {page === "analytics" && <Analytics provinceStats={provinceStats} />}
          {page === "reports" && <Reports />}
          {page === "settings" && <Settings auditTrail={state.auditTrail} />}
        </div>
      </div>
    </div>
  );
}
