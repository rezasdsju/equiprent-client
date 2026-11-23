import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react'
import { checkoutVerify } from '@/lib/actions/payments'
import { stripe } from '@/lib/stripe'
import { Button } from '@/components/ui/button'

export default async function Success({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string }>
}) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (cs_test_...)')

    const {
        status,
        payment_status,
        customer_email,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete' && payment_status === 'paid') {
        await checkoutVerify(session_id)

        return (
            <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
                    <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                        <CheckCircle2 className="size-9" />
                    </div>

                    <h1 className="text-2xl font-bold sm:text-3xl">Payment Successful</h1>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Thank you! Your rental booking has been confirmed.
                    </p>

                    {customer_email && (
                        <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/60 p-3 text-left">
                            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                A confirmation will be sent to{' '}
                                <span className="break-all font-medium text-foreground">
                                    {customer_email}
                                </span>
                                .
                            </p>
                        </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            nativeButton={false}
                            render={<Link href="/dashboard/customer/my-rentals" />}
                        >
                            View My Rentals
                            <ArrowRight className="size-4" />
                        </Button>
                        <Button
                            nativeButton={false}
                            variant="outline" render={<Link href="/" />}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    return redirect('/')
}