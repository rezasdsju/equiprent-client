'use client'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { IEquipment } from "@/types/equipmentTypes"
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

    const handleApprove = async () => {
        if (action !== 'approve') {
            return
        }
        console.log('approve')
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