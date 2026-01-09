import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './dashboardLayout.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <TopBar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
