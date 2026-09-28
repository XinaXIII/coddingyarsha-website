import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/bookings').then(res => setBookings(res.data));
      api.get('/requests').then(res => setRequests(res.data));
    }
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>
      <h2 className="text-2xl mb-4">Бронирования</h2>
      <div className="space-y-2">
        {bookings.map(b => (
          <div key={b.id} className="bg-gray-800 p-3 rounded">
            <p>{b.name} - {b.phone} - {b.pc.name} - {new Date(b.date).toLocaleDateString()} {new Date(b.startTime).toLocaleTimeString()} - {new Date(b.endTime).toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl mt-6 mb-4">Заявки</h2>
      <div className="space-y-2">
        {requests.map(r => (
          <div key={r.id} className="bg-gray-800 p-3 rounded">
            <p>{r.name} - {r.email} - {r.subject} - {r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}