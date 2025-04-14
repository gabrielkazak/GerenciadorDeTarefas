const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   description: API para gestão de tarefas com funcionalidade de login de usuários.
 *   version: 1.0.0
 *   title: API de Gestão de Tarefas
 * paths:
 *   /api/login:
 *     post:
 *       tags: [Login]
 *       summary: Realiza o login de um usuário.
 *       description: Esta rota autentica um usuário com base no email e senha fornecidos, e gera um token JWT para sessão.
 *       operationId: fazerLogin
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: login
 *           description: Dados de login do usuário (email e senha).
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@exemplo.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *       security: [] 
 *       responses:
 *         200:
 *           description: Login bem-sucedido, retorna o token JWT e o ID do usuário.
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt_token_exemplo"
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *                 example: "joaosilva"
 *         401:
 *           description: Credenciais inválidas ou usuário não encontrado.
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Credenciais Inválidas"
 *         500:
 *           description: Erro interno no servidor.
 *           schema:
 *             type: object
 *             properties:
 *               erro:
 *                 type: string
 *                 example: "Erro no servidor"
 */

router.post('/login', loginController.fazerLogin);

module.exports = router;

