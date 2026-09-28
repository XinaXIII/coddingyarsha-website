const express = require('express');
const prisma = require('../prisma');
const auth = require('../middleware/auth');
const wrap = require('../utils/wrap');
const router = express.Router();

const FIELDS = ['name', 'cpu', 'gpu', 'ram', 'monitor', 'keyboard', 'mouse', 'headset', 'pricePerHour', 'status'];
const clean = (body) => {
  const data = {};
  for (const f of FIELDS) if (body[f] !== undefined) data[f] = body[f];
  if (data.pricePerHour !== undefined) data.pricePerHour = Number(data.pricePerHour);
  return data;
};

router.get('/', wrap(async (req, res) => {
  res.json(await prisma.pC.findMany({ orderBy: { id: 'asc' } }));
}));

router.post('/', auth, wrap(async (req, res) => {
  res.json(await prisma.pC.create({ data: clean(req.body) }));
}));

router.put('/:id', auth, wrap(async (req, res) => {
  res.json(await prisma.pC.update({ where: { id: Number(req.params.id) }, data: clean(req.body) }));
}));

router.delete('/:id', auth, wrap(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.booking.deleteMany({ where: { pcId: id } });
  await prisma.pC.delete({ where: { id } });
  res.json({ success: true });
}));

module.exports = router;
