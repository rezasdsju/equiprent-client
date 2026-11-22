import { getSixApprovedEquipments } from "@/lib/api/equipments";
import FeaturedEquipment from "./FeaturedEquipment";



const FetchFeaturesEquipment = async () => {
    const equipments = await getSixApprovedEquipments()
    // console.log('equipments: ',equipments)
    return (
        <div>
            <FeaturedEquipment featuredEquipment={equipments} />
        </div>
    );
};

export default FetchFeaturesEquipment;