// Sistema de compras 
const btnFinalizarCompras = document.querySelector("#btnFinalizarCarrinho");
btnFinalizarCompras.addEventListener("click", function () {
  // Obtemos o total da compra (soma de todos os itens no carrinho)
  let total = 0;
  let idUserLogado = getIdUser();
  const cart = JSON.parse(localStorage.getItem(`conta${idUserLogado}`)).cart;
  
  Object.entries(cart).forEach(el => total += getTotal(el[1]));

  // Exibe a tela de escolha de pagamento
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
        // Ao clicar no botão Pix
        pixButton.addEventListener('click', function() {
          const valorPix = total.toFixed(2);
          const pixLink = `pix://pix?chave=NoelZueiro666@gmail.com&valor=${valorPix}&info=Compra%20de%20Produtos`;
          
          // Gera o QR Code com o link Pix
          generateQRCode(pixLink, valorPix);
        });
      }

      if (qrCodeButton) {
        // Ao clicar no botão QR Code
        const valorQRCode = total.toFixed(2);
        const pixLinkQRCode = `pix://pix?chave=NoelZueiro666@gmail.com&valor=${valorQRCode}&info=Compra%20de%20Produtos`;
        
        // Gera o QR Code com o link Pix
        qrCodeButton.addEventListener('click', function() {
          generateQRCode(pixLinkQRCode, valorQRCode);
        });
      }

      if (cartaoButton) {
        // Ao clicar no botão Cartão de Crédito
        cartaoButton.addEventListener('click', function() {
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
              <p>O valor é R$ ${formatarValorRS(total)}</p>
              <button id="confirm-payment" class="payment-btn">Confirmar Pagamento</button>
            `,
            confirmButtonColor: "#DD6B55",
            showConfirmButton: false,
            focusConfirm: false,
            preConfirm: () => {
              const cardNumber = document.getElementById('card-number').value;
              const expiryDate = document.getElementById('expiry-date').value;
              const cvv = document.getElementById('cvv').value;

              if (cardNumber && expiryDate && cvv) {
                Swal.fire({
                  title: 'Pagamento Confirmado',
                  text: `Pagamento de R$ ${formatarValorRS(total)} realizado com sucesso.`,
                  icon: 'success',
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: 'OK'
                });
              } else {
                Swal.fire({
                  title: 'Erro',
                  text: 'Por favor, preencha todos os campos corretamente.',
                  icon: 'error',
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: 'OK'
                });
              }
            }
          });
        });
      }
    }
  });
});

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
      // Gera o QR Code no container
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
