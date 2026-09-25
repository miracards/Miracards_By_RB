"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, FolderOpen, Search, AlertCircle, Wand2 } from "lucide-react";

const GOLD = "#C9A227";
const NAVY = "#0B1D3A";
const BORDER = "#E7DFD4";

const MENU_CATEGORY_OPTIONS = [
  { value: "invitation-category", label: "Invitation Category", hint: "Wedding, Engagement, Babyshower, Katha, Pooja…" },
  { value: "welcome-board", label: "Welcome Board", hint: "Welcome Board, Swagat Patro…" },
  { value: "wedding-itinerary", label: "Wedding Itinerary", hint: "Bag, Tag, Holder, Cone, Sticker, Menu…" },
  { value: "video-invitation", label: "Video Invitation", hint: "Video, Digital, Animation, E-card…" },
];

/** Auto-detect menuCategory, type and style from title keywords */
function detectCategoryFromTitle(title: string): {
  menuCategory: string;
  type?: string;
  style?: string;
} {
  const t = title.toLowerCase();

  // Welcome Board keywords
  if (
    t.includes("welcome board") ||
    t.includes("welcomeboard") ||
    t.includes("swagat patro") ||
    t.includes("welcome patro")
  ) {
    return { menuCategory: "welcome-board", type: "Print" };
  }

  // Explicit Invitation Category keywords (overrides digital/video if specific ceremony mentioned like vastupujan)
  if (t.includes("vastupujan") || t.includes("vastu pujan") || t.includes("housewarming")) {
    return { menuCategory: "invitation-category" };
  }

  // Video Invitation keywords
  if (
    t.includes("video") ||
    t.includes("digital") ||
    t.includes("animation") ||
    t.includes("animated") ||
    t.includes("e-card") ||
    t.includes("ecard") ||
    t.includes("mp4") ||
    t.includes("whatsapp card")
  ) {
    return { menuCategory: "video-invitation", type: "Digital" };
  }

  // Wedding Itinerary / Accessories keywords
  if (
    t.includes("bag") ||
    t.includes("tag") ||
    t.includes("holder") ||
    t.includes("cone") ||
    t.includes("sticker") ||
    t.includes("hamper") ||
    t.includes("menu card") ||
    t.includes("luggage") ||
    t.includes("seating") ||
    t.includes("tote") ||
    t.includes("jute") ||
    t.includes("playing card") ||
    t.includes("ritual card") ||
    t.includes("petal") ||
    t.includes("money envelop") ||
    t.includes("money envelope") ||
    t.includes("key holder")
  ) {
    return { menuCategory: "wedding-itinerary", type: "Print" };
  }

  // Default → Invitation Category
  return { menuCategory: "invitation-category" };
}

interface Collection {
  _id: string;
  slug: string;
  title: string;
  type: string;
  style: string;
  count: string;
  isActive: boolean;
  coverImage: string;
  description: string;
  sortOrder: number;
  menuCategory: string;
}

interface FormData {
  slug: string;
  title: string;
  description: string;
  type: string;
  style: string;
  menuCategory: string;
  count: string;
  sortOrder: number;
}

const INITIAL_FORM: FormData = { slug: "", title: "", description: "", type: "Print", style: "Luxury", menuCategory: "invitation-category", count: "0 Designs", sortOrder: 0 };

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(11,29,58,0.4)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={onClose}>
      <div style={{ background: "#FFF", borderRadius: "20px", padding: "32px", maxWidth: "520px", width: "100%", border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(11,29,58,0.15)" }} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Input({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id} style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>{label}</label>
      <input id={id} {...props} className="premium-input" />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (val: string) => void; options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: "16px", position: "relative" }}>
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>{label}</label>
      
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "11px 14px",
          border: `1.5px solid ${isOpen ? GOLD : BORDER}`,
          borderRadius: "10px",
          fontSize: "14px",
          color: NAVY,
          background: "#FFF",
          outline: "none",
          boxSizing: "border-box",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          boxShadow: isOpen ? "0 0 0 3px rgba(201, 162, 39, 0.1)" : "none",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontWeight: 500 }}>{value}</span>
        <span style={{
          display: "inline-block",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          color: NAVY,
          fontSize: "10px",
        }}>
          ▼
        </span>
      </button>

      {/* Backdrop for closing */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            background: "transparent"
          }}
        />
      )}

      {/* Dropdown Options List */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "6px",
            background: "#FFF",
            border: `1px solid ${BORDER}`,
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(11,29,58,0.08)",
            zIndex: 999,
            maxHeight: "220px",
            overflowY: "auto",
            padding: "6px 0",
          }}
        >
          {options.map(opt => {
            const isSelected = opt === value;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#FFF" : NAVY,
                  background: isSelected ? GOLD : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#F5F2EC";
                    e.currentTarget.style.color = GOLD;
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = NAVY;
                  }
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CollectionsAdminPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");
  // Tracks auto-detected category so we can show the badge
  const [autoDetected, setAutoDetected] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/collections");
    const data = await res.json();
    setCollections(data.collections ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCollections(); }, [fetchCollections]);

  useEffect(() => {
    if (modalOpen || deleteId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, deleteId]);

  const openAdd = () => { setEditing(null); setForm(INITIAL_FORM); setAutoDetected(null); setError(""); setModalOpen(true); };
  const openEdit = (c: Collection) => {
    setEditing(c);
    setForm({ slug: c.slug, title: c.title, description: c.description, type: c.type, style: c.style, menuCategory: c.menuCategory || "invitation-category", count: c.count, sortOrder: c.sortOrder });
    setAutoDetected(null); setError(""); setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.slug || !form.title) { setError("Slug and title are required"); return; }
    setSaving(true); setError("");
    const url = editing ? `/api/admin/collections/${editing._id}` : "/api/admin/collections";
    const method = editing ? "PATCH" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setModalOpen(false); fetchCollections(); }
    else { const d = await res.json(); setError(d.error ?? "Failed to save"); }
  };

  const toggleActive = async (c: Collection) => {
    await fetch(`/api/admin/collections/${c._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !c.isActive }) });
    fetchCollections();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/collections/${deleteId}`, { method: "DELETE" });
    setDeleteId(null); fetchCollections();
  };

  const filtered = collections.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.slug.includes(search.toLowerCase()));

  return (
    <div className="admin-page-wrap" style={{ width: "100%", boxSizing: "border-box" }}>
      <style>{`
        .admin-page-wrap {
          padding: 32px;
        }
        @media (max-width: 768px) {
          .admin-page-wrap { padding: 16px !important; }
        }
        .premium-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          font-size: 14px;
          color: ${NAVY};
          background: #FDFCFB;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .premium-input:focus {
          border-color: ${GOLD};
          background: #FFF;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
        }
        .search-input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1.5px solid ${BORDER};
          border-radius: 12px;
          font-size: 14px;
          color: ${NAVY};
          background: #FFF;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .search-input:focus {
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
        }
        .gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${GOLD};
          color: #FFF;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(201,162,39,0.25);
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .gold-btn:hover {
          background: #A88414;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(201,162,39,0.35);
        }
        .gold-btn:active { transform: translateY(0); }
        .table-container {
          background: #FFF;
          border-radius: 16px;
          border: 1px solid ${BORDER};
          overflow-x: auto;
          box-shadow: 0 4px 20px rgba(11,29,58,0.01);
        }
        .table-row { transition: background 0.15s ease; }
        .table-row:hover { background: #FCFAF7; }
        .action-btn {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px; border: none;
          cursor: pointer; transition: all 0.2s ease; text-decoration: none;
        }
        .action-btn:hover { transform: translateY(-1px); }
        /* Mobile card view */
        .col-desktop-table { display: block; }
        .col-mobile-cards  { display: none; }
        .col-card {
          background: #FFF; border-radius: 14px; border: 1px solid ${BORDER};
          padding: 16px; margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(11,29,58,0.02);
          transition: box-shadow 0.2s;
        }
        .col-card:hover { box-shadow: 0 4px 16px rgba(11,29,58,0.06); }
        @media (max-width: 768px) {
          .col-desktop-table { display: none !important; }
          .col-mobile-cards  { display: block !important; }
          .search-wrap { max-width: 100% !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: NAVY, margin: "0 0 4px" }}>Collections</h1>
          <p style={{ fontSize: "14px", color: "#5F5F5F", margin: 0 }}>Manage all collection categories and sub-categories</p>
        </div>
        <button onClick={openAdd} className="gold-btn">
          <Plus size={16} /> Add Collection
        </button>
      </div>

      {/* Search */}
      <div className="search-wrap" style={{ position: "relative", marginBottom: "24px", maxWidth: "380px" }}>
        <Search size={16} color="#5F5F5F" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          value={search} onChange={e => setSearch(e.target.value)} placeholder="Search collections…"
          className="search-input"
        />
      </div>

      {/* Desktop Table */}
      {!loading && filtered.length > 0 && (
        <div className="col-desktop-table table-container">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5F2EC", borderBottom: `1px solid ${BORDER}` }}>
                {["Title / Slug", "Menu Category", "Type", "Style", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#5F5F5F", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const isPrint = c.type === "Print";
                return (
                  <tr key={c._id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? `1px solid #F5F2EC` : "none" }}>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: NAVY }}>{c.title}</div>
                      <div style={{ fontSize: "11px", color: "#5F5F5F", marginTop: "2px" }}>{c.slug}</div>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#FFF7E6", color: "#C9A227", border: "1.5px solid #F5DFA0" }}>
                        {MENU_CATEGORY_OPTIONS.find(o => o.value === c.menuCategory)?.label || "Invitation Category"}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: isPrint ? "#EFF6FF" : "#F0FDF4", color: isPrint ? "#3B82F6" : "#10B981", border: `1.5px solid ${isPrint ? "#BFDBFE" : "#BBF7D0"}` }}>
                        {c.type}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: "#FDFCFB", color: NAVY, border: `1.5px solid ${BORDER}` }}>
                        {c.style}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <button onClick={() => toggleActive(c)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", outline: "none" }}>
                        <div style={{ width: "42px", height: "22px", borderRadius: "11px", background: c.isActive ? "#10B981" : "#E2E8F0", position: "relative", transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)", border: `1.5px solid ${c.isActive ? "#10B981" : "#CBD5E0"}`, boxShadow: c.isActive ? "0 2px 8px rgba(16,185,129,0.2)" : "none" }}>
                          <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#FFF", position: "absolute", top: "2.5px", left: c.isActive ? "23px" : "3px", transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 1px 3px rgba(11,29,58,0.15)" }} />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: c.isActive ? "#10B981" : "#718096", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {c.isActive ? "Active" : "Hidden"}
                        </span>
                      </button>
                    </td>
                    <td style={{ padding: "16px 18px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <Link href={`/admin/collections/${c._id}`} title="Manage sub-categories & images" className="action-btn" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
                          <FolderOpen size={15} />
                        </Link>
                        <button onClick={() => openEdit(c)} className="action-btn" style={{ background: `${GOLD}15`, color: GOLD }}>
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => setDeleteId(c._id)} className="action-btn" style={{ background: "#FFF5F5", color: "#E53E3E" }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {!loading && filtered.length > 0 && (
        <div className="col-mobile-cards">
          {filtered.map((c) => {
            const isPrint = c.type === "Print";
            return (
              <div key={c._id} className="col-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: NAVY, marginBottom: "2px" }}>{c.title}</div>
                    <div style={{ fontSize: "11px", color: "#5F5F5F" }}>{c.slug}</div>
                  </div>
                  {/* Active toggle */}
                  <button onClick={() => toggleActive(c)} style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    <div style={{ width: "36px", height: "20px", borderRadius: "10px", background: c.isActive ? "#10B981" : "#E2E8F0", position: "relative", transition: "all 0.25s", border: `1.5px solid ${c.isActive ? "#10B981" : "#CBD5E0"}` }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFF", position: "absolute", top: "2px", left: c.isActive ? "19px" : "2px", transition: "all 0.25s" }} />
                    </div>
                  </button>
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: isPrint ? "#EFF6FF" : "#F0FDF4", color: isPrint ? "#3B82F6" : "#10B981", border: `1px solid ${isPrint ? "#BFDBFE" : "#BBF7D0"}` }}>{c.type}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: "#FDFCFB", color: NAVY, border: `1px solid ${BORDER}` }}>{c.style}</span>
                  <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: "#F5F2EC", color: "#5F5F5F" }}>{c.count}</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", background: c.isActive ? "#F0FDF4" : "#FFF5F5", color: c.isActive ? "#10B981" : "#E53E3E" }}>
                    {c.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href={`/admin/collections/${c._id}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "8px", background: "#EFF6FF", color: "#3B82F6", textDecoration: "none", fontSize: "12px", fontWeight: 600 }}>
                    <FolderOpen size={13} /> Manage
                  </Link>
                  <button onClick={() => openEdit(c)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "8px", background: `${GOLD}15`, color: GOLD, border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                    <Edit2 size={13} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(c._id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px", borderRadius: "8px", background: "#FFF5F5", color: "#E53E3E", border: "none", cursor: "pointer" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: NAVY, margin: "0 0 24px" }}>
          {editing ? "Edit Collection" : "Add New Collection"}
        </h2>
        <Input
          label="Title *"
          id="col-title"
          value={form.title}
          onChange={e => {
            const val = e.target.value;
            const generatedSlug = val.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            // Auto-detect category only when adding new (not editing existing)
            if (!editing) {
              const detected = detectCategoryFromTitle(val);
              const changed = detected.menuCategory !== form.menuCategory;
              setAutoDetected(val.trim().length > 3 ? detected.menuCategory : null);
              setForm(f => ({
                ...f,
                title: val,
                slug: generatedSlug,
                menuCategory: val.trim().length > 3 ? detected.menuCategory : f.menuCategory,
                ...(changed && detected.type ? { type: detected.type } : {}),
              }));
            } else {
              setForm(f => ({ ...f, title: val, slug: generatedSlug }));
            }
          }}
          placeholder="e.g. Wedding Invitation"
        />
        <Input label="Slug *" id="col-slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase() }))} placeholder="e.g. wedding-invitation" />
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="col-desc" style={{ display: "block", fontSize: "13px", fontWeight: 600, color: NAVY, marginBottom: "6px" }}>Description</label>
          <textarea id="col-desc" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description shown on collection card" className="premium-input" style={{ minHeight: "80px", fontFamily: "inherit", resize: "vertical" }} />
        </div>
        <div style={{ marginBottom: "16px" }}>
          {/* Label row with auto-detected badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <label style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>Menu Category *</label>
            {!editing && autoDetected && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                fontSize: "10px", fontWeight: 700, color: "#059669",
                background: "#ECFDF5", border: "1px solid #BBF7D0",
                borderRadius: "20px", padding: "2px 8px",
              }}>
                <Wand2 size={9} /> Auto-detected
              </span>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {MENU_CATEGORY_OPTIONS.map(opt => {
              const isSelected = form.menuCategory === opt.value;
              const isAutoThis = autoDetected === opt.value && !editing;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setForm(f => ({ ...f, menuCategory: opt.value })); setAutoDetected(null); }}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: `1.5px solid ${isSelected ? GOLD : isAutoThis ? "#34D399" : BORDER}`,
                    background: isSelected ? `${GOLD}15` : isAutoThis ? "#F0FDF4" : "#FDFCFB",
                    color: isSelected ? GOLD : NAVY,
                    fontSize: "13px",
                    fontWeight: isSelected ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                  }}
                >
                  <div>{opt.label}</div>
                  <div style={{ fontSize: "10px", color: isSelected ? GOLD : "#9CA3AF", marginTop: "2px", fontWeight: 400, lineHeight: 1.3 }}>
                    {opt.hint}
                  </div>
                </button>
              );
            })}
          </div>
          {!editing && (
            <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "6px", margin: "6px 0 0" }}>
              💡 Category title type karte hi auto-select hoti hai — zaroorat ho to manually change karein.
            </p>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Select label="Type *" value={form.type} onChange={val => setForm(f => ({ ...f, type: val }))} options={["Print", "Digital"]} />
          <Select label="Style *" value={form.style} onChange={val => setForm(f => ({ ...f, style: val }))} options={["Traditional", "Luxury", "Modern"]} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Input label="Count Label" id="col-count" value={form.count} onChange={e => setForm(f => ({ ...f, count: e.target.value }))} placeholder="30+ Designs" />
          <Input label="Sort Order" id="col-sort" type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: +e.target.value }))} />
        </div>
        {error && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", background: "#FFF5F5", border: "1px solid #FED7D7", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", fontSize: "13px", color: "#C53030" }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
          <button onClick={() => setModalOpen(false)} style={{ padding: "10px 20px", borderRadius: "10px", border: "1.5px solid #E2E8F0", background: "#FFF", color: NAVY, fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} className="gold-btn" style={{ borderRadius: "10px", padding: "10px 24px" }}>
            {saving ? "Saving…" : editing ? "Save Changes" : "Create Collection"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div style={{ textAlign: "center" }}>
          <Trash2 size={40} color="#E53E3E" style={{ display: "block", margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: NAVY, marginBottom: "12px" }}>Delete Collection?</h2>
          <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.6, marginBottom: "24px" }}>
            This will permanently delete the collection, all its sub-categories, and all card images. This action cannot be undone.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => setDeleteId(null)} style={{ padding: "10px 20px", borderRadius: "10px", border: "1.5px solid #E2E8F0", background: "#FFF", color: NAVY, fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Cancel</button>
            <button onClick={handleDelete} style={{ padding: "10px 24px", borderRadius: "10px", background: "#E53E3E", color: "#FFF", border: "none", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
