# Sistema de Agendamento Online

MVP de um sistema web de agendamento online para pequenos negocios de servicos, desenvolvido como Trabalho de Conclusao de Curso.

## Status

Projeto em inicio de desenvolvimento. A etapa atual entrega apenas o scaffold minimo executavel:

- Backend Node.js com Express
- Frontend React com Vite
- Rota de saude `GET /api/health`
- Configuracao inicial de seguranca no backend

Ainda nao foram implementados autenticacao, banco de dados, CRUDs ou agendamento.

## Stack

- Frontend: React, Vite, HTML, CSS e JavaScript
- Backend: Node.js com Express
- Banco futuro: MySQL
- Autenticacao futura: JWT com bcrypt

## Como configurar

Copie o arquivo `.env.example` para `.env` na raiz do projeto e ajuste as variaveis se necessario.

## Rodar o backend

```bash
cd backend
npm install
npm run dev
```

Por padrao, o backend usa `http://localhost:3001`.

## Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Por padrao, o frontend usa `http://localhost:5173`.

## Testar a API

Com o backend rodando:

```bash
curl http://localhost:3001/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "mensagem": "API do sistema de agendamento em funcionamento"
}
```
