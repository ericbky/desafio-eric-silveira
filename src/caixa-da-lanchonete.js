class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorTotal = 0
        let pedido = []
        let quantidade = 0
        var cardapio = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]

        //Ajustando os valores de entrada
        if (Array.isArray(metodoDePagamento)) {
            itens = metodoDePagamento
            metodoDePagamento = ""
        }

        //---------------------------------------------- ITENS ----------------------------------------------
        //VERIFICANDO SE HÁ ITENS
        if (!itens || !itens.length) {
            return "Não há itens no carrinho de compra!";
        } else {

            for (let index = 0; index < itens.length; index++) {

                //PEGANDO VALORES ANTES E DEPOIS DA VÍRGULA
                pedido[index] = itens[index].split(',')[0]
                quantidade = itens[index].split(',')[1]

                //VERIFICANDO SE ESTÁ SEM O PEDIDO E SÓ COM A QUANTIDADE
                if (!isNaN(pedido[index])) {
                    quantidade = parseFloat(pedido[index]);
                    pedido = ""
                }

                if (!pedido || pedido === "" || !cardapio.includes(pedido[index])) {
                    return "Item inválido!";
                }
                else if (quantidade < 1) {
                    return "Quantidade inválida!"
                }

                valorTotal = valorTotal + this.somarPedido(pedido[index], quantidade, cardapio)
            }

            if (this.verificarPratos(pedido)) {
                if (valorTotal > 0) {
                    return this.pagamento(metodoDePagamento, valorTotal)
                }
            } else {
                return "Item extra não pode ser pedido sem o principal"
            }
        }
    }

    verificarPratos(itens) {

        let verificacao = false

        //PRATOS EXTRAS E PRATOS PRINCIPAIS
        const verificarItens = [
            { item: 'chantily', requer: 'cafe' },
            { item: 'suco', requer: 'salgado' },
            { item: 'queijo', requer: 'sanduiche' }
        ];

        //VERIFICA SE AS CONDIÇÕES SÃO VERDADEIRAS
        verificacao = verificarItens.every(({ item, requer }) => !itens.includes(item) || itens.includes(requer));

        return verificacao
    }

    somarPedido(pedido, quantidade, cardapio) {

        //DECLARANDO CARDÁPIO E PREÇOS
        var precos = [3.00, 1.50, 6.20, 6.50, 2.00, 7.25, 9.50, 7.50]

        //PEGANDO O VALOR DO PRODUTO DE ACORDO COM O INDEX DELE
        let index = cardapio.indexOf(pedido)
        let precoIndividual = precos[index]

        //CALCULANDO O VALOR TOTAL
        let valor = precoIndividual * quantidade

        return valor
    }

    pagamento(metodoDePagamento, valor) {

        const metodosPagamento = {
            dinheiro: valor => valor - (valor * 0.05), // Desconto de 5%
            credito: valor => valor + (valor * 0.03), // Acréscimo de 3%
            debito: valor => valor //Valor normalizado
        };

        //Analisa o metodo de pagamento recebido com os do objeto
        if (metodoDePagamento in metodosPagamento) {
            //CALCULA O VALOR COM BASE NO MÉTODO DE PAGAMENTO
            const resultadoFinal = metodosPagamento[metodoDePagamento](valor);
            return "R$ " + resultadoFinal.toFixed(2).replace(".", ",");
        } else {
            return "Forma de pagamento inválida!";
        }
    }
}

const resultado = new CaixaDaLanchonete()
            console.log(resultado.calcularValorDaCompra(['chantily,1','cafe,1']))


export { CaixaDaLanchonete };