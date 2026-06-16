const {
  atualizarStatusAgendamento,
  buscarAgendamentoPorId,
  cancelarAgendamento,
  listarAgendamentos,
  listarAgendamentosHoje,
} = require('../services/agendamentosService');

async function listar(req, res, next) {
  try {
    const agendamentos = await listarAgendamentos(req.usuario.id);

    res.json({
      agendamentos,
    });
  } catch (err) {
    next(err);
  }
}

async function listarHoje(req, res, next) {
  try {
    const agendamentos = await listarAgendamentosHoje(req.usuario.id);

    res.json({
      agendamentos,
    });
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const agendamento = await buscarAgendamentoPorId(
      req.usuario.id,
      req.params.id
    );

    res.json({
      agendamento,
    });
  } catch (err) {
    next(err);
  }
}

async function atualizarStatus(req, res, next) {
  try {
    const agendamento = await atualizarStatusAgendamento(
      req.usuario.id,
      req.params.id,
      req.body
    );

    res.json({
      mensagem: 'Status do agendamento atualizado com sucesso.',
      agendamento,
    });
  } catch (err) {
    next(err);
  }
}

async function cancelar(req, res, next) {
  try {
    await cancelarAgendamento(req.usuario.id, req.params.id);

    res.json({
      mensagem: 'Agendamento cancelado com sucesso.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  atualizarStatus,
  buscarPorId,
  cancelar,
  listar,
  listarHoje,
};
