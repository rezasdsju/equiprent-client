'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { UploadImage } from "@/hooks/useImageUpload"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function RegisterForm() {

    const { imagePreview, imageUrl, isUploadingImage, handleImageChange } = UploadImage()

    const [clickedToRegisterButton, setClickedToRegisterButton] = useState(false)
    const router = useRouter()
    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isUploadingImage) return

        if (!imagePreview && !imageUrl) {
            toast.add({
                type: "error",
                description: "Please upload your profile photo again",
                priority: "high"
            })
            return
        }

        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())
        const password = userData.password as string

        if (
            password.length < 6 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password)
        ) {
            toast.add({
                type: "error",
                description: "Password must contain uppercase, lowercase letters and at least 6 characters",
                priority: "high"
            })
            return
        }
        setClickedToRegisterButton(true)
        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            password: userData.password as string,
            image: imageUrl || undefined
        })
        if (error) {
            toast.add({
                type: 'error',
                description: 'Error',
                priority: 'high'
            })
            setClickedToRegisterButton(false)
        }
        if (data) {
            toast.add({
                type: 'success',
                description: 'success',
                priority: 'high'
            })
            router.push('/')

        }
    }


    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/'
        })

        if (error) {
            toast.add({
                type: 'error',
                description: 'Google sign-in failed. Please try again.',
                priority: 'high'
            })
        }

        if (data) {
            toast.add({
                type: 'success',
                description: 'Redirecting to Google...',
                priority: 'high'
            })
        }
    }

    return (
        <Card className="max-w-7xl mx-auto">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input name="name" id="name" type="text" placeholder="John Doe" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>

                        <div className={`flex items-center justify-between ${imagePreview && 'gap-5'}`}>
                            <div>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="mt-3 size-20 rounded-full object-cover"
                                    />
                                )}
                            </div>
                            <Field>
                                <FieldLabel htmlFor="image">Profile Photo</FieldLabel>
                                <Input
                                    name="image"
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
                                            : "Upload your profile photo"}
                                </FieldDescription>
                            </Field>

                        </div>


                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input name="password" id="password" type="password" required />
                            <FieldDescription>
                                Must contain an uppercase letter, a lowercase letter, and at least 6 characters.
                            </FieldDescription>
                        </Field>

                        <FieldGroup>
                            <Field>
                                <Button disabled={clickedToRegisterButton || isUploadingImage} type="submit">Create Account</Button>
                                <Button
                                    onClick={handleGoogleSignIn}
                                    variant="outline" type="button">
                                    Continue with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link href="/sign-in">Log in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
