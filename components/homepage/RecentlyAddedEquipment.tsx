
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";




export interface IRecentEquipment {
    id: string;
    name: string;
    category: string;
    location: string;
    pricePerDay: number;
    image: string;
}

export const recentlyAddedEquipment: IRecentEquipment[] = [
    {
        id: "recent-001",
        name: "Professional DSLR Camera",
        category: "Photography Equipment",
        location: "Dhaka",
        pricePerDay: 2500,
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "recent-002",
        name: "Mini Excavator",
        category: "Construction Equipment",
        location: "Chattogram",
        pricePerDay: 8500,
        image:
            "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "recent-003",
        name: "Portable Generator",
        category: "Electronics",
        location: "Gazipur",
        pricePerDay: 1800,
        image:
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "recent-004",
        name: "Agricultural Tractor",
        category: "Agriculture Equipment",
        location: "Rajshahi",
        pricePerDay: 5000,
        image:
            "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80",
    },
];


const RecentlyAddedEquipment = () => {
    return (
        <section className="py-16 md:py-20 max-w-7xl mx-auto">
            <div className="container mx-auto px-4">
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
                        href="/equipment"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                        View All Equipment
                        <ArrowUpRight size={18} />
                    </Link>
                </div>

                {/* Equipment Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {recentlyAddedEquipment.map((equipment) => (
                        <div
                            key={equipment.id}
                            className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Equipment Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={equipment.image}
                                    alt={equipment.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                                            ৳{equipment.pricePerDay.toLocaleString("en-BD")}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            /day
                                        </span>
                                    </div>

                                    <Link
                                        href={`/equipment/${equipment.id}`}
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
