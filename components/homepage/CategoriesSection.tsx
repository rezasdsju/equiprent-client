'use client'


export interface IEquipmentCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const equipmentCategories: IEquipmentCategory[] = [
  {
    id: "cat-001",
    name: "Construction Equipment",
    slug: "construction",
    description: "Heavy machinery for construction and building projects.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat-002",
    name: "Photography Equipment",
    slug: "photography",
    description: "Professional cameras, lenses, and photography gear.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat-003",
    name: "Vehicles & Transportation",
    slug: "vehicles",
    description: "Reliable vehicles for transportation and logistics.",
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat-004",
    name: "Agriculture Equipment",
    slug: "agriculture",
    description: "Modern farming machinery for agricultural work.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat-005",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices for work and productivity.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat-006",
    name: "Event Equipment",
    slug: "event",
    description: "Everything you need for successful events and occasions.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  },
];











import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";


const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto">
      <div className=" mx-auto px-1 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Explore Categories
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Find Equipment by Category
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore a wide range of equipment categories and find the right
            tools for your next project.
          </p>
        </motion.div>



        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentCategories.map((category) => (
            <Link
              key={category.id}
              href={`/equipment?category=${category.slug}`}
              className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <ArrowUpRight
                  className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                  size={20}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
