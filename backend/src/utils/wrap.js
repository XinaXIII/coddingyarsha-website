// Express 4 не ловит ошибки в async-обработчиках — оборачиваем
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
