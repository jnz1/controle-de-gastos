const { Gasto, gastos } = require('../models/model.js');


exports.adicionarGasto = (req, res) => {
    const { descricao, valor } = req.body;
    if (!descricao || !valor) {
        return res.status(400).json({ message: 'Descrição e valor são obrigatórios.' });
    }
    const novoGasto = new Gasto(gastos.length + 1, descricao, valor);
    gastos.push(novoGasto);
    res.status(201).json(novoGasto);
};


exports.listarGastos = (req, res) => {
    res.json(gastos);
};

exports.obterGasto = (req, res) => {
    const id = parseInt(req.params.id);
    const gasto = gastos.find(g => g.id === id);
    if (gasto) {
        res.json(gasto);
    } else {
        res.status(404).json({ message: 'Gasto não encontrado.' });
    }
};


exports.atualizarGasto = (req, res) => {
    const id = parseInt(req.params.id);
    const gastoIndex = gastos.findIndex(g => g.id === id);
    if (gastoIndex !== -1) {
        const { descricao, valor } = req.body;
        if (!descricao || !valor) {
            return res.status(400).json({ message: 'Descrição e valor são obrigatórios.' });
        }
        gastos[gastoIndex] = { id, descricao, valor };
        res.json(gastos[gastoIndex]);
    } else {
        res.status(404).json({ message: 'Gasto não encontrado.' });
    }
};


exports.excluirGasto = (req, res) => {
    const id = parseInt(req.params.id);
    const gastoIndex = gastos.findIndex(g => g.id === id);
    if (gastoIndex !== -1) {
        gastos.splice(gastoIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Gasto não encontrado.' });
    }
};
