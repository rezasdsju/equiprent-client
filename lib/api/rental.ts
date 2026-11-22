import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Customer
export const getRentalOfCustomer = async () => {
    const api = `${BASE_URL}/customer/rental`
    const res = await authFetch(api)
    return res.json()
}



// Owner
export const getRentalsOfOwner = async () => {
    const api = `${BASE_URL}/owner/my-equipments-rental`
    const res = await authFetch(api)
    return res.json()
}