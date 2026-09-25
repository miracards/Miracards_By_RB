"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { MessageSquare, FolderOpen, Image as ImageIcon, Bell, TrendingUp, Clock, ArrowUpRight, Eye } from "lucide-react";

const GOLD = "#C9A227";
const NAVY = "#0B1D3A";
const BORDER = "#E7DFD4";

const STATUS_COLORS: Record<string, string> = {
  new: "#3B82F6", read: "#8B5CF6", replied: "#F59E0B", resolved: "#10B981",
};
const STATUS_LABELS: Record<string, string> = {
  new: "New", read: "Read", replied: "Replied", resolved: "Resolved",
};

interface Analytics {
  kpis: {
    totalInquiries: number;
    newInquiries: number;
    totalCollections: number;
    totalImages: number;
    totalViews30d: number;
  };
  statusBreakdown: { status: string; count: number }[];
  monthlyCounts: { month: string; count: number }[];
  topCollections: { name: string; count: number }[];
  topViewedSlugs: { slug: string; views: number }[];
  dailyViews: { date: string; views: number }[];
  recentInquiries: { _id: string; name: string; email: string; interest: string; status: string; createdAt: string }[];
}

function KpiCard({ label, value, icon: Icon, color, sub }: { label: string; value: number; icon: React.ElementType; color: string; sub?: string }) {
  return (
    <div className="dashboard-card kpi-card" style={{
      background: "#FFF", borderRadius: "16px", padding: "24px",
      border: `1px solid ${BORDER}`,
      display: "flex", alignItems: "flex-start", gap: "16px",
    }}>
      <div style={{
        width: "48px", height: "48px", borderRadius: "12px",
        background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontSize: "13px", color: "#5F5F5F", fontWeight: 500, marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "28px", fontWeight: 800, color: NAVY, lineHeight: 1 }}>{value.toLocaleString()}</div>
        {sub && <div style={{ fontSize: "11px", color, marginTop: "6px", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}><ArrowUpRight size={12} />{sub}</div>}
      </div>
    </div>
  );
}

function formatMonth(m: string) {
  const [y, mo] = m.split("-");
  return new Date(+y, +mo - 1).toLocaleString("default", { month: "short", year: "2-digit" });
}

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getDate()}/${dt.getMonth() + 1}`;
}

function slugToLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #F5F2EC", borderTopColor: GOLD, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#5F5F5F", fontSize: "14px", fontWeight: 500 }}>Loading analytics…</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="admin-page-wrap" style={{ width: "100%", boxSizing: "border-box" }}>
      <style>{`
        .admin-page-wrap { padding: 32px; }
        @media (max-width: 768px) { .admin-page-wrap { padding: 16px !important; } }

        .dashboard-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(11,29,58,0.05); border-color: ${GOLD} !important; }
        .chart-container-card {
          background: #FFF; border-radius: 20px; padding: 24px;
          border: 1px solid ${BORDER};
          box-shadow: 0 4px 20px rgba(11,29,58,0.01);
          transition: all 0.3s ease;
        }
        .chart-container-card:hover { box-shadow: 0 8px 30px rgba(11,29,58,0.03); border-color: ${GOLD}40; }
        .activity-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 12px;
          background: #FCFAF7; border: 1px solid #F5F2EC;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .activity-item:hover { background: #F5F2EC; border-color: ${BORDER}; transform: translateX(4px); }
        .dash-grid-5 { display: grid; grid-template-columns: repeat(5,1fr); gap: 20px; margin-bottom: 28px; }
        .dashboard-grid-1-1 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .dashboard-grid-1-1-1 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        @media (max-width: 1280px) { .dash-grid-5 { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 1024px) {
          .dash-grid-5 { grid-template-columns: repeat(2,1fr); }
          .dashboard-grid-1-1,.dashboard-grid-1-1-1 { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) { .dash-grid-5 { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>Dashboard</h1>
        <p style={{ fontSize: "14px", color: "#5F5F5F", margin: 0 }}>Welcome back! Here's what's happening with Mira Cards today.</p>
      </div>

      {/* KPI Row — 5 cards */}
      <div className="dash-grid-5">
        <KpiCard label="Total Inquiries"    value={data.kpis.totalInquiries}   icon={MessageSquare} color="#3B82F6" />
        <KpiCard label="New Inquiries"      value={data.kpis.newInquiries}     icon={Bell}          color="#EF4444" sub="Needs attention" />
        <KpiCard label="Page Views (30d)"   value={data.kpis.totalViews30d}    icon={Eye}           color="#8B5CF6" sub="Collection pages" />
        <KpiCard label="Collections"        value={data.kpis.totalCollections} icon={FolderOpen}    color={GOLD} />
        <KpiCard label="Card Images"        value={data.kpis.totalImages}      icon={ImageIcon}     color="#10B981" />
      </div>

      {/* Row 1: Monthly Inquiries + Daily Page Views */}
      <div className="dashboard-grid-1-1">
        <div className="chart-container-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <TrendingUp size={18} color={GOLD} />
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: 0 }}>Monthly Inquiries (12 mo)</h2>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={data.monthlyCounts.map((m) => ({ ...m, month: formatMonth(m.month) }))}>
              <defs>
                <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={GOLD}  stopOpacity={0.25} />
                  <stop offset="95%" stopColor={GOLD}  stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F2EC" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5F5F5F" }} stroke={BORDER} />
              <YAxis tick={{ fontSize: 11, fill: "#5F5F5F" }} stroke={BORDER} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: `1px solid ${BORDER}`, fontSize: "13px", color: NAVY }} />
              <Area type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2.5} fillOpacity={1} fill="url(#colorInq)" name="Inquiries" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Eye size={18} color="#8B5CF6" />
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: 0 }}>Daily Page Views (30d)</h2>
          </div>
          {data.dailyViews.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "210px", color: "#A0AEC0", fontSize: "13px", textAlign: "center" }}>
              No data yet — browse collection pages to start tracking
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={data.dailyViews.map((d) => ({ ...d, date: formatDate(d.date) }))}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F2EC" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#5F5F5F" }} stroke={BORDER} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: "#5F5F5F" }} stroke={BORDER} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: `1px solid ${BORDER}`, fontSize: "13px", color: NAVY }} />
                <Area type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" name="Views" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Row 2: Top Inquiries + Top Viewed + Status Pie */}
      <div className="dashboard-grid-1-1-1">
        <div className="chart-container-card">
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: "0 0 20px" }}>Top by Inquiries</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.topCollections} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F2EC" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#5F5F5F" }} stroke={BORDER} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#5F5F5F" }} width={100} stroke={BORDER} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: `1px solid ${BORDER}`, fontSize: "13px" }} />
              <Bar dataKey="count" fill={GOLD} radius={[0, 8, 8, 0]} name="Inquiries" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container-card">
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: "0 0 20px" }}>Top Viewed (30d)</h2>
          {data.topViewedSlugs.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "#A0AEC0", fontSize: "13px" }}>
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.topViewedSlugs.map((v) => ({ name: slugToLabel(v.slug), views: v.views }))} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F2EC" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#5F5F5F" }} stroke={BORDER} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#5F5F5F" }} width={100} stroke={BORDER} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: `1px solid ${BORDER}`, fontSize: "13px" }} />
                <Bar dataKey="views" fill="#8B5CF6" radius={[0, 8, 8, 0]} name="Page Views" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-container-card">
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: "0 0 20px" }}>Inquiry Status</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={data.statusBreakdown} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={4}>
                {data.statusBreakdown.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#CBD5E0"} style={{ outline: "none" }} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, STATUS_LABELS[n as string] ?? n]} contentStyle={{ borderRadius: "12px", border: `1px solid ${BORDER}`, fontSize: "13px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px", justifyContent: "center" }}>
            {data.statusBreakdown.map((s) => (
              <span key={s.status} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: NAVY }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: STATUS_COLORS[s.status] ?? "#CBD5E0", display: "inline-block" }} />
                {STATUS_LABELS[s.status] ?? s.status}: <strong>{s.count}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Inquiries */}
      <div className="chart-container-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Clock size={16} color={GOLD} />
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: NAVY, margin: 0 }}>Recent Inquiries</h2>
          </div>
          <a href="/admin/inquiries" style={{ fontSize: "13px", color: GOLD, fontWeight: 700, textDecoration: "none" }}>View all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
          {data.recentInquiries.length === 0 ? (
            <p style={{ color: "#5F5F5F", fontSize: "14px", textAlign: "center", padding: "20px 0", gridColumn: "1/-1" }}>No inquiries yet</p>
          ) : data.recentInquiries.map((inq) => (
            <div key={inq._id} className="activity-item">
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}>{inq.name}</div>
                <div style={{ fontSize: "11px", color: "#5F5F5F", marginTop: "2px" }}>{inq.interest}</div>
              </div>
              <span style={{
                fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
                background: `${STATUS_COLORS[inq.status] ?? "#CBD5E0"}15`,
                color: STATUS_COLORS[inq.status] ?? "#5F5F5F",
                border: `1.5px solid ${STATUS_COLORS[inq.status] ?? "#CBD5E0"}30`,
              }}>
                {STATUS_LABELS[inq.status] ?? inq.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
