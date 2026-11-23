import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  Package,
  Wallet,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { IOwnerAnalytics } from "@/types/analyticsTypes"

const numberFormatter = new Intl.NumberFormat("en-US")
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

const OwnerDashboardAnalytics = ({
  analytics,
}: {
  analytics: IOwnerAnalytics
}) => {
  const monthlyEarnings = [...(analytics.monthlyEarning ?? [])]
    .sort((a, b) => a._id.year - b._id.year || a._id.month - b._id.month)
    .slice(-12)
  const maxMonthlyEarning = Math.max(
    0,
    ...monthlyEarnings.map((month) => month.total)
  )

  const stats = [
    {
      label: "Listed Equipment",
      value: numberFormatter.format(analytics.totalEquipments),
      description: "Equipment listed by you",
      icon: Package,
      iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Completed Rentals",
      value: numberFormatter.format(analytics.completedRentals),
      description: "Successfully completed bookings",
      icon: CircleCheck,
      iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Total Earnings",
      value: currencyFormatter.format(analytics.totalEarning),
      description: "Earnings from completed rentals",
      icon: Wallet,
      iconClassName: "bg-primary/10 text-primary",
    },
  ]

  return (
    <main className="w-full space-y-6 sm:space-y-8">
      <header>
        <p className="text-sm font-medium text-primary">Business overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Owner Analytics
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Track your equipment listings, completed rentals, and earnings.
        </p>
      </header>

      <section
        aria-label="Owner business statistics"
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
                Monthly Earnings
              </CardTitle>
              <CardDescription className="mt-1">
                Earnings from your rentals over the latest months available.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {monthlyEarnings.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No monthly earnings data is available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {monthlyEarnings.map((month) => {
                const monthLabel = new Date(
                  month._id.year,
                  month._id.month - 1
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
                const barWidth =
                  maxMonthlyEarning > 0
                    ? (month.total / maxMonthlyEarning) * 100
                    : 0

                return (
                  <div
                    key={`${month._id.year}-${month._id.month}`}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[6rem_minmax(0,1fr)_8rem] sm:gap-4"
                  >
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      {monthLabel}
                    </span>
                    <div
                      className="h-3 overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-label={`${monthLabel} earnings`}
                      aria-valuemin={0}
                      aria-valuemax={maxMonthlyEarning}
                      aria-valuenow={month.total}
                    >
                      <div
                        className="h-full rounded-full bg-primary transition-[width]"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="text-right text-xs font-semibold tabular-nums sm:text-sm">
                      {currencyFormatter.format(month.total)}
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

export default OwnerDashboardAnalytics
