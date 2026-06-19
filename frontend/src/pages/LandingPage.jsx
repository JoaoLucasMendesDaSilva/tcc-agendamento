import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  QrCode,
  Share2,
  Store,
} from 'lucide-react';
import authIllustration from '../assets/auth-illustration.png';
import BrandLogo from '../components/BrandLogo';

const beneficios = [
  {
    titulo: 'Link público',
    texto: 'Seu negócio ganha uma página simples para clientes escolherem serviço, profissional e horário.',
    Icone: Share2,
  },
  {
    titulo: 'QR Code',
    texto: 'Compartilhe o agendamento em balcões, cartões, vitrines e materiais do seu atendimento.',
    Icone: QrCode,
  },
  {
    titulo: 'WhatsApp',
    texto: 'Envie o link pronto para clientes e redes sociais, sem depender de cadastro do cliente.',
    Icone: MessageCircle,
  },
  {
    titulo: 'Gestão completa',
    texto: 'Organize serviços, profissionais e agenda privada em um painel direto ao ponto.',
    Icone: Store,
  },
];

const passos = [
  'Crie sua conta de empreendedor.',
  'Cadastre o negócio, serviços e profissionais.',
  'Compartilhe o link ou QR Code com seus clientes.',
  'Acompanhe os agendamentos no painel.',
];

const planos = [
  {
    nome: 'Gratuito',
    preco: 'R$ 0',
    descricao: 'Para validar o atendimento online no TCC e em pequenos negócios.',
    itens: ['Link público', 'QR Code', 'Agenda simples'],
  },
  {
    nome: 'Profissional',
    preco: 'Em breve',
    destaque: true,
    descricao: 'Para negócios que querem automatizar comunicação e crescer com controle.',
    itens: ['WhatsApp integrado', 'Métricas reais', 'Notificações'],
  },
  {
    nome: 'Rede',
    preco: 'Sob consulta',
    descricao: 'Para equipes com mais unidades, profissionais e necessidades de gestão.',
    itens: ['Múltiplas unidades', 'Relatórios avançados', 'Permissões por equipe'],
  },
];

function LandingPage({ navigate }) {
  function irParaCadastro() {
    navigate('/cadastro');
  }

  function irParaLogin() {
    navigate('/login');
  }

  function verBeneficios() {
    const prefereReducaoMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.getElementById('beneficios')?.scrollIntoView({
      behavior: prefereReducaoMovimento ? 'auto' : 'smooth',
    });
  }

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Navegação principal">
        <BrandLogo />
        <div className="landing-nav-actions">
          <button className="landing-nav-link" onClick={irParaLogin} type="button">
            Entrar
          </button>
          <button className="button button-primary button-small" onClick={irParaCadastro} type="button">
            Começar grátis
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-kicker">Agendamento online para pequenos negócios</p>
          <h1>Transforme conversas no WhatsApp em horários confirmados.</h1>
          <p className="landing-lead">
            O Agendai ajuda barbearias, salões, clínicas, estúdios e profissionais
            autônomos a receber agendamentos por link público, QR Code e painel simples.
          </p>
          <div className="landing-hero-actions">
            <button className="button button-primary" onClick={irParaCadastro} type="button">
              Começar grátis
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </button>
            <button className="button button-secondary" onClick={verBeneficios} type="button">
              Ver benefícios
            </button>
          </div>
          <div className="landing-proof" aria-label="Diferenciais do Agendai">
            <span>
              <CheckCircle2 aria-hidden="true" size={17} strokeWidth={2} />
              Sem cadastro para o cliente
            </span>
            <span>
              <CheckCircle2 aria-hidden="true" size={17} strokeWidth={2} />
              Pronto para mobile
            </span>
          </div>
        </div>

        <div className="landing-hero-visual" aria-label="Prévia visual do Agendai">
          <div className="landing-mockup-card mockup-main-card">
            <div className="mockup-header">
              <span>Agenda de hoje</span>
              <span className="status-badge status-confirmado">Online</span>
            </div>
            <div className="mockup-row">
              <span>09:00</span>
              <strong>Corte masculino</strong>
              <em>Confirmado</em>
            </div>
            <div className="mockup-row">
              <span>10:30</span>
              <strong>Barba</strong>
              <em>Pendente</em>
            </div>
            <div className="mockup-row">
              <span>14:00</span>
              <strong>Sobrancelha</strong>
              <em>Confirmado</em>
            </div>
          </div>

          <div className="landing-floating-card qr-card">
            <QrCode aria-hidden="true" size={34} strokeWidth={1.9} />
            <span>QR Code pronto para imprimir</span>
          </div>

          <div className="landing-floating-card whatsapp-card">
            <MessageCircle aria-hidden="true" size={32} strokeWidth={1.9} />
            <span>Compartilhe pelo WhatsApp</span>
          </div>

          <img
            alt="Ilustração de calendário com planta e relógio"
            className="landing-hero-illustration"
            src={authIllustration}
          />
        </div>
      </section>

      <section className="landing-section" id="beneficios">
        <div className="landing-section-heading">
          <p className="landing-kicker">Benefícios</p>
          <h2>O básico bem feito para vender mais horários.</h2>
          <p>
            Uma experiência simples para quem agenda e organizada para quem atende.
          </p>
        </div>
        <div className="landing-benefit-grid">
          {beneficios.map(({ titulo, texto, Icone }) => (
            <article className="landing-feature-card" key={titulo}>
              <span className="landing-icon">
                <Icone aria-hidden="true" size={23} strokeWidth={2} />
              </span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-process-section">
        <div className="landing-section-heading">
          <p className="landing-kicker">Como funciona</p>
          <h2>Da configuração ao primeiro agendamento em quatro passos.</h2>
        </div>
        <div className="landing-steps">
          {passos.map((passo, index) => (
            <article className="landing-step-card" key={passo}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{passo}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-heading">
          <p className="landing-kicker">Planos</p>
          <h2>Comece simples e evolua quando o negócio pedir.</h2>
        </div>
        <div className="landing-plan-grid">
          {planos.map((plano) => (
            <article
              className={`landing-plan-card ${plano.destaque ? 'is-highlighted' : ''}`}
              key={plano.nome}
            >
              {plano.destaque && <span className="plan-label">Diferencial futuro</span>}
              <h3>{plano.nome}</h3>
              <strong>{plano.preco}</strong>
              <p>{plano.descricao}</p>
              <ul>
                {plano.itens.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" size={16} strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-final-cta">
        <div>
          <p className="landing-kicker">Agendai</p>
          <h2>Pronto para apresentar um MVP com cara de produto real?</h2>
          <p>
            Crie sua conta, cadastre seu negócio e compartilhe seu link de
            agendamento em poucos minutos.
          </p>
        </div>
        <button className="button button-primary" onClick={irParaCadastro} type="button">
          Criar conta grátis
          <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
        </button>
      </section>

      <footer className="landing-footer">
        <BrandLogo />
        <p>Sistema de agendamento online para pequenos negócios.</p>
        <div>
          <span>Link público</span>
          <span>QR Code</span>
          <span>WhatsApp</span>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
