
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { IEquipment } from "@/types/equipmentTypes";

const EquipmentCard = ({ equipment }: { equipment: IEquipment }) => {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Equipment Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={equipment.image}
          alt={equipment.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            equipment.availability === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {equipment.availability}
        </span>
      </div>

      {/* Equipment Information */}
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {equipment.category}
          </p>

          <h3 className="mt-2 text-lg font-bold tracking-tight">
            {equipment.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">
            ৳{equipment.rentalPrice.toLocaleString("en-BD")}
          </span>
          <span className="text-sm text-muted-foreground">
            / {equipment.rentalType.toLowerCase()}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{equipment.location}</span>
        </div>

        {/* View Details */}
        <Link
          href={`/all-equipments/${equipment._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Details
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default EquipmentCard;
