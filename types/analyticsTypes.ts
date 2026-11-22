export interface IAdminAnalytics {
  totalUsers: number
  totalEquipments: number
  totalBookings: number
  pendingCount: number
  completeRentals: number
  totalRevenue: number
  monthlyBooking: {
    _id: {
      year: number
      month: number
    }
    totalBookings: number
  }[]
}