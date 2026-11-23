'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    CalendarDays,
    Package,
    Users,
    CheckCircle2,
    Clock3,
    CreditCard,
} from "lucide-react"

import type { IBooking } from "@/types/bookingTypes"
import UpdateBookingStatus from "./UpdateBookingStatus"

const currencyFormatter = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
})

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const getPaymentStyle = (status: string) => {
    switch (status) {
        case "paid":
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        case "failed":
        case "refunded":
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        default:
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
}

const getBookingStyle = (status: string) => {
    switch (status) {
        case "confirmed":
        case "completed":
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        case "cancelled":
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        default:
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    }
}

const AllRentals = ({ rentals }: { rentals: IBooking[] }) => {
    const totalRentals = rentals.length

    const paidRentals = rentals.filter(
        rental => rental.paymentStatus === "paid"
    ).length

    const pendingRentals = rentals.filter(
        rental => rental.bookingStatus === "pending"
    ).length

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    All Rentals
                </h1>
                <p className="text-muted-foreground">
                    Monitor and manage all rental activities.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Total Rentals</CardDescription>
                        <Package className="size-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">
                            {totalRentals}
                        </CardTitle>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Paid Rentals</CardDescription>
                        <CheckCircle2 className="size-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">
                            {paidRentals}
                        </CardTitle>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription>Pending Bookings</CardDescription>
                        <Clock3 className="size-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl">
                            {pendingRentals}
                        </CardTitle>
                    </CardContent>
                </Card>
            </div>

            {rentals.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <Package className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="text-lg font-semibold">
                            No Rentals Found
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            There are no rental bookings available yet.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <Card className="hidden lg:block">
                        <CardHeader>
                            <CardTitle>Rental Records</CardTitle>
                            <CardDescription>
                                All customer and owner rental booking records.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="min-w-0">
                            <div className="min-w-0">
                                <Table className="w-max min-w-275">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Owner</TableHead>
                                            <TableHead>Equipment</TableHead>
                                            <TableHead>Rental Period</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Payment</TableHead>
                                            <TableHead>Booking Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {rentals.map((rental) => (
                                            <TableRow key={rental._id}>
                                                <TableCell>
                                                    <div className="min-w-36">
                                                        <p className="font-medium">
                                                            {rental.customer.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {rental.customer.email}
                                                        </p>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="min-w-36">
                                                        <p className="font-medium">
                                                            {rental.owner.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {rental.owner.email}
                                                        </p>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="min-w-36 font-medium">
                                                    {rental.equipmentName}
                                                </TableCell>

                                                <TableCell className="min-w-40">
                                                    <p className="text-sm">
                                                        {formatDate(rental.startDate)}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        to {formatDate(rental.endDate)}
                                                    </p>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="whitespace-nowrap">
                                                        {rental.rentalDuration}{" "}
                                                        {rental.rentalType === "Daily"
                                                            ? "Day"
                                                            : rental.rentalType === "Monthly"
                                                                ? "Month"
                                                                : "Week"}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="font-semibold whitespace-nowrap">
                                                    {currencyFormatter.format(rental.totalAmount)}
                                                </TableCell>

                                                <TableCell>
                                                    <Badge className={`capitalize ${getPaymentStyle(rental.paymentStatus)}`}>
                                                        {rental.paymentStatus}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    <Badge className={`capitalize ${getBookingStyle(rental.bookingStatus)}`}>
                                                        {rental.bookingStatus}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    {rental.bookingStatus === "pending" ||
                                                        rental.bookingStatus === "confirmed" ? (
                                                        <UpdateBookingStatus rental={rental} />
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            —
                                                        </span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 lg:hidden">
                        {rentals.map((rental) => (
                            <Card key={rental._id}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <CardTitle className="text-base">
                                                {rental.equipmentName}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                Rental #{rental._id.slice(-6)}
                                            </CardDescription>
                                        </div>

                                        <Badge className={`shrink-0 capitalize ${getBookingStyle(rental.bookingStatus)}`}>
                                            {rental.bookingStatus}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="flex items-start gap-2">
                                            <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Customer
                                                </p>
                                                <p className="wrap-break-word text-sm font-medium">
                                                    {rental.customer.name}
                                                </p>
                                                <p className="break-all text-xs text-muted-foreground">
                                                    {rental.customer.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2">
                                            <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted-foreground">
                                                    Owner
                                                </p>
                                                <p className="wrap-break-word text-sm font-medium">
                                                    {rental.owner.name}
                                                </p>
                                                <p className="break-all text-xs text-muted-foreground">
                                                    {rental.owner.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Rental Period
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {rental.rentalDuration} {rental.rentalType}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 border-t pt-3">
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Booking Amount
                                            </p>
                                            <p className="text-lg font-bold">
                                                {currencyFormatter.format(rental.totalAmount)}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="mb-1 text-xs text-muted-foreground">
                                                Payment Status
                                            </p>
                                            <Badge className={`capitalize ${getPaymentStyle(rental.paymentStatus)}`}>
                                                <CreditCard className="mr-1 size-3" />
                                                {rental.paymentStatus}
                                            </Badge>
                                        </div>
                                    </div>

                                    {(rental.bookingStatus === "pending" ||
                                        rental.bookingStatus === "confirmed") && (
                                            <div className="space-y-2 border-t pt-3">
                                                <p className="text-xs text-muted-foreground">
                                                    Change Booking Status
                                                </p>
                                                <UpdateBookingStatus rental={rental} />
                                            </div>
                                        )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default AllRentals