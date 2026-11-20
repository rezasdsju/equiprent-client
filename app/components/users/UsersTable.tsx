
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

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "customer",
        createdAt: "Nov 15, 2026",
    },
    {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "owner",
        createdAt: "Nov 16, 2026",
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        role: "admin",
        createdAt: "Nov 17, 2026",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "customer",
        createdAt: "Nov 18, 2026",
    },
    {
        id: 5,
        name: "David Miller",
        email: "david@example.com",
        role: "owner",
        createdAt: "Nov 19, 2026",
    },
]

const UsersTable = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
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
                        <CardTitle className="text-2xl">5</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Owners</CardDescription>
                        <CardTitle className="text-2xl">2</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Customers</CardDescription>
                        <CardTitle className="text-2xl">2</CardTitle>
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
                                    <TableRow key={user.id}>
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
                                                <SelectTrigger className="w-[130px]">
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
