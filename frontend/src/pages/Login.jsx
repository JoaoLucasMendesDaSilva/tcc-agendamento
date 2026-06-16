import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Login({ navigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login({ email, senha });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="page page-center">
      <section className="auth-panel" aria-labelledby="login-title">
        <p className="eyebrow">Area do empreendedor</p>
        <h1 id="login-title">Entrar</h1>
        <p className="panel-text">
          Acesse seu painel para acompanhar o sistema de agendamento.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              autoComplete="email"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>

          <label>
            Senha
            <input
              autoComplete="current-password"
              minLength={8}
              onChange={(event) => setSenha(event.target.value)}
              required
              type="password"
              value={senha}
            />
          </label>

          {erro && <p className="message message-error">{erro}</p>}

          <button className="button button-primary" disabled={carregando} type="submit">
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <button className="button button-link" onClick={() => navigate('/cadastro')} type="button">
          Criar minha conta
        </button>
      </section>
    </main>
  );
}

export default Login;
