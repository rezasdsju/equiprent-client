import Image from "next/image"
import { Check, X, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { IEquipment } from "@/types/equipmentTypes"

const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300",
}

const AllEquipmentTable = ({ equipments }: { equipments: IEquipment[] }) => {
    return (
        <section className="px-3 py-6 sm:px-4 sm:py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">All Equipment</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review, approve, reject and manage every equipment listing.
                </p>
            </div>

            <div className="rounded-2xl border bg-card shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {equipments.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No equipment found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            equipments.map((item) => {
                                const status = item.approvalStatus ?? "pending"
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="line-clamp-1 font-medium">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap">{item.category}</TableCell>

                                        <TableCell className="whitespace-nowrap">
                                            ${item.rentalPrice.toLocaleString()}
                                            <span className="text-xs text-muted-foreground">
                                                {" "}/ {item.rentalType}
                                            </span>
                                        </TableCell>

                                        <TableCell>{item.availableQuantity}</TableCell>

                                        <TableCell>
                                            <Badge variant="secondary" className={`capitalize ${statusStyles[status]}`}>
                                                {status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex justify-end gap-1.5">
                                                <Button size="icon-sm" variant="outline" aria-label="Approve">
                                                    <Check className="size-4" />
                                                </Button>
                                                <Button size="icon-sm" variant="outline" aria-label="Reject">
                                                    <X className="size-4" />
                                                </Button>
                                                <Button size="icon-sm" variant="outline" aria-label="Update">
                                                    <Pencil className="size-4" />
                                                </Button>
                                                <Button size="icon-sm" variant="destructive" aria-label="Delete">
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default AllEquipmentTable