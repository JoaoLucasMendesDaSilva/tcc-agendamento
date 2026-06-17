import BrandLogo from './BrandLogo';

function AuthLayout({ children, mode = 'login' }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Acesso do empreendedor">
        <div className="auth-form-panel">{children}</div>

        <aside className="auth-visual-panel" aria-hidden="true">
          <BrandLogo />
          <div className="calendar-visual">
            <div className="calendar-board">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="clock-face" />
            <div className="plant-shape" />
          </div>
          <div className="auth-visual-copy">
            <h2>
              {mode === 'cadastro'
                ? 'Comece a organizar seus horários'
                : 'Organize seu tempo, encante seus clientes'}
            </h2>
            <p>Agendamentos simples e eficientes para o seu negócio crescer.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default AuthLayout;
