'use server'

import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const addToFavourite = async (equipmentId: string) => {
    const api = `${BASE_URL}/customer/favourites/`
    const res = await protectedMutation(api, 'POST', {equipmentId})
    const result = await res.json()
    return { ok: res.ok, ...result }
}