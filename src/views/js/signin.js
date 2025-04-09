
function toggleSenha(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "Ocultar";
    } else {
        input.type = "password";
        btn.textContent = "Mostrar";
        }
    }