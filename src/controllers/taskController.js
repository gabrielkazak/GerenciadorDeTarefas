const Tarefa = require('../models/Tarefa');

const criarTarefa = async (req, res) =>{
    try{
        const {titulo, horario, data, estado, id_usuario} = req.body;

        if (!titulo || !horario || !data) {
            return res.status(400).json({ erro: 'Preencha todos os campos' });
          }
        
        const novaTarefa = await Tarefa.create(titulo, horario, data, estado, id_usuario);
        res.status(201).json(novaTarefa);
    } catch(error){
        console.error('Erro ao criar Tarefa', error);
        res.status(500).json({ erro: 'Erro ao criar tarefa'})
    }
}





const buscarTarefas = async (req, res) =>{
    try {
        const { id_usuario, data } = req.params;

        if (!id_usuario || !data) {
            return res.status(400).json({ erro: 'Usuário ainda não tem tarefas armazenadas' });
        }

        const task = await Tarefa.read(id_usuario, data);
        res.status(200).json(task);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ erro: 'Erro ao buscar tarefas' });
    }
}





const alterarTarefa = async (req, res) =>{
    try {
        const { id, titulo, horario, data, estado, id_usuario } = req.body;

        if (!id || !id_usuario) {
            return res.status(400).json({ erro: 'Alteração não permitida' });
        }

        const tarefaAtualizada = await Tarefa.update(id, titulo, horario, data, estado, id_usuario);

        if (!tarefaAtualizada) {
            return res.status(404).json({ erro: 'Tarefa não encontrada ou não pertence ao usuário' });
        }

        res.status(200).json(tarefaAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
    }
}





const deletarTarefa = async (req, res) =>{
    try {
        const { id, id_usuario } = req.params;

        if (!id || !id_usuario) {
            return res.status(400).json({ erro: 'Alteração não permitida' });
        }

        const deletar = await Tarefa.delete(id, id_usuario);

        if (!deletar) {
            return res.status(400).json({ erro: 'Não foi possível deletar a tarefa' });
        }

        res.status(200).json({ mensagem: deletar });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ erro: 'Erro ao deletar tarefa' });
    }
}





const alterarEstado = async (req, res) =>{
    try{
        const {id, id_usuario} = req.params;
        const {estado} = req.body;

        if (!id || !id_usuario) {
            return res.status(400).json({ erro: 'Alteração não permitida' });
        }

        if (!estado) {
            return res.status(400).json({ erro: 'Alteração sem parâmetros' });
        }

        const result = await Tarefa.patch(id, id_usuario, estado);

        if (!result) {
            return res.status(400).json({ erro: 'Não foi possível atualizar o estado da tarefa' });
        }

        res.status(200).json(result);        
    }catch (error) {
        console.error('Erro ao atualizar estado:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar o estado da tarefa.' });
    }
}

module.exports = {criarTarefa, buscarTarefas, alterarTarefa, deletarTarefa, alterarEstado};