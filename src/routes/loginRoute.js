const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

router.post('/login', async (req, res)=>{
    try{
        //Usuario.testar();
        const {email, senha} = req.body;
        console.log("Email recebido", email);

        const usuario = await Usuario.buscaUsuario(email);

        if(!usuario){
           return res.status(401).json({erro: 'Usuario não encontrado'})
        }

        const senhaValida = await Usuario.verificaSenha(senha, usuario.senha)
        console.log("Senha válida?", senhaValida);

        if(!senhaValida){
            return res.status(401).json({erro: 'Credencias Inválidas'})
        }

        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, id_usuario: usuario.id });

    } catch (error) {
        console.error("Erro no servidor:", error);
        return res.status(500).json({ erro: 'Erro no servidor' });
    }
})

module.exports = router;