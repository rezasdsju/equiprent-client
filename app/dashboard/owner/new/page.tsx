import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CATEGORIES = [
    "Construction Equipment",
    "Photography Equipment",
    "Vehicles & Transportation",
    "Agriculture Equipment",
    "Electronics",
    "Event Equipment",
]

const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"]

const Field = ({
    label,
    htmlFor,
    children,
}: {
    label: string
    htmlFor: string
    children: React.ReactNode
}) => (
    <div className="flex flex-col gap-1.5">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
    </div>
)

const AddEquipmentPage = () => {
    return (
        <section className="mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">Add Equipment</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    List your equipment for rent. It will be reviewed by an admin before going live.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Equipment Name" htmlFor="name">
                        <Input id="name" placeholder="e.g. Mini Excavator" />
                    </Field>

                    <Field label="Category" htmlFor="category">
                        <Select>
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    <div className="sm:col-span-2">
                        <Field label="Description" htmlFor="description">
                            <Textarea
                                id="description"
                                rows={4}
                                placeholder="Describe the equipment, its features and usage"
                            />
                        </Field>
                    </div>

                    <Field label="Location" htmlFor="location">
                        <Input id="location" placeholder="e.g. Dhaka" />
                    </Field>

                    <Field label="Rental Price" htmlFor="rentalPrice">
                        <Input id="rentalPrice" type="number" min={0} placeholder="e.g. 2500" />
                    </Field>

                    <Field label="Rental Type" htmlFor="rentalType">
                        <Select>
                            <SelectTrigger id="rentalType" className="w-full">
                                <SelectValue placeholder="Select rental type" />
                            </SelectTrigger>
                            <SelectContent>
                                {RENTAL_TYPES.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field label="Available Quantity" htmlFor="availableQuantity">
                        <Input id="availableQuantity" type="number" min={1} placeholder="e.g. 3" />
                    </Field>

                    <Field label="Equipment Condition" htmlFor="condition">
                        <Input id="condition" placeholder="e.g. Excellent, Good, Used" />
                    </Field>

                    <Field label="Brand" htmlFor="brand">
                        <Input id="brand" placeholder="e.g. Caterpillar" />
                    </Field>

                    <Field label="Model" htmlFor="model">
                        <Input id="model" placeholder="e.g. 305 CR" />
                    </Field>

                    <Field label="Equipment Image" htmlFor="image">
                        <Input id="image" type="file" accept="image/*" />
                    </Field>

                    <div className="sm:col-span-2">
                        <Field label="Rental Terms and Conditions" htmlFor="rentalTerms">
                            <Textarea
                                id="rentalTerms"
                                rows={4}
                                placeholder="Security deposit, late fees, usage rules..."
                            />
                        </Field>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="button">Add Equipment</Button>
                </div>
            </div>
        </section>
    )
}

export default AddEquipmentPage