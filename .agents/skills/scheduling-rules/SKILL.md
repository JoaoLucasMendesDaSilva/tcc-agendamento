---
name: scheduling-rules
description: Implementa e revisa regras de agendamento, cálculo de hora_fim, horários disponíveis e bloqueio de conflitos.
---

# Skill: Regras de Agendamento

## Regras obrigatórias

Ao criar agendamento:

1. Verificar negócio.
2. Verificar serviço e profissional do mesmo negócio.
3. Verificar ativos.
4. Bloquear data/hora passada.
5. Calcular `hora_fim`.
6. Verificar horário de funcionamento.
7. Bloquear conflitos do mesmo profissional.
8. Retornar mensagem clara.

## Conflito por intervalo

Há conflito se:

```txt
novo_inicio < existente_fim
E
novo_fim > existente_inicio
```

## Casos de teste

- Horário livre.
- Mesmo horário já ocupado.
- Sobreposição parcial.
- Fora do funcionamento.
- Data passada.
- Serviço inativo.
- Profissional inativo.

## Resposta esperada

Explique a regra, mostre implementação, informe testes manuais e limitações.
