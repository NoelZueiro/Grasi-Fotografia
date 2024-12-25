
//objeto literal dos produtos que o site possui
const products = {
  0: {
    nome: 'Nitro Gift Gaming',
    desc: '✅ 1 mês ✅ Funciona em conta que ja teve nitro.',
    valor: 14.50,
    img: '<img src="/assets/img/pag-produtos/GIFTGAMING.png">',
    qtd: 1
  },

  1: {
    nome: "Nitro Trimesal",
    desc: "NITRO 3 MESES PARA CONTAS COM MAIS DE 30 DIAS QUE NUNCA TIVERAM NITRO (NECESSITA DE ATIVAÇÃO).",
    valor: 3.10,
    img: '<img src="assets/img/pag-produtos/GIFTGAMING.png">',
    qtd: 1
  },

  2: {
    nome: "NIitro Mensal",
    desc: "Nitro Link Promocional Nescesario cartão de credito para ativar Você não pode ter tido Nitro Precisa ser uma conta com mais de 30 dias Depois da entrega não nos responsabilizamos pelo produto",
    valor: 0.10,
    img: '<img src="/assets/img/pag-produtos/GIFTGAMING.png">',
    qtd: 1
  },

  3: {
    nome: "Nitro Gift Basic",
    desc: "Compre ja nitro gift aceita em conta que ja teve nitro",
    valor: 8.60,
    img: '<img src="/assets/img/pag-produtos/GIFTGAMING.png">',
    qtd: 1
  },

  4: {
    nome: "Steam 50 a 500 jogos",
    desc: "✅Steam de 50 a 500 Jogos",
    valor: 4.70,
    img: '<img src="/assets/img/pag-produtos/steam.webp">',
    qtd: 1
  },

  5: {
    nome: "Steam gta 5",
    desc: "✅Steam com Grand Theft Auto V e Outros Jogos",
    valor: 9.30,
    img: '<img src="/assets/img/pag-produtos/gta4.webp">',
    qtd: 1
  },

  6: {
    nome: "Painel seguidores",
    desc: "Painel seguidores peguie visualizacoes e seguidores",
    valor: 3.10,
    img: '<img src="/assets/img/pag-produtos/painelseguidores.webp">',
    qtd: 1
  },

  7: {
    nome: "Painel Sms",
    desc: "sms consiga muitos sms",
    valor: 3.00,
    img: '<img src="/assets/img/pag-produtos/painelsms.webp">',
    qtd: 1
  },

  8: {
    nome: "Painel Tiktok",
    desc: "Ganhe muitas view e seguidores no tiktok",
    valor: 1.20,
    img: '<img src="/assets/img/pag-produtos/tiktok.webp">',
    qtd: 1
  },
  // PRODUTOS DA PAGINA DE PRODUTOS, COMEÇANDO DO 20
  20: {
    nome: "Painel do 7",
    desc: "Explore mais sobre o 7 com um inicio super bom",
    valor: 4.32,
    img: '<img src="assets/img/pag-produtos/Notebook.png">',
    qtd: 1
  },
  21: {
    nome: "Minecraft full acesso",
    desc: "Compre ja minecraft original full acesso",
    valor: 6.13,
    img: '<img src="/assets/img/pag-produtos/minecraft.webp">',
    qtd: 1
  },
  22: {
    nome: "Capa Optifine",
    desc: "Compre a melhor capa op da atualidade",
    valor: 3.24,
    img: '<img src="/assets/img/pag-produtos/capaop.webp">',
    qtd: 1
  },
  23: {
    nome: "Robux Ifinito",
    desc: "Compre robux infinitos e se dirvita",
    valor: 5.79,
    img: '<img src="/assets/img/pag-produtos/robux.jpeg">',
    qtd: 1
  },
  24: {
    nome: "Conta Nitrada 30 dias",
    desc: "Compre melhor nitrada",
    valor: 3.99,
    img: '<img src="/assets/img/pag-produtos/nitada.webp">',
    qtd: 1
  },
  25: {
    nome: "METODO IFOOD",
    desc: "Compre ja o metodo ifood",
    valor: 3.10,
    img: '<img src="assets/img/pag-produtos/metodoifood.png">',
    qtd: 1
  },
  26: {
    nome: "Source pack",
    desc: "melhor da quebrada",
    valor: 6.30,
    img: '<img src="assets/img/pag-produtos/sourcepack.webp">',
    qtd: 1
  },
  27: {
    nome: "Conta netflix 1 ano",
    desc: "Conta netflix a melhor",
    valor: 5.99,
    img: '<img src="assets/img/pag-produtos/netflix.webp">',
    qtd: 1
  },

}

//gera o objeto do id clicado no site
class Product {
  constructor(id) {
    // desconstroi o objeto selecionado com o id, e gera variaveis individuais
    const { nome,
      desc,
      valor,
      img,
      qtd
    } = products[id]
    //

    //pega os valores individuais do objeto selecionado com base no id e coloca no objeto que vai ser gerado 
    //posteriormente na funcao que é acionada ao clicar nos botes de compra

    this.nome = nome
    this.desc = desc
    this.valor = valor
    this.img = img
    this.qtd = qtd
  }
}


///////////////////////////////////////////////////////CLIQUE///////////////////////////////////////////////////////////

//ao clicar em um dos botoes de compra, gera uma funcao
document.querySelector('body').addEventListener('click', ({
  target: {
    dataset: {
      produtoid: id
    }
  }
}) => {
  if ((id >= 0) &&
    (id <= 100) && //Adicionando Quantidade de Produtos Que o site pode ter
    (id != '')) {

    if (localStorage.getItem('userLogado')) {
      let idUserLogado = getIdUser()


      const produto = new Product(id)

      let cart = {} //cria o carrinho
      if (Object.entries(JSON.parse(localStorage.getItem(`conta${idUserLogado}`))['cart']).length === 0) {
        cart[id] = produto // se o carrinho for nulo, ele gera um carrinho novo

      } else {
        cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart // caso nao for, ele pega o carrinho ja gerado, 
        // e so atribui o produto clicado

        let possui = false //ja possui o produto no carrinho começa como falso

        Object.keys(cart).forEach(el => {
          if (el === id) {
            possui = true // se o produto tiver no carrinho, possui vira true
          }
        })

        if (!possui) { // se o produto ja tiver no carrinho, ele n vai adicionar, e me mostre um alert- Personalizado
          cart[id] = produto
        } else {
          Swal.fire({
            title: produto.nome,
            text: 'produto ja foi adicionado no Carrinho',
            confirmButtonColor: "#DD6B55",

          })
        }

      }

      reajustarObjeto(cart) // salva o produto cart no localstorage 'cart'

      setarValores(idUserLogado) // seta os valores
    } else {
      window.location.href = 'login-page.html'
    }

  }
})








////////////////////////////////////////////////////////FUNCOES//////////////////////////////////////////////////////////

// formata o valor para R$
const formatarValorRS = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format((valor).toFixed(2))
}

// seta o texto do carrinho, com base no parametro passado na funcao
const setText = texto => {
  document.querySelector('.cart-item').innerHTML = texto
}

// pega o texto, com base no objeto, e passa para um variavel para depois usa-la no setText()
const getText = (id, {
  nome,
  desc,
  valor,
  img,
  qtd
}) => {
  let texto = ` 

  <div id="item-estilizing" class="div${id}" >
  
    <header>
      
      <figure class="imageEfect" onclick='removerFromCart(${id})'>
        ${img}
        <div id="hoverEfectImage">
        <i class="fas fa-trash-alt"></i>
        </div>
      </figure>
      <figcaption>
        <h6>${nome} </h6>
        <p>${desc}</p>
      </figcaption>
    </header>
    <li>
      
        <button class="btn plus" onclick="adicionarQtd(${id}, ${qtd})"> + </button>
        <p> ${qtd} </p>
        <button class="btn minus" onclick="removerQtd(${id}, ${qtd})"> - </button>
      
    </li>
    <section>
      <p> ${formatarValorRS((valor * qtd * 0.9))} <br /> <span style='color: red;'>10% OFF</span></p>
    </section>
  </div>`

  return texto
}

// seta o total no carrinho
const setTotal = (total) => document.querySelector('.total').innerHTML = total * 0.9 > 0
  ?
  `
  <h2>Subtotal: <b>${formatarValorRS((total * 0.9))}</b> </h2>
`
  :
  `
  <h2>Subtotal: NENHUM ITEM ESCOLHIDO </h2>
`

// pega o valor e a quantidade, com base no objeto passado e multiplica eles entri si
const getTotal = ({ valor, qtd }) => valor * qtd

//ele seta no documento, o numero de produtos no carrinho
const setNumeroProdutos = numero => document.querySelector('#cont-itens-carrinho').innerHTML = numero > 0 ? numero : ''

//ele retorna o valor de produtos no carrinho com base no objeto passado como parametro
const getNumeroProdutos = obj => Object.keys(obj).length

// ele seta os valores no documento, usando todas as outras funcoes acima
const setarValores = (id) => {
  let idUserLogado = getIdUser()
  const cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  let texto = ''

  Object.entries(cart).forEach(el => texto += getText(el[0], el[1]))

  let total = 0

  Object.entries(cart).forEach(el => total += getTotal(el[1]))



  let numero_de_produtos = getNumeroProdutos(cart)

  setTotal(total)
  setText(texto)
  setNumeroProdutos(numero_de_produtos)
}


// na funcao getText() ele coloca um onclick nos botoes de remover e adicionar qtd do produto, e aqui, 
// ele opera essas funcoes de remover() e adicionar()

//remover qtd do produto selecionado
const removerQtd = (id, qtd) => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  if (qtd === 1) {  //se a qtd do produto selecionad com base no id for 1, ele removera do objeto carrinho, 
    delete cart[id]  //o produto em questao, e tambem removera do html
    document.querySelector(`.div${id}`).remove()
    reajustarObjeto(cart)

  } else {
    qtd--

    cart[id].qtd = qtd

    reajustarObjeto(cart)
  }
  setarValores(idUserLogado) // seta os valores atualizados
}

//adicionar qtd do produto selecionado, se atingir maior que 20 - Mostre-me um alert personalizado
const adicionarQtd = (id, qtd) => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart

  if (qtd <= 19) { // ele trava e deixa adicionar qtd se o numero for 20, ate 19 ele deixa add mais 1, por isso 20
    qtd++

    cart[id].qtd = qtd

    reajustarObjeto(cart)
  } else {
    Swal.fire({
      title: 'Você atingiu a quantidade Maxima de produto em 1 objetivo',
      width: 600,
      padding: '3em',
      color: '#E63946',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(#E63946)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      confirmButtonColor: "#DD6B55"
    })
  }

  setarValores(idUserLogado) // seta os valores atualizados
}



// carregamento da pagina //

//ao carregar na janela, ele seta os valores 
document.body.onload = () => {
  let idUserLogado = getIdUser()
  if (localStorage.getItem(`conta${idUserLogado}`) && Object.entries(JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart).length != 0) { // ele apenas seta os valores, se o obj cart no localstorage n for nulo
    // assim, evitando algum erro
    setarValores(idUserLogado)
  }
}

const getIdUser = () => {
  for (let i = 1; i < localStorage.getItem('id'); i++) {
    if (JSON.parse(localStorage.getItem(`conta${i}`)).e === localStorage.getItem('userLogado')) {
      return i
    }
  }
}

const reajustarObjeto = (cart) => {
  let idUserLogado = getIdUser()
  const { e, s } = JSON.parse(localStorage.getItem(`conta${idUserLogado}`))

  localStorage.setItem(`conta${idUserLogado}`, JSON.stringify({ e, s, cart }))
}

// Sistema de compras 
const btnFinalizarCompras = document.querySelector("#btnFinalizarCarrinho")
btnFinalizarCompras.addEventListener("click", function () {
  Swal.fire({
    title: 'Finalize o pagamento',
    text: 'Faca o Pagamento Pix "a68b418a-58f8-428e-98c3-a93f5df6d7dc" no valor Correto senao nao o Produto nao ira ser enviado',
    confirmButtonColor: "#DD6B55",
    icon: 'question'

  })
})

const removerFromCart = id => {
  let idUserLogado = getIdUser()
  let cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart
  delete cart[id]
  document.querySelector(`.div${id}`).remove()
  reajustarObjeto(cart)
  setarValores(id)
}