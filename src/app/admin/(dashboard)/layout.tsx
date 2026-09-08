import { AdminSidebar, AdminMobileNav } from "@/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminMobileNav />
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-10 sm:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
