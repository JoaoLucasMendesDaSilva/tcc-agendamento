import { request } from './api';

function listarProfissionais() {
  return request('/api/profissionais');
}

function criarProfissional(dados) {
  return request('/api/profissionais', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

function atualizarProfissional(id, dados) {
  return request(`/api/profissionais/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

function desativarProfissional(id) {
  return request(`/api/profissionais/${id}`, {
    method: 'DELETE',
  });
}

export {
  atualizarProfissional,
  criarProfissional,
  desativarProfissional,
  listarProfissionais,
};
