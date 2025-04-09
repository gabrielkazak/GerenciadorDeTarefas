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