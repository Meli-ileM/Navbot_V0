import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import RobotStatusCard from '../components/dashboard/RobotStatusCard.jsx';
import RecentMapsCard from '../components/dashboard/RecentMapsCard.jsx';
import RobotOverviewCard from '../components/dashboard/RobotOverviewCard.jsx';
import AlertsCard from '../components/dashboard/AlertsCard.jsx';
import MissionHistoryCard from '../components/dashboard/MissionHistoryCard.jsx';


export default function Dashboard() {
  return (
    <DashboardLayout>
      <RobotStatusCard />
      <RecentMapsCard />
      <RobotOverviewCard />
      <AlertsCard />
      <MissionHistoryCard />
    </DashboardLayout>
  );
}
