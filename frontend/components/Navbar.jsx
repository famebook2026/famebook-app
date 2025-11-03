import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('fb_token');

  const logout = () => {
    localStorage.removeItem('fb_token');
    localStorage.removeItem('fb_user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('fb_user') || 'null');

  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">Famebook</Link>
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to={`/profile/${user?.id}`} className="text-sm">Profil</Link>
              <button onClick={logout} className="text-sm text-red-500">Wyloguj</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Logowanie</Link>
              <Link to="/register" className="text-sm">Rejestracja</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
