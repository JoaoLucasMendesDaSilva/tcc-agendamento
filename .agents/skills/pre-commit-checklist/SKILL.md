---
name: pre-commit-checklist
description: Revisa alterações antes de commit, incluindo testes, segurança, escopo, arquivos alterados e mensagem de commit.
---

# Skill: Checklist Antes de Commit

## Checklist

- Projeto roda?
- Rotas alteradas foram testadas?
- Rotas antigas continuam funcionando?
- `node_modules` não será commitado?
- `.env` não será commitado?
- Não há segredos no código?
- Mensagens estão em português?
- Está dentro do MVP?
- Arquivos estão no lugar certo?
- README precisa atualizar?
- Há pendências?

## Comandos úteis

```bash
git status
cd backend && npm run dev
npm test
```

## Resposta esperada

1. Resumo.
2. Arquivos alterados.
3. Testes feitos.
4. Pendências.
5. Mensagem de commit sugerida.
