import AllEquipmentTable from "@/app/components/all-equipment/AllEquipmentTable";
import { getEquipments } from "@/lib/api/equipments";





const AdminDashboardAllEquipmentPage = async () => {
    const equipments = await getEquipments()
    return (
        <div>
            <AllEquipmentTable equipments={equipments}></AllEquipmentTable>
        </div>
    );
};

export default AdminDashboardAllEquipmentPage;