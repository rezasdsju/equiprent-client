import Link from "next/link"
import {
    ArrowRight,
    CalendarDays,
    ClipboardList,
    Clock3,
    Package,
    ShieldCheck,
    Users,
    Wallet,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getEquipmentsByAdminVerification } from "@/lib/api/equipments"
import { getAllRentals } from "@/lib/api/rental"
import { getUsers } from "@/lib/api/users"
import { getSession } from "@/lib/core/server"
import type { IBooking } from "@/types/bookingTypes"
import type { IEquipment } from "@/types/equipmentTypes"
import type { IUser } from "@/types/userTypes"

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
})

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    failed: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
    refunded: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    confirmed: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
}

const AdminDashboardPage = async () => {
    const [users, equipments, rentals, session] = await Promise.all([
        getUsers() as Promise<IUser[]>,
        getEquipmentsByAdminVerification() as Promise<IEquipment[]>,
        getAllRentals() as Promise<IBooking[]>,
        getSession(),
    ])

    const pendingApprovals = equipments.filter(
        (equipment) => equipment.approvalStatus === "pending"
    ).length
    const pendingRentals = rentals.filter(
        (rental) => rental.bookingStatus === "pending"
    ).length
    const paidRevenue = rentals
        .filter((rental) => rental.paymentStatus === "paid")
        .reduce((total, rental) => total + rental.totalAmount, 0)
    const recentRentals = [...rentals]
        .sort(
            (a, b) =>
                new Date(b.bookingDate).getTime() -
                new Date(a.bookingDate).getTime()
        )
        .slice(0, 5)

    const stats = [
        {
            label: "Total Users",
            value: users.length.toLocaleString(),
            description: "Registered marketplace accounts",
            icon: Users,
            iconStyle: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
        },
        {
            label: "Equipment Listings",
            value: equipments.length.toLocaleString(),
            description: "Listings across the marketplace",
            icon: Package,
            iconStyle: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
        },
        {
            label: "Pending Approvals",
            value: pendingApprovals.toLocaleString(),
            description: "Equipment waiting for review",
            icon: ShieldCheck,
            iconStyle: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
        },
        {
            label: "Total Rentals",
            value: rentals.length.toLocaleString(),
            description: "Bookings recorded",
            icon: ClipboardList,
            iconStyle: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
        },
        {
            label: "Pending Bookings",
            value: pendingRentals.toLocaleString(),
            description: "Bookings awaiting action",
            icon: Clock3,
            iconStyle: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
        },
        {
            label: "Paid Revenue",
            value: currencyFormatter.format(paidRevenue),
            description: "Total from paid rentals",
            icon: Wallet,
            iconStyle: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
        },
    ]

    const quickLinks = [
        {
            title: "Manage Users",
            description: "Review accounts and manage user roles.",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            title: "Review Equipment",
            description: "Approve or reject submitted listings.",
            href: "/dashboard/admin/all-equipment",
            icon: Package,
        },
        {
            title: "Manage Rentals",
            description: "View and update rental bookings.",
            href: "/dashboard/admin/all-rentals",
            icon: CalendarDays,
        },
    ]

    return (
        <main className="space-y-7">
            <section>
                <p className="text-sm font-medium text-primary">
                    Administration
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    Welcome back
                    {session?.user?.name ? `, ${session.user.name}` : ""}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Here is an overview of EquipRent and its latest activity.
                </p>
            </section>

            <section
                aria-label="Marketplace statistics"
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
                {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <Card key={stat.label}>
                            <CardContent className="flex items-center gap-4 p-5">
                                <span
                                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                                >
                                    <Icon className="size-6" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </p>
                                    <p className="mt-1 truncate text-2xl font-bold">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </section>

            <section className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold">Quick Access</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Jump to common administration tasks.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {quickLinks.map((item) => {
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <Card className="h-full transition-colors group-hover:border-primary/50">
                                    <CardContent className="flex h-full items-start gap-4 p-5">
                                        <span className="rounded-lg bg-primary/10 p-3 text-primary">
                                            <Icon className="size-5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </section>

            <Card>
                <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <CardTitle>Recent Rentals</CardTitle>
                            <CardDescription className="mt-1">
                                The latest bookings across the marketplace.
                            </CardDescription>
                        </div>
                        <Link
                            href="/dashboard/admin/all-rentals"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                            View all <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentRentals.length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-center">
                            <CalendarDays className="size-9 text-muted-foreground" />
                            <p className="mt-3 font-medium">No rentals yet</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                New bookings will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {recentRentals.map((rental) => (
                                <div
                                    key={rental._id}
                                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">
                                            {rental.equipmentName}
                                        </p>
                                        <p className="mt-1 truncate text-sm text-muted-foreground">
                                            {rental.customer.name} ·{" "}
                                            {formatDate(rental.bookingDate)}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-semibold">
                                            {currencyFormatter.format(
                                                rental.totalAmount
                                            )}
                                        </span>
                                        <Badge
                                            variant="secondary"
                                            className={`capitalize ${statusStyles[rental.bookingStatus] ?? ""}`}
                                        >
                                            {rental.bookingStatus}
                                        </Badge>
                                        <Badge
                                            variant="secondary"
                                            className={`capitalize ${statusStyles[rental.paymentStatus] ?? ""}`}
                                        >
                                            {rental.paymentStatus}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}

export default AdminDashboardPage
