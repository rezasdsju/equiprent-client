'use client'
import Image from "next/image"
import Link from "next/link"
import BannerImage from "@/app/assets/banner-1.jpg"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
const Banner = () => {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <section className="relative min-h-100 w-full overflow-hidden sm:min-h-125 lg:min-h-150 max-w-7xl mx-auto">
            {!imageLoaded && (
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}

            <Image
                src={BannerImage}
                alt="Construction and power equipment available for rent on EquipRent"
                fill
                sizes="100vw"
                className="object-cover"
                priority
                onLoad={() => setImageLoaded(true)}
            />

            {/* Dark overlay: makes white text readable on any image */}
            <div className="absolute inset-0 bg-linear-to-r from-black/45 via-black/20 to-transparent dark:from-black/35 dark:via-black/15 dark:to-transparent" />

            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 space-y-4 sm:left-8 sm:right-auto sm:max-w-xl lg:left-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl"
                >
                    Rent the Right Equipment, Right When You Need It
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-zinc-100 font-medium drop-shadow-md sm:text-lg"
                >
                    EquipRent connects equipment owners with customers. Browse available
                    gear, book it for the days you need, and pay securely online.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}

                    className="flex flex-wrap items-center gap-3">
                    <Button size="lg">
                        <Link href="/all-equipments">Browse Equipment</Link>
                    </Button>
                    <Button

                        size="lg"
                        variant="outline"
                        className="border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                    >
                        <Link href="/dashboard/owner/new">List Your Equipment</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default Banner