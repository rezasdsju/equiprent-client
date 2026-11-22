import Image from "next/image"
import Link from "next/link"
import { Eye, MapPin, Trash2 } from "lucide-react"
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
import type { IFavouriteWithEquipment } from "@/types/favouriteTypes"
import DeleteFavouriteDialog from "./DeleteFavouriteDialog"

const availableStyle =
    "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300"
const unavailableStyle =
    "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300"

const Favourites = ({ favourites }: { favourites: IFavouriteWithEquipment[] }) => {
    return (
        <section className="px-3 py-6 sm:px-4 sm:py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">My Favorites</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Equipment you have saved for later.
                </p>
            </div>

            {favourites.length === 0 ? (
                <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground shadow-sm">
                    You have no favorites yet.
                </div>
            ) : (
                <>
                    {/* Mobile: card list (below md) */}
                    <div className="grid gap-3 md:hidden">
                        {favourites.map((fav) => {
                            const { equipment } = fav
                            const isAvailable = equipment.availableQuantity > 0
                            return (
                                <div
                                    key={fav._id}
                                    className="rounded-2xl border bg-card p-3 shadow-sm"
                                >
                                    <div className="flex gap-3">
                                        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                            <Image
                                                src={equipment.image}
                                                alt={equipment.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <p className="line-clamp-1 font-semibold">
                                                {equipment.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {equipment.category}
                                            </p>
                                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <MapPin className="size-3.5 shrink-0" />
                                                <span className="truncate">{equipment.location}</span>
                                            </p>
                                            <p className="text-sm font-bold">
                                                ${equipment.rentalPrice.toLocaleString()}
                                                <span className="text-xs font-normal text-muted-foreground">
                                                    {" "}/ {equipment.rentalType}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-2">
                                        <Badge
                                            variant="secondary"
                                            className={isAvailable ? availableStyle : unavailableStyle}
                                        >
                                            {isAvailable ? "Available" : "Unavailable"}
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                render={<Link href={`/all-equipments/${equipment._id}`} />}
                                            >
                                                <Eye className="size-4" />
                                                View
                                            </Button>
                                            <DeleteFavouriteDialog favourite={fav} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Tablet/Desktop: table (md and up) */}
                    <div className="hidden rounded-2xl border bg-card shadow-sm md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Equipment</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Availability</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {favourites.map((fav) => {
                                    const { equipment } = fav
                                    const isAvailable = equipment.availableQuantity > 0
                                    return (
                                        <TableRow key={fav._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
                                                        <Image
                                                            src={equipment.image}
                                                            alt={equipment.name}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <p className="line-clamp-1 font-medium">
                                                        {equipment.name}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap">
                                                {equipment.category}
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap">
                                                ${equipment.rentalPrice.toLocaleString()}
                                                <span className="text-xs text-muted-foreground">
                                                    {" "}/ {equipment.rentalType}
                                                </span>
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap">
                                                {equipment.location}
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={isAvailable ? availableStyle : unavailableStyle}
                                                >
                                                    {isAvailable ? "Available" : "Unavailable"}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        render={<Link href={`/all-equipments/${equipment._id}`} />}
                                                    >
                                                        <Eye className="size-4" />
                                                        View Details
                                                    </Button>
                                                    <DeleteFavouriteDialog favourite={fav} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
        </section>
    )
}

export default Favourites