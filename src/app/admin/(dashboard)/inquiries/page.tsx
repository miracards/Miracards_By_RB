"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MessageSquare, Search, CheckCircle, Eye, Clock, Send, XCircle, ChevronRight, X, Trash2 } from "lucide-react";

const GOLD = "#C9A227";
const NAVY = "#0B1D3A";
const BORDER = "#E7DFD4";

const STATUS_COLORS: Record<string, string> = { new: "#3B82F6", read: "#8B5CF6", replied: "#F59E0B", resolved: "#10B981" };
const STATUS_LABELS: Record<string, string> = { new: "New", read: "Read", replied: "Replied", resolved: "Resolved" };
const STATUS_ICONS: Record<string, React.ElementType> = { new: MessageSquare, read: Eye, replied: Send, resolved: CheckCircle };

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: string;
  adminNotes: string;
  source: string;
  createdAt: string;
}

const STATUS_TABS = ["all", "new", "read", "replied", "resolved"];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const limit = 15;

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ status: statusFilter, page: String(page), limit: String(limit) });
    const res = await fetch(`/api/admin/inquiries?${params}`);
    const data = await res.json();
    setInquiries(data.inquiries ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [statusFilter, page]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);
  useEffect(() => { setPage(1); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/inquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchInquiries();
    if (selected?._id === id) setSelected(s => s ? { ...s, status } : null);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/inquiries/${selected._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminNotes: notes }) });
    setSaving(false);
    setSelected(s => s ? { ...s, adminNotes: notes } : null);
  };

  const openInquiry = (inq: Inquiry) => {
    setSelected(inq);
    setNotes(inq.adminNotes || "");
    if (inq.status === "new") updateStatus(inq._id, "read");
  };

  const filtered = inquiries.filter(inq =>
    inq.name.toLowerCase().includes(search.toLowerCase()) ||
    inq.email.toLowerCase().includes(search.toLowerCase()) ||
    inq.interest.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="admin-page-wrap" style={{ width: "100%", boxSizing: "border-box" }}>
      <style>{`
        /* Layout */
        .admin-page-wrap {
          padding: 32px;
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .admin-page-wrap { padding: 16px !important; display: block !important; }
        }
        .inq-left { flex: 1; min-width: 0; }

        /* Sidebar panel — desktop sticky, mobile bottom-sheet */
        .inq-detail-panel {
          width: 400px;
          flex-shrink: 0;
          background: #FFF;
          border-radius: 16px;
          border: 1px solid ${BORDER};
          padding: 24px;
          position: sticky;
          top: 32px;
          max-height: calc(100vh - 64px);
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(11,29,58,0.04);
        }
        @media (max-width: 1024px) {
          .inq-detail-panel {
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            top: auto !important;
            width: 100% !important;
            max-height: 85vh !important;
            border-radius: 20px 20px 0 0 !important;
            z-index: 500 !important;
            box-shadow: 0 -8px 30px rgba(11,29,58,0.15) !important;
            border-bottom: none !important;
            overflow-y: auto !important;
          }
          .inq-detail-overlay {
            display: block !important;
          }
        }

        .premium-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid ${BORDER};
          border-radius: 10px;
          font-size: 13px;
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
          padding: 11px 14px 11px 38px;
          border: 1.5px solid ${BORDER};
          border-radius: 12px;
          font-size: 13px;
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
        .inq-row {
          border-bottom: 1px solid #F5F2EC;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .inq-row:hover {
          background: #FCFAF7;
        }
        .inq-row.selected {
          background: #F5F2EC !important;
        }
        .tab-filter-btn {
          padding: 6px 16px;
          border-radius: 20px;
          border: 1.5px solid ${BORDER};
          background: #FFF;
          color: #5F5F5F;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-transform: capitalize;
          transition: all 0.2s ease;
        }
        .tab-filter-btn:hover {
          border-color: ${GOLD};
          color: ${GOLD};
        }
        .tab-filter-btn.active {
          background: ${NAVY};
          border-color: ${NAVY};
          color: #FFF;
        }
        .action-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .action-link:hover {
          transform: translateY(-1px);
        }
        .save-notes-btn {
          margin-top: 8px;
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: ${GOLD};
          color: #FFF;
          border: none;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(201,162,39,0.2);
        }
        .save-notes-btn:hover {
          background: #A88414;
        }
        /* Mobile overlay under the panel */
        .inq-detail-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(11,29,58,0.4);
          backdrop-filter: blur(3px);
          z-index: 499;
        }
        /* Pull-handle hint on mobile panel */
        .inq-panel-handle {
          display: none;
          width: 40px; height: 4px;
          background: #CBD5E0; border-radius: 2px;
          margin: 0 auto 18px;
        }
        @media (max-width: 1024px) {
          .inq-panel-handle { display: block; }
        }
      `}</style>


      {/* Left Panel */}
      <div className="inq-left">
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: NAVY, margin: "0 0 4px" }}>Inquiries</h1>
          <p style={{ fontSize: "14px", color: "#5F5F5F", margin: 0, fontWeight: 500 }}>{total} total customer inquiries received</p>
        </div>

        {/* Status Tabs */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {STATUS_TABS.map(tab => {
            const isActive = statusFilter === tab;
            return (
              <button key={tab} onClick={() => setStatusFilter(tab)} className={`tab-filter-btn ${isActive ? "active" : ""}`}>
                {tab === "all" ? "All Inquiries" : tab}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <Search size={15} color="#5F5F5F" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or interest…" className="search-input" />
        </div>

        {/* Table Container */}
        <div style={{ background: "#FFF", borderRadius: "16px", border: `1px solid ${BORDER}`, overflowX: "auto", boxShadow: "0 4px 20px rgba(11,29,58,0.01)" }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
              <div style={{ width: "32px", height: "32px", border: "3px solid #F5F2EC", borderTopColor: GOLD, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <MessageSquare size={36} color="#CBD5E0" style={{ display: "block", margin: "0 auto 12px" }} />
              <p style={{ color: "#5F5F5F", fontSize: "14px", fontWeight: 500 }}>No inquiries matching your criteria.</p>
            </div>
          ) : (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F5F2EC", borderBottom: `1px solid ${BORDER}` }}>
                    {["Customer Details", "Interest", "Status", "Received Date", ""].map(h => (
                      <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#5F5F5F", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, i) => {
                    const Icon = STATUS_ICONS[inq.status] ?? Clock;
                    const isSelected = selected?._id === inq._id;
                    return (
                      <tr key={inq._id}
                        onClick={() => openInquiry(inq)}
                        className={`inq-row ${isSelected ? "selected" : ""}`}
                        style={{ borderLeft: isSelected ? `3px solid ${GOLD}` : "3px solid transparent" }}
                      >
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ fontWeight: inq.status === "new" ? 800 : 600, fontSize: "13px", color: NAVY }}>{inq.name}</div>
                          <div style={{ fontSize: "11px", color: "#5F5F5F", marginTop: "2px" }}>{inq.email}</div>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "13px", color: NAVY, fontWeight: 500 }}>{inq.interest}</td>
                        <td style={{ padding: "14px 18px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", background: `${STATUS_COLORS[inq.status] ?? "#CBD5E0"}12`, color: STATUS_COLORS[inq.status] ?? "#718096", border: `1.5px solid ${STATUS_COLORS[inq.status] ?? "#CBD5E0"}25` }}>
                            <Icon size={12} /> {STATUS_LABELS[inq.status] ?? inq.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "12px", color: "#5F5F5F", fontWeight: 500 }}>
                          {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <ChevronRight size={14} color="#A0AEC0" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "16px", borderTop: `1px solid ${BORDER}`, background: "#FCFAF7" }}>
                  {Array.from({ length: totalPages }, (_, i) => {
                    const isCurrent = page === i + 1;
                    return (
                      <button key={i} onClick={() => setPage(i + 1)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: `1.5px solid ${isCurrent ? GOLD : BORDER}`, background: isCurrent ? GOLD : "#FFF", color: isCurrent ? "#FFF" : NAVY, fontWeight: 700, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {selected && (
        <div
          className="inq-detail-overlay"
          onClick={() => setSelected(null)}
        />
      )}

      {/* Right Detail Panel */}
      {selected && (
        <div className="inq-detail-panel">
          {/* Mobile pull handle */}
          <div className="inq-panel-handle" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: NAVY, margin: 0, borderBottom: `2.5px solid ${GOLD}`, paddingBottom: "4px" }}>Inquiry Details</h3>

            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F", padding: "4px", display: "flex", alignItems: "center" }}><X size={18} /></button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            {[
              { label: "Customer Name", value: selected.name },
              { label: "Email Address", value: selected.email },
              { label: "Phone Number", value: selected.phone || "Not provided" },
              { label: "Interest Reference", value: selected.interest },
              { label: "Inquiry Source", value: selected.source },
              { label: "Date / Time", value: new Date(selected.createdAt).toLocaleString("en-IN") },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: "1px solid #FCFAF7", paddingBottom: "10px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{label}</div>
                <div style={{ fontSize: "13px", color: NAVY, fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Message Text</div>
            <div style={{ background: "#FCFAF7", borderRadius: "10px", padding: "14px", fontSize: "13px", color: NAVY, lineHeight: 1.6, whiteSpace: "pre-wrap", border: "1.5px solid #F5F2EC" }}>{selected.message}</div>
          </div>

          {/* Status buttons */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Change Status</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["new", "read", "replied", "resolved"].map(s => {
                const isActive = selected.status === s;
                return (
                  <button key={s} onClick={() => updateStatus(selected._id, s)} style={{
                    padding: "6px 14px", borderRadius: "20px", border: `1.5px solid ${isActive ? (STATUS_COLORS[s]) : BORDER}`,
                    background: isActive ? `${STATUS_COLORS[s]}10` : "#FFF",
                    color: isActive ? STATUS_COLORS[s] : "#5F5F5F",
                    fontSize: "12px", fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
                    transition: "all 0.2s",
                  }}>
                    {STATUS_LABELS[s] ?? s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin Notes */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Internal Admin Notes</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add private details or follow-up status..." className="premium-input" style={{ resize: "vertical", fontFamily: "inherit" }} />
            <button onClick={saveNotes} disabled={saving} className="save-notes-btn">
              {saving ? "Saving Notes…" : "Save Notes"}
            </button>
          </div>

          {/* Quick actions */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Actions</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href={`mailto:${selected.email}`} className="action-link" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
                <Send size={13} /> Email Client
              </a>
              {selected.phone && (
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="action-link" style={{ background: "#F0FDF4", color: "#10B981" }}>
                  WhatsApp
                </a>
              )}
              <button onClick={async () => { if (confirm("Delete this inquiry permanently?")) { await fetch(`/api/admin/inquiries/${selected._id}`, { method: "DELETE" }); setSelected(null); fetchInquiries(); } }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px 14px", borderRadius: "10px", background: "#FFF5F5", color: "#E53E3E", border: "none", fontSize: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
