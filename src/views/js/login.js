function toggleSenha() {
    const input = document.getElementById('password');
    const btn = event.target;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = "Ocultar"

    } else {
      input.type = 'password';
      btn.textContent = "Mostrar"
    }
  }


  document.querySelector('#send').addEventListener('click', async () => {
    console.log('Botão de login pressionado');
    let email = document.querySelector('#email').value;
    let senha = document.querySelector('#password').value;

    if (!email || !senha) {
        return alert('Preencha todos os campos');
    }

    try {
        console.log('Enviando requisição...');
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        });

        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('id_usuario', data.id_usuario);
            localStorage.setItem('username', data.username)
            window.location.href = 'home.html';
        } else {
            const data = await response.json();
            console.log('Erro no login:', data);
            alert('Usuário ou Senha incorretos');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

  