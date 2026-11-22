
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <SearchX size={40} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    404 Error
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                    Page Not Found
                </h1>

                <p className="mt-4 text-muted-foreground">
                    Sorry, we couldn't find the page you're looking for.
                    It may have been moved or doesn't exist.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button>
                        <Link href="/">Back to Home</Link>
                    </Button>

                    <Button variant="outline">
                        <Link href="/all-equipments">
                            Browse Equipment
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
