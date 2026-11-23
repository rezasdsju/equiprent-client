
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getSession } from '@/lib/core/server'
import { getBookingById } from '@/lib/api/bookings'

export async function POST(req: Request) {
    const userSession = await getSession()

    if (!userSession?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const bookingId = formData.get('bookingId') as string

        if (!bookingId) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            )
        }

        const booking = await getBookingById(bookingId)

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            )
        }

        if (booking.customer._id !== userSession.user.id) {
            return NextResponse.json(
                { error: 'Unauthorized booking access' },
                { status: 403 }
            )
        }

        if (!Number.isFinite(booking.totalAmount) || booking.totalAmount <= 0) {
            return NextResponse.json(
                { error: 'Invalid booking amount' },
                { status: 400 }
            )
        }

        const headersList = await headers()
        const origin = headersList.get('origin')

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: booking.equipmentName,
                        },
                        unit_amount: booking.totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email: userSession?.user?.email,
            metadata: {
                bookingId,
                userId: userSession?.user.id,
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            integration_identifier: 'equiprent_web_001',
        })

        if (!session.url) {
            return NextResponse.json(
                { error: 'Checkout URL not found' },
                { status: 500 }
            )
        }

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
