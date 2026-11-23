import EquipmentDetail from "@/app/components/equipments/EquipmentDetail";
import { getEquipmentById } from "@/lib/api/equipments";
import { IEquipment } from "@/types/equipmentTypes";




const EquipmentDetailPage = async({params}:{params: Promise<{ id: string }>}) => {
    const {id} = await params
    const equipment:IEquipment = await getEquipmentById(id)
    return (
        <div className="max-w-7xl mx-auto">
            <EquipmentDetail equipment={equipment}></EquipmentDetail>
        </div>
    );
};

export default EquipmentDetailPage;