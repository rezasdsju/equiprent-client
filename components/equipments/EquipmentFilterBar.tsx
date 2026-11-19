
'use client'
import {
    CalendarDays,
    CircleCheck,
    DollarSign,
    LayoutGrid,
    Search,
    SlidersHorizontal,
} from "lucide-react"

const CATEGORY_ITEMS = [
    { value: "all", label: "All Categories" },
    { value: "Construction Equipment", label: "Construction Equipment" },
    { value: "Photography Equipment", label: "Photography Equipment" },
    { value: "Agriculture Equipment", label: "Agriculture Equipment" },
    { value: "Electronics", label: "Electronics" },
    { value: "Event Equipment", label: "Event Equipment" },
    { value: "Vehicles & Transportation", label: "Vehicles & Transportation" },
]

const RENTAL_TYPE_ITEMS = [
    { value: "all", label: "All Types" },
    { value: "Hourly", label: "Hourly" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
]

const AVAILABILITY_ITEMS = [
    { value: "any", label: "Any Status" },
    { value: "Available", label: "Available" },
    { value: "Unavailable", label: "Unavailable" },
]

const SORT_ITEMS = [
    { value: "recent", label: "Recently Added" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
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


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"




const EquipmentFilterBar = () => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [searchText, setSearchText] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || 'all')
    const [rentalType, setRentalType] = useState(searchParams.get('rentalType') || 'all')
    const [availability, setAvailability] = useState(searchParams.get('availability') || 'any')
    const [sort, setSort] = useState(searchParams.get('sort') || 'recent')

    // console.log('searchParams: ', searchParams)

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== 'all' && value !== 'any') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.push(`${pathName}?${params.toString()}`)
    }

    const resetFilters = () => {
        setMinPrice('')
        setMaxPrice('')
        setSearchText('')
        setCategory('all')
        setRentalType('all')
        setAvailability('any')
        setSort('recent')

        router.push(pathName)
    }
    const applyFilters = () => {
        updateParams({
            category,
            rentalType,
            minPrice,
            maxPrice,
            availability,
            sort,
            search: searchText
        })
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5 lg:p-6">
            {/* Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-0 flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        aria-label="Search equipment by name or location"
                        placeholder="Search by equipment name or location..."
                        className="h-12 rounded-xl border-border bg-background pl-10 text-sm"
                    />
                </div>

                <Button
                    onClick={() => updateParams({ search: searchText })}
                    className="h-12 w-full gap-2 rounded-xl bg-amber-400 px-6 font-semibold text-zinc-950 hover:bg-amber-300 sm:w-auto"
                >
                    <Search className="size-4" />
                    Search
                </Button>
            </div>

            {/* Filters */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4">
                {/* Category */}
                <div className="flex min-w-0 flex-col gap-2">
                    <FilterLabel icon={<LayoutGrid className="size-4" />}>
                        Category
                    </FilterLabel>

                    <Select
                        defaultValue="all"
                        value={category}
                        onValueChange={(value) => setCategory(value ?? "all")}
                        items={CATEGORY_ITEMS}
                    >
                        <SelectTrigger
                            aria-label="Category"
                            className="h-11 w-full rounded-xl bg-background"
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

                {/* Rental Type */}
                <div className="flex min-w-0 flex-col gap-2">
                    <FilterLabel icon={<CalendarDays className="size-4" />}>
                        Rental Type
                    </FilterLabel>

                    <Select
                        defaultValue="all"
                        value={rentalType}
                        onValueChange={(value) => setRentalType(value ?? "all")}
                        items={RENTAL_TYPE_ITEMS}
                    >
                        <SelectTrigger
                            aria-label="Rental type"
                            className="h-11 w-full rounded-xl bg-background"
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

                {/* Price Range */}
                <div className="flex min-w-0 flex-col gap-2">
                    <FilterLabel icon={<DollarSign className="size-4" />}>
                        Price Range
                    </FilterLabel>

                    <div className="flex items-center gap-2">
                        <div className="relative min-w-0 flex-1">
                            <DollarSign className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                type="number"
                                inputMode="numeric"
                                aria-label="Minimum price per day"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="h-11 min-w-0 rounded-xl bg-background pl-7 text-sm"
                            />
                        </div>

                        <span className="text-muted-foreground">–</span>

                        <div className="relative min-w-0 flex-1">
                            <DollarSign className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                type="number"
                                inputMode="numeric"
                                aria-label="Maximum price per day"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="h-11 min-w-0 rounded-xl bg-background pl-7 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="flex min-w-0 flex-col gap-2">
                    <FilterLabel icon={<CircleCheck className="size-4" />}>
                        Availability
                    </FilterLabel>

                    <Select
                        defaultValue="any"
                        value={availability}
                        onValueChange={(value) => setAvailability(value ?? "any")}
                        items={AVAILABILITY_ITEMS}
                    >
                        <SelectTrigger
                            aria-label="Availability"
                            className="h-11 w-full rounded-xl bg-background"
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

                {/* Sort By */}
                <div className="flex min-w-0 flex-col gap-2">
                    <FilterLabel icon={<SlidersHorizontal className="size-4" />}>
                        Sort By
                    </FilterLabel>

                    <Select
                        defaultValue="recent"
                        value={sort}
                        onValueChange={(value) => setSort(value ?? "recent")}
                        items={SORT_ITEMS}
                    >
                        <SelectTrigger
                            aria-label="Sort by"
                            className="h-11 w-full rounded-xl bg-background"
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

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="h-11 w-full rounded-xl sm:w-auto"
                >
                    Reset Filters
                </Button>

                <Button
                    onClick={applyFilters}
                    className="h-11 w-full rounded-xl px-6 sm:w-auto"
                >
                    <SlidersHorizontal className="mr-2 size-4" />
                    Apply Filters
                </Button>
            </div>
        </div>
    )
}


export default EquipmentFilterBar