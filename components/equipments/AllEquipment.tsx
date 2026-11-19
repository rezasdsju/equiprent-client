"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import ExcavatorImage from "@/app/assets/excavator.jpg"

/**
 * Catalog hero.
 *
 * The photo sits full-bleed behind a left-to-right scrim: on phones the copy
 * covers most of the frame, on wide screens the gradient clears so the machine
 * stays visible on the right.
 */
const AllEquipment = () => {
  return (
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

      {/* Warm glow ties the amber accent to the machine behind it. */}
      <div className="absolute -top-24 -left-16 size-72 rounded-full bg-amber-500/25 blur-3xl sm:size-96" />

      <div className="relative z-10 flex min-h-80 flex-col justify-center gap-4 px-6 py-14 sm:min-h-96 sm:gap-5 sm:px-10 lg:min-h-112 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-sm sm:text-xs"
        >
          <span className="size-1.5 rounded-full bg-amber-400" />
          Equipment marketplace
        </motion.span>

        <motion.h1
          id="all-equipment-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          All <span className="text-amber-400">Equipment</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-md text-sm leading-relaxed font-medium text-zinc-200 sm:max-w-lg sm:text-base lg:text-lg"
        >
          Find the perfect equipment for your project.
          <span className="mt-1 block text-zinc-300/90">
            Browse, search and filter from our extensive collection.
          </span>
        </motion.p>
      </div>
    </section>
  )
}

export default AllEquipment
