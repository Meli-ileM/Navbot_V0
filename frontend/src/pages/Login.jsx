import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>NavBot</h2>
        <p>Robot Supervision Platform</p>

        <input placeholder="Email" />
        <input placeholder="Password" type="password" />

        <button onClick={() => navigate('/dashboard')}>
          Sign In
        </button>
      </div>
    </div>
  );
}
