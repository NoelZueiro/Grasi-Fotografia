class Conta {
    verify() {
        const [email, senha] = getData()
        const id = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 0 // Garantir que 'id' seja um número

        let isLoggedIn = false; // Variável para verificar se encontrou o usuário

        for (let i = 1; i <= id; i++) { // Iniciamos com i = 1 até id, incluindo o último
            const storedData = localStorage.getItem(`conta${i}`);
            if (storedData) {
                const { e: emailSis, s: senhaSis } = JSON.parse(storedData);

                // Verificar se os dados coincidem
                if (email === emailSis && senha === senhaSis) {
                    this.approved(email);
                    isLoggedIn = true;
                    break;
                }
            }
        }

        // Caso não tenha encontrado a conta no localStorage
        if (!isLoggedIn) {
            this.disapproved();
        }
    }

    // Sistema de verificação com Alert personalizado
    approved(email) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login aprovado, você será redirecionado(a) à tela inicial',
            showConfirmButton: false,
            timer: 1500,
            confirmButtonColor: "#DD6B55"
        });

        localStorage.setItem('userLogado', email);

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 1500);
    }

    disapproved() {
        limparInput();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha e/ou usuário incorretos',
            confirmButtonColor: "#DD6B55"
        });
    }
}

document.querySelector('#login-btn').addEventListener('click', () => {
    const conta = new Conta();
    conta.verify();
});

// Funções auxiliares
const getData = () => [
    document.querySelector('#email').value,
    document.querySelector('#senha').value
];

const limparInput = () => {
    document.querySelector('#senha').value = '';
};
