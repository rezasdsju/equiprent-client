
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { IEquipment } from "@/types/equipmentTypes";
import { getFourRecentlyAddedEquipments } from "@/lib/api/equipments";

const RecentlyAddedEquipment = async () => {
    const recentlyAddedEquipment: IEquipment[] = await getFourRecentlyAddedEquipments()
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div>
                {/* Section Heading */}
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                            Fresh Arrivals
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Recently Added Equipment
                        </h2>

                        <p className="mt-3 max-w-xl text-muted-foreground">
                            Discover the latest equipment added to EquipRent.
                        </p>
                    </div>

                    <Link
                        href="/all-equipments"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        View All Equipment
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                {/* Equipment Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {recentlyAddedEquipment.map((equipment) => (
                        <div
                            key={equipment._id}
                            className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Equipment Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={equipment.image}
                                    alt={equipment.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Equipment Information */}
                            <div className="p-5">
                                <p className="text-xs font-medium text-primary">
                                    {equipment.category}
                                </p>

                                <h3 className="mt-2 text-lg font-semibold">
                                    {equipment.name}
                                </h3>

                                <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                                    <MapPin size={15} />
                                    {equipment.location}
                                </p>

                                <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
                                    <div>
                                        <span className="text-lg font-bold">
                                            ${equipment.rentalPrice.toLocaleString("en-US")}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            /{equipment.rentalType.toLowerCase()}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/all-equipments/${equipment._id}`}
                                        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentlyAddedEquipment;
