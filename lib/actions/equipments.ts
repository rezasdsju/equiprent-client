
'use server'
import { IAddEquipment } from "@/types/equipmentTypes"
import { protectedMutation } from "../core/server"


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const addEquipment = async (equipmentData: IAddEquipment) => {
    const res = await protectedMutation(`${BASE_URL}/add-equipment`, 'POST', equipmentData)
    const result = await res.json()

    return { ok: res.ok, ...result }
}