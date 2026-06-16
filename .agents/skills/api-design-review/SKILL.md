---
name: api-design-review
description: Revisa o desenho das rotas REST da API, nomes de endpoints, métodos HTTP, payloads, respostas, autenticação e consistência.
---

# Skill: Revisão de Design de API

## Quando usar

Use antes de criar ou alterar rotas da API.

## Checklist

- O método HTTP está correto?
- O endpoint está claro?
- A rota deveria ser pública ou privada?
- A resposta está em JSON?
- As mensagens estão em português?
- Há códigos HTTP adequados?
- O payload evita dados desnecessários?
- A rota respeita isolamento por usuário/negócio?
- O endpoint segue padrão com `/api`?

## Convenções sugeridas

```txt
POST /api/auth/cadastro
POST /api/auth/login
GET /api/auth/me

GET /api/servicos
POST /api/servicos
GET /api/servicos/:id
PUT /api/servicos/:id
DELETE /api/servicos/:id

GET /api/publico/negocio/:negocioId/servicos
POST /api/publico/negocio/:negocioId/agendamentos
```

## Resposta esperada

1. Rotas propostas.
2. Quais são públicas/privadas.
3. Payloads.
4. Respostas esperadas.
5. Riscos de segurança.
6. Ajustes recomendados.
