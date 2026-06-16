import { useEffect, useState } from 'react';
import {
  atualizarServico,
  criarServico,
  desativarServico,
  listarServicos,
} from '../services/servicosService';

const FORM_INICIAL = {
  nome: '',
  descricao: '',
  duracao_minutos: '30',
  preco: '0.00',
};

function montarForm(servico) {
  if (!servico) {
    return FORM_INICIAL;
  }

  return {
    nome: servico.nome || '',
    descricao: servico.descricao || '',
    duracao_minutos: String(servico.duracao_minutos || ''),
    preco: Number(servico.preco || 0).toFixed(2),
  };
}

function montarPayload(form) {
  return {
    nome: form.nome,
    descricao: form.descricao,
    duracao_minutos: Number(form.duracao_minutos),
    preco: Number(form.preco),
  };
}

function formatarPreco(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  });
}

function normalizarMensagem(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function Servicos({ navigate }) {
  const [servicos, setServicos] = useState([]);
  const [servicoEditando, setServicoEditando] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const erroNormalizado = normalizarMensagem(erro);
  const precisaCadastrarNegocio =
    erroNormalizado.includes('cadastre um negocio') ||
    erroNormalizado.includes('cadastre um neg');

  async function carregarServicos() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await listarServicos();
      setServicos(resposta.servicos || []);
    } catch (err) {
      setErro(err.message);
      setServicos([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function iniciarEdicao(servico) {
    setServicoEditando(servico);
    setForm(montarForm(servico));
    setErro('');
    setSucesso('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicao() {
    setServicoEditando(null);
    setForm(FORM_INICIAL);
    setErro('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setSucesso('');
    setSalvando(true);

    try {
      const payload = montarPayload(form);
      const resposta = servicoEditando
        ? await atualizarServico(servicoEditando.id, payload)
        : await criarServico(payload);

      setSucesso(resposta.mensagem || 'Servico salvo com sucesso.');
      setServicoEditando(null);
      setForm(FORM_INICIAL);
      await carregarServicos();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleDesativar(servico) {
    const confirmado = window.confirm(
      `Deseja desativar o servico "${servico.nome}"?`
    );

    if (!confirmado) {
      return;
    }

    setErro('');
    setSucesso('');

    try {
      const resposta = await desativarServico(servico.id);
      setSucesso(resposta.mensagem || 'Servico desativado com sucesso.');

      if (servicoEditando?.id === servico.id) {
        cancelarEdicao();
      }

      await carregarServicos();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Painel do empreendedor</p>
          <h1>Servicos</h1>
        </div>

        <button
          className="button button-secondary"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          Voltar
        </button>
      </header>

      <section className="dashboard-panel" aria-labelledby="servicos-form-title">
        <h2 id="servicos-form-title">
          {servicoEditando ? 'Editar servico' : 'Novo servico'}
        </h2>
        <p className="panel-text">
          Cadastre os servicos que os clientes poderao agendar.
        </p>

        {carregando && (
          <p className="message message-info" aria-live="polite">
            Carregando servicos...
          </p>
        )}

        {!carregando && erro && <p className="message message-error">{erro}</p>}
        {!carregando && sucesso && (
          <p className="message message-success">{sucesso}</p>
        )}

        {!carregando && precisaCadastrarNegocio && (
          <div className="empty-state">
            <p>Cadastre o negocio antes de adicionar servicos.</p>
            <button
              className="button button-primary"
              onClick={() => navigate('/negocio')}
              type="button"
            >
              Cadastrar negocio
            </button>
          </div>
        )}

        {!carregando && !precisaCadastrarNegocio && (
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome do servico
              <input
                onChange={(event) => atualizarCampo('nome', event.target.value)}
                required
                type="text"
                value={form.nome}
              />
            </label>

            <label>
              Descricao
              <textarea
                onChange={(event) =>
                  atualizarCampo('descricao', event.target.value)
                }
                rows="3"
                value={form.descricao}
              />
            </label>

            <div className="form-grid">
              <label>
                Duracao em minutos
                <input
                  min="1"
                  onChange={(event) =>
                    atualizarCampo('duracao_minutos', event.target.value)
                  }
                  required
                  type="number"
                  value={form.duracao_minutos}
                />
              </label>

              <label>
                Preco
                <input
                  min="0"
                  onChange={(event) => atualizarCampo('preco', event.target.value)}
                  required
                  step="0.01"
                  type="number"
                  value={form.preco}
                />
              </label>
            </div>

            <div className="button-row">
              <button
                className="button button-primary"
                disabled={salvando}
                type="submit"
              >
                {salvando ? 'Salvando...' : 'Salvar servico'}
              </button>

              {servicoEditando && (
                <button
                  className="button button-secondary"
                  onClick={cancelarEdicao}
                  type="button"
                >
                  Cancelar edicao
                </button>
              )}
            </div>
          </form>
        )}
      </section>

      <section className="dashboard-panel" aria-labelledby="servicos-list-title">
        <h2 id="servicos-list-title">Servicos cadastrados</h2>

        {!carregando && !precisaCadastrarNegocio && servicos.length === 0 && (
          <p className="panel-text">Nenhum servico cadastrado ainda.</p>
        )}

        <div className="card-list">
          {servicos.map((servico) => (
            <article className="item-card" key={servico.id}>
              <div>
                <h3>{servico.nome}</h3>
                {servico.descricao && <p>{servico.descricao}</p>}
              </div>

              <dl className="meta-list">
                <div>
                  <dt>Duracao</dt>
                  <dd>{servico.duracao_minutos} min</dd>
                </div>
                <div>
                  <dt>Preco</dt>
                  <dd>{formatarPreco(servico.preco)}</dd>
                </div>
              </dl>

              <div className="button-row">
                <button
                  className="button button-secondary"
                  onClick={() => iniciarEdicao(servico)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  className="button button-danger"
                  onClick={() => handleDesativar(servico)}
                  type="button"
                >
                  Desativar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Servicos;
