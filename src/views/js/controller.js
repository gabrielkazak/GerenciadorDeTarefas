/*Pega os itens já setados no localStorage*/
const token = localStorage.getItem('token');
const id_usuario = localStorage.getItem('id_usuario');
const username = localStorage.getItem('username');

//Carrega o nome de usuário no menu hamburguer
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.nomeUsuario').textContent = username;
});

//Altera a data pro aparecer apenas dia e mês
function converterParaPtBR(dataISO) {
  const [ano, mes, dia] = dataISO.split('T')[0].split('-');
  return `${dia}/${mes}`;
}

//MÉTODO POST PRA CRIAR UMA TAREFA
document.querySelector('#create').addEventListener('click', async () => {
  let titulo = document.querySelector('#title').value;
  let horario = document.querySelector('#horario').value;
  let data = createTask.querySelector('#data').textContent;

  let dataFormatada = '';

  if (data.includes('/')) {
    // formato DD/MM/YYYY
    const [dia, mes, ano] = data.split('/');
    dataFormatada = `${ano}-${mes}-${dia}`;
  } else if (data.includes('-')) {
    // formato YYYY-MM-DD
    dataFormatada = data;
  } else {
    console.error('Formato de data não reconhecido:', data);
    return alert('Erro ao processar a data');
  }

  if (!titulo || !horario) {
    return alert('Preencha todos os campos');
  }

  try {
    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: titulo,
        horario: horario,
        data: dataFormatada,
        estado: 'pendente',
        id_usuario: id_usuario,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      document.querySelector('.task-creator').style.display = 'none';
      document.querySelector('.task-overlay').style.display = 'none';
      titulo.value = '';
      horario.value = '';
      location.reload();
    } else {
      const data = await response.json();
      console.log('Erro na criação da tarefa:', data);
      alert('Não foi possível criar a tarefa');
    }
  } catch (error) {
    console.error('Falha ao criar tarefa', error);
  }
});









//MÉTODO GET QUE BUSCA TODAS AS TAREFAS DO BANCO DE DADOS
angular.module('tarefas', []).controller('Rest', function ($scope, $http) {

  function formatarTarefas(lista) {
    return lista.map((tarefa) => {
      tarefa.data = converterParaPtBR(tarefa.data);
      return tarefa;
    });
  }

  setTimeout(() => {
    $http.get(`http://localhost:3000/api/tasks/${id_usuario}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        //Formata todas as datas para aparecer apenas dia/mês
        $scope.hoje_pendentes = formatarTarefas(response.data.hoje_pendentes);
        $scope.hoje_concluidas = formatarTarefas(response.data.hoje_concluidas);
        $scope.hoje_atrasadas = formatarTarefas(response.data.hoje_atrasadas);
        $scope.ontem_concluidas = formatarTarefas(response.data.ontem_concluidas);
        $scope.ontem_atrasadas = formatarTarefas(response.data.ontem_atrasadas);
        $scope.amanha_pendentes = formatarTarefas(response.data.amanha_pendentes);
      })
      .catch(function (error) {
        console.error('Erro ao buscar as tarefas:', error);
      });
  }, 1000);
});










//MÉTODO UTILIZADO PRA BUSCAR AS TAREFAS APENAS DO DIA CLICADO NO CALENDÁRIO
// Módulo separado para o calendário
angular.module('calendarioApp', []).controller('CalendarioController', function ($scope, $http) {
    // Recupera a data selecionada do localStorage
    const dataSelecionada = localStorage.getItem('dataSelecionada');

    // Verifica se dataSelecionada existe
    if (dataSelecionada) {
      $scope.dataSelecionada = dataSelecionada;
      $scope.dataFormatada = converterParaPtBR(dataSelecionada);

      if (!id_usuario || !token) {
        console.error('id_usuario ou token não encontrados');
        return; // Previne a requisição caso não tenha essas variáveis
      }

      $http.get(`http://localhost:3000/api/tasks/dia/${id_usuario}/${dataSelecionada}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (res) {
          // Definindo as tarefas no $scope
          console.log(res.data);
          $scope.tarefa_dia = res.data;
        })
        .catch(function (error) {
          console.error('Erro ao buscar as tarefas:', error);
        });
    } else {
      console.error('Data selecionada não encontrada no localStorage.');
    }

    setInterval(function () {
      let novaDataBruta = localStorage.getItem('dataSelecionada');

      // Se não tiver data ou o formato estiver incorreto, não faz nada e retorna
      if (!novaDataBruta || !/^\d{4}-\d{2}-\d{2}$/.test(novaDataBruta)) {
        return;
      }

      let novaData = novaDataBruta;

      if (novaData && novaData !== $scope.dataSelecionada) {
        $scope.dataSelecionada = novaData;

        // Atualiza as tarefas da nova data
        $http
          .get(
            `http://localhost:3000/api/tasks/dia/${id_usuario}/${novaData}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(function (res) {
            $scope.tarefa_dia = res.data;
          });

        if (!$scope.$$phase) $scope.$apply(); // força Angular a renderizar
      }
    }, 300); // verifica a cada 300ms

    $scope.abrirTaskCreator = function (data) {
      const createTask = document.querySelector('.task-creator');
      const campoData = createTask.querySelector('#data'); //Seleciona o campo Data do formulário de criação de tarefas

      campoData.textContent = data || new Date().toLocaleDateString('pt-BR'); // Atribui a data à caixa de texto

      // Exibe o formulário
      createTask.style.display = 'flex';
    };

    $scope.fecharCalendario = function () {
      localStorage.removeItem('dataSelecionada');
      location.reload();
    };
  });






//MODULO QUE AGRUPA OS DOIS ANGULARJS CRIADOS, PRA CHAMAR UMA VEZ SÓ NO HTML
angular.module('appPrincipal', ['tarefas', 'calendarioApp']);











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

//DEIXA PRO BODY INTEIRO O LISTENER QUE ABRE O EDITOR DE TAREFA
document.body.addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-edit');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  window.tarefaSelecionada = {
    id: divTarefa.dataset.id,
    titulo: divTarefa.querySelector('.task-title').textContent,
    horario: divTarefa.querySelector('.task-time').textContent,
    data: divTarefa.querySelector('.task-date').textContent,
  };

  //DIVIDE O OBJETO DA TAREFA SELECIONADA DEPOIS DE PEGAR O CONTEÚDO DA PROPRIA TAREFA DE FORMA DINÂMICA
  const { titulo, horario, data } = window.tarefaSelecionada;
  //ABRE O TASK EDITOR COM OS PARÂMETROS DO HTML DA PRÓPRIA TAREFA
  abrirTaskEditor(titulo, horario, data);
});

//FUNÇÃO QUE ENVIA O MÉTODO PUT PRA API
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

  //PEGA O ID QUE VEIO DO DATA-ID
  const { id } = window.tarefaSelecionada;

  try {
    const response = await fetch('http://localhost:3000/api/tasks/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        titulo: novoTitulo,
        horario: novoHorario,
        data: novaData,
        id_usuario: id_usuario,
      }),
    });

    console.log(response);

    if (response.ok) {
      const resposta = await response.json();
      editTask.style.display = 'none';
      overlay.style.display = 'none';
      location.reload();
    } else {
      alert('Não foi possível atualizar a tarefa.');
    }
  } catch (err) {
    console.error('Erro na requisição PUT:', err);
    alert('Erro ao tentar atualizar a tarefa.');
  }
});

//FECHA O EDITOR DE TAREFAS
document.querySelector('.close').addEventListener('click', function () {
  editTask.style.display = 'none';
  overlay.style.display = 'none';
});











//MÉTODO QUE ENVIA A REQUISIÇÃO PRA DELETAR UMA TAREFA
document.body.addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-delete');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  const id = divTarefa.dataset.id;

  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${id}/${id_usuario}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      divTarefa.remove();
    } else {
      alert('Não foi possível deletar a tarefa.');
    }
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    alert('Erro ao tentar deletar a tarefa.');
  }
});











//MÉTODO QUE ENVIA A REQUISIÇÃO PARA EDITAR O ESTADO DA TAREFA PARA CONCLUÍDA
document.body.addEventListener('click', async (event) => {
  const botao = event.target.closest('.task-complete');
  if (!botao) return;

  const divTarefa = botao.closest('.task');
  const id = divTarefa.dataset.id;

  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${id}/${id_usuario}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'concluida' }),
      }
    );

    if (response.ok) {
      location.reload();
    } else {
      alert('Não foi possível concluir a tarefa.');
    }
  } catch (error) {
    console.error('Erro na requisição PATCH:', error);
    alert('Erro ao tentar concluir a tarefa.');
  }
});










//FUNÇÃO QUE VERIFICA O ESTADO DAS TAREFAS BASEADAS NO HORARIO
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/verify/${id_usuario}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.mensagem);
    } else {
      console.warn('Não foi possível verificar tarefas atrasadas.');
    }

    setTimeout(() => {
      angular.element(document).ready(function () {
        const container = document.querySelector('.container');
        container.classList.add('ativo');
      });
    }, 1000);
  } catch (error) {
    console.error('Erro ao verificar tarefas atrasadas:', error);
  }
});
