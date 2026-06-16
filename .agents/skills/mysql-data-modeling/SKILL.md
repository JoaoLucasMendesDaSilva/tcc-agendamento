---
name: mysql-data-modeling
description: Modela o banco MySQL do sistema de agendamento, incluindo tabelas, relacionamentos, chaves estrangeiras, índices e constraints.
---

# Skill: Modelagem MySQL

## Tabelas principais

- usuarios
- negocios
- servicos
- profissionais
- agendamentos

## Relacionamentos

- usuario 1:N negocios
- negocio 1:N servicos
- negocio 1:N profissionais
- negocio 1:N agendamentos
- servico 1:N agendamentos
- profissional 1:N agendamentos

## Regras

- E-mail único em usuarios.
- Chaves estrangeiras com índices.
- `duracao_minutos > 0`.
- `preco >= 0`.
- Serviços e profissionais podem usar `ativo`.
- Status de agendamento com valores controlados.
- Não apagar dados sem considerar impacto.

## Resposta esperada

1. Diagrama textual dos relacionamentos.
2. Campos por tabela.
3. Constraints.
4. Índices.
5. Observações de segurança.
