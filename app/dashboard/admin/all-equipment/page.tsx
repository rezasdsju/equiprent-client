import AllEquipmentTable from "@/app/components/all-equipment/AllEquipmentTable";
import { getEquipmentsByAdminVerification } from "@/lib/api/equipments";





const AdminDashboardAllEquipmentPage = async () => {
    const equipments = await getEquipmentsByAdminVerification()
    return (
        <div>
            <AllEquipmentTable equipments={equipments}></AllEquipmentTable>
        </div>
    );
};

export default AdminDashboardAllEquipmentPage;