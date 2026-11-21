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
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type ReactNode } from "react"

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
    const [approvalHandling, setApprovalHandling] = useState(false)
    const handleApprovalStatus = async () => {
        if (action !== 'approve' && action !== 'reject') {
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
        setApprovalHandling(true)
        try {
            const approvalStatus = action === 'approve' ? 'approved' : 'rejected'
            const result = await updateApprovalStatus(equipment._id, approvalStatus)
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
                description: `Equipment ${approvalStatus} successfully`,
                priority: 'high'
            })
            router.refresh()
        } catch (error) {
            console.error('Approval status error:', error)
            toast.add({
                type: 'error',
                description: 'Something went wrong. Please try again.',
                priority: 'high',
            })
        } finally {
            setApprovalHandling(false)
        }
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
    const clickHandlerAction = action === 'approve' || action === 'reject' ? handleApprovalStatus : action === 'update' ? handleUpdate : handleDelete
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            disabled={approvalHandling}
                            onClick={clickHandlerAction}
                            size={size} variant={variant} aria-label={aria_label}>
                            {approvalHandling ? (
                                <Loader2 className="animate-spin" />
                            ) :
                                icon}
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