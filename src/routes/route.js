const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/controller.js');

router.post('/', gastoController.adicionarGasto);
router.get('/', gastoController.listarGastos);
router.get('/:id', gastoController.obterGasto);
router.put('/:id', gastoController.atualizarGasto);
router.delete('/:id', gastoController.excluirGasto);

module.exports = router;
