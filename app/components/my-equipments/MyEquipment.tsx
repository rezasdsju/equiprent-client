'use client'
import { updateEquipment } from "@/lib/actions/equipments";
import { IEquipment } from "@/types/equipmentTypes";
import { UpdateEquipment } from "./UpdateEquipment";
import { DeleteEquipment } from "./DeleteEquipment";

const MyEquipment = ({ equipments }: { equipments: IEquipment[] }) => {

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Equipment</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage all equipment added by you.
                </p>
            </div>

            {equipments.length === 0 ? (
                <div className="rounded-lg border p-8 text-center">
                    <h2 className="text-lg font-semibold">No Equipment Found</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        You haven't added any equipment yet.
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden overflow-x-auto rounded-lg border md:block">
                        <table className="w-full min-w-187.5 text-sm">
                            <thead className="bg-muted/50">
                                <tr className="text-left">
                                    <th className="px-5 py-4 font-semibold">Equipment Name</th>
                                    <th className="px-5 py-4 font-semibold">Category</th>
                                    <th className="px-5 py-4 font-semibold">Rental Price</th>
                                    <th className="px-5 py-4 font-semibold">Available Quantity</th>
                                    <th className="px-5 py-4 font-semibold">Status</th>
                                    <th className="px-5 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {equipments.map((equipment) => (
                                    <tr key={equipment._id} className="hover:bg-muted/30">
                                        <td className="px-5 py-4 font-medium">
                                            {equipment.name}
                                        </td>
                                        <td className="px-5 py-4">
                                            {equipment.category}
                                        </td>
                                        <td className="px-5 py-4">
                                            ৳{equipment.rentalPrice} / {equipment.rentalType}
                                        </td>
                                        <td className="px-5 py-4">
                                            {equipment.availableQuantity}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${equipment.approvalStatus === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : equipment.approvalStatus === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {equipment.approvalStatus}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <UpdateEquipment equipment={equipment}></UpdateEquipment>
                                                <DeleteEquipment equipment={equipment}></DeleteEquipment>
                                                <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground opacity-60">
                                                    View Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid gap-4 md:hidden">
                        {equipments.map((equipment) => (
                            <div key={equipment._id} className="rounded-lg border p-4 space-y-4">
                                <div>
                                    <h2 className="font-semibold">{equipment.name}</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {equipment.category}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Rental Price</p>
                                        <p className="mt-1 font-medium">
                                            ৳{equipment.rentalPrice} / {equipment.rentalType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Available Quantity</p>
                                        <p className="mt-1 font-medium">
                                            {equipment.availableQuantity}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${equipment.approvalStatus === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : equipment.approvalStatus === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {equipment.approvalStatus}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 border-t pt-4">
                                    <button disabled className="rounded-md border px-3 py-2 text-xs opacity-60">
                                        Update
                                    </button>
                                    <button disabled className="rounded-md border px-3 py-2 text-xs opacity-60">
                                        Delete
                                    </button>
                                    <button disabled className="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground opacity-60">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyEquipment;
