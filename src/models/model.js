let gastos = [];

class Gasto {
    constructor(id, descricao, valor) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
    }
}

module.exports = {
    Gasto,
    gastos
};
