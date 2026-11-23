
import { IBooking } from "@/types/bookingTypes"
import { Package, CheckCircle2, Clock3 } from "lucide-react"

const MyEquipmentRental = ({ rentals }: { rentals: IBooking[] }) => {
    const totalRentals = rentals.length
    const paidRentals = rentals.filter(
        (rental) => rental.paymentStatus === "paid"
    ).length
    const pendingRentals = rentals.filter(
        (rental) => rental.bookingStatus === "pending"
    ).length

    const getBookingStatusStyle = (status: IBooking["bookingStatus"]) => {
        if (status === "confirmed" || status === "completed") {
            return "bg-green-100 text-green-700"
        }

        if (status === "cancelled") {
            return "bg-red-100 text-red-700"
        }

        return "bg-yellow-100 text-yellow-700"
    }

    const getPaymentStatusStyle = (status: IBooking["paymentStatus"]) => {
        if (status === "paid") return "bg-green-100 text-green-700"
        if (status === "failed" || status === "refunded") {
            return "bg-red-100 text-red-700"
        }

        return "bg-yellow-100 text-yellow-700"
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">My Equipment Rentals</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    View rental bookings for your equipment.
                </p>
            </div>

            {/* Rental Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                        <Package className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Rentals</p>
                        <h2 className="text-2xl font-bold">{totalRentals}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">
                        <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Paid Rentals</p>
                        <h2 className="text-2xl font-bold">{paidRentals}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300">
                        <Clock3 className="size-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Pending Bookings</p>
                        <h2 className="text-2xl font-bold">{pendingRentals}</h2>
                    </div>
                </div>
            </div>

            {/* Rental List */}
            {totalRentals === 0 ? (
                <div className="rounded-xl border bg-card px-4 py-16 text-center">
                    <Package className="mx-auto size-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Rentals Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You don't have any rental bookings for your equipment yet.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto rounded-xl border lg:block">
                        <table className="w-full min-w-225 text-sm">
                            <thead className="bg-muted/50">
                                <tr className="text-left">
                                    <th className="px-5 py-4 font-semibold">Customer Information</th>
                                    <th className="px-5 py-4 font-semibold">Equipment Information</th>
                                    <th className="px-5 py-4 font-semibold">Rental Duration</th>
                                    <th className="px-5 py-4 font-semibold">Required Quantity</th>
                                    <th className="px-5 py-4 font-semibold">Booking Amount</th>
                                    <th className="px-5 py-4 font-semibold">Payment Status</th>
                                    <th className="px-5 py-4 font-semibold">Booking Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {rentals.map((rental) => (
                                    <tr key={rental._id} className="hover:bg-muted/30">
                                        <td className="px-5 py-4">
                                            <p className="font-medium">{rental.customer.name}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {rental.customer.email}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 font-medium">
                                            {rental.equipmentName}
                                        </td>

                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <p>{rental.startDate}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                to {rental.endDate}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            {rental.requiredQuantity}
                                        </td>

                                        <td className="px-5 py-4 font-medium whitespace-nowrap">
                                            ${rental.totalAmount.toLocaleString("en-US")}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStatusStyle(rental.paymentStatus)}`}>
                                                {rental.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBookingStatusStyle(rental.bookingStatus)}`}>
                                                {rental.bookingStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile and Tablet Cards */}
                    <div className="grid gap-4 lg:hidden">
                        {rentals.map((rental) => (
                            <div key={rental._id} className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
                                <div>
                                    <p className="font-semibold">{rental.customer.name}</p>
                                    <p className="break-all text-sm text-muted-foreground">
                                        {rental.customer.email}
                                    </p>
                                </div>

                                <div className="border-t pt-3">
                                    <p className="text-xs text-muted-foreground">Equipment</p>
                                    <p className="mt-1 font-medium">{rental.equipmentName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Rental Duration</p>
                                        <p className="mt-1 text-sm">{rental.startDate}</p>
                                        <p className="text-sm">to {rental.endDate}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Required Quantity</p>
                                        <p className="mt-1 text-sm font-medium">
                                            {rental.requiredQuantity}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground">Booking Amount</p>
                                        <p className="mt-1 text-sm font-medium">
                                            ${rental.totalAmount.toLocaleString("en-US")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                                    <div>
                                        <p className="mb-2 text-xs text-muted-foreground">Payment Status</p>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStatusStyle(rental.paymentStatus)}`}>
                                            {rental.paymentStatus}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-xs text-muted-foreground">Booking Status</p>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${getBookingStatusStyle(rental.bookingStatus)}`}>
                                            {rental.bookingStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MyEquipmentRental
