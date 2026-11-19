
'use client'

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import DarkLogo from '@/app/assets/dark-logo.png'
import LightLogo from '@/app/assets/light-logo.png'

import ThemeToggle from "./ThemeToggle";
import useSignOut from "@/hooks/useSignOut";
import ProfileMenuPopOver from "./ProfileMenuPopOver";
import { SkeletonAvatar } from "./AvatarSkeleton";

import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Equipment", href: "/all-equipments" },
]

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user

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
                                    href="/dashboard"
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

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                                disabled={isSigningOut}
                            >
                                {isSigningOut ? "Signing out..." : "Log Out"}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" >
                                <Link href="/sign-in">Log in</Link>
                            </Button>

                            <Button size="sm" >
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
