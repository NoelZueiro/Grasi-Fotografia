// Obtém o carrinho do localStorage ou cria um novo se não existir
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza o contador de itens no carrinho
function updateCartCount() {
    let count = cart.length;
    document.getElementById('cont-itens-carrinho').textContent = count;
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
    updateCartCount(); // Atualiza o contador de itens no carrinho
}

// Adiciona o evento de clique nos botões de adicionar ao carrinho
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
    button.addEventListener('click', function() {
        let productId = this.getAttribute('data-produtoid');
        addToCart(productId);
    });
});

// Atualiza o contador de itens no carregamento inicial
updateCartCount();
