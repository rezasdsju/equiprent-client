'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import type { IBooking } from "@/types/bookingTypes"
import { updateBookingStatus } from "@/lib/actions/bookings"
import { toast } from "@/components/ui/toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type BookingStatusUpdate = "confirmed" | "canceled"

const UpdateBookingStatus = ({ rental }: { rental: IBooking }) => {
    const [bookingStatus, setBookingStatus] =
        useState<IBooking["bookingStatus"]>(rental.bookingStatus)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleBookingStatus = async (value: string | null) => {
        if (value !== "confirmed" && value !== "canceled") {
            return
        }

        try {
            setLoading(true)

            const result = await updateBookingStatus(
                rental._id,
                value as BookingStatusUpdate
            )

            if (result.ok) {
                setBookingStatus(
                    value === "canceled" ? "cancelled" : "confirmed"
                )

                toast.add({
                    type: "success",
                    description: "Booking status updated successfully",
                    priority: "high",
                })

                router.refresh()
            } else {
                toast.add({
                    type: "error",
                    description:
                        result.message || "Failed to update booking status",
                    priority: "high",
                })
            }
        } catch {
            toast.add({
                type: "error",
                description: "Something went wrong",
                priority: "high",
            })
        } finally {
            setLoading(false)
        }
    }

    if (
        bookingStatus === "cancelled" ||
        bookingStatus === "completed"
    ) {
        return (
            <span className="capitalize text-sm text-muted-foreground">
                {bookingStatus}
            </span>
        )
    }

    return (
        <Select
            value={bookingStatus}
            onValueChange={handleBookingStatus}
            disabled={loading}
        >
            <SelectTrigger className="w-36">
                <SelectValue placeholder="Change Status" />
            </SelectTrigger>

            <SelectContent>
                {bookingStatus === "pending" && (
                    <SelectItem value="confirmed">
                        Confirm
                    </SelectItem>
                )}

                <SelectItem value="canceled">
                    Cancel
                </SelectItem>
            </SelectContent>
        </Select>
    )
}

export default UpdateBookingStatus