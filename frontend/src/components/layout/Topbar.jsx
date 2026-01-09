import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <h3>NavBot</h3>

      <div className="topbar-actions">
        <Bell size={18} onClick={() => navigate('/notifications')} />
        <User size={18} onClick={() => navigate('/profile')} />
      </div>
    </header>
  );
}
