'use client'

import { Heart } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { IEquipment } from "@/types/equipmentTypes"
import { toast } from "../../../components/ui/toast"
import { deleteFromFavourite } from "@/lib/actions/favourite"
import { useRouter } from "next/navigation"
import { useState } from "react"

const DeleteFromFavourite = ({ equipment }: { equipment: IEquipment }) => {

    const router = useRouter()
    const [deletingFromFavourite, setDeletingFromFavourite] = useState(false)
    const handleDeleteFromFavourite = async () => {
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'Equipment ID is missing.',
                priority: 'high'
            })
            return
        }
        setDeletingFromFavourite(true)
        try {
            const result = await deleteFromFavourite(equipment._id)

            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to remove from favourites.',
                    priority: 'high'
                })
                return
            }

            toast.add({
                type: 'success',
                description: 'Removed from favourites successfully.',
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
            setDeletingFromFavourite(false)
        }
    }

    return (
        <div>
            <Button
                onClick={handleDeleteFromFavourite}
                size="lg"
                variant="default"
                className="flex-1 gap-2 cursor-pointer"
                disabled={deletingFromFavourite}
            >
                <Heart className="size-4 fill-current" />
                Remove from Favorites
            </Button>
        </div>
    )
}

export default DeleteFromFavourite