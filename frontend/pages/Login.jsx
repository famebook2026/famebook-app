import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.login({ email, password });
      localStorage.setItem('fb_token', res.data.token);
      localStorage.setItem('fb_user', JSON.stringify(res.data.user));
      nav('/');
    } catch (err) {
      alert(err?.response?.data?.error || 'Błąd logowania');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Zaloguj się</h2>
        <form onSubmit={submit}>
          <input className="w-full border p-2 mb-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 mb-2 rounded" placeholder="Hasło" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-indigo-600 text-white py-2 rounded">Zaloguj</button>
        </form>
      </div>
    </div>
  );
}
