
'use client'

import { Trash2, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
import type { IUser } from "@/types/userTypes"
import { deleteUser } from "@/lib/actions/users"

const DeleteUser = ({ user }: { user: IUser }) => {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)

    const handleDeleteUser = async () => {
        if (!user._id) {
            toast.add({
                type: 'error',
                description: 'User ID is missing',
                priority: 'high',
            })
            return
        }

        setDeleting(true)

        try {
            const result = await deleteUser(user._id)

            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to delete user',
                    priority: 'high',
                })
                return
            }

            toast.add({
                type: 'success',
                description: 'User deleted successfully',
                priority: 'high',
            })

            router.refresh()
        } catch {
            toast.add({
                type: 'error',
                description: 'Something went wrong. Please try again.',
                priority: 'high',
            })
        } finally {
            setDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="outline"
                        size="icon"
                        title="Delete User"
                        className="text-destructive hover:text-destructive cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                }
            />

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>
                        Delete User?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want to delete {user.name}? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDeleteUser}
                        disabled={deleting}
                        variant="destructive"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteUser
