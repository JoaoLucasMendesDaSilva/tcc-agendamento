---
name: backend-express-feature
description: Implementa funcionalidades no backend Node.js com Express usando routes, controllers, services, middlewares e validações simples.
---

# Skill: Funcionalidade Backend Express

## Antes de implementar

Responda:

1. A rota é pública ou privada?
2. Precisa de JWT?
3. Quais dados recebe?
4. Quais validações são obrigatórias?
5. Quais entidades/tabelas usa?
6. Há risco de acesso a dados de outro negócio?

## Estrutura sugerida

```txt
src/
  routes/
  controllers/
  services/
  middlewares/
  utils/
```

## Regras

- Não retornar senha ou hash.
- Não confiar cegamente em IDs do frontend.
- Validar dados no backend.
- Usar mensagens em português.
- Tratar erros sem vazar detalhes internos.
- Preservar o que já funciona.

## Ao finalizar

Informe:

- Arquivos alterados.
- Rotas criadas.
- Como testar.
- Riscos/pendências.
- Mensagem de commit sugerida.
