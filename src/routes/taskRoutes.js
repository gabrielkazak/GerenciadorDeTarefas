const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')

router.post('/', taskController.criarTarefa);

router.get('/:id_usuario', taskController.buscarTarefas);

router.put('/', taskController.alterarTarefa);

router.delete('/:id/:id_usuario', taskController.deletarUsuario);

router.patch('/:id/:id_usuario', taskController.alterarEstado);

module.exports = router
