class Conta {
    constructor() {
        const [email, senha, rSenha] = getData()
        this.email = email
        this.senha = senha
        this.rSenha = rSenha
    }

    verify() {
        const vazio = this.verifyEmpty()
        const senhaFraca = this.verifyFraca()
        if (!vazio && !senhaFraca) {
            return true
        } else {
            return false
        }
    }

    verifyEmpty() {
        let array = [this.email, this.senha, this.rSenha]
        let teste = false

        array.forEach(el => {
            if (el === undefined || el === null || el === '') {
                teste = true
            }
        })

        return teste
    }

    verifyFraca() {
        // Verifica se a senha é válida e se as senhas são iguais
        const obeysParameters = () => {
            return this.senha === this.rSenha && this.senha.length >= 6
        }

        if (!obeysParameters()) {
            return true
        } else {
            return false
        }
    }
}

class Bd {
    save({ email: e, senha: s }) {
        let id = localStorage.getItem('id')
            ? parseInt(localStorage.getItem('id'))
            : 1

        localStorage.setItem(`conta${id}`, JSON.stringify({ e, s, 'cart': {} }))
        localStorage.setItem('id', ++id)
    }

    verifyAccounts({ email }) {
        let id = localStorage.getItem('id')
            ? parseInt(localStorage.getItem('id'))
            : 1

        for (let i = 1; i <= id; i++) {
            let emailSis = JSON.parse(localStorage.getItem(`conta${i}`)).e
            // Verifica se o email já existe
            if (email === emailSis) {
                return false
            }
        }
        return true
    }
}

document.querySelector('#register-btn').addEventListener('click', () => {
    const conta = new Conta()
    const bd = new Bd()

    if (conta.verify()) {
        if (bd.verifyAccounts(conta)) {
            bd.save(conta)
            limparInputs(3)
            // Alert Personalizado
            Swal.fire({
                icon: 'success',
                title: 'Conta criada, vá para a aba de login para logar-se',
                confirmButtonColor: "#DD6B55",
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            setTimeout(function () {
                window.location.href = 'login-page.html'
            }, 2000)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Já existe uma conta com esse email',
                confirmButtonColor: "#DD6B55"
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A senha deve possuir no mínimo 6 caracteres e as senhas devem ser iguais',
            confirmButtonColor: "#DD6B55"
        })
        limparInputs(2)
    }
})

if (document.getElementById('modal_desc_button')) {
    document.querySelector('#modal_desc_button').addEventListener('click', () => {
        fecharDialog()
    })
}

// Funções auxiliares

const getData = () => [
    document.getElementById('email').value,
    document.getElementById('senha').value,
    document.getElementById('rSenha').value
]

const limparInputs = (num) => {
    switch (num) {
        case 3:
            document.getElementById('email').value = ''
        case 2:
            document.getElementById('senha').value = ''
            document.getElementById('rSenha').value = ''
            break;
    }
}
