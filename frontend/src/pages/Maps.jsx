import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';

export default function Maps() {
  return (
    <DashboardLayout>
      <Card title="SLAM Map" span={2}>
        <div style={mapStyle}>🗺️ Map Preview</div>
      </Card>

      <Card title="Map Actions">
        <button>Load Map</button><br /><br />
        <button>Save Map</button><br /><br />
        <button>Delete Map</button>
      </Card>
    </DashboardLayout>
  );
}

const mapStyle = {
  height: '250px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
