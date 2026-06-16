---
name: jwt-auth-implementation
description: Orienta implementação segura de cadastro, login, hash de senha, geração de JWT, middleware de autenticação e rota /me.
---

# Skill: Implementação de JWT e Autenticação

## Objetivo

Criar autenticação simples e segura para o MVP.

## Rotas esperadas

```txt
POST /api/auth/cadastro
POST /api/auth/login
GET /api/auth/me
```

## Regras de senha

- Usar bcrypt.
- Nunca salvar senha pura.
- Nunca retornar senha_hash.
- Validar senha mínima.
- Mensagem clara em português.

## Regras de JWT

- Usar `JWT_SECRET` no `.env`.
- Definir expiração.
- Middleware deve validar `Authorization: Bearer <token>`.
- Rotas privadas devem usar middleware.
- Se token inválido, retornar 401.

## Checklist

- `.env.example` tem `JWT_SECRET=`.
- `JWT_SECRET` não está hardcoded.
- Login não informa se o problema é e-mail ou senha de forma insegura.
- `/me` retorna dados do usuário sem senha.
- Controllers não vazam stack trace.

## Resposta esperada

1. Arquivos criados/alterados.
2. Fluxo de cadastro.
3. Fluxo de login.
4. Como testar com exemplos.
5. Riscos restantes.
