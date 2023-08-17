import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    const validacaoVerificarPratos = (resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .verificarPratos(itens);

        console.log(expect(resultado).toEqual(resultadoEsperado));
    };

    const validacaoSomarPedido = (resultadoEsperado, pedido, quantidade, cardapio) => {
        const resultado = new CaixaDaLanchonete()
            .somarPedido(pedido, quantidade, cardapio);

        console.log(expect(resultado).toEqual(resultadoEsperado));
    };

    const validacaoPagamento = (resultadoEsperado, metodoDePagamento, valor) => {
        const resultado = new CaixaDaLanchonete()
            .pagamento(metodoDePagamento, valor);

        console.log(expect(resultado).toEqual(resultadoEsperado));
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['prato extra (chantily), não pode ser feita sem seu pedido principal (café)', false, ['chantily']],
        ['prato principal (café) pode ser feita individualmente', true, ['cafe']],
        ['prato extra (queijo), não pode ser feita sem seu pedido principal (sanduíche), mesmo tendo outro prato principal (café)', false, ['cafe', 'queijo']],
        ['prato principal (café) pode ser feita individualmente juntamente a outro prato principal (sanduiche)', true, ['cafe', 'sanduiche']],
    ])('a compra do %p, assim deve resultar em %p', (_, resultadoEsperado, itens) =>
        validacaoVerificarPratos(resultadoEsperado, itens));

    test.each([
        [4.50, 'chantily', 3, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [6.00, 'cafe', 2, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [13.00, 'sanduiche', 2, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [18.60, 'suco', 3, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [0.00, 'queijo', 0, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [2.00, 'queijo', 1, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [21.75, 'salgado', 3, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [9.50, 'combo1', 1, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
        [22.50, 'combo2', 3, ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"]],
    ])('deve resultar em %p a compra do %p x %p',
        (resultadoEsperado, pedido, quantidade, cardapio) =>
            validacaoSomarPedido(resultadoEsperado, pedido, quantidade, cardapio));


    test.each([
        ["R$ 950,00", 'dinheiro', 1000],
        ["R$ 0,00", 'dinheiro', 0],
        ["R$ 572,68", 'credito', 556],
        ["R$ 0,00", 'credito', 0],
        ["R$ 600,00", 'debito', 600],
        ["R$ 0,00", 'debito', 0],
        ["Forma de pagamento inválida!", 'um metodo inválido', 600],
        ["R$ 0,00", 'dinheiro', "sem valor"],

    ])('o resultado deve ser %p, para o pagamento em %p de R$ %p', (resultadoEsperado, metodoDePagamento, valor) =>
        validacaoPagamento(resultadoEsperado, metodoDePagamento, valor));
});