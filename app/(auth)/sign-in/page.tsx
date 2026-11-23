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
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"



export default function SigninPage() {

    const router = useRouter()
    const [clickedToLoginrButton, setClickedToLoginrButton] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setClickedToLoginrButton(true)
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: userData.email as string,
            password: userData.password as string
        })
        if (error) {
            toast.add({
                type: 'error',
                description: error.message || "We couldn't sign you in. Check your email and password, then try again.",
                priority: 'high'
            })
            setClickedToLoginrButton(false)
        }
        if (data) {
            toast.add({
                type: 'success',
                description: "You've signed in successfully. Redirecting you to the home page.",
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
                description: error.message || "We couldn't sign in with Google. Please try again.",
                priority: 'high'
            })
        }

        if (data) {
            toast.add({
                type: 'success',
                description: "Continue with Google to finish signing in.",
                priority: 'high'
            })
        }
    }
    return (
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignIn}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
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
                            </Field>
                            <Field>
                                <Button disabled={clickedToLoginrButton} type="submit">Login</Button>
                                <Button
                                    onClick={handleGoogleSignIn}
                                    variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/register">Register</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
