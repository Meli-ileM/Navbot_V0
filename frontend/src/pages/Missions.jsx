import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

const missions = [
  { id: 1, name: 'Warehouse Patrol', status: 'Completed' },
  { id: 2, name: 'Zone Scan', status: 'Running' },
];

export default function Missions() {
  return (
    <DashboardLayout>
      <Card title="Missions" span={3}>
        {missions.map(m => (
          <div key={m.id} style={row}>
            <span>{m.name}</span>
            <span>{m.status}</span>
            <button onClick={() => alert('Mission details')}>
              Details
            </button>
          </div>
        ))}
      </Card>
    </DashboardLayout>
  );
}

const row = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  marginBottom: '12px'
};
