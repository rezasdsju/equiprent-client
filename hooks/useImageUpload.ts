
'use client'

import { toast } from "@/components/ui/toast"
import { useState } from "react"

export const UploadImage = () => {
    const [imagePreview, setImagePreview] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isUploadingImage, setIsUploadingImage] = useState(false)

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file) {
            setImagePreview(URL.createObjectURL(file))
            setImageUrl("")
            setIsUploadingImage(true)
        }
        try {
            const formData = new FormData()
            formData.append('image', file)
            const res = await fetch("/api/upload-image", {
                method: "POST",
                body: formData
            })
            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message)
            }
            setImageUrl(result.imageUrl)
        } catch (error) {
            console.error(error)

            toast.add({
                type: "error",
                description: "Image upload failed",
                priority: "high"
            })

        } finally {
            setIsUploadingImage(false)
        }
    }
    const resetImage = () => {
        setImagePreview("")
        setImageUrl("")
        setIsUploadingImage(false)
    }
    return { resetImage, imagePreview, imageUrl, isUploadingImage, handleImageChange }

}
