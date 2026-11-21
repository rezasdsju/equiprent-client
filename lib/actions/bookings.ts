'use server'

import { IAddBooking } from "@/types/bookingTypes"
import { protectedMutation } from "../core/server"


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const bookEquipment = async (bookingData: IAddBooking) => {
    const api = `${BASE_URL}/customer/bookings/draft`
    const res = await protectedMutation(api, 'POST',bookingData)
    const result = await res.json()
    return { ok: res.ok, ...result }
}