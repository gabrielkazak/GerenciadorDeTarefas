const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')

router.post('/', taskController.criarTarefa);

router.get('/:id_usuario', taskController.buscarTarefas);

router.get('/dia/:id_usuario/:data', taskController.buscarTarefasPorDia);

router.put('/', taskController.alterarTarefa);

router.delete('/:id/:id_usuario', taskController.deletarTarefa);

router.patch('/verify/:id_usuario', taskController.verificarTarefasAtrasadas);

router.patch('/:id/:id_usuario', taskController.alterarEstado);

module.exports = router
