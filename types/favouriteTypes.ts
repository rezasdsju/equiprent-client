import { IEquipment } from "./equipmentTypes"

export interface IFavourite {
    _id?: string
    customerId: string
    equipmentId: string
    createdAt?: Date
}

export interface IFavouriteWithEquipment extends IFavourite {
    equipment: IEquipment
}