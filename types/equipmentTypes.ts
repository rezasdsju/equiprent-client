export interface IEquipment {
  id: string;
  name: string;
  category: string;
  rentalPrice: number;
  rentalType: "Hourly" | "Daily" | "Weekly" | "Monthly";
  location: string;
  availability: "Available" | "Unavailable";
  approvalStatus: "pending" | "approved" | "rejected";
  image: string;
  createdAt: string;
}