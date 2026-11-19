
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const GetEquipments = async (query = "") => {
    const res = await fetch(`${BASE_URL}/all-equipments?${query}`)
    return res.json()
}
export const GetEquipmentById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/all-equipments/${id}`)
    return res.json()
}