
"use client";
export interface IEquipment {
  _id: string;
  name: string;
  category: string;
  location: string;
  pricePerDay: number;
  image: string;
  status: "approved" | "pending" | "rejected";
}

export const featuredEquipment: IEquipment[] = [
  {
    _id: "eq-001",
    name: "CAT Hydraulic Excavator",
    category: "Construction",
    location: "Dhaka, Bangladesh",
    pricePerDay: 12000,
    image:
      "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
  {
    _id: "eq-002",
    name: "Heavy Duty Bulldozer",
    category: "Construction",
    location: "Chattogram, Bangladesh",
    pricePerDay: 15000,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
  {
    _id: "eq-003",
    name: "Industrial Forklift",
    category: "Material Handling",
    location: "Gazipur, Bangladesh",
    pricePerDay: 5000,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
  {
    _id: "eq-004",
    name: "Portable Industrial Generator",
    category: "Power Equipment",
    location: "Narayanganj, Bangladesh",
    pricePerDay: 3500,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
  {
    _id: "eq-005",
    name: "Road Roller Compactor",
    category: "Road Construction",
    location: "Sylhet, Bangladesh",
    pricePerDay: 8000,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
  {
    _id: "eq-006",
    name: "Concrete Mixer Truck",
    category: "Construction",
    location: "Rajshahi, Bangladesh",
    pricePerDay: 7000,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
    status: "approved",
  },
];





import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
// import { featuredEquipment } from "@/data/featured-equipment";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedEquipment = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleViewDetails = (equipmentId: string) => {
    if (isPending) return;

    if (!session?.user) {
      router.push(`/sign-in?redirectTo=/equipment/${equipmentId}`);
      return;
    }

    router.push(`/equipment/${equipmentId}`);
  };

  return (
    <section className="my-12 px-4 sm:my-16">
      <div className="">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore Our Collection
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured <span className="text-primary">Equipment</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find the right equipment for your next project.
            Explore quality machinery and rent with confidence.
          </p>
        </motion.div>

        {/* Equipment Carousel */}
        <Carousel
          opts={{ align: "start" }}
          className="mx-auto w-full px-10"
        >
          <CarouselContent>
            {featuredEquipment
              .filter((equipment) => equipment.status === "approved")
              .slice(0, 6)
              .map((equipment) => (
                <CarouselItem
                  key={equipment._id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
                    {/* Equipment Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                        {equipment.category}
                      </span>
                    </div>

                    {/* Equipment Information */}
                    <div className="space-y-3 p-4">
                      <h3 className="line-clamp-1 text-lg font-semibold">
                        {equipment.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{equipment.location}</span>
                      </div>

                      <div className="flex items-center justify-between border-t pt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Rental Price
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ৳{equipment.pricePerDay.toLocaleString()}
                            <span className="text-xs font-normal text-muted-foreground">
                              {" "}/ day
                            </span>
                          </p>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(equipment._id)}
                          disabled={isPending}
                        >
                          View Details
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
