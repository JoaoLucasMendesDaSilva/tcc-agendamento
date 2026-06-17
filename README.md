# Agendai

Agendai é um sistema de agendamento online para pequenos negócios. O MVP permite que um empreendedor cadastre seu negócio, serviços e profissionais, divulgue um link público de agendamento e acompanhe os horários recebidos em uma agenda privada.

O objetivo do projeto é centralizar o fluxo básico de atendimento: o cliente acessa um link público, escolhe serviço, profissional, data e horário, informa seus dados e confirma o agendamento sem precisar criar conta.

## Status

MVP funcional e deployado:

- Frontend publicado na Vercel.
- Backend publicado na Railway.
- Banco MySQL hospedado na Railway.

URLs reais, senhas, tokens e dados privados não devem ser versionados no repositório. Use placeholders em documentação e arquivos de exemplo.

## Funcionalidades

- Cadastro e login do empreendedor.
- Dashboard privado.
- Cadastro e edição do negócio.
- CRUD de serviços com desativação lógica.
- CRUD de profissionais com desativação lógica.
- Agenda privada do empreendedor.
- Link público `/agendar/:slugOuId`.
- Cliente escolhe serviço, profissional, data e horário.
- Cliente confirma agendamento informando nome, telefone e e-mail opcional.
- Prevenção de conflito de horário.
- Cancelamento e alteração de status de agendamentos no painel privado.

## Visual atual

- Redesign visual aplicado ao frontend.
- Layout responsivo e mobile-first.
- Sidebar animada e recolhível.
- Ícones reais com `lucide-react`.
- Microinterações em botões, cards, inputs e estados selecionados.
- Ilustração no painel de autenticação.
- Fluxo público de agendamento redesenhado em formato de etapas.

## Tecnologias

Frontend:

- React
- Vite
- CSS puro
- lucide-react
- Vercel

Backend:

- Node.js
- Express
- MySQL
- mysql2/promise
- JWT
- bcrypt
- Helmet
- CORS
- express-rate-limit
- Railway

## Estrutura básica

```txt
tcc-agendamento/
  backend/
  frontend/
    src/
      assets/
      components/
      pages/
      services/
```

Pastas principais:

- `backend/`: API Express, rotas, controllers, services, conexão MySQL e script SQL.
- `frontend/`: aplicação React/Vite.
- `frontend/src/components`: componentes reutilizáveis.
- `frontend/src/pages`: telas do sistema.
- `frontend/src/services`: consumo da API.
- `frontend/src/assets`: imagens e arquivos estáticos do frontend.

## Variáveis de ambiente

### Backend

Configure as variáveis do backend no ambiente local ou no painel da Railway:

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://seu-frontend.vercel.app
JWT_SECRET=use_um_segredo_forte
JWT_EXPIRES_IN=1d

DB_HOST=host_do_mysql
DB_PORT=3306
DB_USER=usuario_do_mysql
DB_PASSWORD=senha_do_mysql
DB_NAME=tcc_agendamento
```

### Frontend

Configure no `frontend/.env` local ou nas variáveis da Vercel:

```env
VITE_API_URL=https://sua-api.railway.app
```

Não versionar `.env` com dados reais.

## Como rodar localmente

### Backend

```bash
cd backend
npm install
npm run dev
```

Por padrão, a API local roda em:

```txt
http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Por padrão, o frontend local roda em:

```txt
http://localhost:5173
```

## Banco de dados

O script SQL inicial deve ser executado uma vez para criar o banco e as tabelas.

Script:

```txt
backend/database/migrations/001_create_schema.sql
```

No MySQL Workbench:

1. Abra uma conexão MySQL.
2. Abra o script SQL.
3. Execute o script completo.
4. Atualize a lista de schemas.
5. Confirme se as tabelas foram criadas no banco configurado em `DB_NAME`.

Comandos úteis:

```sql
SHOW DATABASES;
USE railway;
SHOW TABLES;
USE tcc_agendamento;
SHOW TABLES;
```

Observação para Railway: se a aba Data mostrar `You have no tables`, confira se o schema selecionado é o mesmo valor configurado em `DB_NAME`. Em alguns ambientes, o banco padrão pode ser `railway`; em outros, o projeto pode usar `tcc_agendamento`.

## Rotas principais da API

### Públicas

```txt
GET  /api/health
POST /api/auth/cadastro
POST /api/auth/login

GET  /api/publico/negocio/:slugOuId
GET  /api/publico/negocio/:slugOuId/servicos
GET  /api/publico/negocio/:slugOuId/profissionais
GET  /api/publico/negocio/:slugOuId/horarios-disponiveis
POST /api/publico/negocio/:slugOuId/agendamentos
```

`/api/db-health` existe para verificação em desenvolvimento, mas não expõe teste do banco em produção.

### Privadas

As rotas privadas exigem:

```txt
Authorization: Bearer <token>
```

```txt
GET /api/auth/me

GET  /api/negocio
POST /api/negocio
PUT  /api/negocio/:id

GET    /api/servicos
POST   /api/servicos
GET    /api/servicos/:id
PUT    /api/servicos/:id
DELETE /api/servicos/:id

GET    /api/profissionais
POST   /api/profissionais
GET    /api/profissionais/:id
PUT    /api/profissionais/:id
DELETE /api/profissionais/:id

GET    /api/agendamentos
GET    /api/agendamentos/hoje
GET    /api/agendamentos/:id
PUT    /api/agendamentos/:id/status
DELETE /api/agendamentos/:id
```

## Segurança aplicada

- Senhas armazenadas com bcrypt.
- Autenticação com JWT.
- `JWT_SECRET` configurado por variável de ambiente.
- Rotas privadas protegidas por middleware.
- Queries parametrizadas com `mysql2/promise`.
- Isolamento por `usuario_id` e `negocio_id`.
- Dados sensíveis, como `senha_hash`, não são retornados.
- `.env` não deve ser versionado.
- CORS configurado por domínio via `CORS_ORIGIN`.
- Helmet e rate limit aplicados no backend.
- Agendamentos validam serviço, profissional, data, horário e conflito.
- Criação pública de agendamento usa transação.

## Deploy

### Frontend na Vercel

- Configurar `VITE_API_URL` com a URL pública do backend.
- Rodar build com Vite.
- O projeto possui configuração para SPA/rewrite quando necessário.

### Backend na Railway

- Configurar variáveis de ambiente do backend.
- Definir `NODE_ENV=production`.
- Configurar `CORS_ORIGIN` com a URL do frontend na Vercel.
- Usar `PORT` fornecida pelo ambiente.

### MySQL na Railway

- Criar o serviço MySQL.
- Executar o script SQL uma vez.
- Conferir se `DB_NAME` aponta para o schema correto.
- Validar tabelas com `SHOW TABLES`.

## Testes manuais recomendados

1. Criar conta em `/cadastro`.
2. Fazer login em `/login`.
3. Validar acesso ao `/dashboard`.
4. Cadastrar ou editar o negócio em `/negocio`.
5. Criar um serviço em `/servicos`.
6. Criar um profissional em `/profissionais`.
7. Abrir o link público `/agendar/:slugOuId`.
8. Escolher serviço, profissional, data e horário.
9. Confirmar um agendamento.
10. Tentar agendar o mesmo horário novamente e validar o bloqueio de conflito.
11. Acessar `/agenda` e verificar o agendamento criado.
12. Alterar status e cancelar agendamento.

Também é recomendado testar:

- Token inválido.
- Acesso privado sem login.
- Serviço inativo no fluxo público.
- Profissional inativo no fluxo público.
- Data passada no agendamento público.
- Comportamento responsivo no mobile.

## Limitações atuais do MVP

- Sem notificações por WhatsApp.
- Sem envio de e-mail.
- Sem integração com Google Calendar.
- Sem pagamentos.
- Sem testes automatizados completos.
- Dashboard sem métricas reais.
- Token armazenado em `localStorage`.
- Sem reagendamento pelo cliente.
- Sem bloqueio manual de horários.
- Sem painel de clientes.

## Próximas evoluções

- Integração com WhatsApp API.
- Confirmações por e-mail.
- Integração com Google Calendar.
- Notificações automáticas.
- Reagendamento e cancelamento pelo cliente.
- Bloqueio de horários e folgas.
- Painel de clientes.
- Métricas reais no dashboard.
- Pagamentos online.
- Landing page pública do produto.
- Testes automatizados de backend e frontend.

## Status atual do projeto

O Agendai está em estado de MVP funcional, com frontend, backend e banco integrados. O sistema já cobre o fluxo principal do TCC: empreendedor configura seu negócio e cliente agenda online por link público com prevenção de conflito de horário.
