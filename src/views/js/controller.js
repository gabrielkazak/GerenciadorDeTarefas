const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/tarefas/tasks', {
    method: 'GET', // ou POST, PUT, DELETE, PATCH conforme necessário
    headers: {
        'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
        'Content-Type': 'application/json',
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro:', error));
