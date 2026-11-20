export interface IUser {
    _id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string
    role?: 'customer' | 'owner' | 'admin'
    createdAt: string
    updatedAt: string
}