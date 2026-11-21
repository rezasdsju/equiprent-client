'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IEquipment } from "@/types/equipmentTypes"

import { CATEGORIES, RENTAL_TYPES } from "@/constants/equipment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadImage } from "@/hooks/useImageUpload"
import React, { useState } from "react"
import { updateEquipmentByAdmin } from "@/lib/actions/equipments"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"


export function UpdateEquipment({ equipment }: { equipment: IEquipment }) {

    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(equipment.category)
    const [rentalType, setRentalType] = useState<string | null>(equipment.rentalType)

    const { resetImage, imagePreview, imageUrl, isUploadingImage, handleImageChange } = UploadImage()
    const [clickedToUpdateButton, setClickedToUpdateButton] = useState(false)
    const [open, setOpen] = useState(false)



    const handleUpdateEquipment = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        if (!rentalType || !selectedCategory) {
            toast.add({
                type: "error",
                description: "Please select a category and rental type",
                priority: "high",
            })
            return
        }

        const equipmentData: IEquipment = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            category: selectedCategory,
            location: formData.get("location") as string,
            rentalPrice: Number(formData.get("rentalPrice")),
            rentalType: rentalType as IEquipment["rentalType"],
            availableQuantity: Number(formData.get("availableQuantity")),
            condition: formData.get("condition") as string,
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            image: imageUrl || equipment.image,
            rentalTerms: formData.get("rentalTerms") as string,
        }

        if (!equipment._id) {
            toast.add({ type: "error", description: "Invalid equipment", priority: "high" })
            return
        }
        setClickedToUpdateButton(true)
        // console.log(equipmentData)

        try {
            const result = await updateEquipmentByAdmin(equipmentData, equipment._id)
            // console.log(result)
            if (!result.ok) {
                toast.add({
                    type: "error",
                    description: result.message ?? "Failed to update equipment",
                    priority: "high"
                })
                return
            }


            toast.add({
                type: "success",
                description: "Equipment updated successfully!",
                priority: "high"
            })


            router.refresh()
            setOpen(false)

        } catch (error) {

            toast.add({
                type: "error",
                description: "Something went wrong. Please try again.",
                priority: "high"
            })
        } finally {
            setClickedToUpdateButton(false)
        }
    }
    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v)
                if (!v) {
                    setSelectedCategory(equipment.category)
                    setRentalType(equipment.rentalType)
                    resetImage()
                }
            }}
        >
            <DialogTrigger
                render={
                    <button className="rounded-md border px-3 py-2 text-xs hover:bg-muted">
                        <Pencil className="size-4" />
                    </button>
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">
                        Update Equipment
                    </DialogTitle>
                    <DialogDescription>
                        Update your equipment information and rental details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleUpdateEquipment}>
                    <FieldGroup>
                        <div className="grid gap-5 sm:grid-cols-2">

                            <Field>
                                <Label htmlFor="update-name">
                                    Equipment Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-name"
                                    name="name"
                                    defaultValue={equipment.name}
                                    placeholder="e.g. Mini Excavator"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="category">
                                    Category <span className="text-destructive">*</span>
                                </FieldLabel>
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
                                <Field>
                                    <Label htmlFor="update-description">
                                        Description <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="update-description"
                                        name="description"
                                        rows={4}
                                        defaultValue={equipment.description}
                                        placeholder="Describe the equipment..."
                                        required
                                    />
                                </Field>
                            </div>

                            <Field>
                                <Label htmlFor="update-location">
                                    Location <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-location"
                                    name="location"
                                    defaultValue={equipment.location}
                                    placeholder="e.g. Dhaka"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="update-rentalPrice">
                                    Rental Price <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-rentalPrice"
                                    name="rentalPrice"
                                    type="number"
                                    min={0}
                                    defaultValue={equipment.rentalPrice}
                                    placeholder="e.g. 2500"
                                    required
                                />
                            </Field>


                            <Field>
                                <FieldLabel htmlFor="rentalType">
                                    Rental Type <span className="text-destructive">*</span>
                                </FieldLabel>
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

                            <Field>
                                <Label htmlFor="update-quantity">
                                    Available Quantity <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-quantity"
                                    name="availableQuantity"
                                    type="number"
                                    min={1}
                                    defaultValue={equipment.availableQuantity}
                                    placeholder="e.g. 3"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="update-condition">
                                    Equipment Condition <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-condition"
                                    name="condition"
                                    defaultValue={equipment.condition}
                                    placeholder="e.g. Excellent, Good, Used"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="update-brand">
                                    Brand <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-brand"
                                    name="brand"
                                    defaultValue={equipment.brand}
                                    placeholder="e.g. Canon"
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="update-model">
                                    Model <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="update-model"
                                    name="model"
                                    defaultValue={equipment.model}
                                    placeholder="e.g. EOS 90D"
                                    required
                                />
                            </Field>

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
                                <Field >
                                    <FieldLabel htmlFor="image">Equipment Image</FieldLabel>
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
                                <Field>
                                    <Label htmlFor="update-rentalTerms">
                                        Rental Terms and Conditions <span className="text-destructive">*</span>
                                    </Label>
                                    <Textarea
                                        id="update-rentalTerms"
                                        name="rentalTerms"
                                        rows={4}
                                        defaultValue={equipment.rentalTerms}
                                        placeholder="Security deposit, late fees, usage rules..."
                                        required
                                    />
                                </Field>
                            </div>

                        </div>
                    </FieldGroup>

                    <DialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row">
                        <DialogClose render={
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        } />
                        <Button
                            disabled={clickedToUpdateButton || isUploadingImage}
                            type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}