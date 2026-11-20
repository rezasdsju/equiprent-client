// app/dashboard/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="mx-auto max-w-7xl relative flex w-full min-h-screen">
                <DashboardSidebar />
                <main className="flex-1 min-w-0">
                    <SidebarTrigger />
                    <div className="px-4 py-6">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    )
}