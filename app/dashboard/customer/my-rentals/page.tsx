import Rental from "@/app/components/customer/Rental";
import { getRentalOfCustomer } from "@/lib/api/rental";

const MyRentalPage = async() => {
    const rentals = await getRentalOfCustomer()
    // console.log(rentals)
    return (
        <div>
            <Rental rentals={rentals}/>
        </div>
    );
};

export default MyRentalPage;