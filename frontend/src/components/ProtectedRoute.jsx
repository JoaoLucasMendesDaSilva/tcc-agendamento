import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, navigate }) {
  const { carregandoSessao, usuario } = useAuth();

  useEffect(() => {
    if (!carregandoSessao && !usuario) {
      navigate('/login', { replace: true });
    }
  }, [carregandoSessao, navigate, usuario]);

  if (carregandoSessao) {
    return (
      <main className="page page-center">
        <section className="auth-panel" aria-live="polite">
          <p className="eyebrow">Carregando</p>
          <h1>Validando sessao</h1>
        </section>
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
