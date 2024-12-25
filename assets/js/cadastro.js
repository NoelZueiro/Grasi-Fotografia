// Classe que gerencia as contas
class Conta {
    constructor() {
        const [email, senha, rSenha] = getData();
        this.email = email;
        this.senha = senha;
        this.rSenha = rSenha;
    }

    // Verifica se os dados estão corretos
    verify() {
        const vazio = this.verifyEmpty();
        const senhaFraca = this.verifyFraca();
        const emailInvalido = !this.validateEmail(this.email);
        
        if (!vazio && !senhaFraca && !emailInvalido) {
            return true;
        } else {
            return false;
        }
    }

    // Verifica se algum campo está vazio
    verifyEmpty() {
        let array = [this.email, this.senha, this.rSenha];
        let teste = false;

        array.forEach(el => {
            if (el === undefined || el === null || el === '') {
                teste = true;
            }
        });

        return teste;
    }

    // Verifica se a senha é fraca ou as senhas não coincidem
    verifyFraca() {
        return this.senha.length < 6 || this.senha !== this.rSenha;
    }

    // Valida o formato do email
    validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
}

// Classe que gerencia o banco de dados local
class Bd {
    // Salva a conta no localStorage
    save({ email, senha }) {
        let id = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 1;

        // Criptografando a senha antes de salvar
        const encryptedPassword = CryptoJS.AES.encrypt(senha, 'secret-key').toString();
        localStorage.setItem(`conta${id}`, JSON.stringify({ email, senha: encryptedPassword, cart: {} }));
        localStorage.setItem('id', ++id);
    }

    // Verifica se o email já existe
    verifyAccounts({ email }) {
        let id = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 1;

        for (let i = 1; i < id; i++) {
            let emailSis = JSON.parse(localStorage.getItem(`conta${i}`)).email;
            if (email === emailSis) {
                return false;
            }
        }
        return true;
    }
}

// Evento de registro
document.querySelector('#register-btn').addEventListener('click', () => {
    const conta = new Conta();
    const bd = new Bd();
    
    if (conta.verify()) {
        if (bd.verifyAccounts(conta)) {
            bd.save(conta);
            limparInputs(3);

            // Alert Personalizado
            Swal.fire({
                icon: 'success',
                title: 'Conta criada com sucesso, vá para a aba de login.',
                confirmButtonColor: "#DD6B55",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            setTimeout(() => {
                window.location.href = 'login-page.html';
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Já existe uma conta com esse email.',
                confirmButtonColor: "#DD6B55"
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A senha deve ter no mínimo 6 caracteres e as senhas devem ser iguais.',
            confirmButtonColor: "#DD6B55"
        });

        limparInputs(2);
    }
});

// Função para obter os dados do formulário
const getData = () => [
    document.getElementById('email').value,
    document.getElementById('senha').value,
    document.getElementById('rSenha').value
];

// Função para limpar os campos de input
const limparInputs = (num) => {
    const inputs = {
        1: ['#email'],
        2: ['#senha', '#rSenha'],
        3: ['#email', '#senha', '#rSenha']
    };

    inputs[num]?.forEach(id => {
        document.querySelector(id).value = '';
    });
};

// A função de fechar o modal (caso exista)
if (document.getElementById('modal_desc_button')) {
    document.querySelector('#modal_desc_button').addEventListener('click', () => {
        fecharDialog();
    });
}
