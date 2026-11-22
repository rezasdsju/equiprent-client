'use client'
import { Trash2, Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteFromFavourite } from "@/lib/actions/favourite"
import { IFavouriteWithEquipment } from "@/types/favouriteTypes"

const DeleteFavouriteDialog = ({ favourite }: { favourite: IFavouriteWithEquipment }) => {
    const router = useRouter()
    const [deletingFromFavourite, setDeletingFromFavourite] = useState(false)

    const handleDeleteFromFavourite = async () => {
        const equipmentId = favourite.equipment._id
        if (!equipmentId) {
            toast.add({
                type: 'error',
                description: 'Equipment ID is missing.',
                priority: 'high'
            })
            return
        }
        setDeletingFromFavourite(true)
        try {
            const result = await deleteFromFavourite(equipmentId)

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
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        className={`cursor-pointer`}
                        size="sm"
                        variant="destructive"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Remove from favorites?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {favourite.equipment.name} will be removed from your favorites list.
                        You can add it again anytime from its details page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteFromFavourite}
                        disabled={deletingFromFavourite}
                        variant="destructive">
                        {deletingFromFavourite ? 'Removing...' : 'Remove'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteFavouriteDialog;