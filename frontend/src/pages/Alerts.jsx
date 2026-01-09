import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

const alerts = [
  { msg: 'Low Battery', level: 'warning' },
  { msg: 'Obstacle Detected', level: 'error' },
  { msg: 'Mission Completed', level: 'success' },
];

export default function Alerts() {
  return (
    <DashboardLayout>
      <Card title="System Alerts" span={3}>
        {alerts.map((a, i) => (
          <div key={i} className={`notif ${a.level}`}>
            {a.msg}
            <button style={{ float: 'right' }}>Acknowledge</button>
          </div>
        ))}
      </Card>
    </DashboardLayout>
  );
}
