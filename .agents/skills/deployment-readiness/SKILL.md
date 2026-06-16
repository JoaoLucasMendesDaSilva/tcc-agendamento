---
name: deployment-readiness
description: Revisa se backend e frontend estão prontos para deploy futuro em Render/Railway e Vercel, sem expor segredos.
---

# Skill: Prontidão para Deploy

## Objetivo

Preparar o projeto para deploy sem comprometer segurança.

## Backend

- Usa `process.env.PORT`.
- Usa `.env`.
- `.env.example` completo.
- CORS preparado para domínio do frontend.
- Logs sem dados sensíveis.
- Scripts `start` e `dev`.
- Banco configurável por env.

## Frontend

- URL da API vem de variável de ambiente.
- Build funciona.
- Sem segredos.
- Interface testada em mobile.

## Banco

- Script SQL/migrations documentados.
- Variáveis de conexão documentadas.
- Não depender de banco local hardcoded.

## Resposta esperada

1. O que está pronto.
2. O que impede deploy.
3. Ajustes necessários.
4. Checklist final.
