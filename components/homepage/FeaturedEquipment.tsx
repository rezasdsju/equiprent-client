"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
import { IEquipment } from "@/types/equipmentTypes";

const FeaturedEquipment = ({
  featuredEquipment,
}: {
  featuredEquipment: IEquipment[];
}) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleViewDetails = (equipmentId?: string) => {
    if (isPending || !equipmentId) return;

    if (!session?.user) {
      router.push(`/sign-in?redirectTo=/all-equipments/${equipmentId}`);
      return;
    }

    router.push(`/all-equipments/${equipmentId}`);
  };

  return (
    <section className="my-12 px-1 sm:my-16 max-w-7xl mx-auto">
      <div className="">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore Our Collection
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured <span className="text-primary">Equipment</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find the right equipment for your next project. Explore quality
            machinery and rent with confidence.
          </p>
        </motion.div>

        {/* Equipment Carousel */}
        <Carousel opts={{ align: "start" }} className="mx-auto w-full px-1">
          <CarouselContent>
            {featuredEquipment.map((equipment) => (
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
                          ${equipment.rentalPrice.toLocaleString()}
                          <span className="text-xs font-normal text-muted-foreground">
                            {" "}/ {equipment.rentalType.toLowerCase()}
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