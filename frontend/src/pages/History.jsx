import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

export default function History() {
  return (
    <DashboardLayout>
      <Card title="Mission History" span={3}>
        <ul>
          <li>Warehouse Patrol – 12/09/2025</li>
          <li>Zone Scan – 11/09/2025</li>
          <li>Security Route – 10/09/2025</li>
        </ul>
      </Card>
    </DashboardLayout>
  );
}
