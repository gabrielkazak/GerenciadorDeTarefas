const express = require('express');
const router = express.Router();
const limiter = require('../middlewares/rateLimiter');
const autenticar = require('../middlewares/auth');
const loginRoutes = require('./loginRoutes');
const signInRoutes = require('./signinRoutes');
const taskRoutes = require('./taskRoutes');


/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Rotas para login de usuários
 *   - name: Registro
 *     description: Rotas para criação de conta
 *   - name: Tarefas
 *     description: Rotas protegidas que gerenciam tarefas dos usuários
 */

router.use('/', limiter, loginRoutes);
router.use('/', limiter, signInRoutes);

//TODAS AS ROTAS DAS TAREFAS USAM AUTENTICAÇÃO BASEADA EM TOKEN, E TEM O /TASKS
router.use('/tasks', autenticar, taskRoutes);

module.exports = router;
