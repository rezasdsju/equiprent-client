'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast";
import { changeUserRole } from "@/lib/actions/users";
import { IUser } from "@/types/userTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";



const UserRole = ({ user }: { user: IUser }) => {

    const router = useRouter()
    const [isRoleChangePending, setIsRoleChangePending] = useState(false)
    const [role, setRole] = useState<"customer" | "owner" | "admin">(user.role ?? 'customer')

    const handleUpdateRole = async (value: string | null) => {
        // console.log(value)
        if (!value || !user._id) {
            toast.add({ type: 'error', description: 'Invalid user', priority: 'high' })
            return
        }
        setIsRoleChangePending(true)
        setRole(value as "customer" | "owner" | "admin")
        try {
            const result = await changeUserRole(user._id, value)
            if (!result.ok) {
                setRole(user.role ?? 'customer')
                toast.add({
                    type: 'error',
                    description: result.message ?? 'Failed to update user role',
                    priority: 'high'
                })
                return
            }
            toast.add({
                type: 'success',
                description: 'User role changed successfully',
                priority: 'high'
            })
            router.refresh()
        } catch (error) {
            setRole(user.role ?? 'customer')
            toast.add({
                type: 'error',
                description: 'Error to update User Role',
                priority: 'high'
            })
        } finally {
            setIsRoleChangePending(false)
        }

    }
    return (
        <Select
            value={role}
            onValueChange={handleUpdateRole}
            disabled={isRoleChangePending}
        >
            <SelectTrigger className="w-32.5">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="customer">
                    Customer
                </SelectItem>
                <SelectItem value="owner">
                    Owner
                </SelectItem>
                <SelectItem value="admin">
                    Admin
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default UserRole;