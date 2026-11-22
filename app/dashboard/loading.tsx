
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Page Header */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border p-5 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-9 w-9 rounded-lg" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-3 w-36" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="rounded-xl border">
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-4 w-52" />
                    </div>
                    <Skeleton className="h-10 w-full sm:w-32" />
                </div>

                {/* Table Header */}
                <div className="hidden border-y px-5 py-4 md:grid md:grid-cols-5 md:gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-20" />
                    ))}
                </div>

                {/* Table Rows */}
                <div className="divide-y">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid gap-4 p-5 md:grid-cols-5 md:items-center"
                        >
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>

                            <Skeleton className="hidden h-4 w-24 md:block" />
                            <Skeleton className="hidden h-4 w-20 md:block" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="hidden h-8 w-24 md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
