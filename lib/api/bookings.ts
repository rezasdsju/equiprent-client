import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getBookingById = async (id: string) => {
    const api = `${BASE_URL}/customer/bookings/${id}`
    const res = await authFetch(api)
    return res.json()
}


export const getAllBookings = async () => {
    const api = `${BASE_URL}/customer/bookings`
    const res = await authFetch(api)
    return res.json()
}