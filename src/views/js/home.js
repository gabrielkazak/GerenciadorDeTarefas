function atualizarData() { //Função que atualiza a data que aparece no menu Hamburguer
  const hoje = new Date();

  // Para exibir no menu hamburguer
  const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);

  const dataMenu = document.getElementById('dataAtual');
  if (dataMenu) dataMenu.textContent = dataFormatada;
  }

  atualizarData(); //Chamada da função, para ocorre assim que a página é carregada

let concluidas = document.querySelector('.concluidas'); //botao options
let todas =  document.querySelector('.todas');//botao options
let atrasadas = document.querySelector('.atrasadas')//botao options

let allTasks = document.querySelector('.all-tasks') //Setor com todas as tarefas
let lateTasks = document.querySelector('.late-tasks') //Setor com as tarefas atrasadas
let completedTasks = document.querySelector('.completed-tasks') //Setor com as tarefas concluidas

document.addEventListener('DOMContentLoaded', function(){
    todas.style.color = '#161616'; //Adiciona o estilo de cor na option que começa marcada
})

function resetStyles() { //Função que auxilia na troca de Setores de tarefas
    todas.style.color = 'rgb(220, 220, 220)';
    concluidas.style.color = 'rgb(220, 220, 220)';
    atrasadas.style.color = 'rgb(220, 220, 220)';
  
    allTasks.style.display = 'none';
    completedTasks.style.display = 'none';
    lateTasks.style.display = 'none';
  }
  

  todas.addEventListener('click', function(){
    resetStyles();
    todas.style.color = '#161616';
    allTasks.style.display = 'block';
  });
  
  concluidas.addEventListener('click', function(){
    resetStyles();
    concluidas.style.color = 'rgb(168, 255, 168)';
    completedTasks.style.display = 'block';
  });
  
  atrasadas.addEventListener('click', function(){
    resetStyles();
    atrasadas.style.color = 'rgb(255, 169, 169)';
    lateTasks.style.display = 'block';
  });
  

  let botaoTask = document.querySelector('.btn-task') //Botao que cria uma tarefa nova
  let createTask = document.querySelector('.task-creator') //Div que contem o formulario de criação de tarefa
  let overlay = document.querySelector('.task-overlay') //Filtro que escurece a tela embaixo da criação de tarefa


  function abrirTaskCreator(data = null) { //Se o parametro data nao for passado, recebe nulo
    const campoData = createTask.querySelector('#data'); //Seleciona o campo Data do formulario de criação de tarefas
  
    if (!data) { // Se data for nulo, a função irá atribuir a data baseada na data do navegador
      const hoje = new Date();
      data = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  
    campoData.textContent = data;
  
    // Mostra o task-creator
    createTask.style.display = 'none';
    createTask.style.display = 'flex';
  }
  
  
  botaoTask.addEventListener('click', function(){
    abrirTaskCreator()
    overlay.style.display = 'block'
  })

  document.querySelector('.btn-close').addEventListener('click', function(){
    editTask.style.display = 'none';
    createTask.style.display = 'none'
    overlay.style.display = 'none'
  })



  //Calendário
  const calendarioContainer = document.getElementById('calendarioContainer');
  const calendario = document.getElementById('calendario');
  const nomeMes = document.getElementById('nomeMes');
  const btnAnterior = document.getElementById('mesAnterior');
  const btnProximo = document.getElementById('mesProximo');
  const btnCalendario = document.querySelector('.bi-calendar-event')?.closest('button');
  

  const opcoes = document.querySelector('.options');

  let dataAtual = new Date();

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  function criarCalendario(data) { //Função que tem como finalidade criar o calendario visto pelo usuario
    calendario.innerHTML = ''; //Seta o conteudo inicialmente como vazio
    nomeMes.textContent = `${meses[data.getMonth()]} ${data.getFullYear()}`; //Define o mes e o ano passado na data obtida anteriormente

    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']; //Array com os dias da semana, que vai aparecer em cima do calendário
     diasSemana.forEach(dia => { //Pra cada dia da semana, o for vai criar um elemento div, com o contéudo sendo o proprio dia, definir algumas classes bootstrap, e dar append no container pai que é calendário
        const th = document.createElement('div');
        th.textContent = dia;
        th.className = 'text-center fw-bold text-uppercase text-secondary border-bottom pb-2';
        calendario.appendChild(th);
  });

    const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1).getDay(); //Identifica qual o primeiro dia do mes
    const totalDias = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate(); //Identifica quantos dias tem naquele mes

    for (let i = 0; i < (primeiroDia === 0 ? 6 : primeiroDia - 1); i++) { //Esse for tem como função, colocar espaços vazios nos inicios de mes, senão todos os meses começariam da segunda feira
      const vazio = document.createElement('div');
      calendario.appendChild(vazio);
    }

    for (let i = 1; i <= totalDias; i++) {
      const dia = document.createElement('div');
      dia.className = 'text-center p-2 rounded bg-dark text-white w-35 border border-light fw-medium calendario-dia';
      dia.textContent = i;
      dia.addEventListener('click', () => {
        const diaClicado = String(i).padStart(2, '0'); //Garante que a substring, nesse caso dia, tenha 2 caracteres, e se nao tiver, adiciona um 0 no começo
        const mesClicado = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataFormatada = `${diaClicado}/${mesClicado}/${ano}`;
        
        abrirTaskCreator(dataFormatada);
        overlay.style.display = 'block'
      });
      calendario.appendChild(dia);
    }
  }

  btnCalendario?.addEventListener('click', () => {
    resetStyles();
    opcoes?.classList.add('d-none');
    calendarioContainer.classList.remove('d-none');
    calendarioContainer.style.display = 'block';
    criarCalendario(dataAtual);
  });

  btnAnterior.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    criarCalendario(dataAtual);
  });

  btnProximo.addEventListener('click', () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    criarCalendario(dataAtual);
  });


  const botaoHome = document.querySelector('.bi-house')?.closest('button');

  
  botaoHome.addEventListener('click', function(){
    todas.style.color = '#161616';
    allTasks.style.display = 'block';

    opcoes?.classList.remove('d-none');
    calendarioContainer.classList.add('d-none');
  })


  