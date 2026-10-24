# 🚀 StartUP — Painel de Métricas

> **Conectando pessoas. Construindo startups. Transformando ideias em realidade.**

O painel de métricas do **StartUP** acompanha o desempenho do produto e do desenvolvimento, ajudando a equipe a identificar problemas e tomar decisões baseadas em dados.

---

## 📌 1. Visão geral

| Informação | Descrição |
|---|---|
| **Produto** | StartUP |
| **Objetivo** | Conectar pessoas interessadas em criar startups e formar equipes |
| **Público-alvo** | Empreendedores, estudantes, desenvolvedores e designers |
| **Período de análise** | Uma semana, no exemplo |
| **Status dos dados** | Simulados — substituir por dados reais quando disponíveis |

## 📊 2. Indicadores principais

| Métrica | Tipo | Valor atual | Período |
|---|---|---:|---|
| Retenção de usuários | Produto | 20% | Semanal |
| NPS | Produto | +30 *(simulado)* | Pesquisa de exemplo |
| Usuários ativados | Produto | 30 usuários | Semanal |
| Commits | Código | 12 | Semanal |
| Bugs em aberto | Código | 5 | No momento da medição |

### 🔁 Retenção de usuários

**O que mede:** a porcentagem de usuários que voltaram a utilizar o StartUP durante o período definido.

**Dados do exemplo:**
- Usuários no início: 100
- Usuários que retornaram: 20

**Fórmula:**

`Retenção = (Usuários que retornaram / Usuários no início) × 100`

**Cálculo:**

`(20 / 100) × 100 = 20%`

**Resultado:** `20%`

**Ação:** Se este número piorar, vamos investigar por que os usuários não estão voltando e melhorar a busca por colaboradores, as recomendações de projetos e a experiência de uso.

### ⭐ NPS — Net Promoter Score

**O que mede:** a disposição dos usuários de recomendar o StartUP para outras pessoas.

**Pergunta da pesquisa:**

> De 0 a 10, quanto você recomendaria o StartUP para um amigo ou colega?

**Classificação das respostas:**
- 🟢 **Promotores:** notas 9 e 10.
- 🟡 **Neutros:** notas 7 e 8.
- 🔴 **Detratores:** notas de 0 a 6.

**Exemplo simulado com 10 respostas:**

| Classificação | Quantidade | Percentual |
|---|---:|---:|
| Promotores | 5 | 50% |
| Neutros | 3 | 30% |
| Detratores | 2 | 20% |
| **Total** | **10** | **100%** |

**Fórmula:**

`NPS = % de promotores - % de detratores`

**Cálculo:**

`50% - 20% = +30`

**Resultado do exemplo:** `NPS = +30`

O NPS pode variar de -100 a +100. Esse resultado é apenas ilustrativo e não deve ser apresentado como uma pesquisa real.

**Resultado da pesquisa real:**

- Respostas coletadas: ___
- Promotores: ___
- Neutros: ___
- Detratores: ___
- NPS real: ___

**Ação:** Se este número piorar, vamos conversar com os usuários, identificar suas dificuldades e priorizar melhorias na plataforma.

### 👥 Usuários ativados

**O que mede:** a quantidade de visitantes que realizam uma ação importante, como completar o perfil ou publicar uma necessidade de equipe.

**Dados do exemplo:**
- Visitantes: 100
- Usuários ativados: 30

**Fórmula:**

`Taxa de ativação = (Usuários ativados / Visitantes) × 100`

**Cálculo:**

`(30 / 100) × 100 = 30%`

**Resultado:** `30%`

**Ação:** Se este número piorar, vamos simplificar o cadastro e explicar melhor como criar um perfil, publicar um projeto e encontrar colaboradores.

### 💻 Commits no GitHub

**O que mede:** a quantidade de alterações de código registradas no repositório durante uma semana.

**Valor do exemplo:** `12 commits por semana`.

**Como medir:** consultar o histórico de commits do repositório StartUP e contar os commits do período analisado.

**Ação:** Se este número piorar, vamos revisar a divisão das tarefas, identificar dificuldades técnicas e organizar melhor o trabalho da equipe.

> A quantidade de commits, sozinha, não garante que o código tenha qualidade.

### 🐛 Bugs em aberto

**O que mede:** a quantidade de erros identificados que ainda não foram corrigidos.

**Valor do exemplo:** `5 bugs em aberto`.

**Como medir:** contar os problemas registrados que continuam pendentes.

**Ação:** Se este número piorar, vamos priorizar os erros mais importantes, definir responsáveis pelas correções e testar as soluções.

---

## 🔄 3. Retenção e churn

O **churn** representa a porcentagem de usuários que não retornaram no período definido.

**Dados simulados:**
- Usuários no início: 100
- Usuários que retornaram: 20
- Usuários que não retornaram: 80

### Cálculo da retenção

`Retenção = (20 / 100) × 100 = 20%`

### Cálculo do churn

`Churn = (Usuários que não retornaram / Usuários no início) × 100`

`Churn = (80 / 100) × 100 = 80%`

### Conferência

`Retenção + Churn = 20% + 80% = 100%`

**Interpretação:** no exemplo, 20% dos usuários retornaram e 80% não retornaram durante o período analisado. A equipe deve investigar as razões para o baixo retorno.

---

## 🧭 4. Funil AARRR

O funil AARRR ajuda a entender a jornada dos usuários dentro do produto.

| Etapa | Indicador simulado | Conversão da etapa anterior |
|---|---:|---:|
| **Aquisição** | 100 visitantes | — |
| **Ativação** | 30 usuários ativados | 30% |
| **Retenção** | 20 usuários que retornaram | 66,7% |
| **Receita** | 10 usuários pagantes hipotéticos | 50% |
| **Recomendação** | 5 promotores em 10 respostas simuladas | 50% dos respondentes |

**Cálculos das conversões:**

- **Aquisição → Ativação:** `30 / 100 × 100 = 30%`
- **Ativação → Retenção:** `20 / 30 × 100 ≈ 66,7%`
- **Retenção → Receita:** `10 / 20 × 100 = 50%`

### 📉 Maior queda do funil

A maior queda percentual ocorre entre **Aquisição e Ativação**.

| Indicador | Valor |
|---|---:|
| Visitantes | 100 |
| Usuários ativados | 30 |
| Visitantes que não ativaram | 70 |
| **Taxa de queda** | **70%** |

**Cálculo:**

`Taxa de queda = ((100 - 30) / 100) × 100`

`Taxa de queda = 70%`

**Interpretação:** muitos visitantes não chegam a realizar a primeira ação importante dentro do StartUP.

**Ação proposta:** simplificar o cadastro e melhorar as orientações do primeiro acesso.

---

## 🎯 5. Decisão baseada nos dados

**Problema identificado:** baixa ativação dos visitantes.

**Número que justifica a decisão:** queda de `70%` entre aquisição e ativação, no exemplo simulado.

**Ação proposta:** simplificar o cadastro e melhorar as orientações para novos usuários.

**Responsável:** definir com a equipe.

**Revisão:** definir uma data com a equipe.

A decisão final deve ser discutida e aprovada coletivamente, registrada em `metricas/decisao.md` e acompanhada por uma *Issue* no GitHub.

---

## ✅ 6. Conclusão

Com base nos exemplos simulados, o StartUP apresenta três pontos que merecem atenção:

1. **Ativação:** apenas 30% dos visitantes realizam uma ação importante.
2. **Retenção:** somente 20% dos usuários retornam no período considerado.
3. **Funil:** a maior queda ocorre entre aquisição e ativação, com 70%.

A equipe deve usar esses indicadores para priorizar melhorias, acompanhar os resultados e verificar se as mudanças realmente ajudam os usuários.

### 📋 Próximos passos

- [ ] Coletar pelo menos 10 respostas reais para o NPS.
- [ ] Substituir os valores simulados pelos dados reais disponíveis.
- [ ] Conferir os commits e os bugs diretamente no projeto.
- [ ] Definir a decisão coletiva e o responsável.
- [ ] Criar uma *Issue* no GitHub para acompanhar a ação.

---

**StartUP — Conectando pessoas, ideias e oportunidades.**
