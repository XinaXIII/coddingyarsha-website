import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4 text-neon-purple">Добро пожаловать в PC Club</h1>
      <p className="text-xl mb-8">Лучшие компьютеры, удобное бронирование, геймерская атмосфера.</p>
      <Link to="/booking" className="bg-neon-purple px-6 py-3 rounded-lg text-white font-bold hover:bg-neon-blue transition">Забронировать</Link>
    </div>
  );
}