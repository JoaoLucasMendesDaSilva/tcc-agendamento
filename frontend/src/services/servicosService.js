import { request } from './api';

function listarServicos() {
  return request('/api/servicos');
}

function criarServico(dados) {
  return request('/api/servicos', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

function atualizarServico(id, dados) {
  return request(`/api/servicos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

function desativarServico(id) {
  return request(`/api/servicos/${id}`, {
    method: 'DELETE',
  });
}

export { atualizarServico, criarServico, desativarServico, listarServicos };
