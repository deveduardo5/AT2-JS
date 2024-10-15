let form = document.querySelector('#employeeForm');
let employeeTable = document.querySelector('#employeeTable tbody');
let submitBtn = document.querySelector('#submitBtn');
let messageDiv = document.querySelector('#message');

let employees = JSON.parse(sessionStorage.getItem('employees')) || [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.querySelector('#name').value.trim();
    let age = parseInt(document.querySelector('#age').value.trim());
    let gender = document.querySelector('#gender').value;
    let salary = parseFloat(document.querySelector('#salary').value.trim());

    // Validações
    if (!name || name.split(' ').length < 2) {
        showMessage('Por favor, insira um nome completo válido.');
        return;
    }
    if (age < 15 || age > 120) {
        showMessage('A idade deve ser entre 15 e 120 anos.');
        return;
    }
    if (salary < 1500 || salary > 15000) {
        showMessage('O salário deve ser entre R$ 1500,00 e R$ 15000,00.');
        return;
    }

    if (employees.length < 50) {
        employees.push({ name, age, gender, salary });
        sessionStorage.setItem('employees', JSON.stringify(employees));
        renderTable();
        form.reset();
        showMessage('Funcionário adicionado com sucesso!');
    } else {
        showMessage('Limite de 50 funcionários atingido.');
    }
});

function renderTable() {
    employeeTable.innerHTML = '';
    employees.forEach(employee => {
        let row = employeeTable.insertRow();
        row.insertCell(0).innerText = employee.name;
        row.insertCell(1).innerText = employee.age;
        row.insertCell(2).innerText = employee.gender;
        row.insertCell(3).innerText = `R$ ${employee.salary.toFixed(2)}`;
    });

    if (employees.length > 0) {
        disableForm();
        submitBtn.innerText = 'Recomeçar';
        submitBtn.onclick = () => location.reload();
    }
}

function disableForm() {
    form.querySelectorAll('input, select').forEach(input => {
        input.disabled = true;
    });
}

function showMessage(message) {
    messageDiv.innerText = message;
    setTimeout(() => {
        messageDiv.innerText = '';
    }, 3000); // Mensagem desaparece após 3 segundos
}

// Renderiza a tabela ao carregar a página
renderTable();