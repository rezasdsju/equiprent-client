import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Admin's Dashboard Analytics
export const getAnalyticsForAdminDashboard = async () => {
    const api = `${BASE_URL}/admin/analytics/`
    const res = await authFetch(api)
    return res.json()
}


// Owner
export const getAnalyticsForOwnerDashboard = async () => {
    const api = `${BASE_URL}/owner/analytics`
    const res = await authFetch(api)
    return res.json()
}