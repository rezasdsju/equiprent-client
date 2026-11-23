'use client'

import { Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { IBooking } from "@/types/bookingTypes"
import { toast } from "../../../components/ui/toast"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteBookingByCustomer } from "@/lib/actions/bookings"

const DeleteBooking = ({ booking }: { booking: IBooking }) => {

    const router = useRouter()
    const [deletingBooking, setDeletingBooking] = useState(false)

    const handleDeleteBooking = async () => {
        if (!booking._id) {
            toast.add({
                type: 'error',
                description: 'Booking ID is missing.',
                priority: 'high'
            })
            return
        }

        setDeletingBooking(true)

        try {
            const result = await deleteBookingByCustomer(booking._id)

            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to delete booking.',
                    priority: 'high'
                })
                return
            }

            toast.add({
                type: 'success',
                description: 'Booking deleted successfully.',
                priority: 'high'
            })

            router.refresh()

        } catch (error) {
            toast.add({
                type: 'error',
                description: 'Something went wrong. Please try again.',
                priority: 'high'
            })
        } finally {
            setDeletingBooking(false)
        }
    }

    return (
        <div>
            <Button
                onClick={handleDeleteBooking}
                size="lg"
                variant="default"
                className="flex-1 gap-2 cursor-pointer"
                disabled={deletingBooking}
            >
                <Trash2 className="size-4" />
                Delete
            </Button>
        </div>
    )
}

export default DeleteBooking