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


export interface IOwnerAnalytics {
  totalEquipments: number
  completedRentals: number
  totalEarning: number
  monthlyEarning: {
    _id: {
      year: number
      month: number
    }
    total: number
  }[]
}