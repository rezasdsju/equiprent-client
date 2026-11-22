import MyEquipmentRental from "@/app/components/owner/my-equipments/MyEquipmentRental";
import { getRentalsOfOwner } from "@/lib/api/rental";



const MyEquipmentRentalPage = async () => {
    const rentals = await getRentalsOfOwner()
    // console.log(rentals)
    return (
        <div>
            <MyEquipmentRental rentals={rentals}></MyEquipmentRental>
        </div>
    );
};

export default MyEquipmentRentalPage;