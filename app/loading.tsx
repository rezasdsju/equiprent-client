import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
    return (
        <main className="mx-auto max-w-7xl space-y-12 px-4 py-6 sm:px-6 lg:px-8">

            {/* Banner Skeleton */}
            <Skeleton className="h-64 w-full rounded-2xl sm:h-80 lg:h-105" />

            {/* Categories Skeleton */}
            <section className="space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-64 max-w-full" />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="space-y-3 rounded-xl border p-4">
                            <Skeleton className="mx-auto h-12 w-12 rounded-xl" />
                            <Skeleton className="mx-auto h-4 w-24 max-w-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Equipment Skeleton */}
            <section className="space-y-5">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-52" />
                    <Skeleton className="h-4 w-64 max-w-full" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-xl border">
                            <Skeleton className="h-48 w-full rounded-none" />
                            <div className="space-y-4 p-4">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-9 w-28 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Section Skeleton */}
            <section className="space-y-5">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                </div>
            </section>

        </main>
    )
}