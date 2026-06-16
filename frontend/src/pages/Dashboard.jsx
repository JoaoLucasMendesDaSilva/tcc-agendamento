import { useAuth } from '../contexts/AuthContext';

function Dashboard({ navigate }) {
  const { logout, usuario } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <main className="page dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Painel do empreendedor</p>
          <h1>Ola, {usuario?.nome}</h1>
        </div>

        <button className="button button-secondary" onClick={handleLogout} type="button">
          Sair
        </button>
      </header>

      <section className="dashboard-panel" aria-labelledby="dashboard-title">
        <h2 id="dashboard-title">MVP em construcao</h2>
        <p>
          Sua sessao esta ativa. As proximas etapas vao adicionar cadastro do
          negocio, servicos, profissionais e agenda.
        </p>

        <div className="action-list">
          <button
            className="button button-primary"
            onClick={() => navigate('/negocio')}
            type="button"
          >
            Meu negocio
          </button>

          <button
            className="button button-secondary"
            onClick={() => navigate('/servicos')}
            type="button"
          >
            Servicos
          </button>

          <button
            className="button button-secondary"
            onClick={() => navigate('/profissionais')}
            type="button"
          >
            Profissionais
          </button>

          <button
            className="button button-secondary"
            onClick={() => navigate('/agenda')}
            type="button"
          >
            Agenda
          </button>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
