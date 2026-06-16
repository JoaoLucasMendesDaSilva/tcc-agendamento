---
name: security-review
description: Revisa segurança do backend, frontend, autenticação, variáveis de ambiente, banco, CORS, rate limit, headers e isolamento de dados.
---

# Skill: Revisão de Segurança

## Classificação

Classifique achados como:

- Crítico
- Alto
- Médio
- Baixo

## Checklist

### Segredos

- `.env` está ignorado?
- `.env.example` existe?
- Tokens e senhas não estão no código?

### Auth

- Senhas com bcrypt?
- JWT com segredo seguro?
- Rotas privadas protegidas?
- Usuário não acessa dados de outro negócio?

### Banco

- Queries parametrizadas?
- IDs validados?
- Sem SQL Injection?
- Erros internos ocultos?

### API pública

- Expõe apenas o necessário?
- Tem rate limit?
- Bloqueia agendamento inválido?

### Frontend

- Sem segredos no frontend?
- Erros amigáveis?
- Token tratado com cuidado?

## Resposta esperada

Para cada problema:

1. Local.
2. Risco.
3. Correção.
4. Prioridade.
5. Bloqueia ou não o avanço.
