import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

const pois = [
  { name: 'Docking Station', x: 12.5, y: 9.3 },
  { name: 'Loading Zone', x: 5.1, y: 14.7 },
];

export default function POI() {
  return (
    <DashboardLayout>
      <Card title="Points of Interest" span={3}>
        {pois.map((p, i) => (
          <div key={i} style={row}>
            <span>{p.name}</span>
            <span>X:{p.x} Y:{p.y}</span>
            <button>Add</button>
          </div>
        ))}
      </Card>
    </DashboardLayout>
  );
}

const row = {
  display: 'grid',
  gridTemplateColumns: '2fr 2fr 1fr',
  marginBottom: '12px'
};
