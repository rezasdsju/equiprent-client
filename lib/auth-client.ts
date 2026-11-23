import { inferAdditionalFields } from "better-auth/client/plugins";
import { jwtClient } from "better-auth/client/plugins"

import { createAuthClient } from "better-auth/react"
import { auth } from "./auth";
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
    plugins: [
        inferAdditionalFields<typeof auth>(),
        jwtClient()
    ]
})