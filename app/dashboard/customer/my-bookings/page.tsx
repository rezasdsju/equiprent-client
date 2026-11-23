import MyBookings from "@/app/components/customer/MyBookings";
import { getAllBookings } from "@/lib/api/bookings";



const MyBookingPage = async () => {
    const bookings = await getAllBookings()
    return (
        <div>
            <MyBookings bookings={bookings} />
        </div>
    );
};

export default MyBookingPage;