const express = require('express');
const profissionaisController = require('../controllers/profissionaisController');
const { autenticarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autenticarToken);

router.get('/', profissionaisController.listar);
router.post('/', profissionaisController.criar);
router.get('/:id', profissionaisController.buscarPorId);
router.put('/:id', profissionaisController.atualizar);
router.delete('/:id', profissionaisController.desativar);

module.exports = router;
