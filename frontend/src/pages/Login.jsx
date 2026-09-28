import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      alert('Неверные данные');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Вход</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 bg-gray-700 rounded" />
        <button type="submit" className="bg-neon-purple px-6 py-3 rounded-lg text-white font-bold hover:bg-neon-blue transition">Войти</button>
      </form>
    </div>
  );
}