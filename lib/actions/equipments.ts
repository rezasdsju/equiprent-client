
'use server'
import { IAddEquipment, IEquipment } from "@/types/equipmentTypes"
import { protectedMutation } from "../core/server"


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const addEquipment = async (equipmentData: IAddEquipment) => {
    const res = await protectedMutation(`${BASE_URL}/add-equipment`, 'POST', equipmentData)
    const result = await res.json()

    return { ok: res.ok, ...result }
}

export const updateEquipment = async (updateEquipmentData: IEquipment, id: string) => {
    const api = `${BASE_URL}/my-equipments/${id}`
    const res = await protectedMutation(api, 'PATCH', updateEquipmentData)
    const result = await res.json()
    return { ok: res.ok, ...result }
}