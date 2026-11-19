
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


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"




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


export default EquipmentFilterBar