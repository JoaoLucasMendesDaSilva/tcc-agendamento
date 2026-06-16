---
name: mysql-migration-generator
description: Cria scripts SQL ou migrations MySQL para o sistema, com ordem correta de criação, foreign keys, índices e rollback quando possível.
---

# Skill: Gerador de Migrations MySQL

## Objetivo

Gerar scripts SQL organizados para criar o banco do MVP.

## Regras

- Criar tabelas na ordem correta.
- Usar `CREATE TABLE IF NOT EXISTS` quando adequado.
- Usar `INT AUTO_INCREMENT PRIMARY KEY`.
- Usar `created_at`/`updated_at` ou nomes em português de forma consistente.
- Criar foreign keys.
- Criar índices para consultas frequentes.
- Evitar dados sensíveis em seeds.
- Incluir script de seed apenas se solicitado.

## Ordem sugerida

1. usuarios
2. negocios
3. servicos
4. profissionais
5. agendamentos

## Resposta esperada

1. Arquivo sugerido.
2. SQL completo.
3. Como executar no MySQL.
4. Como verificar se funcionou.
5. Cuidados antes de rodar.
