import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const getEquipments = async (query = "") => {
    const res = await fetch(`${BASE_URL}/all-equipments?${query}`, {
        cache: 'no-store'
    })
    return res.json()
}

export const getSixApprovedEquipments = async () => {
    const res = await fetch(`${BASE_URL}/featured-equipments`, {
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
    const api = `${BASE_URL}/owner/my-equipments/`
    const res = await authFetch(api)
    return res.json()
}




export const getEquipmentsByAdminVerification = async () => {
    const api = `${BASE_URL}/admin/all-equipment/`
    const res = await authFetch(api)
    return res.json()
}