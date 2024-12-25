// Classe que gerencia o login
class Conta {
    verify() {
        const [email, senha] = getData();
        const id = localStorage.getItem('id');

        for (let i = 1; i < id; i++) {
            const { email: emailSis, senha: senhaSis } = JSON.parse(localStorage.getItem(`conta${i}`));

            // Descriptografando a senha
            const decryptedPassword = CryptoJS.AES.decrypt(senhaSis, 'secret-key').toString(CryptoJS.enc.Utf8);

            if (email === emailSis && senha === decryptedPassword) {
                this.approved(email);
                break;
            }

            if (i === id - 1) {
                this.disapproved();
            }
        }
    }

    // Sistema de verificação com Alert personalizado
    approved(email) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login aprovado, você será redirecionado(a) à tela inicial.',
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
            text: 'Senha e/ou usuário incorreto(s).',
            confirmButtonColor: "#DD6B55"
        });
    }
}

// Evento de login
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
