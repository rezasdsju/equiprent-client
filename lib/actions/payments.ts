
'use server'

import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const checkoutVerify = async (sessionId: string) => {
    const api = `${BASE_URL}/customer/payments/checkout-verify`
    const res = await protectedMutation(api, 'POST', { sessionId })
    const result = await res.json()

    return { ok: res.ok, ...result }
}
