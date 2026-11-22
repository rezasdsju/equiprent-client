import AdminDashboardAnalytics from "@/app/components/admin/analytics/AdminDashboardAnalytics";
import { getAnalyticsForAdminDashboard } from "@/lib/api/analytics";


const AdminDashboardPage = async () => {
    const analytics = await getAnalyticsForAdminDashboard()
    // console.log(analytics)
    return (
        <div>
            <AdminDashboardAnalytics analytics={analytics} />
        </div>
    );
};

export default AdminDashboardPage;