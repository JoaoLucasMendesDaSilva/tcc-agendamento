import { Home, LayoutDashboard, SearchX } from 'lucide-react';
import { getToken } from '../services/api';

function NotFound({ navigate }) {
  const usuarioAutenticado = Boolean(getToken());
  const destino = usuarioAutenticado ? '/dashboard' : '/';

  return (
    <main className="system-state-page">
      <section className="system-state-card">
        <span className="system-state-icon" aria-hidden="true">
          <SearchX size={30} strokeWidth={2} />
        </span>
        <p className="eyebrow">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p>
          O endereço pode estar incorreto ou esta página não está mais
          disponível.
        </p>
        <button
          className="button button-primary"
          onClick={() => navigate(destino, { replace: true })}
          type="button"
        >
          {usuarioAutenticado ? (
            <LayoutDashboard aria-hidden="true" size={18} strokeWidth={2} />
          ) : (
            <Home aria-hidden="true" size={18} strokeWidth={2} />
          )}
          {usuarioAutenticado ? 'Voltar ao Dashboard' : 'Voltar ao início'}
        </button>
      </section>
    </main>
  );
}

export default NotFound;
