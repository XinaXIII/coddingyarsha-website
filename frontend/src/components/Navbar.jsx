import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-neon-purple">PC Club</Link>
      <div className="space-x-4">
        <Link to="/pcs" className="hover:text-neon-blue">ПК</Link>
        <Link to="/booking" className="hover:text-neon-blue">Бронирование</Link>
        <Link to="/requests" className="hover:text-neon-blue">Заявки</Link>
        <Link to="/contacts" className="hover:text-neon-blue">Контакты</Link>
        {user ? (
          <>
            <Link to="/admin" className="hover:text-neon-pink">Админ</Link>
            <button onClick={logout} className="hover:text-neon-pink">Выйти</button>
          </>
        ) : (
          <Link to="/login" className="hover:text-neon-pink">Вход</Link>
        )}
      </div>
    </nav>
  );
}