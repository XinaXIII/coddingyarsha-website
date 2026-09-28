const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/email');
const wrap = require('../utils/wrap');
const router = express.Router();

router.get('/', auth, wrap(async (req, res) => {
  res.json(await prisma.request.findMany({ orderBy: { createdAt: 'desc' } }));
}));

router.post('/', wrap(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }
  const request = await prisma.request.create({ data: { name, email, phone, subject, message } });

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `Новая заявка: ${subject}`,
      text: `От: ${name} (${email}, ${phone})\n\n${message}`,
    });
  } catch (e) {
    console.error('Email не отправлен:', e.message);
  }

  res.json(request);
}));

module.exports = router;
