import EquipmentDetail from "@/components/equipments/EquipmentDetail";
import { GetEquipmentById } from "@/lib/api/equipments";
import { IEquipment } from "@/types/equipmentTypes";




const EquipmentDetailPage = async({params}:{params: Promise<{ id: string }>}) => {
    const {id} = await params
    console.log(id)
    const equipment:IEquipment = await GetEquipmentById(id)
    return (
        <div className="max-w-7xl mx-auto">
            <EquipmentDetail equipment={equipment}></EquipmentDetail>
        </div>
    );
};

export default EquipmentDetailPage;