require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pcRoutes = require('./routes/pcs');
const bookingRoutes = require('./routes/bookings');
const requestRoutes = require('./routes/requests');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pcs', pcRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req, res) => res.send('PC Club API'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
