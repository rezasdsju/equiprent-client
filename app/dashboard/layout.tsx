import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "../components/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background px-4">
                    <SidebarTrigger />
                </header>
                <div className="min-w-0 flex-1 px-3 py-6 sm:px-4 sm:py-8">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}