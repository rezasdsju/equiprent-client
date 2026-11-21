
const rentalData = [
    {
        id: 1,
        customerName: "Rahim Ahmed",
        customerEmail: "rahim@gmail.com",
        equipmentName: "Professional DSLR Camera",
        rentalStartDate: "Nov 20, 2026",
        rentalEndDate: "Nov 23, 2026",
        quantity: 2,
        bookingAmount: 7200,
        paymentStatus: "Paid",
        bookingStatus: "Approved",
    },
    {
        id: 2,
        customerName: "Karim Hasan",
        customerEmail: "karim@gmail.com",
        equipmentName: "Industrial Concrete Mixer",
        rentalStartDate: "Nov 22, 2026",
        rentalEndDate: "Nov 25, 2026",
        quantity: 1,
        bookingAmount: 4500,
        paymentStatus: "Unpaid",
        bookingStatus: "Pending",
    },
    {
        id: 3,
        customerName: "Nusrat Jahan",
        customerEmail: "nusrat@gmail.com",
        equipmentName: "Heavy Duty Power Generator",
        rentalStartDate: "Nov 18, 2026",
        rentalEndDate: "Nov 20, 2026",
        quantity: 1,
        bookingAmount: 5000,
        paymentStatus: "Paid",
        bookingStatus: "Rejected",
    },
];

const MyEquipmentRental = () => {
    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Equipment Rental</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    View rental bookings for your equipment.
                </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-lg border lg:block">
                <table className="w-full min-w-250 text-sm">
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
                        {rentalData.map((rental) => (
                            <tr key={rental.id} className="hover:bg-muted/30">
                                <td className="px-5 py-4">
                                    <p className="font-medium">{rental.customerName}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {rental.customerEmail}
                                    </p>
                                </td>

                                <td className="px-5 py-4 font-medium">
                                    {rental.equipmentName}
                                </td>

                                <td className="px-5 py-4">
                                    <p>{rental.rentalStartDate}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        to {rental.rentalEndDate}
                                    </p>
                                </td>

                                <td className="px-5 py-4">{rental.quantity}</td>

                                <td className="px-5 py-4 font-medium">
                                    ৳{rental.bookingAmount.toLocaleString("en-US")}
                                </td>

                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        rental.paymentStatus === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {rental.paymentStatus}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        rental.bookingStatus === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : rental.bookingStatus === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {rental.bookingStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 lg:hidden">
                {rentalData.map((rental) => (
                    <div key={rental.id} className="space-y-4 rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">{rental.customerName}</p>
                            <p className="text-sm text-muted-foreground">
                                {rental.customerEmail}
                            </p>
                        </div>

                        <div className="border-t pt-3">
                            <p className="text-xs text-muted-foreground">Equipment</p>
                            <p className="mt-1 font-medium">{rental.equipmentName}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Rental Duration</p>
                                <p className="mt-1 text-sm">{rental.rentalStartDate}</p>
                                <p className="text-sm">{rental.rentalEndDate}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Required Quantity</p>
                                <p className="mt-1 text-sm font-medium">{rental.quantity}</p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">Booking Amount</p>
                                <p className="mt-1 text-sm font-medium">
                                    ৳{rental.bookingAmount.toLocaleString("en-US")}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                            <div>
                                <p className="mb-2 text-xs text-muted-foreground">Payment Status</p>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    rental.paymentStatus === "Paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {rental.paymentStatus}
                                </span>
                            </div>

                            <div>
                                <p className="mb-2 text-xs text-muted-foreground">Booking Status</p>
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    rental.bookingStatus === "Approved"
                                        ? "bg-green-100 text-green-700"
                                        : rental.bookingStatus === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {rental.bookingStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEquipmentRental;
