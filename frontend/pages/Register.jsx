import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.register({ username, email, password });
      localStorage.setItem('fb_token', res.data.token);
      localStorage.setItem('fb_user', JSON.stringify(res.data.user));
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.error || 'Błąd rejestracji');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Zarejestruj się</h2>
        <form onSubmit={submit}>
          <input className="w-full border p-2 mb-2 rounded" placeholder="Nazwa użytkownika" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="w-full border p-2 mb-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 mb-2 rounded" placeholder="Hasło" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-green-600 text-white py-2 rounded">Zarejestruj</button>
        </form>
      </div>
    </div>
  );
}
