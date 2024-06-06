async function getRealTimeRate() {
  const getFormattedDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}-${day}-${year}`;
  };

  let currentDate = new Date();
  let rate = null;

  for (let i = 0; i < 7; i++) {
      const formattedDate = getFormattedDate(currentDate);
      console.log(`Trying date: ${formattedDate}`);
      try {
          const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'&$top=1&$format=json`);
          const data = await response.json();
          console.log(`Response for ${formattedDate}:`, data);
          if (data.value && data.value.length > 0) {
              rate = parseFloat(data.value[0].cotacaoVenda);
              console.log(`Found rate: ${rate} for date: ${formattedDate}`);
              break;
          } else {
              console.log(`No rate found for date: ${formattedDate}`);
              currentDate.setDate(currentDate.getDate() - 1);
          }
      } catch (error) {
          console.error(`Error fetching rate for date: ${formattedDate} - ${error}`);
          currentDate.setDate(currentDate.getDate() - 1);
      }
  }

  if (!rate) {
      throw new Error('Não foi possível encontrar uma taxa de cãmbio.');
  }

  return rate;
}

async function calcularImpostos() {
  const valorProdutoBRL = parseFloat(document.getElementById('valorProduto').value);
  const valorFreteBRL = parseFloat(document.getElementById('valorFrete').value);

  if (isNaN(valorProdutoBRL) || isNaN(valorFreteBRL)) {
      alert('Por favor, insira valores válidos para o produto e o frete.');
      return;
  }

  try {
      const brlToUsd = await getRealTimeRate();
      const valorTotalBRL = valorProdutoBRL + valorFreteBRL;
      const valorTotalUSD = valorTotalBRL / brlToUsd;

      let valorFinalUSD, total, aliquota;

      if (valorTotalUSD <= 50) {
          aliquota = 20;
          valorFinalUSD = valorTotalUSD * 1.20;
          total = valorFinalUSD / 0.83;
      } else {
          aliquota = 60;
          valorFinalUSD = valorTotalUSD * 1.60;
          total = valorFinalUSD / 0.83;
      }

      const formatCurrency = (value) => value.toFixed(2).replace('.', ',');

      const resultadoHTML = `
      <div class="result-item">
      <span class="result-label">Valor total em dólar:</span>
      <span class="result-value">US$ ${formatCurrency(valorTotalUSD)}</span>
  </div>
          <div class="result-item">
              <span class="result-label">Cotação do dólar:</span>
              <span class="result-value">R$ ${formatCurrency(brlToUsd)}</span>
          </div>
          <div class="result-item">
          <span class="result-label">Com isso, a alíquota de Imposto de Importação a ser paga é de:</span>
          <span class="result-value">${aliquota}%</span>
      </div>

          <div class="result-item">
              <span class="result-label">Total a pagar em reais:</span>
              <span class="result-value">R$ ${formatCurrency(total * brlToUsd)}</span>
          </div>
      `;

      document.getElementById('resultado').innerHTML = resultadoHTML;
  } catch (error) {
      console.error('Error calculating taxes:', error);
      alert('Houve um erro ao calcular os impostos. Por favor, tente novamente mais tarde.');
  }
}

