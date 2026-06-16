# AGENTS.md — TCC Sistema de Agendamento Online

## 1. Contexto do projeto

Este repositório é um Trabalho de Conclusão de Curso cujo objetivo é desenvolver um sistema web de agendamento online para pequenos negócios de serviços, com foco principal em Cubatão - SP.

O sistema deve ajudar pequenos empreendedores a substituir cadernos, ligações e mensagens desorganizadas por uma plataforma simples para cadastrar serviços, profissionais e agendamentos.

## 2. Objetivo do MVP

Entregar um MVP funcional, seguro, simples e explicável para apresentação acadêmica.

O MVP deve permitir:

1. Cadastro e login do empreendedor.
2. Cadastro do negócio.
3. CRUD de serviços.
4. CRUD de profissionais.
5. Agendamento público sem conta para o cliente.
6. Validação de horários disponíveis.
7. Bloqueio de conflito de agendamento.
8. Painel simples do empreendedor.
9. Documentação para rodar e apresentar o projeto.

## 3. Stack obrigatória

- Frontend: React, HTML, CSS e JavaScript
- Backend: Node.js com Express
- Banco de dados: MySQL
- Autenticação: JWT
- Hash de senha: bcrypt
- Calendário: FullCalendar.js quando necessário
- E-mail: SendGrid ou EmailJS, podendo iniciar com serviço simulado
- WhatsApp: Z-API ou WPPConnect, podendo iniciar com serviço simulado
- Deploy futuro: Vercel para frontend; Railway ou Render para backend

Não trocar a stack sem justificar e pedir aprovação.

## 4. Fora do escopo inicial

Não implementar agora:

- Pagamentos
- Assinaturas
- Gateway de pagamento
- Marketplace
- Aplicativo mobile nativo
- Dashboard avançado
- Relatórios complexos
- Múltiplas unidades
- Sistema avançado de permissões
- Funcionalidades fora do MVP sem aprovação

## 5. Regras de segurança obrigatórias

- Nunca salvar senha em texto puro.
- Usar bcrypt para senhas.
- Nunca retornar senha ou hash de senha.
- Usar JWT com segredo vindo de variável de ambiente.
- Nunca versionar `.env`.
- Criar `.env.example`.
- Validar entradas do usuário.
- Usar queries parametrizadas ou ORM/query builder seguro.
- Proteger rotas privadas com middleware.
- Garantir isolamento entre negócios: um empreendedor não pode acessar dados de outro.
- Não expor stack trace ou erro interno do banco ao usuário final.
- Configurar CORS de forma controlada.
- Usar rate limit em rotas sensíveis.
- Usar Helmet ou headers equivalentes quando possível.
- Não colocar tokens de SendGrid, EmailJS, Z-API ou WPPConnect no código.

## 6. Regras de trabalho

Antes de mudanças grandes:

1. Analise o repositório.
2. Explique o plano.
3. Liste arquivos que pretende alterar.
4. Use skills e/ou subagents relevantes.
5. Aguarde aprovação se a alteração for ampla.

Depois de cada etapa:

1. Explique o que mudou.
2. Liste arquivos alterados.
3. Diga como testar.
4. Aponte riscos ou pendências.
5. Sugira mensagem de commit.

## 7. Preferência de implementação

Priorize código simples, legível e fácil de explicar no TCC.

Evite:

- Arquitetura exagerada.
- Dependências desnecessárias.
- Refatorações gigantes.
- Código “mágico” difícil de entender.
- Mudanças grandes sem testes manuais.

## 8. Estrutura backend sugerida

```txt
backend/
  src/
    config/
    controllers/
    middlewares/
    routes/
    services/
    utils/
    app.js
    server.js
  .env.example
  package.json
```

## 9. Estrutura frontend sugerida

```txt
frontend/
  src/
    components/
    pages/
    services/
    styles/
    App.jsx
    main.jsx
```

## 10. Uso de skills

Use as skills da pasta `.agents/skills` quando uma tarefa envolver escopo, backend, segurança, banco, agendamento, frontend, documentação ou revisão antes de commit.

## 11. Uso de subagents

Para tarefas complexas, use perfis de subagents da pasta `.agents/subagents` como revisores especializados.

Sugestão de fluxo para mudanças grandes:

1. Backend Lead revisa arquitetura.
2. Database Architect revisa banco.
3. Security Engineer revisa riscos.
4. QA Tester define testes.
5. Code Reviewer faz revisão final.
6. TCC Documenter atualiza documentação.
