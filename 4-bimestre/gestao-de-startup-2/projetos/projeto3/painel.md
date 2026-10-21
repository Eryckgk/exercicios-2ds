
# 📊 Painel de Métricas — Startup

**Produto:** Startup — plataforma para startups crescerem  
**Período analisado:** 14 a 20 de outubro de 2026  
**Objetivo:** ajudar empreendedores a divulgar suas startups, encontrar oportunidades e criar conexões.

> **IMPORTANTE:** Todos os valores deste painel são simulados para fins acadêmicos. O NPS foi calculado com respostas fictícias, que deverão ser substituídas por pelo menos 10 respostas reais antes da entrega definitiva.

## 1. Métricas escolhidas

| Métrica | Tipo | Valor atual | Período | Se piorar, vamos... |
|---|---|---|---|---|
| Taxa de ativação | Produto | 50% | 14–20/10/2026 | Melhorar o cadastro e o primeiro acesso |
| Retenção semanal | Produto | 24% | 14–20/10/2026 | Investigar por que os usuários não retornam |
| NPS | Produto | +30 | Outubro/2026 | Entrevistar usuários insatisfeitos |
| Bugs abertos | Código | 6 bugs | 14–20/10/2026 | Priorizar correções de erros |
| Pull requests concluídos | Código | 5 PRs | 14–20/10/2026 | Investigar bloqueios no desenvolvimento |
| Tempo médio de resposta | Código | 380 ms | 14–20/10/2026 | Investigar rotas lentas e otimizar o sistema |

## 2. Cálculos

### 2.1 NPS — Net Promoter Score

Pergunta: "De 0 a 10, quanto você recomendaria o Startup para outra pessoa?"

Respostas simuladas:
10, 9, 8, 9, 7, 6, 10, 4, 8, 9.

**Promotores (9–10):** 5 pessoas.

5 ÷ 10 × 100 = 50%

**Neutros (7–8):** 3 pessoas.

**Detratores (0–6):** 2 pessoas.

2 ÷ 10 × 100 = 20%

**Cálculo do NPS:**

NPS = % de promotores − % de detratores

NPS = 50% − 20% = +30

Resultado simulado: NPS de +30.

### 2.2 Retenção semanal

Considerando uma coorte de 125 usuários ativados, 30 retornaram na semana seguinte.

Retenção = (usuários que voltaram ÷ usuários que começaram) × 100

Retenção = (30 ÷ 125) × 100 = 24%

**Resultado: 24% de retenção semanal.**

### 2.3 Churn semanal

Dos 125 usuários acompanhados, 95 não retornaram no período definido.

Churn = (usuários que saíram ÷ usuários no início) × 100

Churn = (95 ÷ 125) × 100 = 76%

**Resultado: 76% de churn.**

Conferência:

Retenção + Churn = 24% + 76% = 100%.

*Neste exemplo, churn significa não retornar durante a semana de acompanhamento.*

## 3. Funil AARRR

| Etapa | Pessoas | Conversão em relação à etapa anterior |
|---|---:|---:|
| Aquisição | 250 | — |
| Ativação | 125 | 50% |
| Retenção | 30 | 24% |
| Receita | 9 | 30% |
| Recomendação | NPS +30 | Pesquisa simulada |

**Definições das etapas:**

- Aquisição: pessoas que visitaram o site.
- Ativação: pessoas que concluíram o cadastro e realizaram a ação principal, como cadastrar uma startup.
- Retenção: usuários ativados que voltaram na semana seguinte.
- Receita: usuários que contrataram um plano pago, em um cenário hipotético de monetização.
- Recomendação: avaliação dos usuários pelo NPS.

### 3.1 Identificação da maior queda

**Aquisição → Ativação**

(250 − 125) ÷ 250 × 100 = 50%

**Ativação → Retenção**

(125 − 30) ÷ 125 × 100 = 76%

**Retenção → Receita**

(30 − 9) ÷ 30 × 100 = 70%

**Maior queda:** entre Ativação e Retenção.

**Perda identificada: 76%.**

### 3.2 Interpretação dos resultados

No cenário simulado, o Startup consegue ativar 125 usuários entre 250 visitantes. Entretanto, apenas 30 dos 125 usuários ativados retornam na semana seguinte.

Isso indica que a equipe deve investigar a experiência após o primeiro uso, descobrir quais dificuldades impedem os usuários de voltar e propor melhorias.

A retenção apresenta a maior queda percentual do funil, sendo a principal candidata a orientar a próxima ação da equipe.

## 4. Conclusão

A análise simulada indica que a retenção semanal é o principal ponto de atenção do Startup.

A equipe priorizará investigar a experiência após o cadastro e avaliar melhorias que incentivem os empreendedores a retornar à plataforma.

Os resultados reais deverão ser coletados e comparados com os valores deste exemplo para avaliar se a ação melhorou o produto.

## 5. Origem dos dados

Todos os números apresentados são simulados para fins acadêmicos. Os dados de NPS deverão ser substituídos por respostas reais de pelo menos 10 pessoas. As demais métricas deverão ser substituídas por medições reais quando disponíveis.
