import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

const robots = [
  { id: 1, name: 'NavBot-01', status: 'Online', battery: '87%' },
  { id: 2, name: 'NavBot-02', status: 'Offline', battery: '—' },
];

export default function Robots() {
  return (
    <DashboardLayout>
      <Card title="Robots Fleet" span={3}>
        {robots.map(r => (
          <div key={r.id} style={row}>
            <strong>{r.name}</strong>
            <span>{r.status}</span>
            <span>🔋 {r.battery}</span>
            <button onClick={() => alert(`Viewing ${r.name}`)}>
              View
            </button>
          </div>
        ))}
      </Card>
    </DashboardLayout>
  );
}

const row = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  marginBottom: '12px',
  alignItems: 'center'
};
