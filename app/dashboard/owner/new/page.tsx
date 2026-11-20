'use client'
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
import React, { useState } from "react"
import { toast } from "@/components/ui/toast"
import { FieldDescription } from "@/components/ui/field"
import { UploadImage } from "@/hooks/useImageUpload"
import { addEquipment } from "@/lib/actions/equipments"
import { IAddEquipment } from "@/types/equipmentTypes"

import { CATEGORIES, RENTAL_TYPES } from "@/constants/equipment";

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


    const [selectedCategory, setSelectedCategory] = useState<string | null>("")
    const [rentalType, setRentalType] = useState<string | null>("")

    const { resetImage, imagePreview, imageUrl, isUploadingImage, handleImageChange } = UploadImage()
    const [clickedToAddButton, setClickedToAddButton] = useState(false)

    const handleAddEquipment = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isUploadingImage) return

        if (!imageUrl) {
            toast.add({
                type: "error",
                description: "Please upload an equipment image",
                priority: "high"
            })
            return
        }
        const form = e.currentTarget
        const formData = new FormData(e.currentTarget)

        if (!rentalType || !selectedCategory) {
            toast.add({
                type: "error",
                description: "Please select a category and rental type",
                priority: "high",
            })
            return
        }

        const equipmentData: IAddEquipment = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            category: selectedCategory,
            location: formData.get("location") as string,
            rentalPrice: Number(formData.get("rentalPrice")),
            rentalType: rentalType as IAddEquipment["rentalType"],
            availableQuantity: Number(formData.get("availableQuantity")),
            condition: formData.get("condition") as string,
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            image: imageUrl,
            rentalTerms: formData.get("rentalTerms") as string,
        }

        // console.log('equipmentData: ', equipmentData)
        setClickedToAddButton(true)

        try {
            const result = await addEquipment(equipmentData)

            if (!result.ok) {
                toast.add({
                    type: "error",
                    description: result.message ?? "Failed to add equipment",
                    priority: "high"
                })
                return
            }

            toast.add({
                type: "success",
                description: "Equipment added successfully!",
                priority: "high"
            })

            form.reset()
            setSelectedCategory("")
            setRentalType("")
            resetImage()
        } catch (error) {
            // console.error("Add equipment error:", error)

            toast.add({
                type: "error",
                description: "Something went wrong. Please try again.",
                priority: "high"
            })

        } finally {

            setClickedToAddButton(false)
        }
    }


    return (
        <section className="mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold sm:text-3xl">Add Equipment</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    List your equipment for rent. It will be reviewed by an admin before going live.
                </p>
            </div>

            <form
                onSubmit={handleAddEquipment}
                className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Equipment Name" htmlFor="name">
                        <Input name="name" id="name" placeholder="e.g. Mini Excavator" required />
                    </Field>

                    <Field label="Category" htmlFor="category">
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
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
                                name="description"
                                id="description"
                                rows={4}
                                placeholder="Describe the equipment, its features and usage"
                            />
                        </Field>
                    </div>

                    <Field label="Location" htmlFor="location">
                        <Input name="location" id="location" placeholder="e.g. Dhaka" required />
                    </Field>

                    <Field label="Rental Price" htmlFor="rentalPrice">
                        <Input name="rentalPrice" id="rentalPrice" type="number" min={0} placeholder="e.g. 2500" required />
                    </Field>

                    <Field label="Rental Type" htmlFor="rentalType">
                        <Select
                            value={rentalType}
                            onValueChange={setRentalType}
                        >
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
                        <Input name="availableQuantity" id="availableQuantity" type="number" min={1} placeholder="e.g. 3" required />
                    </Field>

                    <Field label="Equipment Condition" htmlFor="condition">
                        <Input name="condition" id="condition" placeholder="e.g. Excellent, Good, Used" required />
                    </Field>

                    <Field label="Brand" htmlFor="brand">
                        <Input name="brand" id="brand" placeholder="e.g. Caterpillar" required />
                    </Field>

                    <Field label="Model" htmlFor="model">
                        <Input name="model" id="model" placeholder="e.g. 305 CR" required />
                    </Field>

                    {/* <Field label="Equipment Image" htmlFor="image">
                        <Input name="image" id="image" type="file" accept="image/*" required />
                    </Field>
 */}



                    <div className={`flex items-center justify-between ${imagePreview && 'gap-5'}`}>
                        <div>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Equipment Image Preview"
                                    className="mt-3 size-20 rounded-full object-cover"
                                />
                            )}
                        </div>
                        <Field label="Equipment Image" htmlFor="image">
                            <Input
                                name="image"
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}

                            />
                            <FieldDescription>
                                {isUploadingImage
                                    ? "Uploading image..."
                                    : imageUrl
                                        ? "Image uploaded successfully"
                                        : "Upload your Equipment photo"}
                            </FieldDescription>
                        </Field>

                    </div>




                    <div className="sm:col-span-2">
                        <Field label="Rental Terms and Conditions" htmlFor="rentalTerms">
                            <Textarea
                                name="rentalTerms"
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
                    <Button
                        disabled={isUploadingImage || clickedToAddButton}
                        type="submit">Add Equipment</Button>
                </div>
            </form>
        </section>
    )
}

export default AddEquipmentPage