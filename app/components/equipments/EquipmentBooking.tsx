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
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { IEquipment } from "@/types/equipmentTypes"
import React, { useState } from "react"
import { toast } from "../../../components/ui/toast"
import { IAddBooking } from "@/types/bookingTypes"
import { bookEquipment } from "@/lib/actions/bookings"
import { useRouter } from "next/navigation"


const EquipmentBooking = ({ equipment }: { equipment: IEquipment }) => {
    const isAvailable = equipment.availableQuantity > 0
    const today = new Date().toISOString().split("T")[0]
    const router = useRouter()
    const [isBooking, setIsBooking] = useState(false)
    const [rentalStartDate, setRentalStartDate] = useState<string>("")
    const [rentalEndDate, setRentalEndDate] = useState<string>("")
    const [quantity, setQuantity] = useState<number>(1)
    const [open, setOpen] = useState(false)
    const start = new Date(rentalStartDate)
    const end = new Date(rentalEndDate)

    const totalDays = rentalStartDate && rentalEndDate && end >= start ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0

    let rentalDuration = 0;
    if (equipment.rentalType === "Daily") {
        rentalDuration = totalDays
    } else if (equipment.rentalType === "Weekly") {
        rentalDuration = Math.ceil(totalDays / 7)
    } else if (equipment.rentalType === "Monthly") {
        rentalDuration = Math.ceil(totalDays / 30)
    }

    const totalToPay = equipment.rentalPrice * rentalDuration * quantity

    const handleBooking = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'Invalid equipment',
                priority: 'high',
            })
            return
        }
        if (end < start) {
            toast.add({
                type: "error",
                description: "End date cannot be before start date",
                priority: "high",
            })
            return
        }
        const bookingData: IAddBooking = {
            equipmentId: equipment._id!,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            requiredQuantity: Number(formData.get("requiredQuantity")),
            contactNumber: formData.get("contactNumber") as string,
            deliveryAddress: formData.get("deliveryAddress") as string,
            additionalNotes: formData.get("additionalNotes") as string,
        }

        // console.log(bookingData)
        setIsBooking(true)
        try {
            const result = await bookEquipment(bookingData)
            if (!result.insertedId) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to create booking',
                    priority: 'high',
                })
                return
            }
            toast.add({
                type: 'success',
                description: 'Booking Drafted successfully. Redirecting to the checkout page...',
                priority: 'high',
            })
            router.push(`/payment?bookingId=${result.insertedId}`)
        } catch (error) {
            console.error('Booking error:', error)
            toast.add({
                type: 'error',
                description: 'Something went wrong. Please try again.',
                priority: 'high',
            })
        } finally {
            setIsBooking(false)
        }


    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                setOpen(value)
                if (!value) {
                    setRentalStartDate("")
                    setRentalEndDate("")
                    setQuantity(1)
                }
            }}
        >
            <DialogTrigger
                render={
                    <Button size="lg" className="flex-1" disabled={!isAvailable}>
                        Book Now
                    </Button>
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">Book Equipment</DialogTitle>
                    <DialogDescription>
                        {equipment.name}: fill in the details to request this rental.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBooking}>
                    <FieldGroup>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field>
                                <Label htmlFor="booking-start">
                                    Rental Start Date <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    onChange={(e) => setRentalStartDate(e.target.value)}
                                    id="booking-start"
                                    name="startDate"
                                    type="date"
                                    min={today}
                                    max={rentalEndDate || undefined}
                                    required />
                            </Field>

                            <Field>
                                <Label htmlFor="booking-end">
                                    Rental End Date <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    onChange={(e) => setRentalEndDate(e.target.value)}
                                    id="booking-end"
                                    name="endDate"
                                    type="date"
                                    min={rentalStartDate || today}
                                    required
                                />
                            </Field>

                            <Field>
                                <Label htmlFor="booking-quantity">
                                    Required Quantity <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    id="booking-quantity"
                                    name="requiredQuantity"
                                    type="number"
                                    min={1}
                                    max={equipment.availableQuantity}
                                    defaultValue={1}
                                    required
                                />
                                <FieldDescription>
                                    Available: {equipment.availableQuantity}
                                </FieldDescription>
                            </Field>

                            <Field>
                                <Label htmlFor="booking-contact">
                                    Contact Number <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="booking-contact"
                                    name="contactNumber"
                                    type="tel"
                                    placeholder="e.g. 017XXXXXXXX"
                                    required
                                />
                            </Field>

                            <div className="sm:col-span-2">
                                <Field>
                                    <Label htmlFor="booking-address">
                                        Delivery Address <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="booking-address"
                                        name="deliveryAddress"
                                        placeholder="House, road, area, city"
                                        required
                                    />
                                </Field>
                            </div>

                            <div className="sm:col-span-2">
                                <Field>
                                    <Label htmlFor="booking-notes">Additional Notes</Label>
                                    <Textarea
                                        id="booking-notes"
                                        name="additionalNotes"
                                        rows={3}
                                        placeholder="Anything the owner should know (optional)"
                                    />
                                </Field>
                            </div>
                        </div>

                        {/* UI only: placeholder summary */}
                        <div className="rounded-xl border bg-muted/40 p-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Price per {equipment.rentalType.toLowerCase()}
                                </span>
                                <span className="font-medium">
                                    ${equipment.rentalPrice.toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-muted-foreground">Estimated total</span>
                                <span className="font-semibold">{totalToPay}</span>
                            </div>
                        </div>
                    </FieldGroup>

                    <DialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row">
                        <DialogClose
                            render={
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            }
                        />



                        <Button
                            disabled={isBooking}
                            type="submit">{isBooking ? 'Confirming...' : 'Confirm Booking'}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EquipmentBooking