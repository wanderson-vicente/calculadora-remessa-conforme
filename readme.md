# Projeto de Calculadora de Impostos Remessa Conforme
## Introdução
Este projeto é uma calculadora de impostos para compras internacionais que utiliza a taxa de câmbio em tempo real para calcular o imposto de importação. O objetivo é fornecer uma ferramenta fácil de usar para calcular o imposto de importação com base no valor do produto e do frete.
## Componentes
* HTML para a interface do usuário
* JavaScript para a lógica de negócios e a interação com o usuário
* CSS para estilizar a interface do usuário
## Funcionamento
1. Interface do Usuário: A interface do usuário é composta por campos de entrada para o valor do produto e do frete, além de um botão para calcular o imposto.
2. Calculadora de Impostos: A função calcularImpostos() é chamada quando o usuário clica no botão de calcular. Esta função utiliza a taxa de câmbio em tempo real para calcular o imposto de importação.
3. Taxa de Câmbio em Tempo Real: A função getRealTimeRate() é utilizada para obter a taxa de câmbio em tempo real do dólar americano para o real brasileiro.
## Explicação do Código
* getRealTimeRate(): Esta função utiliza a API do Banco Central do Brasil para obter a taxa de câmbio em tempo real do dólar americano para o real brasileiro.
* calcularImpostos(): Esta função calcula o imposto de importação com base no valor do produto e do frete, utilizando a taxa de câmbio em tempo real.
## Observações
* O código utiliza a biblioteca fetch para fazer requisições HTTP à API do Banco Central do Brasil.
* O código utiliza a biblioteca JSON para manipular a resposta da API.
* O código utiliza a biblioteca Date para manipular datas.

## Imagem da Tela do Aplicativo

![Imagem do Projeto](https://github.com/wanderson-vicente/calculadora-remessa-conforme/blob/30744f7c12244536f5e8a1b73158b06cccf4bf33/Captura-de-tela-html.png)

## Autor
Wanderson Vicente
Data
06/06/2024
