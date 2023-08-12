class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorTotal = 0
        let pedido = ""
        let quantidade = 0
        const arrayPedidos = []

        const pratos = []


        let resultadoFinal

        //---------------------------------------------- ITENS ----------------------------------------------

        //VERIFICANDO SE HÁ ITENS
        if (!itens || !itens.length) {
            return "Não há itens no carrinho de compra!";
        } else {

            //VERIFICANDO OS EXTRAS E PRINCIPAIS
            for (let index = 0; index < itens.length; index++) {
                arrayPedidos[index] = itens[index].split(',')[0]
            }

                for (let index = 0; index < itens.length; index++) {

                    //PEGANDO VALORES ANTES E DEPOIS DA VÍRGULA
                    pedido = itens[index].split(',')[0]
                    quantidade = itens[index].split(',')[1]

                    if (pedido == null || pedido === "") {
                        return "Item inválido!";
                    }
                    else if (quantidade < 1 || !quantidade) {
                        return "Quantidade inválida!";
                    }

                    valorTotal = valorTotal + somarPedido(pedido, quantidade)
                }

                if (valorTotal > 0) {
                    return pagamento(metodoDePagamento, valorTotal)
                }
        }
    }
}

function somarPedido(pedido, quantidade) {

    //DECLARANDO CARDÁPIO E PREÇOS
    var cardapio = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]
    var precos = [3.00, 1.50, 6.20, 6.50, 2.00, 7.25, 9.50, 7.50]

    //PEGANDO O VALOR DO PRODUTO DE ACORDO COM O INDEX DELE
    let index = cardapio.indexOf(pedido)
    let precoIndividual = precos[index]

    //CALCULANDO O VALOR TOTAL
    let valor = precoIndividual * quantidade

    // console.log("Preço individual: " + precoIndividual)
    // console.log("Quantidade: " + quantidade + "\n-----------------------------------")
    // console.log("Valor: " + valor)
    // console.log("\n")

    return valor
}

function pagamento(metodoDePagamento, valor) {

    let resultadoFinal = 0

    //---------------------------------------------- FORMA DE PAGAMENTO----------------------------------------------
    if (metodoDePagamento == 'dinheiro') {
        //Desconto do pagamento em dinheiro
        resultadoFinal = valor - (valor * (5 / 100))
        return "R$ " + resultadoFinal.toFixed(2).replace(".", ",")
    }
    else if (metodoDePagamento == 'credito') {
        //Acréscimo no pagamento ao débito
        resultadoFinal = valor + (valor * (3 / 100))
        return "R$ " + resultadoFinal.toFixed(2).replace(".", ",")
    }
    else if (metodoDePagamento == 'debito') {
        resultadoFinal = valor
        return "R$ " + resultadoFinal.toFixed(2).replace(".", ",")
    }
    else {
        return "Forma de pagamento inválida!"
    }
}

// const resultado = new CaixaDaLanchonete();

// console.log(
//     resultado.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1']));

export { CaixaDaLanchonete };
