'use client'
import { Button } from "@/components/ui/button"
import { IEquipment } from "@/types/equipmentTypes";
import { toast } from "../ui/toast";
import { addToFavourite } from "@/lib/actions/favourite";
import { Heart } from "lucide-react";
import { IFavourite } from "@/types/favouriteTypes";
import DeleteFromFavourite from "./DeleteFromFavourite";
import { useState } from "react";
import { useRouter } from "next/navigation";


const AddToFavourite = ({ equipment, favourite }: { equipment: IEquipment, favourite: IFavourite|null }) => {

    const hasAlreadyInFavourite = favourite?.equipmentId === equipment._id
    const [addingToFavourite, setAddingToFavourite] = useState(false)
    const router = useRouter()
    const handleAddToFavourite = async () => {
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'Equipment ID is missing.',
                priority: 'high'
            })
            return
        }
        setAddingToFavourite(true)
        try {
            const result = await addToFavourite(equipment._id)

            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to add to favourites.',
                    priority: 'high'
                })
                return
            }

            toast.add({
                type: 'success',
                description: 'Added to favourites successfully.',
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
            setAddingToFavourite(false)
        }
    }
    return (
        <div>
            {!hasAlreadyInFavourite ? (
                <Button
                    disabled={addingToFavourite}
                    onClick={handleAddToFavourite}
                    size="lg"
                    variant="outline"
                    className="flex-1 gap-2 cursor-pointer"
                >
                    <Heart className="size-4" />
                    Add to Favorites
                </Button>
            ) :


                (
                    <DeleteFromFavourite equipment={equipment}></DeleteFromFavourite>
                )}
        </div>
    );
};

export default AddToFavourite;