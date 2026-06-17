import authIllustration from '../assets/auth-illustration.png';
import BrandLogo from './BrandLogo';

function AuthLayout({ children, mode = 'login' }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Acesso do empreendedor">
        <div className="auth-form-panel">{children}</div>

        <aside className="auth-visual-panel">
          <BrandLogo />
          <div className="auth-illustration-wrap">
            <img
              alt="Ilustração de calendário com planta e relógio"
              className="auth-illustration"
              src={authIllustration}
            />
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
