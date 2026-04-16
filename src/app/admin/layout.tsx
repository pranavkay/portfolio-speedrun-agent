import { ReactNode } from "react";
import { ContentProvider } from "@/components/admin/ContentProvider";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-cinema-950 text-gray-100">
        <AdminNav />
        <main className="max-w-5xl mx-auto px-6 py-12">{children}</main>
      </div>
    </ContentProvider>
  );
}
