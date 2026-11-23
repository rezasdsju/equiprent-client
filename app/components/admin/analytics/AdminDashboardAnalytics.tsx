import {
    CalendarDays,
    ChartNoAxesColumnIncreasing,
    CircleCheck,
    ClipboardList,
    Package,
    Users,
    Wallet,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { IAdminAnalytics } from "@/types/analyticsTypes"

const numberFormatter = new Intl.NumberFormat("en-US")
const currencyFormatter = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
})

const AdminDashboardAnalytics = ({
    analytics,
}: {
    analytics: IAdminAnalytics
}) => {
    const monthlyBookings = [...(analytics.monthlyBooking ?? [])]
        .sort((a, b) => a._id.year - b._id.year || a._id.month - b._id.month)
        .slice(-12)
    const maxMonthlyBookings = Math.max(
        0,
        ...monthlyBookings.map((month) => month.totalBookings)
    )

    const stats = [
        {
            label: "Total Users",
            value: numberFormatter.format(analytics.totalUsers),
            description: "Registered marketplace accounts",
            icon: Users,
            iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        {
            label: "Total Equipment",
            value: numberFormatter.format(analytics.totalEquipments),
            description: "Equipment listings on the platform",
            icon: Package,
            iconClassName: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        },
        {
            label: "Total Bookings",
            value: numberFormatter.format(analytics.totalBookings),
            description: "Rental bookings recorded",
            icon: CalendarDays,
            iconClassName: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        },
        {
            label: "Pending Approvals",
            value: numberFormatter.format(analytics.pendingCount),
            description: "Equipment waiting for review",
            icon: ClipboardList,
            iconClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        },
        {
            label: "Completed Rentals",
            value: numberFormatter.format(analytics.completeRentals),
            description: "Successfully completed bookings",
            icon: CircleCheck,
            iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
        {
            label: "Total Revenue",
            value: currencyFormatter.format(analytics.totalRevenue),
            description: "Revenue from paid rentals",
            icon: Wallet,
            iconClassName: "bg-primary/10 text-primary",
        },
    ]

    return (
        <main className="w-full space-y-6 sm:space-y-8">
            <header>
                <p className="text-sm font-medium text-primary">Platform overview</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    Admin Analytics
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Monitor marketplace activity, rentals, and revenue.
                </p>
            </header>

            <section
                aria-label="Marketplace statistics"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
            >
                {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                        <Card key={stat.label} className="min-w-0">
                            <CardContent className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
                                <span
                                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12 ${stat.iconClassName}`}
                                >
                                    <Icon className="size-5 sm:size-6" aria-hidden="true" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="mt-1 text-xl font-bold tracking-tight wrap-break-word sm:text-2xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                        {stat.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </section>

            <Card>
                <CardHeader className="border-b px-4 py-4 sm:px-6">
                    <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ChartNoAxesColumnIncreasing
                                className="size-5"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="min-w-0">
                            <CardTitle className="text-base sm:text-lg">
                                Monthly Bookings
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Booking activity over the latest months available.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    {monthlyBookings.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            No monthly booking data is available yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {monthlyBookings.map((month) => {
                                const monthLabel = new Date(
                                    month._id.year,
                                    month._id.month - 1
                                ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                })
                                const barWidth =
                                    maxMonthlyBookings > 0
                                        ? (month.totalBookings / maxMonthlyBookings) * 100
                                        : 0

                                return (
                                    <div
                                        key={`${month._id.year}-${month._id.month}`}
                                        className="grid grid-cols-[4.5rem_minmax(0,1fr)_2.5rem] items-center gap-3 sm:grid-cols-[6rem_minmax(0,1fr)_3rem] sm:gap-4"
                                    >
                                        <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                                            {monthLabel}
                                        </span>
                                        <div
                                            className="h-3 overflow-hidden rounded-full bg-muted"
                                            role="progressbar"
                                            aria-label={`${monthLabel} bookings`}
                                            aria-valuemin={0}
                                            aria-valuemax={maxMonthlyBookings}
                                            aria-valuenow={month.totalBookings}
                                        >
                                            <div
                                                className="h-full rounded-full bg-primary transition-[width]"
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>
                                        <span className="text-right text-sm font-semibold tabular-nums">
                                            {numberFormatter.format(month.totalBookings)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}

export default AdminDashboardAnalytics
