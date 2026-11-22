'use server'

import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const changeUserRole = async (id: string, role: string) => {
    const api = `${BASE_URL}/admin/users/${id}`
    const res = await protectedMutation(api, 'PATCH', { role })
    const result = await res.json()
    return { ok: res.ok, ...result }
}


export const deleteUser = async (id: string) => {
    const api = `${BASE_URL}/admin/users/${id}`
    const res = await protectedMutation(api, 'DELETE')
    const result = await res.json()
    return { ok: res.ok, ...result }
}