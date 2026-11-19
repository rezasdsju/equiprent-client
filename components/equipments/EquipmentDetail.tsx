import Image from "next/image"
import { MapPin, Heart, CalendarDays, Package, User, FileText, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { IEquipment } from "@/types/equipmentTypes"

const EquipmentDetail = ({ equipment }: { equipment: IEquipment }) => {
    const isAvailable = equipment.availability === "Available"

    return (
        <section className="px-1 py-6 sm:px-2 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">

                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border bg-muted">
                    <Image
                        src={equipment.image}
                        alt={equipment.name}
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                {/* Main info */}
                <div className="space-y-5">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{equipment.category}</Badge>
                            <Badge variant={isAvailable ? "default" : "destructive"}>
                                {equipment.availability}
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold sm:text-3xl">{equipment.name}</h1>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            {equipment.location}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-3xl font-bold">
                            ${equipment.rentalPrice?.toLocaleString()}
                            <span className="text-base font-normal text-muted-foreground">
                                {" "}/ {equipment.rentalType}
                            </span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 rounded-lg border p-3">
                            <CalendarDays className="size-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Rental Type</p>
                                <p className="font-medium">{equipment.rentalType}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border p-3">
                            <Package className="size-4 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Available Quantity</p>
                                <p className="font-medium">{equipment.availableQuantity ?? "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* UI only: no functionality yet */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" className="flex-1" disabled={!isAvailable}>
                            Book Now
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1 gap-2">
                            <Heart className="size-4" />
                            Add to Favorites
                        </Button>
                    </div>
                </div>
            </div>

            {/* Lower details */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground">
                            {equipment.description ?? "No description provided."}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <FileText className="size-5 text-primary" />
                            Rental Terms and Conditions
                        </h2>
                        <p className="text-muted-foreground">
                            {equipment.rentalTerms ?? "No terms provided."}
                        </p>
                    </div>
                </div>

                <div className="h-fit space-y-3 rounded-xl border bg-card p-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <User className="size-5 text-primary" />
                        Owner Information
                    </h2>
                    <div className="space-y-2 text-sm">
                        <p className="font-medium">{equipment.owner?.name ?? "N/A"}</p>
                        {equipment.owner?.email && (
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="size-4" />
                                {equipment.owner.email}
                            </p>
                        )}
                        {equipment.owner?.phone && (
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="size-4" />
                                {equipment.owner.phone}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EquipmentDetail