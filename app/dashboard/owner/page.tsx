

import { getRentalsOfOwner } from "@/lib/api/rental"
import type { IEquipment } from "@/types/equipmentTypes"
import type { IBooking } from "@/types/bookingTypes"
import {
    Package,
    CheckCircle2,
    Clock3,
    CalendarDays,
    Wallet,
    TrendingUp,
} from "lucide-react"
import { getMyEquipment } from "@/lib/api/equipments"

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
})

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const MyOwnerDashboard = async () => {
    const [equipments, rentals]: [IEquipment[], IBooking[]] =
        await Promise.all([
            getMyEquipment(),
            getRentalsOfOwner(),
        ])

    const totalEquipment = equipments.length

    const availableEquipment = equipments.filter(
        (equipment) => equipment.availableQuantity > 0
    ).length

    const pendingApprovals = equipments.filter(
        (equipment) => equipment.approvalStatus === "pending"
    ).length

    const totalRentals = rentals.length

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
            title: "Total Equipment",
            value: totalEquipment,
            description: "Equipment listed by you",
            icon: Package,
            iconStyle: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
        },
        {
            title: "Available Equipment",
            value: availableEquipment,
            description: "Currently available to rent",
            icon: CheckCircle2,
            iconStyle: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
        },
        {
            title: "Pending Approvals",
            value: pendingApprovals,
            description: "Waiting for admin approval",
            icon: Clock3,
            iconStyle: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
        },
        {
            title: "Total Rentals",
            value: totalRentals,
            description: "Bookings for your equipment",
            icon: CalendarDays,
            iconStyle: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
        },
        {
            title: "Paid Revenue",
            value: currencyFormatter.format(paidRevenue),
            description: "Total amount from paid bookings",
            icon: Wallet,
            iconStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
        },
    ]

    const getPaymentStyle = (status: IBooking["paymentStatus"]) => {
        if (status === "paid") return "bg-green-100 text-green-700"
        if (status === "failed" || status === "refunded") {
            return "bg-red-100 text-red-700"
        }
        return "bg-yellow-100 text-yellow-700"
    }

    const getBookingStyle = (status: IBooking["bookingStatus"]) => {
        if (status === "confirmed" || status === "completed") {
            return "bg-green-100 text-green-700"
        }
        if (status === "cancelled") return "bg-red-100 text-red-700"
        return "bg-yellow-100 text-yellow-700"
    }

    return (
        <div className="w-full space-y-7">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Owner Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Overview of your equipment and rental activities.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <div
                            key={stat.title}
                            className="flex min-w-0 items-center gap-4 rounded-xl border bg-card p-5 shadow-sm"
                        >
                            <div
                                className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${stat.iconStyle}`}
                            >
                                <Icon className="size-6" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    {stat.title}
                                </p>
                                <h2 className="mt-1 wrap-break-word text-2xl font-bold">
                                    {stat.value}
                                </h2>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Rentals */}
            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <h2 className="text-xl font-bold">
                            Recent Rental Bookings
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Latest bookings for your equipment.
                        </p>
                    </div>

                    <TrendingUp className="size-5 text-muted-foreground" />
                </div>

                {recentRentals.length === 0 ? (
                    <div className="rounded-xl border bg-card px-4 py-14 text-center">
                        <CalendarDays className="mx-auto size-10 text-muted-foreground" />
                        <h3 className="mt-3 font-semibold">
                            No Rental Bookings Yet
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your equipment rental bookings will appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden overflow-x-auto rounded-xl border lg:block">
                            <table className="w-full min-w-200 text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="text-left">
                                        <th className="px-5 py-4 font-semibold">
                                            Customer
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Equipment
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Booking Date
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Amount
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Payment
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Booking
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {recentRentals.map((rental) => (
                                        <tr
                                            key={rental._id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {rental.customer.name}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {rental.customer.email}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 font-medium">
                                                {rental.equipmentName}
                                            </td>

                                            <td className="px-5 py-4 whitespace-nowrap">
                                                {formatDate(rental.bookingDate)}
                                            </td>

                                            <td className="px-5 py-4 font-medium whitespace-nowrap">
                                                {currencyFormatter.format(rental.totalAmount)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStyle(rental.paymentStatus)}`}>
                                                    {rental.paymentStatus}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBookingStyle(rental.bookingStatus)}`}>
                                                    {rental.bookingStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile and Tablet Cards */}
                        <div className="grid gap-4 lg:hidden">
                            {recentRentals.map((rental) => (
                                <div
                                    key={rental._id}
                                    className="space-y-4 rounded-xl border bg-card p-4 shadow-sm"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {rental.customer.name}
                                        </p>
                                        <p className="break-all text-sm text-muted-foreground">
                                            {rental.customer.email}
                                        </p>
                                    </div>

                                    <div className="border-t pt-3">
                                        <p className="text-xs text-muted-foreground">
                                            Equipment
                                        </p>
                                        <p className="mt-1 font-medium">
                                            {rental.equipmentName}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Booking Date
                                            </p>
                                            <p className="mt-1 text-sm">
                                                {formatDate(rental.bookingDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Booking Amount
                                            </p>
                                            <p className="mt-1 text-sm font-semibold">
                                                {currencyFormatter.format(rental.totalAmount)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                                        <div>
                                            <p className="mb-2 text-xs text-muted-foreground">
                                                Payment
                                            </p>
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStyle(rental.paymentStatus)}`}>
                                                {rental.paymentStatus}
                                            </span>
                                        </div>

                                        <div>
                                            <p className="mb-2 text-xs text-muted-foreground">
                                                Booking
                                            </p>
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBookingStyle(rental.bookingStatus)}`}>
                                                {rental.bookingStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default MyOwnerDashboard
