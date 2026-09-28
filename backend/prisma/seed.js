const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: adminPassword, role: 'admin' },
  });

  // ПК создаём только если таблица пуста — чтобы повторный seed не плодил дубли
  if ((await prisma.pC.count()) === 0) {
    const pcs = [
      { name: 'PC-1', cpu: 'Intel i7-12700K', gpu: 'RTX 3080', ram: '32GB DDR4', monitor: '27" 144Hz', keyboard: 'Logitech G413', mouse: 'Logitech G502', headset: 'HyperX Cloud II', pricePerHour: 300 },
      { name: 'PC-2', cpu: 'AMD Ryzen 9 5900X', gpu: 'RTX 3090', ram: '64GB DDR4', monitor: '32" 165Hz', keyboard: 'Razer BlackWidow', mouse: 'Razer DeathAdder', headset: 'SteelSeries Arctis 7', pricePerHour: 400 },
    ];
    for (const pc of pcs) await prisma.pC.create({ data: pc });
  }
  console.log('Seed done');
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
