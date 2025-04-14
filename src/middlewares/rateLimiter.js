const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 5 minutos
  max: 100, // máximo de 5 requisições por IP nessa janela
  message: 'Muitas tentativas. Tente novamente em 15 minutos.',
});

module.exports = limiter;

