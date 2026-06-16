# Pacote V2 — Skills e Subagents para Codex

Este pacote contém instruções, skills e perfis de subagents para ajudar o Codex a desenvolver o sistema web de agendamento online do TCC com mais segurança e organização.

## Como instalar

Copie para a raiz do seu projeto:

```txt
AGENTS.md
.agents/
```

A estrutura deve ficar assim:

```txt
tcc-agendamento/
  AGENTS.md
  .agents/
    skills/
    subagents/
  backend/
  frontend/
```

## Skills incluídas

### Controle e planejamento

- `tcc-scope-guard`
- `api-design-review`
- `pre-commit-checklist`
- `learning-review`

### Backend

- `backend-express-feature`
- `jwt-auth-implementation`
- `integration-notifications`

### Banco e agendamento

- `mysql-data-modeling`
- `mysql-migration-generator`
- `scheduling-rules`

### Segurança

- `security-review`

### Frontend

- `frontend-mobile-first`

### Documentação e deploy

- `tcc-documentation`
- `deployment-readiness`

## Subagents incluídos

- `backend-lead`
- `security-engineer`
- `database-architect`
- `frontend-ux-reviewer`
- `qa-tester`
- `code-reviewer`
- `tcc-documenter`
- `teacher-mentor`

## Exemplos de uso no Codex

```txt
Use as skills tcc-scope-guard, backend-express-feature e security-review para planejar a implementação de autenticação JWT. Não altere arquivos ainda.
```

```txt
Use os subagents backend-lead, database-architect e security-engineer para revisar o plano do banco de dados antes de criar migrations.
```

```txt
Use a skill pre-commit-checklist para revisar as alterações atuais e sugerir uma mensagem de commit.
```

## Observação

As skills são instruções reutilizáveis. Os subagents são perfis de revisão/especialistas para organizar melhor o raciocínio em tarefas complexas.
