import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "../AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Panel | Mira Cards",
  description: "Mira Cards Super Admin Control Panel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#FDFCFB",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <AdminSidebar user={{ name: session.user.name ?? "Admin", email: session.user.email ?? "" }} />

      <main className="admin-main-content" style={{
        flex: 1,
        minHeight: "100vh",
        overflowX: "hidden",
      }}>
        {children}
      </main>

      <style>{`
        /* Desktop: offset for fixed sidebar */
        .admin-main-content {
          margin-left: 260px;
          padding-top: 0;
        }
        /* Tablet / Mobile: no sidebar offset, add top bar clearance */
        @media (max-width: 1024px) {
          .admin-main-content {
            margin-left: 0 !important;
            padding-top: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
