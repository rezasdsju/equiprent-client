'use client'
import { Button } from "@/components/ui/button"
import { IEquipment } from "@/types/equipmentTypes";
import { toast } from "../ui/toast";
import { addToFavourite } from "@/lib/actions/favourite";
import { Heart } from "lucide-react";
import { IFavourite } from "@/types/favouriteTypes";


const AddToFavourite = ({ equipment, favourite }: { equipment: IEquipment, favourite: IFavourite }) => {

    const hasAlreadyInFavourite = favourite?.equipmentId === equipment._id

    const handleAddToFavourite = async () => {
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'Equipment ID is missing.',
                priority: 'high'
            })
            return
        }

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
        } catch (error) {
            toast.add({
                type: 'error',
                description: 'Something went wrong. Please try again.',
                priority: 'high'
            })
        }
    }
    return (
        <div>
            <Button
                onClick={handleAddToFavourite}
                size="lg"
                variant={hasAlreadyInFavourite ? "default" : "outline"}
                className="flex-1 gap-2"
            >
                <Heart
                    className={`size-4 ${hasAlreadyInFavourite ? "fill-current" : ""}`}
                />
                {hasAlreadyInFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
        </div>
    );
};

export default AddToFavourite;