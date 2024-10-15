let form = document.querySelector('#registrationForm');
let registerBtn = document.querySelector('#register-btn');
let attemptCount = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let confirmPassword = document.querySelector('#confirm-password').value;

    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password.length !== 8 || (password.match(/\d/g) || []).length < 2) {
        alert('Sua Senha deve conter 8 caracteres, com pelo menos 2 números.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    attemptCount++;

    if (attemptCount >= 50) {
        form.querySelectorAll('input').forEach((input) => {
            input.disabled = true;
        });
        registerBtn.textContent = 'Unlocker';
        alert('O formulário foi desbloqueado após 50 tentativas.');
        attemptCount = 0;
    } else {
        alert(`Tentativa ${attemptCount} registrada.`);
    }

    console.log('Usuário registrado:', { username, email, password });
});