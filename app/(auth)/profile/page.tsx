'use client'
import { Mail, Phone, MapPin, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import { UploadImage } from "@/hooks/useImageUpload"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

type ProfileUser = {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
    phone?: string | null
    address?: string | null
}

const Profile = ({ user }: { user: ProfileUser }) => {
    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const { imagePreview, imageUrl, isUploadingImage, handleImageChange } = UploadImage()

    const initials = (user.name ?? "U")
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isUploadingImage) return

        if (imagePreview && !imageUrl) {
            toast.add({
                type: "error",
                description: "Image upload failed. Please select the photo again.",
                priority: "high",
            })
            return
        }

        const formData = new FormData(e.currentTarget)
        const name = (formData.get("name") as string)?.trim()
        const phone = (formData.get("phone") as string)?.trim()
        const address = (formData.get("address") as string)?.trim()

        if (!name) {
            toast.add({
                type: "error",
                description: "Name cannot be empty.",
                priority: "high",
            })
            return
        }

        setIsSaving(true)
        try {
            const { error } = await authClient.updateUser({
                name,
                image: imageUrl || user.image || undefined,
                phone,
                address,
            })

            if (error) {
                toast.add({
                    type: "error",
                    description: error.message || "Failed to update profile.",
                    priority: "high",
                })
                return
            }

            toast.add({
                type: "success",
                description: "Profile updated successfully.",
                priority: "high",
            })
            router.refresh()
        } catch {
            toast.add({
                type: "error",
                description: "Something went wrong. Please try again.",
                priority: "high",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="mx-auto w-full max-w-3xl space-y-6 px-3 py-6 sm:px-4 sm:py-10">
            <div>
                <h2 className="text-2xl font-bold sm:text-3xl">My Profile</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    View and update your personal information.
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card p-5 text-center shadow-sm sm:flex-row sm:text-left">
                <Avatar className="size-20 sm:size-24">
                    <AvatarImage src={imagePreview || user.image || undefined} alt={user.name ?? "User"} />
                    <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 space-y-1">
                    <p className="truncate text-xl font-semibold">{user.name ?? "Unnamed user"}</p>
                    <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
                        <Mail className="size-4 shrink-0" />
                        <span className="truncate">{user.email}</span>
                    </p>
                    {user.role && (
                        <Badge variant="secondary" className="capitalize">
                            {user.role}
                        </Badge>
                    )}
                </div>
            </div>

            <form
                onSubmit={handleUpdateProfile}
                className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6"
            >
                <FieldGroup>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field>
                            <Label htmlFor="profile-name">
                                <User className="size-4" /> Name
                            </Label>
                            <Input
                                id="profile-name"
                                name="name"
                                defaultValue={user.name ?? ""}
                                required
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="profile-email">
                                <Mail className="size-4" /> Email
                            </Label>
                            <Input
                                id="profile-email"
                                type="email"
                                defaultValue={user.email ?? ""}
                                disabled
                                readOnly
                            />
                            <FieldDescription>Email cannot be changed.</FieldDescription>
                        </Field>

                        <Field>
                            <Label htmlFor="profile-phone">
                                <Phone className="size-4" /> Phone Number
                            </Label>
                            <Input
                                id="profile-phone"
                                name="phone"
                                type="tel"
                                placeholder="e.g. 017XXXXXXXX"
                                defaultValue={user.phone ?? ""}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="image">Profile Photo</FieldLabel>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <FieldDescription>
                                {isUploadingImage
                                    ? "Uploading image..."
                                    : imageUrl
                                        ? "Image uploaded successfully"
                                        : "Optional. Upload a new profile photo."}
                            </FieldDescription>
                        </Field>

                        <div className="sm:col-span-2">
                            <Field>
                                <Label htmlFor="profile-address">
                                    <MapPin className="size-4" /> Address
                                </Label>
                                <Input
                                    id="profile-address"
                                    name="address"
                                    placeholder="House, road, area, city"
                                    defaultValue={user.address ?? ""}
                                />
                            </Field>
                        </div>
                    </div>
                </FieldGroup>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" disabled={isSaving || isUploadingImage}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default Profile