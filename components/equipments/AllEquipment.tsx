"use client"

import Image from "next/image"


import ExcavatorImage from "@/app/assets/excavator.jpg"
import EquipmentFilterBar from "./EquipmentFilterBar"
import { IEquipment } from "@/types/equipmentTypes";
import EquipmentCard from "./EquipmentCard";





export const equipmentData: IEquipment[] = [
    {
        id: "eq-001",
        name: "Mini Excavator",
        category: "Construction Equipment",
        rentalPrice: 8500,
        rentalType: "Daily",
        location: "Dhaka",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-18T10:30:00Z",
    },
    {
        id: "eq-002",
        name: "Forklift",
        category: "Construction Equipment",
        rentalPrice: 6000,
        rentalType: "Daily",
        location: "Chattogram",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-17T08:15:00Z",
    },
    {
        id: "eq-003",
        name: "Concrete Mixer",
        category: "Construction Equipment",
        rentalPrice: 4000,
        rentalType: "Daily",
        location: "Sylhet",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-16T12:00:00Z",
    },
    {
        id: "eq-004",
        name: "DSLR Camera",
        category: "Photography Equipment",
        rentalPrice: 1500,
        rentalType: "Daily",
        location: "Dhaka",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-15T09:45:00Z",
    },
    {
        id: "eq-005",
        name: "Sedan Car",
        category: "Vehicles & Transportation",
        rentalPrice: 5000,
        rentalType: "Daily",
        location: "Dhaka",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-14T14:20:00Z",
    },
    {
        id: "eq-006",
        name: "Power Drill",
        category: "Electronics",
        rentalPrice: 1000,
        rentalType: "Daily",
        location: "Rajshahi",
        availability: "Unavailable",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-13T11:10:00Z",
    },
    {
        id: "eq-007",
        name: "Agricultural Tractor",
        category: "Agriculture Equipment",
        rentalPrice: 5000,
        rentalType: "Daily",
        location: "Rangpur",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-12T07:30:00Z",
    },
    {
        id: "eq-008",
        name: "Professional Sound System",
        category: "Event Equipment",
        rentalPrice: 2500,
        rentalType: "Daily",
        location: "Khulna",
        availability: "Unavailable",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-10T16:00:00Z",
    },
    {
        id: "eq-009",
        name: "Professional Video Camera",
        category: "Photography Equipment",
        rentalPrice: 800,
        rentalType: "Hourly",
        location: "Dhaka",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-09T13:00:00Z",
    },
    {
        id: "eq-010",
        name: "Portable Generator",
        category: "Electronics",
        rentalPrice: 1800,
        rentalType: "Daily",
        location: "Gazipur",
        availability: "Available",
        approvalStatus: "approved",
        image:
            "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
        createdAt: "2026-11-08T10:00:00Z",
    },
];

const AllEquipment = () => {
    return (
        <div className="pb-16">
            <section
                aria-labelledby="all-equipment-heading"
                className="relative isolate mx-auto my-6 w-full max-w-7xl overflow-hidden bg-zinc-950 sm:my-8 sm:w-[calc(100%-2rem)] sm:rounded-3xl sm:ring-1 sm:ring-white/10 lg:my-10 lg:w-[calc(100%-3rem)]"
            >
                <Image
                    src={ExcavatorImage}
                    alt="Excavators and earth-moving machinery parked on a rental yard"
                    fill
                    priority
                    sizes="(min-width: 640px) 80rem, 100vw"
                    className="object-cover object-[68%_center] lg:object-right"
                />

                {/* Copy-side scrim: opaque on the left, clear where the machine sits. */}
                <div className="absolute inset-0 bg-linear-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/30 lg:via-zinc-950/65 lg:to-zinc-950/0" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/75 via-transparent to-transparent" />

                <div className="relative z-10 flex min-h-80 flex-col justify-center gap-4 px-6 py-14 sm:min-h-96 sm:gap-5 sm:px-10 lg:min-h-112 lg:px-16">
                    <span className="inline-flex w-fit animate-in items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-sm duration-500 slide-in-from-bottom-2 sm:text-xs">
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        Equipment marketplace
                    </span>

                    <h1
                        id="all-equipment-heading"
                        className="max-w-2xl animate-in text-4xl leading-[1.05] font-bold tracking-tight text-balance text-white duration-700 slide-in-from-bottom-3 sm:text-5xl lg:text-6xl xl:text-7xl"
                    >
                        All <span className="text-amber-400">Equipment</span>
                    </h1>

                    <p className="max-w-md animate-in text-sm leading-relaxed font-medium text-zinc-200 duration-700 slide-in-from-bottom-3 sm:max-w-lg sm:text-base lg:text-lg">
                        Find the perfect equipment for your project.
                        <span className="mt-1 block text-zinc-300/90">
                            Browse, search and filter from our extensive collection.
                        </span>
                    </p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-7xl px-4 sm:w-[calc(100%-2rem)] sm:px-0 lg:w-[calc(100%-3rem)]">
                <EquipmentFilterBar />
            </div>



            <div>
                <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {
                        equipmentData.map((equipment: IEquipment) => <EquipmentCard key={equipment.id} equipment={equipment}></EquipmentCard>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AllEquipment
