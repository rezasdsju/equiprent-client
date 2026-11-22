import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const getFavouriteByEquipmentId = async (equipmentId: string) => {
    const api = `${BASE_URL}/customer/favourites/${equipmentId}`
    const res = await authFetch(api)
    return res.json()
}

export const getFavouritesForCustomer = async () => {
    const api = `${BASE_URL}/customer/favourites`
    const res = await authFetch(api)
    return res.json()
}