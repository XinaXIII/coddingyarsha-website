# PC Club

Сайт компьютерного клуба: каталог ПК, онлайн-бронь с проверкой пересечений по времени, форма заявок, админка.

**Стек:** Express + Prisma + PostgreSQL (JWT, nodemailer) · React + Vite + Tailwind · Docker Compose.

## Запуск через Docker
```bash
# 1. впишите EMAIL_USER / EMAIL_PASS (Gmail «пароль приложения») и JWT_SECRET в backend/.env
docker compose up --build
```
- Сайт: http://localhost:3000 (nginx отдаёт сборку и проксирует /api на backend)
- API: http://localhost:5000
- Админка: `/login` → `admin` / `admin123` (**смените пароль перед публикацией**)

При старте backend сам создаёт таблицы (`prisma db push`) и заполняет тестовые данные (`seed.js`).

## Запуск без Docker
```bash
# Postgres должен работать локально (см. DATABASE_URL в backend/.env)
cd backend && npm install && npx prisma db push && npm run seed && npm run dev
cd frontend && npm install && npm run dev
```

## API
| Метод | Путь | Доступ |
|---|---|---|
| POST | /api/auth/login | публично |
| GET | /api/pcs | публично |
| POST / PUT / DELETE | /api/pcs[/:id] | админ |
| GET | /api/bookings/busy?pcId&from&to | публично (только интервалы) |
| POST | /api/bookings | публично |
| GET / PUT / DELETE | /api/bookings[/:id] | админ |
| POST | /api/requests | публично |
| GET | /api/requests | админ |

Письма на `EMAIL_USER` уходят при новой брони и заявке; если почта не настроена, данные всё равно сохраняются.
