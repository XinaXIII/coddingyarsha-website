import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [pcs, setPcs] = useState([]);
  const [form, setForm] = useState({
    pcId: searchParams.get('pcId') || '',
    name: '',
    phone: '',
    email: '',
    comment: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/pcs').then(res => setPcs(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', {
        ...form,
        email: form.email || null,
        startTime: new Date(`${form.date}T${form.startTime}`).toISOString(),
        endTime: new Date(`${form.date}T${form.endTime}`).toISOString(),
      });
      setMessage('Бронь успешно создана! Мы свяжемся с вами.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Ошибка бронирования');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Бронирование</h1>
      {message && <p className="mb-4 text-neon-pink">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="pcId" value={form.pcId} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded">
          <option value="">Выберите ПК</option>
          {pcs.map(pc => <option key={pc.id} value={pc.id}>{pc.name} - {pc.pricePerHour}₽/ч</option>)}
        </select>
        <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input name="email" placeholder="Email (опционально)" value={form.email} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <textarea name="comment" placeholder="Комментарий" value={form.comment} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded"></textarea>
        <button type="submit" className="bg-neon-purple px-6 py-3 rounded-lg text-white font-bold hover:bg-neon-blue transition">Забронировать</button>
      </form>
    </div>
  );
}