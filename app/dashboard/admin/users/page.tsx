import UsersTable from "@/app/components/users/UsersTable";
import { getUsers } from "@/lib/api/users";




const UsersPage = async () => {
    const users = await getUsers()
    // console.log('users: ', users)
    return (
        <div>
            <UsersTable users={users}></UsersTable>
        </div>
    );
};

export default UsersPage;

