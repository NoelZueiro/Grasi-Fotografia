// Função para atualizar o carrinho no localStorage
function atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let carrinhoHtml = "";
  let total = 0;
  
  // Exibe os itens no carrinho
  carrinho.forEach(item => {
    carrinhoHtml += `<div>
      <span>${item.nome}</span>
      <span>R$ ${item.preco}</span>
    </div>`;
    total += parseFloat(item.preco);
  });

  // Exibe o total
  carrinhoHtml += `<div><strong>Total: R$ ${total.toFixed(2)}</strong></div>`;
  document.getElementById("cart").innerHTML = carrinhoHtml;

  // Atualiza o valor total no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(event) {
  const produto = {
    id: event.target.dataset.id,
    nome: event.target.dataset.nome,
    preco: event.target.dataset.preco
  };

  // Adiciona o produto ao carrinho no localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Atualiza a interface do carrinho
  atualizarCarrinho();
}

// Função para finalizar compra
function finalizarCompra() {
  // Obtém o total da compra
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;
  carrinho.forEach(item => total += parseFloat(item.preco));

  if (total === 0) {
    Swal.fire({
      title: 'Carrinho vazio',
      text: 'Adicione produtos ao carrinho para continuar.',
      icon: 'error',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: 'OK'
    });
    return;
  }

  // Exibe a tela de pagamento
  Swal.fire({
    title: 'Escolha a forma de pagamento',
    text: 'Selecione uma das opções abaixo para finalizar a compra:',
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'Confirmar',
    html:
      `<button id="pix-btn" class="payment-btn">Pagamento via Pix</button>
      <button id="qr-code-btn" class="payment-btn">Pagamento via QR Code</button>
      <button id="cartao-btn" class="payment-btn">Pagamento via Cartão de Crédito</button>`,
    focusConfirm: false,
    preConfirm: () => {
      const pixButton = document.getElementById('pix-btn');
      const qrCodeButton = document.getElementById('qr-code-btn');
      const cartaoButton = document.getElementById('cartao-btn');

      if (pixButton) {
        pixButton.addEventListener('click', function () {
          const valorPix = total.toFixed(2);
          const pixLink = `pix://pix?chave=NoelZueiro666@gmail.com&valor=${valorPix}&info=Compra%20de%20Produtos`;
          generateQRCode(pixLink, valorPix);
        });
      }

      if (qrCodeButton) {
        const valorQRCode = total.toFixed(2);
        const pixLinkQRCode = `pix://pix?chave=NoelZueiro666@gmail.com&valor=${valorQRCode}&info=Compra%20de%20Produtos`;
        
        qrCodeButton.addEventListener('click', function() {
          generateQRCode(pixLinkQRCode, valorQRCode);
        });
      }

      if (cartaoButton) {
        cartaoButton.addEventListener('click', function () {
          Swal.fire({
            title: 'Pagamento via Cartão de Crédito',
            html: `
              <p>Insira os dados do seu cartão de crédito para efetuar o pagamento.</p>
              <label for="card-number">Número do Cartão:</label>
              <input type="text" id="card-number" placeholder="Número do Cartão" /><br/>
              <label for="expiry-date">Data de Validade:</label>
              <input type="text" id="expiry-date" placeholder="MM/AA" /><br/>
              <label for="cvv">CVV:</label>
              <input type="text" id="cvv" placeholder="CVV" /><br/>
              <p>O valor é R$ ${total.toFixed(2)}</p>
              <button id="confirm-payment" class="payment-btn">Confirmar Pagamento</button>
            `,
            confirmButtonColor: "#DD6B55",
            showConfirmButton: false,
            focusConfirm: false
          });
        });
      }
    }
  });
}

// Função para gerar o QR Code
function generateQRCode(link, valor) {
  Swal.fire({
    title: `Pagamento via QR Code`,
    html: `
      <p>Escaneie o QR Code abaixo para pagar R$ ${valor} via Pix.</p>
      <div id="qr-code-container"></div>
    `,
    icon: 'info',
    confirmButtonColor: "#DD6B55",
    confirmButtonText: 'OK',
    didOpen: () => {
      QRCode.toCanvas(document.getElementById('qr-code-container'), link, function (error) {
        if (error) {
          console.error(error);
        } else {
          console.log("QR Code gerado com sucesso!");
        }
      });
    }
  });
}

// Event listeners
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", adicionarAoCarrinho);
});

document.getElementById("btnFinalizarCarrinho").addEventListener("click", finalizarCompra);

// Inicializa o carrinho
atualizarCarrinho();
