
import type { IBooking } from "@/types/bookingTypes"
import Link from "next/link"

const MyBookings = ({ bookings }: { bookings: IBooking[] }) => {
    return (
        <section className="min-w-0 px-3 py-6 sm:px-4 sm:py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold sm:text-3xl">My Bookings</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    View and manage all your equipment bookings.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-xl border border-dashed px-4 py-12 text-center">
                    <h2 className="font-semibold">No bookings found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You haven't made any bookings yet.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden min-w-0 overflow-hidden rounded-xl border md:block">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-262.5 text-sm">
                                <thead className="bg-muted/50">
                                    <tr className="text-left">
                                        <th className="px-4 py-4 font-semibold">Equipment</th>
                                        <th className="px-4 py-4 font-semibold">Rental Period</th>
                                        <th className="px-4 py-4 font-semibold">Quantity</th>
                                        <th className="px-4 py-4 font-semibold">Total Amount</th>
                                        <th className="px-4 py-4 font-semibold">Payment</th>
                                        <th className="px-4 py-4 font-semibold">Booking Status</th>
                                        <th className="px-4 py-4 text-center font-semibold">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y">
                                    {bookings.map((booking) => (
                                        <tr
                                            key={booking._id}
                                            className="transition-colors hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={booking.equipmentImage}
                                                        alt={booking.equipmentName}
                                                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                                    />
                                                    <span className="max-w-50 font-medium">
                                                        {booking.equipmentName}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {booking.startDate} – {booking.endDate}
                                            </td>

                                            <td className="px-4 py-4">
                                                {booking.requiredQuantity}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4 font-semibold">
                                                ৳{booking.totalAmount.toLocaleString()}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${booking.paymentStatus === "paid"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : booking.paymentStatus === "unpaid"
                                                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {booking.paymentStatus}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${booking.bookingStatus === "completed"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                            : booking.bookingStatus === "confirmed"
                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                                : booking.bookingStatus === "pending"
                                                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {booking.bookingStatus}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-center">
                                                {booking.paymentStatus === "unpaid" && (
                                                    <Link
                                                        href={`/payment?bookingId=${booking._id}`}
                                                        className="inline-flex whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                                                    >
                                                        Pay Now
                                                    </Link>
                                                )}

                                                {booking.paymentStatus === "paid" && (
                                                    <button
                                                        type="button"
                                                        className="whitespace-nowrap rounded-lg border border-destructive/30 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive hover:text-white"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-4 md:hidden">
                        {bookings.map((booking) => (
                            <article
                                key={booking._id}
                                className="overflow-hidden rounded-xl border bg-card shadow-sm"
                            >
                                {/* Equipment Info */}
                                <div className="flex gap-3 border-b p-4">
                                    <img
                                        src={booking.equipmentImage}
                                        alt={booking.equipmentName}
                                        className="h-20 w-20 shrink-0 rounded-lg object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-semibold leading-snug">
                                            {booking.equipmentName}
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {booking.rentalType} rental
                                        </p>

                                        <p className="mt-2 font-bold">
                                            ৳{booking.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Start Date</p>
                                        <p className="mt-1 font-medium">{booking.startDate}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">End Date</p>
                                        <p className="mt-1 font-medium">{booking.endDate}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Quantity</p>
                                        <p className="mt-1 font-medium">
                                            {booking.requiredQuantity}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Duration</p>
                                        <p className="mt-1 font-medium">
                                            {booking.rentalDuration} {booking.rentalType}
                                        </p>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex flex-wrap items-center gap-2 border-t p-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${booking.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : booking.paymentStatus === "unpaid"
                                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            }`}
                                    >
                                        Payment: {booking.paymentStatus}
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${booking.bookingStatus === "completed"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : booking.bookingStatus === "confirmed"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                    : booking.bookingStatus === "pending"
                                                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            }`}
                                    >
                                        Booking: {booking.bookingStatus}
                                    </span>

                                    {booking.paymentStatus === "unpaid" && (
                                        <Link
                                            href={`/payment?bookingId=${booking._id}`}
                                            className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                                        >
                                            Pay Now
                                        </Link>
                                    )}

                                    {booking.paymentStatus === "paid" && (
                                        <button
                                            type="button"
                                            className="w-full rounded-lg border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default MyBookings
