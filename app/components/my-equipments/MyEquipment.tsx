import { IEquipment } from "@/types/equipmentTypes";



const MyEquipment = ({ equipments }: { equipments: IEquipment[] }) => {
    return (
        <div>
            {
                equipments.map(equipment => <li key={equipment._id}>{equipment.description}</li>)
            }
        </div>
    );
};

export default MyEquipment;