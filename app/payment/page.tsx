
import Image from "next/image";
import { getBookingById } from "@/lib/api/bookings";
import {
    CalendarDays,
    MapPin,
    Package,
    Clock,
    CreditCard,
    ShieldCheck,
    UserRound,
    ArrowRight,
} from "lucide-react";

const PaymentPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ bookingId: string }>;
}) => {
    const { bookingId } = await searchParams;
    const bookingEquipment = await getBookingById(bookingId);

    const {
        equipmentName,
        equipmentImage,
        equipmentId,
        startDate,
        endDate,
        requiredQuantity,
        rentalType,
        unitPrice,
        rentalDuration,
        totalAmount,
        bookingStatus,
        customer,
        owner,
        deliveryAddress,
        contactNumber,
    } = bookingEquipment;

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const formatPrice = (price: number) =>
        `৳${price?.toLocaleString("en-BD")}`;

    return (
        <div className="min-h-screen bg-muted/30 py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CreditCard size={24} />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Complete Your Payment
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Review your booking details before proceeding to payment.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Left: Booking Details */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Equipment Card */}
                        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative h-52 w-full sm:h-auto sm:w-64">
                                    <Image
                                        src={equipmentImage}
                                        alt={equipmentName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                            Equipment Rental
                                        </span>

                                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium capitalize text-amber-600">
                                            {bookingStatus}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold sm:text-2xl">
                                        {equipmentName}
                                    </h2>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Equipment ID: {equipmentId?.toString()}
                                    </p>

                                    <div className="mt-5">
                                        <p className="text-sm text-muted-foreground">
                                            Price per {rentalType?.toLowerCase()}
                                        </p>
                                        <p className="text-xl font-bold text-primary">
                                            {formatPrice(unitPrice)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rental Information */}
                        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                                <CalendarDays size={20} className="text-primary" />
                                Rental Information
                            </h2>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Rental Start Date
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {formatDate(startDate)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Rental End Date
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {formatDate(endDate)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Rental Duration
                                    </p>
                                    <p className="mt-1 flex items-center gap-2 font-semibold">
                                        <Clock size={16} className="text-muted-foreground" />
                                        {rentalDuration} {rentalType}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Required Quantity
                                    </p>
                                    <p className="mt-1 flex items-center gap-2 font-semibold">
                                        <Package size={16} className="text-muted-foreground" />
                                        {requiredQuantity} Units
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                                <UserRound size={20} className="text-primary" />
                                Customer Information
                            </h2>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Customer Name
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {customer?.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Contact Number
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {contactNumber}
                                    </p>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                        Delivery Address
                                    </p>
                                    <p className="mt-1 flex items-start gap-2 font-semibold">
                                        <MapPin size={17} className="mt-0.5 shrink-0 text-primary" />
                                        {deliveryAddress}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                Equipment Owner
                            </h2>

                            <p className="font-semibold">{owner?.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {owner?.email}
                            </p>
                        </div>
                    </div>

                    {/* Right: Payment Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
                            <h2 className="text-lg font-bold">
                                Payment Summary
                            </h2>

                            <p className="mt-2 break-all text-xs text-muted-foreground">
                                Booking ID: {bookingId}
                            </p>

                            <div className="my-6 space-y-4">
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">
                                        Price per {rentalType?.toLowerCase()}
                                    </span>
                                    <span className="font-medium">
                                        {formatPrice(unitPrice)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">
                                        Rental Duration
                                    </span>
                                    <span className="font-medium">
                                        {rentalDuration}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-muted-foreground">
                                        Quantity
                                    </span>
                                    <span className="font-medium">
                                        {requiredQuantity}
                                    </span>
                                </div>

                                <div className="border-t border-dashed pt-4">
                                    <div className="flex justify-between gap-3">
                                        <span className="font-semibold">
                                            Total Amount
                                        </span>
                                        <span className="text-xl font-bold text-primary">
                                            {formatPrice(totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <form action="/api/checkout_sessions" method="POST">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                                >
                                    Proceed to Payment
                                    <ArrowRight size={18} />
                                </button>
                            </form>

                            <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/60 p-3">
                                <ShieldCheck
                                    size={21}
                                    className="shrink-0 text-green-600"
                                />
                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    Your booking information is displayed for review.
                                    Payment processing will be handled securely.
                                </p>
                            </div>

                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Please review your booking before proceeding.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
