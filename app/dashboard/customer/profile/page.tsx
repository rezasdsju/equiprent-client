import Profile from "@/app/components/shared/Profile"
import { getSession } from "@/lib/core/server"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
    const session = await getSession()
    if (!session?.user) redirect("/sign-in")
    return <Profile user={session.user} />
}

export default ProfilePage