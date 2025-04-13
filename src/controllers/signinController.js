const Usuario = require('../models/Usuario');

const criarUsuario = async (req, res) => {
  try {
    const { nome, nome_usuario, senha, role, email } = req.body;
    const id = await Usuario.create(nome, nome_usuario, senha, role, email);

    if (!id) {
      return res.status(400).json({ erro: 'Erro ao cadastrar usuário' });
    }

    res.status(201).json({ id });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

module.exports = { criarUsuario };
