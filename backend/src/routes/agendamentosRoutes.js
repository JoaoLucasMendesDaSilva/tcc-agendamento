const express = require('express');
const agendamentosController = require('../controllers/agendamentosController');
const { autenticarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autenticarToken);

router.get('/', agendamentosController.listar);
router.get('/hoje', agendamentosController.listarHoje);
router.get('/:id', agendamentosController.buscarPorId);
router.put('/:id/status', agendamentosController.atualizarStatus);
router.delete('/:id', agendamentosController.cancelar);

module.exports = router;
