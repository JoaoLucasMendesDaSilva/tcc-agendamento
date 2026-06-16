---
name: integration-notifications
description: Estrutura serviços de notificação por e-mail e WhatsApp com simulação segura antes de integrar SendGrid, EmailJS, Z-API ou WPPConnect.
---

# Skill: Integrações de Notificação

## Objetivo

Criar estrutura substituível para notificações sem travar o MVP.

## Regras

- Começar com simulação se as APIs reais não estiverem configuradas.
- Nunca hardcodar tokens.
- Usar variáveis de ambiente.
- Não logar dados sensíveis.
- Separar lógica em `notificacoesService`.
- Não bloquear criação de agendamento se notificação simulada falhar, salvo se definido.

## Funções sugeridas

```js
enviarConfirmacaoEmail(agendamento)
enviarLembreteWhatsApp(agendamento)
```

## Resposta esperada

1. Serviço criado.
2. Variáveis de ambiente necessárias.
3. Modo simulado.
4. Como substituir pela API real.
5. Riscos.
