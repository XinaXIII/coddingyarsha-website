const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/email');
const wrap = require('../utils/wrap');
const router = express.Router();

router.get('/', auth, wrap(async (req, res) => {
  res.json(await prisma.booking.findMany({ include: { pc: true }, orderBy: { startTime: 'desc' } }));
}));

// Публично: занятые интервалы ПК в диапазоне (без персональных данных)
router.get('/busy', wrap(async (req, res) => {
  const { pcId, from, to } = req.query;
  if (!pcId || !from || !to) return res.status(400).json({ error: 'Нужны pcId, from, to' });
  const busy = await prisma.booking.findMany({
    where: {
      pcId: Number(pcId),
      status: { not: 'cancelled' },
      startTime: { lt: new Date(to) },
      endTime: { gt: new Date(from) },
    },
    select: { startTime: true, endTime: true },
    orderBy: { startTime: 'asc' },
  });
  res.json(busy);
}));

router.post('/', wrap(async (req, res) => {
  const { pcId, name, phone, email, comment, date, startTime, endTime } = req.body;
  if (!pcId || !name || !phone || !date || !startTime || !endTime) {
    return res.status(400).json({ error: 'Заполните обязательные поля' });
  }
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start) || isNaN(end) || end <= start) {
    return res.status(400).json({ error: 'Некорректное время: конец должен быть позже начала' });
  }

  const conflict = await prisma.booking.findFirst({
    where: {
      pcId: Number(pcId),
      status: { not: 'cancelled' },
      startTime: { lt: end },
      endTime: { gt: start },
    },
  });
  if (conflict) return res.status(400).json({ error: 'Этот ПК уже занят на выбранное время' });

  const booking = await prisma.booking.create({
    data: {
      pcId: Number(pcId), name, phone, email, comment,
      date: new Date(date), startTime: start, endTime: end, status: 'pending',
    },
    include: { pc: true },
  });

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Новая бронь',
      text: `Новая бронь: ${name}, ${phone}, ПК: ${booking.pc.name}, Дата: ${date}, Время: ${start.toISOString()} - ${end.toISOString()}`,
    });
  } catch (e) {
    console.error('Email не отправлен:', e.message); // бронь уже сохранена
  }

  res.json(booking);
}));

router.put('/:id', auth, wrap(async (req, res) => {
  const data = {};
  if (req.body.status) data.status = req.body.status;
  if (req.body.comment !== undefined) data.comment = req.body.comment;
  res.json(await prisma.booking.update({ where: { id: Number(req.params.id) }, data, include: { pc: true } }));
}));

router.delete('/:id', auth, wrap(async (req, res) => {
  await prisma.booking.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
}));

module.exports = router;
