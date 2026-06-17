import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Scissors,
  Store,
  Users,
} from 'lucide-react';
import BrandLogo from './BrandLogo';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', Icon: LayoutDashboard },
  { label: 'Meu Negócio', path: '/negocio', Icon: Store },
  { label: 'Serviços', path: '/servicos', Icon: Scissors },
  { label: 'Profissionais', path: '/profissionais', Icon: Users },
  { label: 'Agenda', path: '/agenda', Icon: CalendarDays },
];

function DashboardShell({
  children,
  currentPath = '/dashboard',
  navigate,
  onLogout,
  usuario,
}) {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <BrandLogo />
        </div>

        <nav className="sidebar-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const Icon = item.Icon;

            return (
              <button
                className={`sidebar-link ${
                  currentPath === item.path ? 'is-active' : ''
                }`}
                key={item.path}
                onClick={() => navigate(item.path)}
                type="button"
              >
                <span className="sidebar-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={2} />
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="sidebar-link sidebar-logout"
          onClick={onLogout}
          type="button"
        >
          <span className="sidebar-icon" aria-hidden="true">
            <LogOut size={19} strokeWidth={2} />
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
