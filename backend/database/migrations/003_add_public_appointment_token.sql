-- Migration 003: adiciona token seguro para gerenciamento publico de agendamentos.
-- Execute uma unica vez no mesmo schema configurado em DB_NAME.

ALTER TABLE agendamentos
  ADD COLUMN token_publico_hash CHAR(64) NULL AFTER observacoes,
  ADD CONSTRAINT uk_agendamentos_token_publico_hash UNIQUE (token_publico_hash);
