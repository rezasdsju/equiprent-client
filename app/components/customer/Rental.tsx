import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { IBooking } from "@/types/bookingTypes"

const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

const statusStyles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    unpaid: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    failed: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
    refunded: "bg-slate-100 text-slate-800 dark:bg-slate-500/20 dark:text-slate-300",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    confirmed: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
}

const Rental = ({ rentals }: { rentals: IBooking[] }) => {
    return (
        <section className="px-3 py-6 sm:px-4 sm:py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">My Rentals</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    All your rental bookings in one place.
                </p>
            </div>

            <div className="rounded-2xl border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Booking Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rentals.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    You have no rentals yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rentals.map((rental) => (
                                <TableRow key={rental._id}>
                                    <TableCell className="font-medium">
                                        {rental.equipmentName}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {formatDate(rental.startDate)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {formatDate(rental.endDate)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        {formatDate(rental.bookingDate)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium">
                                        ${rental.totalAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`capitalize ${statusStyles[rental.paymentStatus] ?? ""}`}
                                        >
                                            {rental.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`capitalize ${statusStyles[rental.bookingStatus] ?? ""}`}
                                        >
                                            {rental.bookingStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default Rental