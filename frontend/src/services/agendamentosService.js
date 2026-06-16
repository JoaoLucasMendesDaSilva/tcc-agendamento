import { request } from './api';

function listarAgendamentos() {
  return request('/api/agendamentos');
}

function listarAgendamentosHoje() {
  return request('/api/agendamentos/hoje');
}

function buscarAgendamento(id) {
  return request(`/api/agendamentos/${id}`);
}

function atualizarStatusAgendamento(id, status) {
  return request(`/api/agendamentos/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

function cancelarAgendamento(id) {
  return request(`/api/agendamentos/${id}`, {
    method: 'DELETE',
  });
}

export {
  atualizarStatusAgendamento,
  buscarAgendamento,
  cancelarAgendamento,
  listarAgendamentos,
  listarAgendamentosHoje,
};
