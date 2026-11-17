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
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {


    const router = useRouter()
    const [clickedToRegisterButton, setClickedToRegisterButton] = useState(false)
    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setClickedToRegisterButton(true)
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            name: userData.name as string,
            email: userData.email as string,
            password: userData.password as string
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
    return (
        <Card {...props}>
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
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input name="password" id="password" type="password" required />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        {/* <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input id="confirm-password" type="password" required />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field> */}
                        <FieldGroup>
                            <Field>
                                <Button disabled={clickedToRegisterButton} type="submit">Create Account</Button>
                                <Button variant="outline" type="button">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <a href="#">Log in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
