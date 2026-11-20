
export interface IOwner {
  name: string;
  email: string;
  phone?: string;
}

export interface IEquipment {
  _id: string;
  name: string;
  description: string;
  category: string;
  rentalPrice: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  location: string;
  availableQuantity: number;
  availability: "Available" | "Unavailable";
  approvalStatus: "pending" | "approved" | "rejected";
  image: string;
  owner: IOwner;
  rentalTerms: string;
  createdAt: string;
}



export interface IAddEquipment {
  _id?:string, 
  name: string;
  description: string;
  category: string;
  rentalPrice: number;
  rentalType: "Daily" | "Weekly" | "Monthly";
  location: string;
  availableQuantity: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  rentalTerms: string;
}