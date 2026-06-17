import { useEffect, useMemo, useState } from 'react';
import {
  CalendarX,
  CheckCircle2,
  Scissors,
  Users,
} from 'lucide-react';
import {
  buscarNegocioPublico,
  criarAgendamentoPublico,
  listarHorariosDisponiveis,
  listarProfissionaisPublicos,
  listarServicosPublicos,
} from '../services/publicoService';

const CLIENTE_INICIAL = {
  nome: '',
  telefone: '',
  email: '',
  observacoes: '',
};

const ETAPAS = ['Serviço', 'Profissional', 'Data e hora', 'Dados', 'Confirmação'];

function hojeIso() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarPreco(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  });
}

function formatarHorario(dataHora) {
  return String(dataHora || '').slice(11, 16);
}

function formatarData(dataIso) {
  const [ano, mes, dia] = String(dataIso || '').split('-');

  if (!ano || !mes || !dia) {
    return dataIso || 'Data não informada';
  }

  return `${dia}/${mes}/${ano}`;
}

function formatarCidade(cidade) {
  if (String(cidade || '').trim().toLowerCase() === 'cubatao') {
    return 'Cubatão';
  }

  return cidade || '';
}

function formatarTelefoneCabecalho(telefone) {
  const valor = String(telefone || '').trim();
  const digitos = valor.replace(/\D/g, '');

  if (digitos.length === 11) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }

  if (digitos.length === 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }

  return valor;
}

function AgendamentoPublico({ slugOuId }) {
  const [negocio, setNegocio] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [servicoId, setServicoId] = useState('');
  const [profissionalId, setProfissionalId] = useState('');
  const [data, setData] = useState(hojeIso());
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [cliente, setCliente] = useState(CLIENTE_INICIAL);
  const [resumoConfirmado, setResumoConfirmado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const servicoSelecionado = useMemo(
    () => servicos.find((servico) => String(servico.id) === String(servicoId)),
    [servicoId, servicos]
  );
  const profissionalSelecionado = useMemo(
    () =>
      profissionais.find(
        (profissional) => String(profissional.id) === String(profissionalId)
      ),
    [profissionalId, profissionais]
  );

  const etapaAtual = resumoConfirmado
    ? 5
    : horarioSelecionado
      ? 4
      : servicoId && profissionalId
        ? 3
        : servicoId
          ? 2
          : 1;

  useEffect(() => {
    let ativo = true;

    async function carregarDadosPublicos() {
      setCarregando(true);
      setErro('');

      try {
        const [negocioResposta, servicosResposta, profissionaisResposta] =
          await Promise.all([
            buscarNegocioPublico(slugOuId),
            listarServicosPublicos(slugOuId),
            listarProfissionaisPublicos(slugOuId),
          ]);

        if (ativo) {
          setNegocio(negocioResposta.negocio);
          setServicos(servicosResposta.servicos || []);
          setProfissionais(profissionaisResposta.profissionais || []);
        }
      } catch (err) {
        if (ativo) {
          setErro(err.message);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDadosPublicos();

    return () => {
      ativo = false;
    };
  }, [slugOuId]);

  useEffect(() => {
    let ativo = true;

    async function carregarHorarios() {
      if (!servicoId || !profissionalId || !data) {
        setHorarios([]);
        return;
      }

      setCarregandoHorarios(true);
      setErro('');

      try {
        const resposta = await listarHorariosDisponiveis(slugOuId, {
          data,
          servico_id: servicoId,
          profissional_id: profissionalId,
        });

        if (ativo) {
          setHorarios(resposta.horarios || []);
          setHorarioSelecionado(null);
        }
      } catch (err) {
        if (ativo) {
          setHorarios([]);
          setHorarioSelecionado(null);
          setErro(err.message);
        }
      } finally {
        if (ativo) {
          setCarregandoHorarios(false);
        }
      }
    }

    carregarHorarios();

    return () => {
      ativo = false;
    };
  }, [data, profissionalId, servicoId, slugOuId]);

  function atualizarCliente(campo, valor) {
    setCliente((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function limparConfirmacao() {
    setResumoConfirmado(null);
    setSucesso('');
  }

  function selecionarServico(id) {
    limparConfirmacao();
    setServicoId(id);
    setHorarioSelecionado(null);
  }

  function selecionarProfissional(id) {
    limparConfirmacao();
    setProfissionalId(id);
    setHorarioSelecionado(null);
  }

  function selecionarData(valor) {
    limparConfirmacao();
    setData(valor);
    setHorarioSelecionado(null);
  }

  async function confirmarAgendamento(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');

    if (!horarioSelecionado) {
      setErro('Escolha um horário disponível.');
      return;
    }

    setEnviando(true);

    try {
      const resumo = {
        cliente_nome: cliente.nome,
        cliente_telefone: cliente.telefone,
        cliente_email: cliente.email,
        data,
        horario: formatarHorario(horarioSelecionado.data_hora_inicio),
        profissional: profissionalSelecionado?.nome,
        servico: servicoSelecionado?.nome,
      };
      const resposta = await criarAgendamentoPublico(slugOuId, {
        servico_id: Number(servicoId),
        profissional_id: Number(profissionalId),
        cliente_nome: cliente.nome,
        cliente_telefone: cliente.telefone,
        cliente_email: cliente.email || undefined,
        observacoes: cliente.observacoes || undefined,
        data_hora_inicio: horarioSelecionado.data_hora_inicio,
      });

      setSucesso(
        resposta.mensagem ||
          'Agendamento confirmado. Anote o dia e horário escolhidos.'
      );
      setResumoConfirmado(resumo);
      setCliente(CLIENTE_INICIAL);
      setHorarioSelecionado(null);
      const horariosResposta = await listarHorariosDisponiveis(slugOuId, {
        data,
        servico_id: servicoId,
        profissional_id: profissionalId,
      });
      setHorarios(horariosResposta.horarios || []);
    } catch (err) {
      setErro(
        err.message.includes('indispon') || err.message.includes('conflito')
          ? 'Este horário ficou indisponível. Escolha outro horário.'
          : err.message
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <main className="page public-booking-page">
        <section className="public-booking-card" aria-live="polite">
          <div className="public-booking-header">
            <p className="eyebrow">Agendamento online</p>
            <h1>Carregando negócio</h1>
            <p>Preparando os horários disponíveis.</p>
          </div>
        </section>
      </main>
    );
  }

  if (erro && !negocio) {
    return (
      <main className="page public-booking-page">
        <section className="public-booking-card">
          <div className="public-booking-header">
            <p className="eyebrow">Agendamento online</p>
            <h1>Não foi possível carregar</h1>
            <p>Verifique o link de agendamento e tente novamente.</p>
          </div>
          <div className="public-booking-content">
            <p className="message message-error">{erro}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page public-booking-page">
      <section className="public-booking-card">
        <header className="public-booking-header">
          <p className="eyebrow">Agendamento online</p>
          <h1>{negocio?.nome}</h1>
          <p>Agende seu horário de forma rápida e fácil.</p>
          {(negocio?.cidade || negocio?.telefone) && (
            <span>
              {formatarCidade(negocio?.cidade)}
              {negocio?.telefone
                ? ` • ${formatarTelefoneCabecalho(negocio.telefone)}`
                : ''}
            </span>
          )}
        </header>

        <div className="booking-steps" aria-label="Etapas do agendamento">
          {ETAPAS.map((etapa, index) => {
            const numero = index + 1;
            const ativo = numero === etapaAtual;
            const concluido = numero < etapaAtual;

            return (
              <div
                className={`booking-step ${ativo ? 'is-active' : ''} ${
                  concluido ? 'is-complete' : ''
                }`}
                key={etapa}
              >
                <span>{numero}</span>
                <strong>{etapa}</strong>
              </div>
            );
          })}
        </div>

        <div className="public-booking-content">
          {erro && <p className="message message-error">{erro}</p>}

          {resumoConfirmado && (
            <section
              className="booking-section confirmation-card"
              aria-labelledby="confirmacao-title"
            >
              <span className="confirmation-icon" aria-hidden="true">
                <CheckCircle2 size={24} strokeWidth={2} />
              </span>
              <div>
                <p className="step-label">Confirmação</p>
                <h2 id="confirmacao-title">Agendamento confirmado</h2>
                {sucesso && <p className="panel-text">{sucesso}</p>}
              </div>

              <dl className="details-list booking-summary">
                <div>
                  <dt>Cliente</dt>
                  <dd>{resumoConfirmado.cliente_nome}</dd>
                </div>
                <div>
                  <dt>Telefone</dt>
                  <dd>{resumoConfirmado.cliente_telefone}</dd>
                </div>
                {resumoConfirmado.cliente_email && (
                  <div>
                    <dt>E-mail</dt>
                    <dd>{resumoConfirmado.cliente_email}</dd>
                  </div>
                )}
                <div>
                  <dt>Serviço</dt>
                  <dd>{resumoConfirmado.servico}</dd>
                </div>
                <div>
                  <dt>Profissional</dt>
                  <dd>{resumoConfirmado.profissional}</dd>
                </div>
                <div>
                  <dt>Data e horário</dt>
                  <dd>
                    {formatarData(resumoConfirmado.data)} às{' '}
                    {resumoConfirmado.horario}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          <section className="booking-section" aria-labelledby="servico-title">
            <p className="step-label">Serviço</p>
            <h2 id="servico-title">Escolha o serviço</h2>

            {servicos.length === 0 && (
              <div className="dashboard-empty">
                <span className="empty-icon" aria-hidden="true">
                  <Scissors size={24} strokeWidth={2} />
                </span>
                <div>
                  <strong>Nenhum serviço disponível</strong>
                  <p>Este negócio ainda não possui serviços para agendamento.</p>
                </div>
              </div>
            )}

            <div className="choice-list">
              {servicos.map((servico) => (
                <button
                  className={`choice-card booking-choice ${
                    String(servico.id) === String(servicoId) ? 'is-selected' : ''
                  }`}
                  key={servico.id}
                  onClick={() => selecionarServico(String(servico.id))}
                  type="button"
                >
                  <strong>{servico.nome}</strong>
                  <span>{servico.descricao || 'Serviço do estabelecimento'}</span>
                  <div className="choice-meta">
                    <span>{servico.duracao_minutos} min</span>
                    <span>{formatarPreco(servico.preco)}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {servicoId && (
            <section
              className="booking-section"
              aria-labelledby="profissional-title"
            >
              <p className="step-label">Profissional</p>
              <h2 id="profissional-title">Escolha o profissional</h2>

              {profissionais.length === 0 && (
                <div className="dashboard-empty">
                  <span className="empty-icon" aria-hidden="true">
                    <Users size={24} strokeWidth={2} />
                  </span>
                  <div>
                    <strong>Nenhum profissional disponível</strong>
                    <p>Este negócio ainda não possui profissionais ativos.</p>
                  </div>
                </div>
              )}

              <div className="choice-list">
                {profissionais.map((profissional) => (
                  <button
                    className={`choice-card booking-choice professional-choice ${
                      String(profissional.id) === String(profissionalId)
                        ? 'is-selected'
                        : ''
                    }`}
                    key={profissional.id}
                    onClick={() =>
                      selecionarProfissional(String(profissional.id))
                    }
                    type="button"
                  >
                    <span className="entity-avatar" aria-hidden="true">
                      {profissional.nome?.charAt(0)?.toUpperCase() || 'P'}
                    </span>
                    <span>
                      <strong>{profissional.nome}</strong>
                      {profissional.especialidade && (
                        <small>{profissional.especialidade}</small>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {servicoId && profissionalId && (
            <section className="booking-section" aria-labelledby="data-title">
              <p className="step-label">Data e hora</p>
              <h2 id="data-title">Escolha a data</h2>

              <label>
                Data do agendamento
                <input
                  min={hojeIso()}
                  onChange={(event) => selecionarData(event.target.value)}
                  required
                  type="date"
                  value={data}
                />
              </label>
            </section>
          )}

          {servicoId && profissionalId && data && (
            <section className="booking-section" aria-labelledby="horario-title">
              <p className="step-label">Horários disponíveis</p>
              <h2 id="horario-title">Escolha o horário</h2>

              {carregandoHorarios && (
                <p className="message message-info">Carregando horários...</p>
              )}

              {!carregandoHorarios && horarios.length === 0 && (
                <div className="dashboard-empty">
                  <span className="empty-icon" aria-hidden="true">
                    <CalendarX size={24} strokeWidth={2} />
                  </span>
                  <div>
                    <strong>Nenhum horário disponível</strong>
                    <p>Escolha outra data para consultar novos horários.</p>
                  </div>
                </div>
              )}

              <div className="time-grid">
                {horarios.map((horario) => (
                  <button
                    className={`time-button ${
                      horarioSelecionado?.data_hora_inicio ===
                      horario.data_hora_inicio
                        ? 'is-selected'
                        : ''
                    }`}
                    key={horario.data_hora_inicio}
                    onClick={() => {
                      limparConfirmacao();
                      setHorarioSelecionado(horario);
                    }}
                    type="button"
                  >
                    {formatarHorario(horario.data_hora_inicio)}
                  </button>
                ))}
              </div>
            </section>
          )}

          {horarioSelecionado && (
            <section className="booking-section" aria-labelledby="cliente-title">
              <p className="step-label">Dados</p>
              <h2 id="cliente-title">Informe seus dados</h2>

              <form className="form" onSubmit={confirmarAgendamento}>
                <div className="form-grid">
                  <label>
                    Nome
                    <input
                      autoComplete="name"
                      onChange={(event) =>
                        atualizarCliente('nome', event.target.value)
                      }
                      required
                      type="text"
                      value={cliente.nome}
                    />
                  </label>

                  <label>
                    Telefone
                    <input
                      autoComplete="tel"
                      inputMode="tel"
                      onChange={(event) =>
                        atualizarCliente('telefone', event.target.value)
                      }
                      required
                      type="tel"
                      value={cliente.telefone}
                    />
                  </label>
                </div>

                <label>
                  E-mail opcional
                  <input
                    autoComplete="email"
                    inputMode="email"
                    onChange={(event) =>
                      atualizarCliente('email', event.target.value)
                    }
                    type="email"
                    value={cliente.email}
                  />
                </label>

                <label>
                  Observações opcionais
                  <textarea
                    onChange={(event) =>
                      atualizarCliente('observacoes', event.target.value)
                    }
                    rows="3"
                    value={cliente.observacoes}
                  />
                </label>

                <div className="booking-review-card">
                  <p className="step-label">Confirmação</p>
                  <h3>Resumo do agendamento</h3>
                  <dl className="details-list booking-summary">
                    <div>
                      <dt>Serviço</dt>
                      <dd>{servicoSelecionado?.nome}</dd>
                    </div>
                    <div>
                      <dt>Profissional</dt>
                      <dd>{profissionalSelecionado?.nome}</dd>
                    </div>
                    <div>
                      <dt>Data e horário</dt>
                      <dd>
                        {formatarData(data)} às{' '}
                        {formatarHorario(horarioSelecionado.data_hora_inicio)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  className="button button-primary"
                  disabled={enviando}
                  type="submit"
                >
                  {enviando ? 'Confirmando...' : 'Confirmar agendamento'}
                </button>
              </form>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default AgendamentoPublico;
