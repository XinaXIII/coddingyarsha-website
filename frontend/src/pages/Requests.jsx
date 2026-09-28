import { useState } from 'react';
import api from '../api/axios';

export default function Requests() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', form);
      setMessage('Заявка отправлена!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setMessage('Ошибка отправки');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Оставить заявку</h1>
      {message && <p className="mb-4 text-neon-pink">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <input name="subject" placeholder="Тема" value={form.subject} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded" />
        <textarea name="message" placeholder="Сообщение" value={form.message} onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded"></textarea>
        <button type="submit" className="bg-neon-purple px-6 py-3 rounded-lg text-white font-bold hover:bg-neon-blue transition">Отправить</button>
      </form>
    </div>
  );
}