export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed"
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded"


export interface IAddBooking {
  equipmentId: string
  startDate: string
  endDate: string
  requiredQuantity: number
  contactNumber: string
  deliveryAddress: string
  additionalNotes?: string
}


export interface IBooking extends IAddBooking {
  _id: string

  customer: {
    _id: string
    name: string
    email: string
  }

  owner: {
    _id: string
    name: string
    email: string
  }

  equipmentName: string
  equipmentImage: string
  rentalType: "Daily" | "Weekly" | "Monthly"
  unitPrice: number
  rentalDuration: number
  totalAmount: number

  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
  stripeSessionId?: string
  bookingDate: string
}