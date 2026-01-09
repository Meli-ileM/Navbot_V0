import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

export default function Settings() {
  return (
    <DashboardLayout>
      <Card title="Application Settings">
        <label>
          <input type="checkbox" /> Dark Mode
        </label><br /><br />
        <label>
          <input type="checkbox" /> Enable Notifications
        </label>
      </Card>
    </DashboardLayout>
  );
}
