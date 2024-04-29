const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.adicionarGasto = async (req, res) => {
    const { descricao, valor } = req.body;
    try {
        const novoGasto = await prisma.gasto.create({
            data: {
                descricao,
                valor: parseFloat(valor)
            }
        });
        res.status(201).json(novoGasto);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar o gasto', error });
    }
};

exports.listarGastos = async (req, res) => {
    try {
        const gastos = await prisma.gasto.findMany();
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar os gastos', error });
    }
};

exports.obterGasto = async (req, res) => {
    const { id } = req.params;
    try {
        const gasto = await prisma.gasto.findUnique({
            where: { id: parseInt(id) }
        });
        if (gasto) {
            res.json(gasto);
        } else {
            res.status(404).json({ message: 'Gasto não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter o gasto', error });
    }
};

exports.atualizarGasto = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor } = req.body;
    try {
        const gastoAtualizado = await prisma.gasto.update({
            where: { id: parseInt(id) },
            data: {
                descricao,
                valor: parseFloat(valor)
            }
        });
        res.json(gastoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o gasto', error });
    }
};

exports.excluirGasto = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.gasto.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir o gasto', error });
    }
};
