import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Users, Plus, X, AlertTriangle, Pencil, Trash2, ChevronRight, Coins,
Download, Upload, Loader2, Check
} from "lucide-react";

// ---------- palette (premium light) ----------
const ICON_DATA_URI = "data:image/png;base64,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";
const uid = () => Math.random().toString(36).slice(2, 9);
const STORAGE_KEY = "galpotori:data";

const STATUS_META = {
  in_progress: { label: "In Progress", color: "#4E7AB5" },
  delivered:   { label: "Delivered",   color: "#4F9C7A" },
  on_hold:     { label: "On Hold",     color: "#C4593F" },
};

const FILE_TYPES = [
  { key: "main", label: "Main File", short: "Main" },
  { key: "reels", label: "Reels", short: "Reels" },
  { key: "highlights", label: "Highlights", short: "High." },
  { key: "teaser", label: "Teaser", short: "Teaser" },
];

function d(off) { const dt = new Date(); dt.setDate(dt.getDate() + off); return dt.toISOString().slice(0, 10); }

const demoProjects = [
  { id: uid(), clientName: "Rhea Kapoor", projectName: "Destination Wedding — Udaipur", projectDate: d(-6), deliveryDate: d(4), files: { main: 1, reels: 3, highlights: 1, teaser: 1 }, price: 45000, paid: 25000, status: "in_progress" },
  { id: uid(), clientName: "Farhan Ali", projectName: "Brand Launch Film — Nova", projectDate: d(-14), deliveryDate: d(-2), files: { main: 1, reels: 2, highlights: 0, teaser: 1 }, price: 32000, paid: 32000, status: "delivered" },
  { id: uid(), clientName: "Meera Shah", projectName: "Birthday Reel Bundle", projectDate: d(-2), deliveryDate: d(2), files: { main: 0, reels: 5, highlights: 1, teaser: 0 }, price: 12000, paid: 4000, status: "in_progress" },
  { id: uid(), clientName: "Kabir Sethi", projectName: "Corporate Recap Video", projectDate: d(-20), deliveryDate: d(-8), files: { main: 1, reels: 0, highlights: 1, teaser: 0 }, price: 18000, paid: 9000, status: "on_hold" },
];

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "projects", label: "Projects" },
  { key: "more", label: "More" },
];

function money(n) { return "₹" + Number(n || 0).toLocaleString("en-IN"); }
function fmtDate(iso) { if (!iso) return "—"; const dt = new Date(iso + "T00:00:00"); return dt.toLocaleDateString(undefined, { day: "numeric", month: "short" }); }
function daysUntil(iso) { const dt = new Date(iso + "T00:00:00"); const now = new Date(); now.setHours(0,0,0,0); return Math.round((dt - now) / 86400000); }
function initials(name) { return name.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase(); }
function greeting() { const h = new Date().getHours(); if (h < 12) return "Good morning"; if (h < 17) return "Good afternoon"; return "Good evening"; }

// ---------- Offline persistence ----------
// Explicit offline saves use localStorage, which survives closing/reopening
// the app in a normal browser/PWA. window.storage is kept only for migration
// from older Galpotori builds.
function readLocalStorage(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}

function writeLocalStorage(key, value) {
  try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; }
}

async function readLegacyStorage(key) {
  try {
    if (!window.storage?.get) return null;
    const res = await window.storage.get(key, false);
    return res ? res.value : null;
  } catch (e) { return null; }
}

async function writeLegacyStorage(key, value) {
  try {
    if (!window.storage?.set) return false;
    await window.storage.set(key, value, false);
    return true;
  } catch (e) { return false; }
}

export default function App() {
  const [tab, setTab] = useState("overview");
  const [projects, setProjects] = useState(demoProjects);
  const [modal, setModal] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  function showToast(msg, tone = "ok") {
    setToast({ msg, tone });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3200);
  }

  // Load only the last explicitly saved data. Nothing is silently persisted
  // on every keystroke/change anymore.
  useEffect(() => {
    (async () => {
      let raw = readLocalStorage(STORAGE_KEY);
      if (!raw) raw = await readLegacyStorage(STORAGE_KEY);

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.projects)) setProjects(parsed.projects)
        } catch (e) {
          showToast("Saved data could not be read", "error");
        }
      }
      setDirty(false);
      setLoading(false);
    })();
  }, []);

  function markDirty() { setDirty(true); }

  async function saveAllData() {
    if (saving) return;
    setSaving(true);
    const payload = JSON.stringify({
  app: "Galpotori",
  version: 2,
  projects,
  savedAt: new Date().toISOString(),
});

    let saved = writeLocalStorage(STORAGE_KEY, payload);
    if (saved) {
      // Best-effort compatibility write for older Galpotori environments.
      void writeLegacyStorage(STORAGE_KEY, payload);
    } else {
      saved = await writeLegacyStorage(STORAGE_KEY, payload);
    }

    setSaving(false);
    if (saved) {
      setDirty(false);
      showToast("All changes saved successfully");
    } else {
      showToast("Could not save changes on this device", "error");
    }
  }

  // Warn about unsaved changes when the browser tries to leave the page.
  useEffect(() => {
    function onBeforeUnload(e) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const totals = useMemo(() => {
    const clients = new Set(projects.map((p) => p.clientName)).size;
    const active = projects.filter((p) => p.status !== "delivered").length;
    const collected = projects.reduce((s, p) => s + Number(p.paid || 0), 0);
    const outstanding = projects.reduce((s, p) => s + Math.max(0, Number(p.price||0) - Number(p.paid||0)), 0);
    return { clients, active, collected, outstanding };
  }, [projects]);

  const upcoming = useMemo(() => [...projects].filter((p) => p.status !== "delivered").sort((a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate)), [projects]);
  const filteredProjects = useMemo(() => [...projects].sort((a, b) => new Date(b.projectDate) - new Date(a.projectDate)).filter((p) => statusFilter === "all" || p.status === statusFilter), [projects, statusFilter]);

  function saveProject(data) {
    if (modal?.mode === "edit") setProjects((prev) => prev.map((p) => (p.id === modal.project.id ? { ...p, ...data } : p)));
    else setProjects((prev) => [{ id: uid(), ...data }, ...prev]);
    markDirty();
    setModal(null);
  }
  function removeProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    markDirty();
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", background: "#FBF8F2", color: "#262420" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        * { -webkit-tap-highlight-color: transparent; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.55; }
        ::selection { background: #F0C878; color: #262420; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .fade-up { animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-up-1 { animation-delay: 0.02s; } .fade-up-2 { animation-delay: 0.08s; } .fade-up-3 { animation-delay: 0.14s; }
        .card-lift { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
        .card-lift:active { transform: scale(0.985); }
        .press { transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease; }
        .press:active { transform: scale(0.94); }
        .soft-shadow { box-shadow: 0 1px 2px rgba(38,36,32,0.04), 0 8px 24px -12px rgba(38,36,32,0.10); }
        .soft-shadow-lg { box-shadow: 0 2px 4px rgba(38,36,32,0.04), 0 16px 40px -14px rgba(201,151,62,0.22); }
        .bar-fill { transition: width 0.6s cubic-bezier(0.16,1,0.3,1); }
        .spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {toast && (
        <div
          className="fixed top-5 left-1/2 z-[60] px-4 py-2.5 rounded-full text-xs font-medium soft-shadow-lg flex items-center gap-1.5"
          style={{ animation: "toastIn 0.25s cubic-bezier(0.16,1,0.3,1) both", background: toast.tone === "error" ? "#C4593F" : "#262420", color: "#FBF8F2" }}
        >
          {toast.tone !== "error" && <Check size={13} />} {toast.msg}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-6 pb-32 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 fade-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 soft-shadow">
              <img src={ICON_DATA_URI} alt="Galpotori icon" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display font-semibold text-[1.35rem] tracking-tight leading-none">Galpotori</div>
              <div className="text-[10.5px] text-[#A79E89] tracking-[0.14em] uppercase mt-1">Sourav · client ledger</div>
            </div>
          </div>
          <div className="font-mono text-[11px] text-[#A79E89]">
            {new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
          </div>
        </div>

        {/* Segmented nav */}
        <div className="relative flex mb-7 p-1 rounded-full bg-white soft-shadow fade-up fade-up-1">
          {NAV.map((item) => {
            const active = tab === item.key;
            return (
              <button key={item.key} onClick={() => setTab(item.key)} className="relative flex-1 py-2.5 rounded-full text-sm font-medium press" style={{ color: active ? "#FBF8F2" : "#8B8371", zIndex: 1 }}>
                {active && <span className="absolute inset-0 rounded-full -z-10" style={{ background: "linear-gradient(135deg, #DCA84E, #B8842E)", boxShadow: "0 4px 14px -4px rgba(184,132,46,0.55)" }} />}
                {item.label}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-[#A79E89] text-sm gap-2">
            <Loader2 size={16} className="spin" /> Loading your ledger…
          </div>
        )}

        {!loading && tab === "overview" && (
          <Overview totals={totals} upcoming={upcoming} onOpen={(p) => setModal({ mode: "edit", project: p })} />
        )}
        {!loading && tab === "projects" && (
          <Projects projects={filteredProjects} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onEdit={(p) => setModal({ mode: "edit", project: p })} onRemove={removeProject} />
        )}
        {!loading && tab === "more" && (
          <MorePage
  projects={projects}
  setProjects={(value) => { setProjects(value); markDirty(); }}
  showToast={showToast}
  markDirty={markDirty}
/>
        )}
      </div>

      {!loading && dirty && (
        <div className="fixed bottom-6 left-5 z-30">
          <button
            onClick={saveAllData}
            disabled={saving}
            className="px-5 py-3.5 rounded-full flex items-center gap-2 text-sm font-semibold press soft-shadow-lg disabled:opacity-70"
            style={{ background: "#262420", color: "#FBF8F2", boxShadow: "0 10px 30px -10px rgba(38,36,32,0.45)" }}
          >
            {saving ? <Loader2 size={15} className="spin" /> : <Check size={15} />}
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      )}

      {!loading && (
        <button onClick={() => setModal({ mode: "add" })} className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-20 press soft-shadow-lg" style={{ background: "linear-gradient(135deg, #DCA84E, #B8842E)" }}>
          <Plus size={24} color="#FBF8F2" strokeWidth={2.5} />
        </button>
      )}

      {modal && (
        <ProjectModal initial={modal.mode === "edit" ? modal.project : null} onClose={() => setModal(null)} onSubmit={saveProject} onDelete={modal.mode === "edit" ? () => { removeProject(modal.project.id); setModal(null); } : null} />
      )}
    </div>
  );
}

// ---------- Hero wave ----------
function WaveDivider({ id }) {
  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-10 block">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4E7AB5" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#8FAED0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F0C878" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M0,20 C50,35 100,5 150,18 C200,31 250,8 300,20 C340,29 370,12 400,22 L400,40 L0,40 Z" fill={`url(#${id})`} />
    </svg>
  );
}

// ---------- Overview ----------
function Overview({ totals, upcoming, onOpen }) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-[28px] overflow-hidden soft-shadow-lg fade-up fade-up-1" style={{ background: "linear-gradient(160deg, #FFFDF7 0%, #FBF1DD 60%, #F7E7C4 100%)" }}>
        <div className="px-6 pt-6 pb-2">
          <div className="text-[10.5px] uppercase tracking-[0.16em] text-[#A9863F] mb-1.5 font-medium">Studio Overview</div>
          <div className="font-display text-2xl font-semibold text-[#262420] mb-5">{greeting()}, Sourav.</div>
          <div className="flex items-end gap-8">
            <div>
              <div className="text-[11px] text-[#8B8371] mb-1">Active Projects</div>
              <div className="font-display text-4xl font-semibold text-[#262420]">{totals.active}</div>
            </div>
            <div>
              <div className="text-[11px] text-[#8B8371] mb-1">Outstanding</div>
              <div className="font-display text-4xl font-semibold" style={{ color: totals.outstanding > 0 ? "#C4593F" : "#4F9C7A" }}>{money(totals.outstanding)}</div>
            </div>
          </div>
        </div>
        <WaveDivider id="heroWave" />
      </div>

      <div className="grid grid-cols-2 gap-3 fade-up fade-up-2">
        <div className="bg-white rounded-2xl px-4 py-4 soft-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(78,122,181,0.12)" }}><Users size={13} color="#4E7AB5" /></div>
            <div className="text-[10.5px] uppercase tracking-wide text-[#A79E89]">Clients</div>
          </div>
          <div className="font-mono text-xl font-medium text-[#262420]">{String(totals.clients).padStart(2, "0")}</div>
        </div>
        <div className="bg-white rounded-2xl px-4 py-4 soft-shadow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(79,156,122,0.12)" }}><Coins size={13} color="#4F9C7A" /></div>
            <div className="text-[10.5px] uppercase tracking-wide text-[#A79E89]">Collected</div>
          </div>
          <div className="font-mono text-xl font-medium text-[#4F9C7A]">{money(totals.collected)}</div>
        </div>
      </div>

      <div className="fade-up fade-up-3">
        <h2 className="font-display font-semibold text-lg mb-3.5">Up next</h2>
        <div className="space-y-2.5">
          {upcoming.length === 0 && <div className="rounded-2xl px-5 py-8 text-center text-sm text-[#A79E89] bg-white soft-shadow">All caught up. New projects will surface here.</div>}
          {upcoming.slice(0, 5).map((p) => {
            const dleft = daysUntil(p.deliveryDate);
            const overdue = dleft < 0;
            const meta = STATUS_META[p.status];
            return (
              <button key={p.id} onClick={() => onOpen(p)} className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3.5 soft-shadow card-lift text-left">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0" style={{ background: `${meta.color}18`, color: meta.color }}>{initials(p.clientName)}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate text-[#262420]">{p.clientName}</div>
                  <div className="text-xs text-[#A79E89] truncate">{p.projectName}</div>
                </div>
                <div className="font-mono text-[10px] text-center leading-tight px-2.5 py-1.5 rounded-full shrink-0" style={{ background: overdue ? "rgba(196,89,63,0.10)" : "rgba(201,151,62,0.12)", color: overdue ? "#C4593F" : "#B8842E" }}>
                  {overdue ? `${Math.abs(dleft)}d late` : dleft === 0 ? "Today" : `${dleft}d`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Projects ----------
function FileBadge({ label, count }) {
  if (!count) return null;
  return <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#FBF8F2] text-[#8B8371]">{label} <span style={{ color: "#B8842E" }}>×{count}</span></span>;
}

function ProjectCard({ p, onEdit, onRemove }) {
  const meta = STATUS_META[p.status];
  const due = Math.max(0, Number(p.price || 0) - Number(p.paid || 0));
  const pct = p.price ? Math.min(100, Math.round((p.paid / p.price) * 100)) : 0;
  const dleft = daysUntil(p.deliveryDate);
  const overdue = dleft < 0 && p.status !== "delivered";

  return (
    <div className="bg-white rounded-2xl p-5 soft-shadow card-lift relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: meta.color }} />
      <div className="flex items-start justify-between gap-3 mb-3 pl-1.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm shrink-0" style={{ background: `${meta.color}18`, color: meta.color }}>{initials(p.clientName)}</div>
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold leading-tight truncate text-[#262420]">{p.clientName}</div>
            <div className="text-xs text-[#A79E89] truncate mt-0.5">{p.projectName}</div>
          </div>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap shrink-0" style={{ color: meta.color, background: `${meta.color}18` }}>{meta.label}</span>
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono text-[#A79E89] mb-2 pl-1.5">
        <span>Shoot {fmtDate(p.projectDate)}</span>
        <span style={{ color: overdue ? "#C4593F" : "#A79E89" }}>Deliver {fmtDate(p.deliveryDate)}{overdue && " · overdue"}</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3 pl-1.5">
        <span className="text-[10px] px-2 py-1 rounded-full bg-[#FBF8F2] text-[#8B8371]" style={{ boxShadow: "inset 0 0 0 1px #F1EBDA" }}>
          Files: {p.fileLocation === "laptop" ? "Laptop" : "Computer"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4 pl-1.5">
        {FILE_TYPES.map((f) => <FileBadge key={f.key} label={f.short} count={p.files?.[f.key] || 0} />)}
        {FILE_TYPES.every((f) => !p.files?.[f.key]) && <span className="text-[10px] text-[#C9BE9E]">No files logged yet</span>}
      </div>

      <div className="pl-1.5 mb-1">
        <div className="w-full h-1.5 rounded-full bg-[#F1E9D5] overflow-hidden">
          <div className="h-full rounded-full bar-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #C9973E, #F0C878)" }} />
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-mono mb-4 pl-1.5">
        <span className="text-[#8B8371]">{money(p.paid)} <span className="text-[#C9BE9E]">/ {money(p.price)}</span></span>
        <span style={{ color: due > 0 ? "#C4593F" : "#4F9C7A" }}>{due > 0 ? `Due ${money(due)}` : "Paid in full"}</span>
      </div>

      <div className="flex items-center gap-4 pt-3 pl-1.5" style={{ borderTop: "1px solid #F1EBDA" }}>
        <button onClick={() => onEdit(p)} className="flex items-center gap-1.5 text-xs text-[#8B8371] hover:text-[#262420] transition press"><Pencil size={13} /> Edit</button>
        <button onClick={() => onRemove(p.id)} className="flex items-center gap-1.5 text-xs text-[#8B8371] hover:text-[#C4593F] transition press ml-auto"><Trash2 size={13} /> Remove</button>
      </div>
    </div>
  );
}

function Projects({ projects, statusFilter, setStatusFilter, onEdit, onRemove }) {
  const filters = ["all", "in_progress", "delivered", "on_hold"];
  return (
    <div>
      <div className="flex gap-1.5 mb-5 overflow-x-auto no-scrollbar fade-up fade-up-1">
        {filters.map((f) => {
          const active = statusFilter === f;
          const color = f === "all" ? "#262420" : STATUS_META[f].color;
          return (
            <button key={f} onClick={() => setStatusFilter(f)} className="text-[11.5px] px-3.5 py-2 rounded-full whitespace-nowrap press" style={{ background: active ? color : "#FFFFFF", color: active ? "#FBF8F2" : "#8B8371", boxShadow: active ? `0 4px 14px -4px ${color}88` : "0 1px 2px rgba(38,36,32,0.05)", fontWeight: active ? 600 : 500 }}>
              {f === "all" ? "All" : STATUS_META[f].label}
            </button>
          );
        })}
      </div>
      <div className="space-y-3.5 fade-up fade-up-2">
        {projects.length === 0 && <div className="rounded-2xl px-5 py-10 text-center text-sm text-[#A79E89] bg-white soft-shadow">No projects here yet. Tap + to add one.</div>}
        {projects.map((p) => <ProjectCard key={p.id} p={p} onEdit={onEdit} onRemove={onRemove} />)}
      </div>
    </div>
  );
}

// ---------- More: Payment QR + Backup/Restore ----------
function MorePage({ projects, setProjects, showToast, markDirty }) {

  const backupInputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  function onQrFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { showToast("That file isn't an image", "error"); return; }
    const reader = new FileReader();
    reader.onload = () => { setPaymentQR(reader.result); markDirty(); showToast("Payment QR updated — click Save changes"); };
    reader.onerror = () => showToast("Couldn't read that image", "error");
    reader.readAsDataURL(file);
  }

  async function exportBackup() {
    setBusy(true);
    try {
      const payload = { app: "Galpotori", editor: "Sourav", exportedAt: new Date().toISOString(), projects, paymentQR };
      const json = JSON.stringify(payload, null, 2);
      const filename = `galpotori-backup-${new Date().toISOString().slice(0, 10)}.json`;

      if (window.showSaveFilePicker) {
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [{ description: "Galpotori Backup", accept: { "application/json": [".json"] } }],
          });
          const writable = await handle.createWritable();
          await writable.write(json);
          await writable.close();
          showToast("Backup saved");
          setBusy(false);
          return;
        } catch (e) {
          if (e && e.name === "AbortError") { setBusy(false); return; }
          // fall through to download fallback
        }
      }
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Backup downloaded");
    } catch (e) {
      showToast("Backup failed", "error");
    }
    setBusy(false);
  }

  async function applyRestoredData(parsed) {
    if (!parsed || !Array.isArray(parsed.projects)) throw new Error("bad shape");
    setProjects(parsed.projects);
    setPaymentQR(Object.prototype.hasOwnProperty.call(parsed, "paymentQR") ? (parsed.paymentQR || null) : null);
    markDirty();
    showToast(`Restored ${parsed.projects.length} project${parsed.projects.length === 1 ? "" : "s"} — click Save changes`);
  }

  async function restoreBackup() {
    setBusy(true);
    try {
      if (window.showOpenFilePicker) {
        try {
          const [handle] = await window.showOpenFilePicker({
            types: [{ description: "Galpotori Backup", accept: { "application/json": [".json"] } }],
          });
          const file = await handle.getFile();
          const text = await file.text();
          await applyRestoredData(JSON.parse(text));
          setBusy(false);
          return;
        } catch (e) {
          if (e && e.name === "AbortError") { setBusy(false); return; }
          // fall through to hidden input fallback
        }
      }
      backupInputRef.current?.click();
    } catch (e) {
      showToast("Restore failed", "error");
    }
    setBusy(false);
  }

  async function onBackupFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    try {
      const text = await file.text();
      await applyRestoredData(JSON.parse(text));
    } catch (e) {
      showToast("That file doesn't look like a valid backup", "error");
    }
    setBusy(false);
  }

  return (
    <div className="space-y-5 fade-up fade-up-1">
      
      {/* Backup & Restore */}
      <div className="bg-white rounded-2xl p-5 soft-shadow">
        <h3 className="font-display font-semibold text-lg mb-1">Backup &amp; restore</h3>
        <p className="text-xs text-[#A79E89] mb-4">Save all your clients, projects and payment QR to a file you keep — useful before switching phones or if something goes wrong. Restoring replaces what's currently loaded.</p>

        <div className="flex gap-2.5">
          <button onClick={exportBackup} disabled={busy} className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-3 rounded-xl press disabled:opacity-50" style={{ background: "linear-gradient(135deg, #DCA84E, #B8842E)", color: "#FBF8F2" }}>
            {busy ? <Loader2 size={15} className="spin" /> : <Download size={15} />} Export backup
          </button>
          <button onClick={restoreBackup} disabled={busy} className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-3 rounded-xl press disabled:opacity-50" style={{ background: "#FBF8F2", color: "#262420", boxShadow: "inset 0 0 0 1px #F1EBDA" }}>
            {busy ? <Loader2 size={15} className="spin" /> : <Upload size={15} />} Restore backup
          </button>
        </div>
        <input ref={backupInputRef} type="file" accept="application/json" className="hidden" onChange={onBackupFileChange} />
        <div className="text-[10.5px] text-[#C9BE9E] mt-3">
          On supported browsers, export lets you pick exactly where the file is saved; otherwise it downloads to your usual Downloads folder.
        </div>
      </div>

      <div className="text-center text-[10.5px] text-[#C9BE9E] pt-2">Galpotori · managed by Sourav</div>
    </div>
  );
}

// ---------- Modal ----------
const fieldCls = "w-full bg-[#FBF8F2] rounded-xl px-3.5 py-3 text-sm text-[#262420] focus:outline-none placeholder:text-[#C9BE9E] transition-shadow";
const labelCls = "text-[11px] text-[#8B8371] mb-1.5 block uppercase tracking-wide font-medium";

function ProjectModal({ initial, onClose, onSubmit, onDelete }) {
  const [clientName, setClientName] = useState(initial?.clientName || "");
  const [projectName, setProjectName] = useState(initial?.projectName || "");
  const [projectDate, setProjectDate] = useState(initial?.projectDate || new Date().toISOString().slice(0,10));
  const [deliveryDate, setDeliveryDate] = useState(initial?.deliveryDate || "");
  const [files, setFiles] = useState(initial?.files || { main: 1, reels: 0, highlights: 0, teaser: 0 });
  const [price, setPrice] = useState(initial?.price ?? "");
  const [paid, setPaid] = useState(initial?.paid ?? "");
  const [status, setStatus] = useState(initial?.status || "in_progress");
  const [fileLocation, setFileLocation] = useState(initial?.fileLocation || "computer");

 const canSubmit =
  clientName.trim() !== "" &&
  projectName.trim() !== "" &&
  deliveryDate !== "" &&
  price !== "" &&
  Number(price) >= 0;

function submit() {
  if (!clientName.trim()) {
    showToast("Please enter client name", "error");
    return;
  }

  if (!projectName.trim()) {
    showToast("Please enter project name", "error");
    return;
  }

  if (!deliveryDate) {
    showToast("Please select delivery date", "error");
    return;
  }

  if (price === "" || Number(price) < 0) {
    showToast("Please enter a valid price", "error");
    return;
  }

  onSubmit({
    clientName: clientName.trim(),
    projectName: projectName.trim(),
    projectDate,
    deliveryDate,
    files,
    price: Number(price),
    paid: Number(paid || 0),
    status,
    fileLocation
  });
}

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-end sm:items-center justify-center z-50" style={{ background: "rgba(38,36,32,0.4)" }}>
      <div className="bg-[#FFFDF8] rounded-t-[28px] sm:rounded-[28px] w-full sm:max-w-md max-h-[92vh] overflow-y-auto soft-shadow-lg">
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 bg-[#FFFDF8] z-10 rounded-t-[28px]">
          <h3 className="font-display font-semibold text-2xl">{initial ? "Edit project" : "New project"}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F1EBDA] text-[#8B8371] press"><X size={16} /></button>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div>
            <label className={labelCls}>Client name</label>
            <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Rhea Kapoor" />
          </div>
          <div>
            <label className={labelCls}>Project name</label>
            <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Wedding Film — Udaipur" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Project date</label>
              <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} type="date" value={projectDate} onChange={(e) => setProjectDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Delivery date</label>
              <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Deliverables</label>
            <div className="grid grid-cols-2 gap-2.5">
              {FILE_TYPES.map((f) => (
                <div key={f.key} className="flex items-center justify-between bg-[#FBF8F2] rounded-xl px-3.5 py-2.5 shadow-[inset_0_0_0_1px_#F1EBDA]">
                  <span className="text-xs text-[#8B8371]">{f.label}</span>
                  <input type="number" min="0" className="w-12 bg-transparent text-right font-mono text-sm text-[#262420] focus:outline-none" value={files[f.key]} onChange={(e) => setFiles((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Total price (₹)</label>
              <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="40000" />
            </div>
            <div>
              <label className={labelCls}>Amount paid (₹)</label>
              <input className={`${fieldCls} shadow-[inset_0_0_0_1px_#F1EBDA] focus:shadow-[inset_0_0_0_1.5px_#DCA84E]`} type="number" value={paid} onChange={(e) => setPaid(e.target.value)} placeholder="20000" />
            </div>
          </div>

          <div>
            <label className={labelCls}>Client file location</label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { value: "laptop", label: "Laptop" },
                { value: "computer", label: "Computer" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFileLocation(item.value)}
                  className="text-xs py-3 rounded-xl press"
                  style={{
                    background: fileLocation === item.value ? "#262420" : "#FBF8F2",
                    color: fileLocation === item.value ? "#FFFDF8" : "#8B8371",
                    boxShadow: fileLocation === item.value ? "0 4px 12px -4px rgba(38,36,32,0.35)" : "inset 0 0 0 1px #F1EBDA"
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-[#C9BE9E] mt-1.5">Where this client's files are stored.</div>
          </div>

          <div>
            <label className={labelCls}>Status</label>
            <div className="flex gap-2">
              {Object.entries(STATUS_META).map(([k, v]) => (
                <button key={k} onClick={() => setStatus(k)} className="flex-1 text-xs py-2.5 rounded-xl press" style={{ background: status === k ? v.color : "#FBF8F2", color: status === k ? "#FFFDF8" : "#8B8371", boxShadow: status === k ? `0 4px 12px -4px ${v.color}99` : "inset 0 0 0 1px #F1EBDA" }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 pt-1">
            {onDelete && <button onClick={onDelete} className="px-4 py-3.5 rounded-xl text-sm text-[#C4593F] bg-[#FBF0EC] press"><Trash2 size={16} /></button>}
            <button onClick={submit} disabled={!canSubmit} className="flex-1 font-medium text-sm py-3.5 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 press" style={{ background: "linear-gradient(135deg, #DCA84E, #B8842E)", color: "#FBF8F2", boxShadow: "0 8px 20px -8px rgba(184,132,46,0.6)" }}>
              {initial ? "Save changes" : "Add project"} <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
