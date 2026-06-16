import { useEffect, useState } from 'react';
import {
  atualizarProfissional,
  criarProfissional,
  desativarProfissional,
  listarProfissionais,
} from '../services/profissionaisService';

const FORM_INICIAL = {
  nome: '',
  especialidade: '',
  telefone: '',
  email: '',
};

function montarForm(profissional) {
  if (!profissional) {
    return FORM_INICIAL;
  }

  return {
    nome: profissional.nome || '',
    especialidade: profissional.especialidade || '',
    telefone: profissional.telefone || '',
    email: profissional.email || '',
  };
}

function montarPayload(form) {
  return {
    nome: form.nome,
    especialidade: form.especialidade,
    telefone: form.telefone,
    email: form.email,
  };
}

function normalizarMensagem(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function Profissionais({ navigate }) {
  const [profissionais, setProfissionais] = useState([]);
  const [profissionalEditando, setProfissionalEditando] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const erroNormalizado = normalizarMensagem(erro);
  const precisaCadastrarNegocio =
    erroNormalizado.includes('cadastre um negocio') ||
    erroNormalizado.includes('cadastre um neg');

  async function carregarProfissionais() {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await listarProfissionais();
      setProfissionais(resposta.profissionais || []);
    } catch (err) {
      setErro(err.message);
      setProfissionais([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProfissionais();
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function iniciarEdicao(profissional) {
    setProfissionalEditando(profissional);
    setForm(montarForm(profissional));
    setErro('');
    setSucesso('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicao() {
    setProfissionalEditando(null);
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
      const resposta = profissionalEditando
        ? await atualizarProfissional(profissionalEditando.id, payload)
        : await criarProfissional(payload);

      setSucesso(resposta.mensagem || 'Profissional salvo com sucesso.');
      setProfissionalEditando(null);
      setForm(FORM_INICIAL);
      await carregarProfissionais();
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleDesativar(profissional) {
    const confirmado = window.confirm(
      `Deseja desativar o profissional "${profissional.nome}"?`
    );

    if (!confirmado) {
      return;
    }

    setErro('');
    setSucesso('');

    try {
      const resposta = await desativarProfissional(profissional.id);
      setSucesso(resposta.mensagem || 'Profissional desativado com sucesso.');

      if (profissionalEditando?.id === profissional.id) {
        cancelarEdicao();
      }

      await carregarProfissionais();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <main className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Painel do empreendedor</p>
          <h1>Profissionais</h1>
        </div>

        <button
          className="button button-secondary"
          onClick={() => navigate('/dashboard')}
          type="button"
        >
          Voltar
        </button>
      </header>

      <section className="dashboard-panel" aria-labelledby="profissionais-form-title">
        <h2 id="profissionais-form-title">
          {profissionalEditando ? 'Editar profissional' : 'Novo profissional'}
        </h2>
        <p className="panel-text">
          Cadastre quem podera atender os agendamentos do negocio.
        </p>

        {carregando && (
          <p className="message message-info" aria-live="polite">
            Carregando profissionais...
          </p>
        )}

        {!carregando && erro && <p className="message message-error">{erro}</p>}
        {!carregando && sucesso && (
          <p className="message message-success">{sucesso}</p>
        )}

        {!carregando && precisaCadastrarNegocio && (
          <div className="empty-state">
            <p>Cadastre o negocio antes de adicionar profissionais.</p>
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
              Nome do profissional
              <input
                onChange={(event) => atualizarCampo('nome', event.target.value)}
                required
                type="text"
                value={form.nome}
              />
            </label>

            <label>
              Especialidade
              <input
                onChange={(event) =>
                  atualizarCampo('especialidade', event.target.value)
                }
                type="text"
                value={form.especialidade}
              />
            </label>

            <div className="form-grid">
              <label>
                Telefone
                <input
                  inputMode="tel"
                  onChange={(event) =>
                    atualizarCampo('telefone', event.target.value)
                  }
                  type="tel"
                  value={form.telefone}
                />
              </label>

              <label>
                E-mail
                <input
                  inputMode="email"
                  onChange={(event) =>
                    atualizarCampo('email', event.target.value)
                  }
                  type="email"
                  value={form.email}
                />
              </label>
            </div>

            <div className="button-row">
              <button
                className="button button-primary"
                disabled={salvando}
                type="submit"
              >
                {salvando ? 'Salvando...' : 'Salvar profissional'}
              </button>

              {profissionalEditando && (
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

      <section
        className="dashboard-panel"
        aria-labelledby="profissionais-list-title"
      >
        <h2 id="profissionais-list-title">Profissionais cadastrados</h2>

        {!carregando &&
          !precisaCadastrarNegocio &&
          profissionais.length === 0 && (
            <p className="panel-text">Nenhum profissional cadastrado ainda.</p>
          )}

        <div className="card-list">
          {profissionais.map((profissional) => (
            <article className="item-card" key={profissional.id}>
              <div>
                <h3>{profissional.nome}</h3>
                {profissional.especialidade && (
                  <p>{profissional.especialidade}</p>
                )}
              </div>

              <dl className="meta-list">
                <div>
                  <dt>Telefone</dt>
                  <dd>{profissional.telefone || 'Nao informado'}</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>{profissional.email || 'Nao informado'}</dd>
                </div>
              </dl>

              <div className="button-row">
                <button
                  className="button button-secondary"
                  onClick={() => iniciarEdicao(profissional)}
                  type="button"
                >
                  Editar
                </button>
                <button
                  className="button button-danger"
                  onClick={() => handleDesativar(profissional)}
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

export default Profissionais;
