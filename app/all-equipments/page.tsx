import AllEquipment from "@/components/equipments/AllEquipment";
import { getEquipments } from "@/lib/api/equipments";
import { IEquipment } from "@/types/equipmentTypes";



interface IAllEquipment {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const AllEquipmentPage = async ({ searchParams }: IAllEquipment) => {

    const search = await searchParams
    console.log(search)
    const query = new URLSearchParams(search as Record<string, string>).toString()
    const equipments: IEquipment[] = await getEquipments(query)
    return (
        <div>
            <AllEquipment equipments={equipments}></AllEquipment>
        </div>
    );
};

export default AllEquipmentPage;