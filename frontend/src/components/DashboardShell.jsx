import BrandLogo from './BrandLogo';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'D' },
  { label: 'Meu Negócio', path: '/negocio', icon: 'N' },
  { label: 'Serviços', path: '/servicos', icon: 'S' },
  { label: 'Profissionais', path: '/profissionais', icon: 'P' },
  { label: 'Agenda', path: '/agenda', icon: 'A' },
];

function DashboardShell({ children, currentPath = '/dashboard', navigate, onLogout, usuario }) {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <BrandLogo />
        </div>

        <nav className="sidebar-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <button
              className={`sidebar-link ${
                currentPath === item.path ? 'is-active' : ''
              }`}
              key={item.path}
              onClick={() => navigate(item.path)}
              type="button"
            >
              <span className="sidebar-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="sidebar-link sidebar-logout" onClick={onLogout} type="button">
          <span className="sidebar-icon" aria-hidden="true">
            X
          </span>
          Sair
        </button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" type="button" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
          <div className="topbar-user">
            <span className="notification-dot" aria-hidden="true" />
            <span className="avatar" aria-hidden="true">
              {usuario?.nome?.charAt(0)?.toUpperCase() || 'U'}
            </span>
            <div>
              <strong>{usuario?.nome || 'Usuário'}</strong>
              <small>Empreendedor</small>
            </div>
          </div>
        </header>

        <div className="workspace-content">{children}</div>
      </section>
    </main>
  );
}

export default DashboardShell;
