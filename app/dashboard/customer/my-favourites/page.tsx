import Favourites from "@/app/components/customer/Favourites";
import { getFavouritesForCustomer } from "@/lib/api/favourite";
import { IFavouriteWithEquipment } from "@/types/favouriteTypes";




const MyFavouritesPage = async () => {
    const favourites: IFavouriteWithEquipment[] = await getFavouritesForCustomer()
    // console.log(favourites)
    return (
        <div>
            <Favourites favourites={favourites} />
        </div>
    );
};

export default MyFavouritesPage;