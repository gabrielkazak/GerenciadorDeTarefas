const Tarefa = require('../models/Tarefa');

const criarTarefa = async (req, res) => {
  try {
    const { titulo, horario, data, estado, id_usuario } = req.body;

    if (!titulo || !horario || !data) {
      return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    const novaTarefa = await Tarefa.create(
      titulo,
      horario,
      data,
      estado,
      id_usuario
    );
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('Erro ao criar Tarefa', error);
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
};






const buscarTarefas = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const hoje = new Date();
    const amanha = new Date();
    const ontem = new Date();
    amanha.setDate(hoje.getDate() + 1);
    ontem.setDate(hoje.getDate() - 1);

    const formatarData = (data) => data.toISOString().split('T')[0];
    const hojeData = formatarData(hoje);
    const ontemData = formatarData(ontem);
    const amanhaData = formatarData(amanha);

    if (!id_usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    const tarefas = await Tarefa.read(
      id_usuario,
      ontemData,
      hojeData,
      amanhaData
    );

    //DIVIDE O RETORNO DA REQUISIÇÃO PRA FACILITAR A DISPERSÃO DAS TAREFAS ENTRE OS DIAS
    const categorias = {
      hoje_pendentes: [],
      hoje_concluidas: [],
      hoje_atrasadas: [],
      ontem_concluidas: [],
      ontem_atrasadas: [],
      amanha_pendentes: [],
    };

    tarefas.forEach((tarefa) => {
      const dataTarefa = formatarData(new Date(tarefa.data));
      const estado = tarefa.estado.toLowerCase();

      if (dataTarefa === hojeData) {
        if (estado === 'pendente') categorias.hoje_pendentes.push(tarefa);
        else if (estado === 'concluida')
          categorias.hoje_concluidas.push(tarefa);
        else if (estado === 'atrasada') categorias.hoje_atrasadas.push(tarefa);
      } else if (dataTarefa === ontemData) {
        if (estado === 'concluida') categorias.ontem_concluidas.push(tarefa);
        else if (estado === 'atrasada') categorias.ontem_atrasadas.push(tarefa);
      } else if (dataTarefa === amanhaData) {
        if (estado === 'pendente') categorias.amanha_pendentes.push(tarefa);
      }
    });

    res.status(200).json(categorias);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas' });
  }
};






const buscarTarefasPorDia = async (req, res) => {
  try {
    const { id_usuario, data } = req.params;

    if (!id_usuario || !data) {
      return res.status(400).json({ erro: 'Usuário ou data não fornecidos' });
    }

    const tarefas = await Tarefa.readByDate(id_usuario, data);

    res.status(200).json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas por dia:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas por dia' });
  }
};





const alterarTarefa = async (req, res) => {
  try {
    const { id, titulo, horario, data, id_usuario } = req.body;

    if (!id || !id_usuario) {
      return res.status(400).json({ erro: 'Alteração não permitida' });
    }

    const tarefaAtualizada = await Tarefa.update(
      id,
      titulo,
      horario,
      data,
      id_usuario
    );

    if (!tarefaAtualizada) {
      return res
        .status(404)
        .json({ erro: 'Tarefa não encontrada ou não pertence ao usuário' });
    }

    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};






const deletarTarefa = async (req, res) => {
  try {
    const { id, id_usuario } = req.params;

    if (!id || !id_usuario) {
      return res.status(400).json({ erro: 'Alteração não permitida' });
    }

    const deletar = await Tarefa.delete(id, id_usuario);

    if (!deletar) {
      return res
        .status(400)
        .json({ erro: 'Não foi possível deletar a tarefa' });
    }

    res.status(200).json({ mensagem: deletar });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
  }
};






const alterarEstado = async (req, res) => {
  try {
    const { id, id_usuario } = req.params;
    const { estado } = req.body;

    if (!id || !id_usuario) {
      return res.status(400).json({ erro: 'Alteração não permitida' });
    }

    if (!estado) {
      return res.status(400).json({ erro: 'Alteração sem parâmetros' });
    }

    const result = await Tarefa.patch(id, id_usuario, estado);

    if (!result) {
      return res
        .status(400)
        .json({ erro: 'Não foi possível atualizar o estado da tarefa' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    res
      .status(500)
      .json({ erro: 'Erro interno ao atualizar o estado da tarefa.' });
  }
};






const verificarTarefasAtrasadas = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const tarefasAtrasadas = await Tarefa.atrasadas(id_usuario);
    res.status(200).json({
      mensagem: `${tarefasAtrasadas.rowCount} tarefa(s) marcadas como atrasadas`,
      tarefas: tarefasAtrasadas.rows,
    });
  } catch (err) {
    console.error('Erro ao verificar tarefas atrasadas:', err);
    res.status(500).json({ erro: 'Erro ao verificar tarefas atrasadas' });
  }
};

module.exports = {
  criarTarefa,
  buscarTarefas,
  buscarTarefasPorDia,
  alterarTarefa,
  deletarTarefa,
  alterarEstado,
  verificarTarefasAtrasadas,
};
