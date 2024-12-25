// Função para atualizar o carrinho de compras
function atualizarCarrinho() {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || []; // Carregar carrinho do localStorage
    const carrinhoContainer = document.getElementById('cart-items-container');
    const contItensCarrinho = document.getElementById('cont-itens-carrinho');
    const totalFinal = document.getElementById('totalFinal');

    carrinhoContainer.innerHTML = ''; // Limpar carrinho antes de atualizar
    let total = 0;

    // Atualiza a quantidade de itens no carrinho
    contItensCarrinho.textContent = cart.length;

    // Se não houver itens, mostrar mensagem
    if (cart.length === 0) {
        totalFinal.innerHTML = '<h2>Nenhum item escolhido</h2>';
    } else {
        cart.forEach(item => {
            // Atualizar o carrinho com os itens
            const produto = document.createElement('div');
            produto.classList.add('cart-item');
            produto.innerHTML = `
                <div class="produtos" style="width: 45%;">${item.nome}</div>
                <div style="width: 30%;">${item.quantidade}</div>
                <div style="width: 20%;">R$ ${item.preco}</div>
            `;
            carrinhoContainer.appendChild(produto);

            total += item.preco * item.quantidade; // Soma o preço total
        });

        totalFinal.innerHTML = `<h2>Total: R$ ${total.toFixed(2)}</h2>`;
    }
}

// Função para adicionar produto ao carrinho
function adicionarCarrinho(idProduto) {
    const produtos = [
        { id: 0, nome: "Nitro Gift Gaming", preco: 14.50 },
        { id: 1, nome: "Nitro Trimestral", preco: 3.10 },
        { id: 2, nome: "Nitro Mensal", preco: 0.10 }
    ];

    const produto = produtos.find(p => p.id === idProduto);
    if (!produto) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.id === idProduto);
    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho(); // Atualiza o carrinho na interface
}

// Adicionar event listeners aos ícones de adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click', () => {
        const idProduto = parseInt(item.getAttribute('data-produtoid'));
        adicionarCarrinho(idProduto);
    });
});

// Inicializa o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
});
