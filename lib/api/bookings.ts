import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getBookingById = async (id: string) => {
    const api = `${BASE_URL}/customer/bookings/draft/${id}`
    const res = await authFetch(api)
    return res.json()
}