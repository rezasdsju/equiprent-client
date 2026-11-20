'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import {
  ClipboardList,
    FileText,
    Heart,
    LayoutDashboard,
    Package,
    PlusCircle,
    Search,
    Settings,
    User,
    Users,
} from "lucide-react"
import Link from "next/link"

const menuItemsByRole = {
    customer: [
        { name: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard },
        { name: "Browse Equipment", url: "/all-equipments", icon: Search },
        { name: "My Rentals", url: "/dashboard/customer/rentals", icon: FileText },
        { name: "Favorites", url: "/dashboard/customer/favorites", icon: Heart },
        { name: "My Profile", url: "/dashboard/customer/profile", icon: User },
    ],
    owner: [
        { name: "Dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
        { name: "Add Equipment", url: "/dashboard/owner/add-equipment", icon: PlusCircle },
        { name: "My Equipment", url: "/dashboard/owner/my-equipment", icon: Package },
        { name: "My Equipment Rental", url: "/dashboard/owner/rentals", icon: ClipboardList },
        { name: "My Profile", url: "/dashboard/owner/profile", icon: User },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "All Users", url: "/dashboard/admin/users", icon: Users },
        { name: "All Equipment", url: "/dashboard/admin/equipments", icon: Settings },
        { name: "All Rentals", url: "/dashboard/admin/rentals", icon: ClipboardList },
        { name: "My Profile", url: "/dashboard/admin/profile", icon: User },
    ],
}

export default function DashboardSideBar() {
    const { data: session } = authClient.useSession()
    const role = session?.user?.role || 'customer'
    return (
        <Sidebar className="my-5">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}