import OwnerDashboardAnalytics from "@/app/components/owner/analytics/OwnerDashboardAnalytics";
import { getAnalyticsForOwnerDashboard } from "@/lib/api/analytics";




const OwnerDashboardPage = async () => {
    const analytics = await getAnalyticsForOwnerDashboard()
    // console.log(analytics)
    return (
        <div>
            <OwnerDashboardAnalytics analytics={analytics} />
        </div>
    );
};

export default OwnerDashboardPage;