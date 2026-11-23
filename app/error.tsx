'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
    error,
    retry,
}: {
    error: Error & { digest?: string }
    retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
            <section className="w-full max-w-lg rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Something went wrong
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    We couldn&apos;t load this page
                </h1>
                <p className="mt-4 text-muted-foreground">
                    An unexpected error occurred. Please try again.
                </p>
                {error.digest && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        Error reference: {error.digest}
                    </p>
                )}
                <Button className="mt-6" type="button" onClick={retry}>
                    Try again
                </Button>
            </section>
        </main>
    )
}