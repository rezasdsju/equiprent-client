import AllRentals from "@/app/components/admin/all-rentals/AllRentals";
import { getAllRentals } from "@/lib/api/rental";


const AllRentalsPage = async() => {
    const allRentals = await getAllRentals()
    return (
        <div>
            <AllRentals rentals={allRentals}/>
        </div>
    );
};

export default AllRentalsPage;