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
import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"

export default function RegisterForm() {

    const { imagePreview, imageUrl, isUploadingImage, handleImageChange } = UploadImage()

    const [clickedToRegisterButton, setClickedToRegisterButton] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isUploadingImage) return

        if (!imagePreview && !imageUrl) {
            toast.add({
                type: "error",
                description: "Please upload a profile photo before creating your account.",
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
                description: "Choose a password with at least 6 characters, including an uppercase and a lowercase letter.",
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
                description: error.message || "We couldn't create your account. Please try again.",
                priority: 'high'
            })
            setClickedToRegisterButton(false)
        }
        if (data) {
            toast.add({
                type: 'success',
                description: 'Your account has been created successfully. Redirecting you now.',
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
                description: error.message || "We couldn't start Google sign-in. Please try again.",
                priority: 'high'
            })
        }

        if (data) {
            toast.add({
                type: 'success',
                description: "Google sign-in is starting. You'll be redirected shortly.",
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
                            <div className="relative">
                                <Input
                                    name="password"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
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
