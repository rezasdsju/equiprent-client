
'use client'

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react"

import DarkLogo from '@/app/assets/dark-logo.png'
import LightLogo from '@/app/assets/light-logo.png'

import ThemeToggle from "./ThemeToggle";
import useSignOut from "@/hooks/useSignOut";
import ProfileMenuPopOver from "./ProfileMenuPopOver";
import { SkeletonAvatar } from "./AvatarSkeleton";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Equipment", href: "/all-equipments" },
]

const mobileGuestLinks = [
    ...navLinks,
    { label: "Log in", href: "/sign-in" },
    { label: "Register", href: "/register" },
]

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const { handleSignOut, isSigningOut } = useSignOut()

    return (
        <nav className="sticky top-0 z-50 border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-1 sm:px-2">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src={DarkLogo}
                        alt="EquipRent"
                        width={160}
                        height={80}
                        priority
                        className="hidden dark:block"
                    />
                    <Image
                        src={LightLogo}
                        alt="EquipRent"
                        width={160}
                        height={80}
                        priority
                        className="dark:hidden"
                    />
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 sm:flex">
                    <div className="flex items-center gap-8">
                        {navLinks.map((nav) => (
                            <Link
                                key={nav.href}
                                href={nav.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {nav.label}
                            </Link>
                        ))}
                    </div>

                    <div>
                        {isPending ? (
                            <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
                        ) : (
                            user && (
                                <Link
                                    href={
                                        user.role === "admin"
                                            ? "/dashboard/admin"
                                            : user.role === "owner"
                                                ? "/dashboard/owner"
                                                : "/dashboard/customer"
                                    }
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                            )
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 sm:gap-5">

                    <ThemeToggle />

                    {isPending ? (
                        <SkeletonAvatar />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <ProfileMenuPopOver user={user} />
                            {/* 
                            <Button
                                variant="outline"
                                size="sm"
                                className="max-[360px]:hidden"
                                onClick={handleSignOut}
                                disabled={isSigningOut}
                            >
                                {isSigningOut ? "Signing out..." : "Log Out"}
                            </Button> */}
                        </div>
                    ) : (
                        <>
                            <div className="hidden items-center gap-2 sm:flex">
                                <Button variant="ghost" size="sm" >
                                    <Link href="/sign-in">Log in</Link>
                                </Button>

                                <Button size="sm" >
                                    <Link href="/register">Register</Link>
                                </Button>
                            </div>

                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open navigation menu"
                                    aria-expanded={isMobileMenuOpen}
                                    className="sm:hidden"
                                    onClick={() => setIsMobileMenuOpen(true)}
                                >
                                    <Menu className="size-5" />
                                </Button>
                                <SheetContent side="right" className="w-[min(20rem,85vw)]">
                                    <SheetHeader>
                                        <SheetTitle>Menu</SheetTitle>
                                        <SheetDescription>
                                            Navigate EquipRent or access your account.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                                        {mobileGuestLinks.map((nav) => (
                                            <Link
                                                key={nav.href}
                                                href={nav.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                                            >
                                                {nav.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
