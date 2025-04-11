const token = localStorage.getItem('token');
const id_usuario = localStorage.getItem('id_usuario')

function obterDataAtualFormatada() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
function converterParaPtBR(dataISO) {
  const [ano, mes, dia] = dataISO.split('T')[0].split('-');
  return `${dia}/${mes}`;
}

//POST
document.querySelector('#create').addEventListener('click', async () => {
  let titulo = document.querySelector('#title').value;
  let horario = document.querySelector('#horario').value;
  let data = createTask.querySelector('#data').textContent;

  const [dia, mes, ano] = data.split('/');
  const dataFormatada = `${ano}-${mes}-${dia}`;

  if (!titulo || !horario) {
      return alert('Preencha todos os campos');
  }

  try {
      const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              titulo: titulo,
              horario: horario,
              data: dataFormatada,
              estado: 'pendente',
              id_usuario: id_usuario
          })
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
          document.querySelector('.task-creator').style.display = 'none';
          document.querySelector('.task-overlay').style.display = 'none';
          titulo.value = '';
          horario.value = '';
      } else {
          const data = await response.json();
          console.log('Erro na criação da tarefa:', data);
          alert('Não foi possível criar a tarefa');
      }
  } catch (error) {
      console.error('Falha ao criar tarefa', error);
  }
});

//GET
angular.module('tarefas', [])
  .controller('Rest', function ($scope, $http) {
    const dataAtual = obterDataAtualFormatada(); 
    
    $http.get(`http://localhost:3000/api/tasks/${id_usuario}/${dataAtual}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(function (response) {
      $scope.tarefas = response.data.map(tarefa => {
        tarefa.data = converterParaPtBR(tarefa.data);
        return tarefa;
      });
    }).catch(function (error) {
      console.error("Erro ao buscar as tarefas:", error);
    });
  });



//PUT ATÉ A LINHA 168
let editTask = document.querySelector('.task-editor');
let botaoEditar = document.querySelectorAll('.task-edit');
window.tarefaSelecionada = {};

function abrirTaskEditor(titulo, horario, data) {
  const campoTitulo = editTask.querySelector('#title-edit');
  const campoHorario = editTask.querySelector('#horario-edit');
  const campoData = editTask.querySelector('#data-edit');

  campoTitulo.value = titulo;
  campoHorario.value = horario;
  campoData.value = data;

  editTask.style.display = 'flex';
  overlay.style.display = 'block';
}

document.querySelector('.all-tasks').addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-edit');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  window.tarefaSelecionada.id = divTarefa.dataset.id;
  window.tarefaSelecionada.titulo = divTarefa.querySelector('.task-title').textContent;
  window.tarefaSelecionada.horario = divTarefa.querySelector('.task-time').textContent;
  window.tarefaSelecionada.data = divTarefa.querySelector('.task-date').textContent;
  window.tarefaSelecionada.estado = 'pendente';

  const { titulo, horario, data } = window.tarefaSelecionada;

  abrirTaskEditor(titulo, horario, data);
});

document.querySelector('#edit').addEventListener('click', async () => {
  const novoTitulo = document.querySelector('#title-edit').value;
  const novoHorario = document.querySelector('#horario-edit').value;
  const novaData = document.querySelector('#data-edit').value;

  if (!novoTitulo || !novoHorario || !novaData) {
    return alert('Preencha todos os campos');
  }

  if (!window.tarefaSelecionada) {
    return alert('Nenhuma tarefa selecionada!');
  }

  const { id, estado } = window.tarefaSelecionada;

  try {
    const response = await fetch('http://localhost:3000/api/tasks/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:id,
        titulo: novoTitulo,
        horario: novoHorario,
        data: novaData,
        estado: estado,
        id_usuario: id_usuario,
      })
    });

    console.log(response)

    if (response.ok) {
      const resposta = await response.json();
      console.log('Tarefa atualizada com sucesso:', resposta);
      editTask.style.display = 'none';
      overlay.style.display = 'none';
    } else {
      alert('Não foi possível atualizar a tarefa.');
    }
  } catch (err) {
    console.error('Erro na requisição PUT:', err);
    alert('Erro ao tentar atualizar a tarefa.');
  }
});

document.querySelector('.close').addEventListener('click', function() {
  editTask.style.display = 'none';
  overlay.style.display = 'none';
});

//DELETE
document.querySelector('.all-tasks').addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-delete');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  const id = divTarefa.dataset.id;
  
  try{
    const response = await fetch(`http://localhost:3000/api/tasks/${id}/${id_usuario}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    
    if (response.ok) {
      divTarefa.remove();
    } else {
      alert('Não foi possível deletar a tarefa.');
    }
  } catch(error){
    console.error('Erro na requisição DELETE:', error);
    alert('Erro ao tentar deletar a tarefa.');
  }
});



//PATCH
document.querySelector('.all-tasks').addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-complete');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  const id = divTarefa.dataset.id;
  
  try{
    const response = await fetch(`http://localhost:3000/api/tasks/${id}/${id_usuario}`,{
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        estado: 'concluida'
      })
    })
    
    if (response.ok) {
      divTarefa.style.display = 'none'
    } else {
      alert('Não foi possível concluir a tarefa.');
    }
  } catch(error){
    console.error('Erro na requisição PATCH:', error);
    alert('Erro ao tentar concluir a tarefa.');
  }
});
