
import "server-only"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
};

export const requireRole = async (role: string) => {
    const session = await getSession()
    if (!session || session?.user?.role !== role) {
        redirect('/unauthorized')
    }
    return session
}
export const getToken = async () => {
    const session = await getSession()
    if (!session || !session?.session?.token) {
        redirect('/unauthorized')
    }
    return session.session.token
}

export const authFetch = async (api: string) => {
    const token = await getToken()
    const res = await fetch(api, {
        cache: 'no-store',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res
}


export const protectedMutation = async (api: string, method: string, data?: unknown) => {
    const token = await getToken()
    const res = await fetch(api, {
        method: method,
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
    })
    return res
}