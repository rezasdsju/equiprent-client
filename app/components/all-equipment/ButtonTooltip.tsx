'use client'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { updateApprovalStatus } from "@/lib/actions/equipments"
import { IEquipment } from "@/types/equipmentTypes"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ButtonTooltipProps {
    size: "icon-sm" | "icon" | "icon-lg",
    variant: "outline" | "destructive",
    aria_label: string,
    content: string,
    icon: ReactNode,
    equipment: IEquipment,
    action: 'approve' | 'reject' | 'update' | 'delete'
}



const ButtonTooltip = ({
    size,
    variant,
    aria_label,
    content,
    icon,
    equipment,
    action
}: ButtonTooltipProps) => {



    const router = useRouter()
    const handleApprove = async () => {
        if (action !== 'approve') {
            return
        }
        // console.log('approve')
        if (!equipment._id) {
            toast.add({
                type: 'error',
                description: 'Does not exists equipment',
                priority: 'high'
            })
            return
        }

        try {
            const result = await updateApprovalStatus(equipment._id, 'approved')
            // console.log(result)
            if (!result.ok) {
                toast.add({
                    type: 'error',
                    description: result.message || 'Failed to update approval status',
                    priority: 'high'
                })
                return
            }
            toast.add({
                type: 'success',
                description: 'Approval status updated successfully',
                priority: 'high'
            })
            router.refresh()
        } catch (error) {
            toast.add({
                type: 'error',
                description: error instanceof Error
                    ? error.message
                    : 'Failed to update approval status',
                priority: 'high'
            })
        }
    }
    const handleReject = async () => {
        if (action !== 'reject') {
            return
        }
        console.log('reject')

    }
    const handleUpdate = async () => {
        if (action !== 'update') {
            return
        }
        console.log('update')

    }
    const handleDelete = async () => {
        if (action !== 'delete') {
            return
        }
        console.log('delete')

    }
    const clickHandlerAction = action === 'approve' ? handleApprove : action === 'reject' ? handleReject : action === 'update' ? handleUpdate : handleDelete
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            onClick={clickHandlerAction}
                            size={size} variant={variant} aria-label={aria_label}>
                            {icon}
                        </Button>
                    }
                />
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ButtonTooltip