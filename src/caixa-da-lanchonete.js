class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorTotal = 0
        let pedido = []
        let quantidade = 0
        const arrayPedidos = []

        const pratos = []

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
                arrayPedidos[index] = itens[index].split(',')[0]
            }

            for (let index = 0; index < itens.length; index++) {

                //PEGANDO VALORES ANTES E DEPOIS DA VÍRGULA
                pedido[index] = itens[index].split(',')[0]
                quantidade = itens[index].split(',')[1]


                //VERIFICANDO SE ESTÁ SEM O PEDIDO E SÓ COM A QUANTIDADE
                if (!isNaN(pedido[index])) {
                    quantidade = parseFloat(pedido[index]);
                    pedido = ""
                }

                //console.log("\nItens"+itens)
                // console.log("\nmETODO"+metodoDePagamento)


                if (!pedido || pedido === "" || !["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"].includes(pedido[index])) {
                    return "Item inválido!";
                }

                else if (quantidade < 1) {
                    return "Quantidade inválida!"
                }

                valorTotal = valorTotal + somarPedido(pedido[index], quantidade)
            }

            if (verificarPratos(pedido)) {
                if (valorTotal > 0) {
                    return pagamento(metodoDePagamento, valorTotal)
                }
            } else {
                return "Item extra não pode ser pedido sem o principal"
            }
        }
    }
}

function verificarPratos(itens) {

    let verificacao = true

    if (itens.includes('chantily') == true && itens.includes('cafe') == false) {
        verificacao = false
    }

    if (itens.includes('suco') == true && itens.includes('salgado') == false) {
        verificacao = false
    }

    if (itens.includes('queijo') == true && itens.includes('sanduiche') == false) {
        verificacao = false
    }

    return verificacao
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

const resultado = new CaixaDaLanchonete();

console.log(
    resultado.calcularValorDaCompra(['pizza, 1']));

export { CaixaDaLanchonete };