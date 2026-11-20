'use client'
import { Trash2Icon } from "lucide-react"

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


import { IEquipment } from "@/types/equipmentTypes"
import { deleteEquipment } from "@/lib/actions/equipments"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
export function DeleteEquipment({ equipment }: { equipment: IEquipment }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'This Equipment does not exist',
                priority: 'high'
            })
            return
        }
        setIsDeleting(true)
        try {
            const result = await deleteEquipment(equipment._id)
            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message ?? 'Failed to delete equipment',
                    priority: 'high'
                })
                setIsDeleting(false)
                return
            }
            toast.add({
                type: 'success',
                description: "Equipment deleted successfully!",
                priority: 'high'
            })
            router.refresh()
        } catch {
            toast.add({
                type: 'error',
                description: 'Something went wrong',
                priority: 'high'
            })
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive">Delete</Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this equipment listing and all its
                        associated details. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        variant="destructive">{isDeleting ? 'Deleting...' : 'Delete'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}