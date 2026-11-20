
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IUser } from "@/types/userTypes"



const UsersTable = ({ users }: { users: IUser[] }) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    All Users
                </h1>
                <p className="text-muted-foreground">
                    View and manage all registered users.
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-2xl">{users.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Owners</CardDescription>
                        <CardTitle className="text-2xl">{(users.filter(user => user.role === 'owner')).length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Customers</CardDescription>
                        <CardTitle className="text-2xl">{(users.filter(user => user.role === 'customer')).length}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>
                        Manage user roles and account information.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Registration Date</TableHead>
                                    <TableHead>Change Role</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>

                                        <TableCell>
                                            {user.email}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    user.role === "admin"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                                className="capitalize"
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            {user.createdAt}
                                        </TableCell>

                                        <TableCell>
                                            <Select defaultValue={user.role}>
                                                <SelectTrigger className="w-32.5">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="customer">
                                                        Customer
                                                    </SelectItem>
                                                    <SelectItem value="owner">
                                                        Owner
                                                    </SelectItem>
                                                    <SelectItem value="admin">
                                                        Admin
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                            >
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UsersTable
