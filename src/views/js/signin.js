function toggleSenha(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Ocultar';
  } else {
    input.type = 'password';
    btn.textContent = 'Mostrar';
  }
}

//Formulário de cadastro
document.querySelector('#enviar').addEventListener('click', async () => {
  let nome = document.querySelector('#name').value;
  let username = document.querySelector('#username').value;
  let email = document.querySelector('#email').value;
  let senha = document.querySelector('#password').value;
  let confirmaSenha = document.querySelector('#confirmPassword').value;

  if (!nome || !username || !email || !senha || !confirmaSenha) {
    return alert('Preencha todos os campos');
  }

  if (senha.length < 8) {
    return alert('Mínimo de 8 dígitos pra senha');
  }

  if (senha.localeCompare(confirmaSenha) != 0) {
    document.querySelector('#confirmPassword').value = '';
    return alert('Senhas Diferentes');
  }

  try {
    const response = await fetch('http://localhost:3000/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        nome_usuario: username,
        senha: senha,
        role: 'usuario',
        email: email,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'login.html';
    } else {
      alert(data.erro || 'Erro ao cadastrar usuário');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});
