const {
  atualizarProfissional,
  buscarProfissionalPorId,
  criarProfissional,
  desativarProfissional,
  listarProfissionais,
} = require('../services/profissionaisService');

async function listar(req, res, next) {
  try {
    const profissionais = await listarProfissionais(req.usuario.id);

    res.json({
      profissionais,
    });
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const profissional = await buscarProfissionalPorId(
      req.usuario.id,
      req.params.id
    );

    res.json({
      profissional,
    });
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const profissional = await criarProfissional(req.usuario.id, req.body);

    res.status(201).json({
      mensagem: 'Profissional cadastrado com sucesso.',
      profissional,
    });
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const profissional = await atualizarProfissional(
      req.usuario.id,
      req.params.id,
      req.body
    );

    res.json({
      mensagem: 'Profissional atualizado com sucesso.',
      profissional,
    });
  } catch (err) {
    next(err);
  }
}

async function desativar(req, res, next) {
  try {
    await desativarProfissional(req.usuario.id, req.params.id);

    res.json({
      mensagem: 'Profissional desativado com sucesso.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  atualizar,
  buscarPorId,
  criar,
  desativar,
  listar,
};
