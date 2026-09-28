import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function PCs() {
  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    api.get('/pcs').then(res => setPcs(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Наши ПК</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pcs.map(pc => (
          <div key={pc.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{pc.name}</h2>
            <p>CPU: {pc.cpu}</p>
            <p>GPU: {pc.gpu}</p>
            <p>RAM: {pc.ram}</p>
            <p>Монитор: {pc.monitor}</p>
            <p>Клавиатура: {pc.keyboard}</p>
            <p>Мышь: {pc.mouse}</p>
            <p>Гарнитура: {pc.headset}</p>
            <p className="text-neon-pink font-bold mt-2">{pc.pricePerHour} ₽/час</p>
            <p>Статус: {pc.status === 'free' ? 'Свободен' : 'Занят'}</p>
            <Link to={`/booking?pcId=${pc.id}`} className="mt-4 inline-block bg-neon-blue px-4 py-2 rounded hover:bg-neon-purple transition">Забронировать</Link>
          </div>
        ))}
      </div>
    </div>
  );
}