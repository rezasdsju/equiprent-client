import MyEquipment from "@/app/components/owner/my-equipments/MyEquipment";
import { getMyEquipment } from "@/lib/api/equipments";
import { IEquipment } from "@/types/equipmentTypes";






const MyEquipmentPage = async () => {
    const equipments: IEquipment[] = await getMyEquipment()
    console.log(equipments)
    return (
        <div>
            <MyEquipment equipments={equipments}></MyEquipment>
        </div>
    );
};

export default MyEquipmentPage;