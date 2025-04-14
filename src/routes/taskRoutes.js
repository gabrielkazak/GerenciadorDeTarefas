const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags: [Tarefas]
 *     summary: Cria uma nova tarefa para o usuário autenticado
 *     security:
 *       - bearerAuth: []  # Define que a rota requer autenticação JWT
 *     requestBody:
 *       description: Dados da nova tarefa a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: 'Estudar para prova'
 *               horario:
 *                 type: string
 *                 example: '18:00'
 *               data:
 *                 type: string
 *                 format: date
 *                 example: '2025-04-14'
 *               estado:
 *                 type: string
 *                 enum: [pendente, concluída]
 *                 example: 'pendente'
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: 'Estudar para prova'
 *                 horario:
 *                   type: string
 *                   example: '18:00'
 *                 data:
 *                   type: string
 *                   format: date
 *                   example: '2025-04-14'
 *                 estado:
 *                   type: string
 *                   enum: [pendente, concluída]
 *                   example: 'pendente'
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro na validação dos dados (campos obrigatórios não preenchidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Preencha todos os campos'
 *       500:
 *         description: Erro interno ao criar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro ao criar tarefa'
 */

router.post('/', taskController.criarTarefa);

/**
 * @swagger
 * /api/tasks/{id_usuario}:
 *   get:
 *     tags: [Tarefas]
 *     summary: Retorna as tarefas de um usuário autenticado, organizadas por data entre ontem, hoje e amanhã
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         description: ID do usuário para buscar suas tarefas
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefas do usuário organizadas por data (hoje, ontem, amanhã)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hoje_pendentes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titulo:
 *                         type: string
 *                         example: 'Estudar para prova'
 *                       horario:
 *                         type: string
 *                         example: '18:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-14'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'pendente'
 *                 hoje_concluidas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       titulo:
 *                         type: string
 *                         example: 'Reunião de trabalho'
 *                       horario:
 *                         type: string
 *                         example: '10:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-14'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'concluída'
 *                 hoje_atrasadas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       titulo:
 *                         type: string
 *                         example: 'Entrega do relatório'
 *                       horario:
 *                         type: string
 *                         example: '15:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-14'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'atrasada'
 *                 ontem_concluidas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 4
 *                       titulo:
 *                         type: string
 *                         example: 'Finalizar relatório'
 *                       horario:
 *                         type: string
 *                         example: '20:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-13'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'concluída'
 *                 ontem_atrasadas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       titulo:
 *                         type: string
 *                         example: 'Reunião de alinhamento'
 *                       horario:
 *                         type: string
 *                         example: '16:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-13'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'atrasada'
 *                 amanha_pendentes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       titulo:
 *                         type: string
 *                         example: 'Fazer backup dos dados'
 *                       horario:
 *                         type: string
 *                         example: '09:00'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-15'
 *                       estado:
 *                         type: string
 *                         enum: [pendente, concluída]
 *                         example: 'pendente'
 *       400:
 *         description: ID do usuário não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Usuário não encontrado'
 *       500:
 *         description: Erro interno ao buscar as tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro ao buscar tarefas'
 */


router.get('/:id_usuario', taskController.buscarTarefas);

/** 
* @swagger
* /api/tasks/dia/{id_usuario}/{data}:
*   get:
*     tags: [Tarefas]
*     summary: Retorna as tarefas do usuário para um dia específico
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id_usuario
*         in: path
*         description: ID do usuário cujas tarefas serão retornadas
*         required: true
*         schema:
*           type: integer
*           example: 1
*       - name: data
*         in: path
*         description: Data para a qual as tarefas serão retornadas formato yyyy-mm-dd
*         required: true
*         schema:
*           type: string
*           format: date
*           example: '2025-04-14'
*     responses:
*       200:
*         description: Lista de tarefas para o dia especificado
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     example: 1
*                   titulo:
*                     type: string
*                     example: 'Estudar para prova'
*                   horario:
*                     type: string
*                     example: '18:00'
*                   data:
*                     type: string
*                     format: date
*                     example: '2025-04-14'
*                   estado:
*                     type: string
*                     enum: [pendente, concluída]
*                     example: 'pendente'
*                   id_usuario:
*                     type: integer
*                     example: 1
*       400:
*         description: Erro na validação dos parâmetros (usuário ou data não fornecidos)
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 erro:
*                   type: string
*                   example: 'Usuário ou data não fornecidos'
*       500:
*         description: Erro interno ao buscar as tarefas para o dia
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 erro:
*                   type: string
*                   example: 'Erro ao buscar tarefas por dia'
*/
router.get('/dia/:id_usuario/:data', taskController.buscarTarefasPorDia);

/**
 * @swagger
 * /api/tasks:
 *   put:
 *     tags: [Tarefas]
 *     summary: Atualiza uma tarefa do usuário autenticado
 *     requestBody:
 *       description: Dados da tarefa a ser atualizada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               titulo:
 *                 type: string
 *                 example: 'Estudar para prova'
 *               horario:
 *                 type: string
 *                 example: '18:00'
 *               data:
 *                 type: string
 *                 format: date
 *                 example: '2025-04-14'
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: 'Estudar para prova'
 *                 horario:
 *                   type: string
 *                   example: '18:00'
 *                 data:
 *                   type: string
 *                   format: date
 *                   example: '2025-04-14'
 *                 estado:
 *                   type: string
 *                   enum: [pendente, concluída]
 *                   example: 'pendente'
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Erro na validação (id ou id_usuario não fornecidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Alteração não permitida'
 *       404:
 *         description: Tarefa não encontrada ou não pertence ao usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Tarefa não encontrada ou não pertence ao usuário'
 *       500:
 *         description: Erro interno ao atualizar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro ao atualizar tarefa'
 */

router.put('/', taskController.alterarTarefa);

/**
 * @swagger
 * /api/tasks/{id}/{id_usuario}:
 *   delete:
 *     tags: [Tarefas]
 *     summary: Deleta uma tarefa do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser deletada
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário autenticado
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: 'Tarefa deletada com sucesso'
 *       400:
 *         description: Erro na validação (id ou id_usuario não fornecidos ou não foi possível deletar)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Alteração não permitida'
 *       500:
 *         description: Erro interno ao deletar a tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro ao deletar tarefa'
 */

router.delete('/:id/:id_usuario', taskController.deletarTarefa);

/**
  * @swagger
 * /api/tasks/verify/{id_usuario}:
 *   patch:
 *     tags: [Tarefas]
 *     summary: Marca as tarefas do usuário como atrasadas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário cujas tarefas serão verificadas
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarefas verificadas e marcadas como atrasadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: '3 tarefa(s) marcadas como atrasadas'
 *                 tarefas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titulo:
 *                         type: string
 *                         example: 'Estudar para prova'
 *                       estado:
 *                         type: string
 *                         example: 'atrasada'
 *                       data:
 *                         type: string
 *                         format: date
 *                         example: '2025-04-14'
 *       500:
 *         description: Erro interno ao verificar tarefas atrasadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro ao verificar tarefas atrasadas'
 */

router.patch('/verify/:id_usuario', taskController.verificarTarefasAtrasadas);

/**
* @swagger
 * /api/tasks/{id}/{id_usuario}:
 *   patch:
 *     tags: [Tarefas]
 *     summary: Atualiza o estado de uma tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário que possui a tarefa
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Novo estado da tarefa a ser alterado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendente, concluída, atrasada]
 *                 example: 'concluída'
 *     responses:
 *       200:
 *         description: Estado da tarefa atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 estado:
 *                   type: string
 *                   example: 'concluída'
 *       400:
 *         description: Erro ao atualizar o estado da tarefa (parâmetros ausentes ou inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Alteração sem parâmetros'
 *       500:
 *         description: Erro interno ao atualizar o estado da tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: 'Erro interno ao atualizar o estado da tarefa.'
 */

router.patch('/:id/:id_usuario', taskController.alterarEstado);

module.exports = router;
