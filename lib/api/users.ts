import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getUsers = async () => {
    const api = `${BASE_URL}/admin/users/`
    const res = await authFetch(api)
    return res.json()
}