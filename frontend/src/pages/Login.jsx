import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import BrandLogo from '../components/BrandLogo';
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
    <AuthLayout>
      <section className="auth-panel" aria-labelledby="login-title">
        <BrandLogo />
        <p className="eyebrow">Bem-vindo de volta!</p>
        <h1 id="login-title">Entrar</h1>
        <p className="panel-text">
          Faça login para acessar sua conta.
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
          Não tem uma conta? Cadastre-se
        </button>
      </section>
    </AuthLayout>
  );
}

export default Login;
