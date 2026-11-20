"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, LockKeyhole, LogIn } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const UnAuthorizedPage = () => {
  const router = useRouter()

  return (
    <div className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      {/* Background wash: keeps the empty page from feeling flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 size-128 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 size-72 translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-600 shadow-sm dark:text-amber-400">
          <LockKeyhole className="size-7" aria-hidden="true" />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Error 403
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          You do not have permission to view this page. Sign in with an account
          that has access, or head back to the homepage to keep browsing
          equipment.
        </p>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full rounded-xl px-5 sm:w-auto"
            )}
          >
            <Home className="size-4" aria-hidden="true" />
            Go to homepage
          </Link>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full rounded-xl px-5 sm:w-auto"
            )}
          >
            <LogIn className="size-4" aria-hidden="true" />
            Sign in
          </Link>
        </div>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => router.back()}
          className="mt-2 h-10 gap-1.5 text-muted-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Go back
        </Button>
      </div>
    </div>
  )
}

export default UnAuthorizedPage
