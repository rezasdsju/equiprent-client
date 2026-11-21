import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const getEquipments = async (query = "") => {
    const res = await fetch(`${BASE_URL}/all-equipments?${query}`, {
        cache: 'no-store'
    })
    return res.json()
}
export const getEquipmentById = async (id: string) => {
    const api = `${BASE_URL}/all-equipments/${id}`
    const res = await authFetch(api)
    return res.json()
}

export const getMyEquipment = async () => {
    const api = `${BASE_URL}/my-equipments/`
    const res = await authFetch(api)
    return res.json()
}