"use client"

import Image from "next/image"
import {
  CalendarDays,
  CircleCheck,
  DollarSign,
  LayoutGrid,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import ExcavatorImage from "@/app/assets/excavator.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORY_ITEMS = [
  { value: "all", label: "All Categories" },
  { value: "construction", label: "Construction" },
  { value: "power", label: "Power Equipment" },
  { value: "material-handling", label: "Material Handling" },
  { value: "agricultural", label: "Agricultural" },
  { value: "landscaping", label: "Landscaping" },
]

const RENTAL_TYPE_ITEMS = [
  { value: "all", label: "All Types" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

const AVAILABILITY_ITEMS = [
  { value: "any", label: "Any Status" },
  { value: "available", label: "Available" },
  { value: "booked", label: "Booked" },
]

const SORT_ITEMS = [
  { value: "recent", label: "Recently Added" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
]

/** Shared chrome for the label above each filter control. */
const FilterLabel = ({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) => (
  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
    {icon}
    {children}
  </span>
)

/**
 * Catalog filter bar.
 *
 * Presentation only: the controls are uncontrolled placeholders and nothing is
 * wired to search, filtering or sorting yet.
 */
const EquipmentFilterBar = () => {
  return (
    <div className="animate-in rounded-2xl border border-border/70 bg-card p-3 shadow-sm duration-500 slide-in-from-bottom-2 sm:p-4">
      {/* Search row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Search equipment by name or location"
            placeholder="Search by equipment name or location..."
            className="h-11 rounded-xl pr-2 pl-10 text-[13px] sm:h-12 sm:text-sm"
          />
        </div>

        <Button className="h-11 gap-2 rounded-xl bg-amber-400 px-6 font-semibold text-zinc-950 shadow-sm hover:bg-amber-300 sm:h-12 dark:bg-amber-400 dark:text-zinc-950 dark:hover:bg-amber-300">
          <Search className="size-4" />
          Search
        </Button>
      </div>

      {/* Filter row */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-5 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-border/70">
        <div className="flex min-w-0 flex-col gap-1.5 xl:pr-4">
          <FilterLabel icon={<LayoutGrid className="size-4" />}>
            Category
          </FilterLabel>
          <Select defaultValue="all" items={CATEGORY_ITEMS}>
            <SelectTrigger
              aria-label="Category"
              className="h-10 w-full rounded-lg bg-background data-[size=default]:h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 xl:px-4">
          <FilterLabel icon={<CalendarDays className="size-4" />}>
            Rental Type
          </FilterLabel>
          <Select defaultValue="all" items={RENTAL_TYPE_ITEMS}>
            <SelectTrigger
              aria-label="Rental type"
              className="h-10 w-full rounded-lg bg-background data-[size=default]:h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RENTAL_TYPE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 xl:px-4">
          <FilterLabel icon={<DollarSign className="size-4" />}>
            Price Range
          </FilterLabel>
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <DollarSign className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                inputMode="numeric"
                aria-label="Minimum price per day"
                placeholder="Min"
                className="h-10 rounded-lg bg-background pl-7 text-sm"
              />
            </div>
            <span aria-hidden="true" className="text-muted-foreground">
              –
            </span>
            <div className="relative min-w-0 flex-1">
              <DollarSign className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                inputMode="numeric"
                aria-label="Maximum price per day"
                placeholder="Max"
                className="h-10 rounded-lg bg-background pl-7 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 xl:px-4">
          <FilterLabel icon={<CircleCheck className="size-4" />}>
            Availability
          </FilterLabel>
          <Select defaultValue="any" items={AVAILABILITY_ITEMS}>
            <SelectTrigger
              aria-label="Availability"
              className="h-10 w-full rounded-lg bg-background data-[size=default]:h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 xl:pl-4">
          <FilterLabel icon={<SlidersHorizontal className="size-4" />}>
            Sort By
          </FilterLabel>
          <Select defaultValue="recent" items={SORT_ITEMS}>
            <SelectTrigger
              aria-label="Sort by"
              className="h-10 w-full rounded-lg bg-background data-[size=default]:h-10"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

/**
 * Catalog hero.
 *
 * The photo sits full-bleed behind a left-to-right scrim: on phones the copy
 * covers most of the frame, on wide screens the gradient clears so the machine
 * stays visible on the right.
 */
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
    </div>
  )
}

export default AllEquipment
