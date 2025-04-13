const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/auth');
const loginRoutes = require('./loginRoutes');
const signInRoutes = require('./signinRoutes');
const taskRoutes = require('./taskRoutes');

router.get('/', (req, res) => {
  res.json({ mensagem: 'Boas vindas' });
});

router.use('/', loginRoutes);
router.use('/', signInRoutes);
//TODAS AS ROTAS DAS TAREFAS USAM AUTENTICAÇÃO BASEADA EM TOKEN, E TEM O /TASKS
router.use('/tasks', autenticar, taskRoutes);

router.get('/protegida', autenticar, (req, res) => {
  res.json({ mensagem: `Acesso concedido para ${req.usuario.tipo}` });
});

module.exports = router;
