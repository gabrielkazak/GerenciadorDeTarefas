// Proteção de rota: se não houver token, redireciona para login
if (!localStorage.getItem('token') || !localStorage.getItem('id_usuario')) {
  window.location.href = 'login.html';
}

function atualizarData() {
  //Função que atualiza a data que aparece no menu Hamburguer
  const hoje = new Date();

  // Para exibir no menu hamburguer
  const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);

  const dataMenu = document.getElementById('dataAtual');
  if (dataMenu) dataMenu.textContent = dataFormatada;
}

atualizarData(); //Chamada da função, para ocorre assim que a página é carregada

let concluidas = document.querySelector('.concluidas'); //botao options
let todas = document.querySelector('.todas'); //botao options
let atrasadas = document.querySelector('.atrasadas'); //botao options

let allTasks = document.querySelector('.all-tasks'); //Setor com todas as tarefas
let lateTasks = document.querySelector('.late-tasks'); //Setor com as tarefas atrasadas
let completedTasks = document.querySelector('.completed-tasks'); //Setor com as tarefas concluidas

document.addEventListener('DOMContentLoaded', function () {
  todas.style.color = '#161616'; //Adiciona o estilo de cor na option que começa marcada
});

function resetStyles() {
  //Função que auxilia na troca de Setores de tarefas
  todas.style.color = 'rgb(220, 220, 220)';
  concluidas.style.color = 'rgb(220, 220, 220)';
  atrasadas.style.color = 'rgb(220, 220, 220)';

  allTasks.style.display = 'none';
  completedTasks.style.display = 'none';
  lateTasks.style.display = 'none';
}

todas.addEventListener('click', function () {
  resetStyles();
  todas.style.color = '#161616';
  allTasks.style.display = 'block';
});

concluidas.addEventListener('click', function () {
  resetStyles();
  concluidas.style.color = 'rgb(168, 255, 168)';
  completedTasks.style.display = 'block';
});

atrasadas.addEventListener('click', function () {
  resetStyles();
  atrasadas.style.color = 'rgb(255, 169, 169)';
  lateTasks.style.display = 'block';
});

let botaoTask = document.querySelector('.btn-task'); //Botao que cria uma tarefa nova
let botaoTaskAmanha = document.querySelector('.btn-task-tomorrow'); //Botao que cria uma tarefa nova para amanha
let createTask = document.querySelector('.task-creator'); //Div que contem o formulario de criação de tarefa
let overlay = document.querySelector('.task-overlay'); //Filtro que escurece a tela embaixo da criação de tarefa

// Função para formatar a data para o formato correto (YYYY-MM-DD)
function formatarData(data) {
  if (!data) return null; // Verifica se a data não é nula ou undefined

  const dataArray = data.split('/');

  if (dataArray.length !== 3) {
    console.error('Formato de data inválido:', data);
    return null;
  }

  const dia = dataArray[0];
  const mes = dataArray[1];
  const ano = dataArray[2];

  // Verifica se a data possui valores válidos para dia, mês e ano
  if (!ano || !mes || !dia) {
    console.error('Valores inválidos na data:', { ano, mes, dia });
    return null;
  }

  // Garante que o mês e o dia tenham dois dígitos
  const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2,'0')}`;
  return dataFormatada; // Exemplo: "2025-05-31"
}

function abrirTaskCreator(data = null) {
  const campoData = createTask.querySelector('#data'); // Seleciona o campo Data do formulário de criação de tarefas

  if (!data) {
    // Se a data for nula, atribui a data baseada na data do navegador
    const hoje = new Date();
    // Formato: "DD/MM/YYYY"
    data = hoje.toLocaleDateString('pt-BR');
  }

  // Formata a data antes de exibi-la
  const dataFormatada = formatarData(data);

  if (!dataFormatada) {
    // Se a data for inválida, não exibe e não faz nada
    alert('Data inválida!');
    return;
  }

  // Exibe a data formatada no campo de data
  campoData.textContent = dataFormatada;

  // Mostra o task-creator
  createTask.style.display = 'none';
  createTask.style.display = 'flex';
}

botaoTask.addEventListener('click', function () {
  abrirTaskCreator();
  overlay.style.display = 'block';
});

//Abre o criador de tasks com a data de amanhã formatada
botaoTaskAmanha.addEventListener('click', function () {
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);

  // Converte para "DD/MM/YYYY"
  const dia = String(amanha.getDate()).padStart(2, '0');
  const mes = String(amanha.getMonth() + 1).padStart(2, '0');
  const ano = amanha.getFullYear();
  const amanhaPtBr = `${dia}/${mes}/${ano}`;

  abrirTaskCreator(amanhaPtBr);
  overlay.style.display = 'block';
});

//Fecha o criador de tasks
document.querySelector('.btn-close').addEventListener('click', function () {
  createTask.style.display = 'none';
  overlay.style.display = 'none';
});

//Calendário
const calendarioContainer = document.getElementById('calendarioContainer');
const calendario = document.getElementById('calendario');
const nomeMes = document.getElementById('nomeMes');
const btnAnterior = document.getElementById('mesAnterior');
const btnProximo = document.getElementById('mesProximo');
const btnCalendario = document.querySelector('.bi-calendar-event')?.closest('button');
const calendarioTasks = document.querySelector('.calendario_tasks');

const opcoes = document.querySelector('.options');

let dataAtual = new Date();

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function criarCalendario(data) {
  //Função que tem como finalidade criar o calendario visto pelo usuario
  calendario.innerHTML = ''; //Seta o conteudo inicialmente como vazio
  nomeMes.textContent = `${meses[data.getMonth()]} ${data.getFullYear()}`; //Define o mes e o ano passado na data obtida anteriormente

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']; //Array com os dias da semana, que vai aparecer em cima do calendário
  diasSemana.forEach((dia) => {
    //Pra cada dia da semana, o for vai criar um elemento div, com o contéudo sendo o proprio dia, definir algumas classes bootstrap, e dar append no container pai que é calendário
    const th = document.createElement('div');
    th.textContent = dia;
    th.className =
      'text-center fw-bold text-uppercase text-secondary border-bottom pb-2';
    calendario.appendChild(th);
  });

  const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1).getDay(); //Identifica qual o primeiro dia do mes
  const totalDias = new Date(
    data.getFullYear(),
    data.getMonth() + 1,
    0
  ).getDate(); //Identifica quantos dias tem naquele mes

  for (let i = 0; i < (primeiroDia === 0 ? 6 : primeiroDia - 1); i++) {
    //Esse for tem como função, colocar espaços vazios nos inicios de mes, senão todos os meses começariam da segunda feira
    const vazio = document.createElement('div');
    calendario.appendChild(vazio);
  }

  for (let i = 1; i <= totalDias; i++) {
    const dia = document.createElement('div');
    dia.className =
      'text-center p-2 rounded bg-dark text-white w-35 border border-light fw-medium calendario-dia';
    dia.textContent = i;

    dia.addEventListener('click', () => {
      const diaClicado = String(i).padStart(2, '0'); //Garante que a substring, nesse caso dia, tenha 2 caracteres, e se nao tiver, adiciona um 0 no começo
      const mesClicado = String(data.getMonth() + 1).padStart(2, '0'); //Garante que a substring, nesse caso mês, tenha 2 caracteres, e se nao tiver, adiciona um 0 no começo
      const ano = data.getFullYear();

      const hoje = new Date();
      const dataClicada = new Date(`${ano}-${mesClicado}-${diaClicado}`); //formata a data no formato ano-mes-dia

      const diaAtual = hoje.getDate();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      const dataIsFutura =
        dataClicada > hoje &&
        (dataClicada.getDate() !== diaAtual ||
          dataClicada.getMonth() !== mesAtual ||
          dataClicada.getFullYear() !== anoAtual); //boolean que verifica se a data é futura

      if (dataIsFutura) { // se for futura, envia a data de forma formatada para o localStorage. pra ser usada no Calendario-tasks
        const dataFormatada = `${ano}-${mesClicado}-${diaClicado}`;
        localStorage.setItem('dataSelecionada', dataFormatada);
        location.reload();
      }
    });
    calendario.appendChild(dia);
  }
}

//Abre o calendário ao clicar no icone do menu
btnCalendario?.addEventListener('click', () => {
  resetStyles();
  opcoes?.classList.add('d-none');
  calendarioContainer.classList.remove('d-none');
  calendarioContainer.style.display = 'block';
  criarCalendario(dataAtual);
});

//Retorna um mês no calendário
btnAnterior.addEventListener('click', () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  criarCalendario(dataAtual);
});

//Avança um mês no calendário
btnProximo.addEventListener('click', () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  criarCalendario(dataAtual);
});

const botaoHome = document.querySelector('.bi-house')?.closest('button');

//Retorna pra home independente de onde esteja, e evita que fique preso no calendario-tasks
botaoHome.addEventListener('click', function () {
  todas.style.color = '#161616';
  allTasks.style.display = 'block';

  opcoes?.classList.remove('d-none');
  calendarioContainer.classList.add('d-none');

  localStorage.removeItem('dataSelecionada');
  location.reload();
});

//Função de logout que limpa o localStorage e redireciona pra página de login
document.body.addEventListener('click', (event) => {
  const logout = event.target.closest('.logout-button');

  if (!logout) return;

  localStorage.removeItem('token');
  localStorage.removeItem('id_usuario');
  localStorage.removeItem('username');
  localStorage.removeItem('dataSelecionada');
  window.location.href = 'login.html';
});
