const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const fazerLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.buscaUsuario(email);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuario não encontrado' });
    }

    const senhaValida = await Usuario.verificaSenha(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credencias Inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, id_usuario: usuario.id, username: usuario.nome_usuario });
  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({ erro: 'Erro no servidor' });
  }
};

module.exports = { fazerLogin };
