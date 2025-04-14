const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   description: API para gestão de tarefas com funcionalidade de cadastro de usuários.
 *   version: 1.0.0
 *   title: API de Gestão de Tarefas
 * paths:
 *   /api/signIn:
 *     post:
 *       tags: [Registro]
 *       summary: Criação de um novo usuário.
 *       description: Esta rota cria um novo usuário no sistema com as informações fornecidas no corpo da requisição.
 *       operationId: criarUsuario
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: usuario
 *           description: Dados do usuário para cadastro.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               nome_usuario:
 *                 type: string
 *                 example: "joaosilva"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *               role:
 *                 type: string
 *                 example: "usuario"
 *               email:
 *                 type: string
 *                 example: "joao@exemplo.com"
 *       security: []
 *       responses:
 *         201:
 *           description: Usuário criado com sucesso.
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *         400:
 *           description: Erro ao cadastrar usuário.
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Erro ao cadastrar usuário"
 *         500:
 *           description: Erro interno no servidor.
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Erro no servidor"
 */

router.post('/signIn', signinController.criarUsuario);

module.exports = router;
