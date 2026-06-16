# Prompt inicial para usar no Codex com as Skills V2

Leia o `AGENTS.md`, carregue o contexto do projeto e use as skills disponíveis em `.agents/skills`.

Primeiro, não altere arquivos. Faça apenas uma análise inicial:

1. Estrutura atual do repositório.
2. O que já está implementado.
3. O que falta para o MVP do TCC.
4. Principais riscos de segurança.
5. Plano de implementação em etapas pequenas.
6. Quais skills e subagents você recomenda usar em cada etapa.

Leve segurança a sério. Antes de implementar autenticação, banco ou agendamento, use pelo menos:

- `tcc-scope-guard`
- `api-design-review`
- `security-review`

Para tarefas complexas, use também os perfis em `.agents/subagents`, principalmente:

- Backend Lead
- Security Engineer
- Database Architect
- QA Tester
- Code Reviewer

Não implemente tudo de uma vez. Trabalhe em etapas pequenas e explique como testar cada uma.
