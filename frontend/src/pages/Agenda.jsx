import { useEffect, useState } from 'react';
import {
  atualizarStatusAgendamento,
  cancelarAgendamento,
  listarAgendamentos,
  listarAgendamentosHoje,
} from '../services/agendamentosService';

const STATUS = ['pendente', 'confirmado', 'cancelado', 'concluido'];

function formatarDataHora(valor) {
  const data = new Date(String(valor || '').replace(' ', 'T'));

  if (Number.isNaN(data.getTime())) {
    return valor || 'Data nao informada';
  }

  return data.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function normalizarMensagem(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function Agenda({ navigate }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [carregando, setCarregando] = useState(true);
  const [salvandoId, setSalvandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const erroNormalizado = normalizarMensagem(erro);
  const precisaCadastrarNegocio =
    erroNormalizado.includes('cadastre um negocio') ||
    erroNormalizado.includes('cadastre um neg');

  async function carregarAgendamentos(filtroAtual = filtro) {
    setCarregando(true);
    setErro('');

    try {
      const resposta =
        filtroAtual === 'hoje'
          ? await listarAgendamentosHoje()
          : await listarAgendamentos();

      setAgendamentos(resposta.agendamentos || []);
    } catch (err) {
      setErro(err.message);
      setAgendamentos([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos(filtro);
  }, [filtro]);

  async function alterarStatus(agendamento, status) {
    setErro('');
    setSucesso('');
    setSalvandoId(agendamento.id);

    try {
      const resposta = await atualizarStatusAgendamento(agendamento.id, status);
      setSucesso(resposta.mensagem || 'Status atualizado com sucesso.');
      await carregarAgendamentos(filtro);
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvandoId(null);
    }
  }

  async function cancelar(agendamento) {
    const confirmado = window.confirm(
      `Deseja cancelar o agendamento de ${agendamento.cliente_nome}?`
    );

    if (!confirmado) {
      return;
    }

    setErro('');
    setSucesso('');
    setSalvandoId(agendamento.id);

    try {
      const resposta = await cancelarAgendamento(agendamento.id);
      setSucesso(resposta.mensagem || 'Agendamento cancelado com sucesso.');
      await carregarAgendamentos(filtro);
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvandoId(null);
    }
  }

  return (
    <main className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Painel do empreendedor</p>
          <h1>Agenda</h1>
        </div>

        <button
          className="button button-secondary"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          Voltar
        </button>
      </header>

      <section className="dashboard-panel" aria-labelledby="agenda-title">
        <h2 id="agenda-title">Agendamentos</h2>
        <p className="panel-text">
          Acompanhe os horarios do negocio em uma lista simples.
        </p>

        <div className="filter-row" aria-label="Filtro de agendamentos">
          <button
            className={`button ${
              filtro === 'todos' ? 'button-primary' : 'button-secondary'
            }`}
            onClick={() => setFiltro('todos')}
            type="button"
          >
            Todos
          </button>
          <button
            className={`button ${
              filtro === 'hoje' ? 'button-primary' : 'button-secondary'
            }`}
            onClick={() => setFiltro('hoje')}
            type="button"
          >
            Hoje
          </button>
        </div>

        {carregando && (
          <p className="message message-info" aria-live="polite">
            Carregando agendamentos...
          </p>
        )}

        {!carregando && erro && <p className="message message-error">{erro}</p>}
        {!carregando && sucesso && (
          <p className="message message-success">{sucesso}</p>
        )}

        {!carregando && precisaCadastrarNegocio && (
          <div className="empty-state">
            <p>Cadastre o negocio antes de consultar a agenda.</p>
            <button
              className="button button-primary"
              onClick={() => navigate('/negocio')}
              type="button"
            >
              Cadastrar negocio
            </button>
          </div>
        )}

        {!carregando &&
          !precisaCadastrarNegocio &&
          agendamentos.length === 0 && (
            <p className="panel-text">
              Nenhum agendamento encontrado para este filtro.
            </p>
          )}

        <div className="card-list">
          {agendamentos.map((agendamento) => (
            <article className="item-card" key={agendamento.id}>
              <div className="appointment-heading">
                <div>
                  <h3>{agendamento.cliente_nome}</h3>
                  <p>{formatarDataHora(agendamento.data_hora_inicio)}</p>
                </div>
                <span className={`status-badge status-${agendamento.status}`}>
                  {agendamento.status}
                </span>
              </div>

              <dl className="details-list">
                <div>
                  <dt>Telefone</dt>
                  <dd>{agendamento.cliente_telefone}</dd>
                </div>
                {agendamento.cliente_email && (
                  <div>
                    <dt>E-mail</dt>
                    <dd>{agendamento.cliente_email}</dd>
                  </div>
                )}
                <div>
                  <dt>Servico</dt>
                  <dd>{agendamento.servico_nome}</dd>
                </div>
                <div>
                  <dt>Profissional</dt>
                  <dd>{agendamento.profissional_nome}</dd>
                </div>
                {agendamento.observacoes && (
                  <div>
                    <dt>Observacoes</dt>
                    <dd>{agendamento.observacoes}</dd>
                  </div>
                )}
              </dl>

              <label>
                Status
                <select
                  disabled={salvandoId === agendamento.id}
                  onChange={(event) =>
                    alterarStatus(agendamento, event.target.value)
                  }
                  value={agendamento.status}
                >
                  {STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="button button-danger"
                disabled={salvandoId === agendamento.id}
                onClick={() => cancelar(agendamento)}
                type="button"
              >
                {salvandoId === agendamento.id ? 'Salvando...' : 'Cancelar'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Agenda;
