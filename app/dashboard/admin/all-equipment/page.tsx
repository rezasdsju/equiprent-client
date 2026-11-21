import AllEquipment from "@/components/equipments/AllEquipment";
import { getEquipments } from "@/lib/api/equipments";





const AdminDashboardAllEquipmentPage = async () => {
    const equipments = await getEquipments()
    return (
        <div>
            <AllEquipment equipments={equipments}></AllEquipment>
        </div>
    );
};

export default AdminDashboardAllEquipmentPage;