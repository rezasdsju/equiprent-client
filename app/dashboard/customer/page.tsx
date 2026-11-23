import Link from "next/link"
import { CalendarCheck, DollarSign, Heart, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getRentalOfCustomer } from "@/lib/api/rental"
import { getFavouritesForCustomer } from "@/lib/api/favourite"
import { getSession } from "@/lib/core/server"
import type { IBooking } from "@/types/bookingTypes"

const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    confirmed: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
}

const CustomerDashboardPage = async () => {
    const [session, rentals, favourites] = await Promise.all([
        getSession(),
        getRentalOfCustomer() as Promise<IBooking[]>,
        getFavouritesForCustomer(),
    ])

    const totalSpent = rentals
        .filter((r) => r.paymentStatus === "paid")
        .reduce((sum, r) => sum + r.totalAmount, 0)

    const recent = rentals.slice(0, 3)

    const stats = [
        { label: "Total Rentals", value: rentals.length, icon: CalendarCheck },
        { label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, icon: DollarSign },
        { label: "Favorites", value: favourites.length, icon: Heart },
    ]

    return (
        <section className="space-y-6 px-3 py-6 sm:px-4 sm:py-10">
            <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                    Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Here is a quick look at your activity.
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm">
                        <span className="rounded-full bg-primary/10 p-3 text-primary">
                            <Icon className="size-6" />
                        </span>
                        <div>
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <p className="text-2xl font-bold">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent rentals */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Recent Rentals</h3>
                    <Link
                        href="/dashboard/customer/my-rentals"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                        View all <ArrowRight className="size-4" />
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <p className="py-6 text-center text-muted-foreground">
                        No rentals yet. Start by browsing equipment.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {recent.map((r) => (
                            <li
                                key={r._id}
                                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{r.equipmentName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDate(r.startDate)} – {formatDate(r.endDate)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">
                                        ${r.totalAmount.toLocaleString()}
                                    </span>
                                    <Badge variant="secondary" className={`capitalize ${statusStyles[r.paymentStatus] ?? ""}`}>
                                        {r.paymentStatus}
                                    </Badge>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-3">
                <Button nativeButton={false} render={<Link href="/all-equipments" />}>
                    Browse Equipment
                </Button>
                <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/dashboard/customer/my-favourites" />}
                >
                    My Favorites
                </Button>
                <Button
                    variant="outline"
                    nativeButton={false}
                    render={<Link href="/dashboard/customer/profile" />}
                >
                    Profile
                </Button>
            </div>
        </section>
    )
}

export default CustomerDashboardPage