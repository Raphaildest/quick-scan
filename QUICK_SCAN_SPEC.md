# Documento de Especificação Técnica e Funcional (SRS / Blueprint)
# Quick Scan — Quality Engineering, Automação & IA (NTT DATA)

> **Documento Base para Desenvolvimento da Aplicação Web em React + Vite + Tailwind CSS**  
> *Consolidado a partir dos arquivos de arquitetura, backend, questionário de 28 questões e protótipos HTML.*

---

## 1. Visão Geral do Produto e Objetivos Estratégicos

O **Quick Scan** é uma plataforma corporativa desenvolvida para transformar o modelo de avaliação de times de Quality Assurance e Quality Engineering. Em vez de depender de autoavaliações subjetivas (ex: "de 1 a 5, qual sua nota em Robot?") ou de entrevistas individuais longas para 100% do quadro, a solução estabelece um **assessment híbrido, objetivo e assistido por IA**.

### 1.1 Objetivos de Negócio
1. **Evidência Objetiva de Capacidade Técnica**: Medir raciocínio de engenharia, arquitetura de automação e discernimento crítico no uso de IA.
2. **Entrevista como Gate de Exceção**: Apenas divergências (ex: Scan anterior Alto x Quick Scan Baixo) ou casos inconclusivos vão para entrevista da liderança.
3. **Classificação Tripartite e Perfis de Especialidade**: Classificação em **Baixo, Médio e Alto** alinhada à proposta NTT DATA, combinada a perfis funcionais (ex: *Automation Specialist, AI-Enabled QE, Technical Enabler*).
4. **Sinergia Pessoas + Tecnologia (Accelerate Team)**: Conectar o diagnóstico de habilidades individuais dos QAs à realidade técnica das Squads (stack, cobertura de testes, massa, pipeline) para gerar **Planos de Aceleração Acionáveis**.

---

## 2. Personas e Módulos da Aplicação

A aplicação será unificada em uma SPA moderna (Single Page Application) com controle de contexto e perfis:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PLATAFORMA UNIFICADA QUICK SCAN & ANALYTICS                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  PORTAL DO QA    │          │ PORTAL ANALYTICS │          │ ACCELERATE TEAM  │
│  (Assessment &   │          │ (Liderança NTT & │          │ (Diagnóstico &   │
│   Desafios)      │          │  Gestores)       │          │  Planos Squads)  │
└──────────────────┘          └──────────────────┘          └──────────────────┘
```

### 2.1 Perfil 1: QA / Profissional de Qualidade
- Autenticação/Identificação por SAP (recuperação automática de Gerência, Coordenação e Squad).
- Realização do **Assessment Técnico Objetivo** (18 a 20 questões sorteadas das 28 cadastradas).
- Execução do **Desafio Prático de Automação** (envio de Git ou arquivo ZIP + justificativa).
- Execução do **Desafio de IA Aplicada** (prompt utilizado, sugestões aceitas/rejeitadas, análise de alucinação e refatoração assistida).

### 2.2 Perfil 2: Líder NTT & Gestores de Engenharia
- Visão executiva com filtros dinâmicos em cascata (*Gerência → Coordenação → Squad*).
- **Matriz de Transição**: Cruzamento comparativo entre **Scan Anterior vs. Quick Scan Atual**.
- **Skill Radar Consolidado** por coordenação e individual por profissional.
- Tabela de profissionais com Raio-X técnico, submissões de código e justificativas de IA.
- Recomendações automáticas de tomada de decisão: `Manter / Multiplicar`, `Habilitar`, `Reavaliar` ou `Substituir`.

### 2.3 Perfil 3: Accelerate Team (Especialistas de Aceleração)
- Diagnóstico técnico de squads: Stack utilizada, % de automação Web/API/Mobile, tamanho do regressivo, maturidade de pipeline e massa de dados.
- Mapeamento de oportunidades de IA (geração de casos de teste, manutenção de suítes).
- **Gerador de Plano de Ação Combinado** (Pessoas + Tecnologia) com metas a 90 dias.

---

## 3. Modelo de Avaliação, Perguntas e Rubrica

### 3.1 Dimensões e Pesos de Avaliação

| Dimensão | Instrumento de Avaliação | Peso Geral |
|---|---|:---:|
| **Fundamentos de Qualidade** | Assessment (Risco, Pirâmide, Regressão, Root Cause) | 10% |
| **Automação de Testes** | Assessment + Desafio Prático (API, UI, Seletores, Flakiness) | 30% |
| **Engenharia / Código** | Assessment + Code Review + Desafio Prático | 20% |
| **CI/CD e Massa de Dados** | Assessment (Gates, Paralelismo, Gestão de Massa) | 10% |
| **IA aplicada à Qualidade** | Assessment + Desafio de IA (Estratégia, Prompts, Alucinação) | 20% |
| **Análise Crítica e Decisão** | Defesa técnica das escolhas e filtros sobre sugestões de IA | 10% |
| **TOTAL** | | **100%** |

### 3.2 Scores Principais (Readiness Framework)
1. **Quality Fundamentals Score (0-100%)**
2. **Automation Readiness Score (0-100%)**
3. **Engineering Readiness Score (0-100%)**
4. **AI Readiness Score (0-100%)**
5. **CI/CD & Data Readiness Score (0-100%)**
6. **Quick Scan Score Final (Ponderado)**

### 3.3 Regras de Classificação e Gate Mínimo
- **Alto (80% - 100%)**: Capacidade autônoma de engenharia e potencial de habilitar outros profissionais.
  - *Gate Mínimo de Automação*: Para obter classificação final `Alto`, o score de Automação deve ser $\ge 70\%$, impedindo que notas puramente teóricas inflem o resultado.
- **Médio (60% - 79%)**: Profissional apto para o dia a dia, com gaps específicos a serem cobertos por trilhas de aceleração.
- **Baixo (0% - 59%)**: Gap técnico relevante; direcionado para habilitação intensiva, readequação de escopo ou substituição.

### 3.4 Matriz de Perfis Predominantes
- **Technical Enabler**: Alto em Automação + Alto em Engenharia + Alto em IA.
- **AI-Enabled QE**: Forte sinergia entre Automação e IA aplicada.
- **Automation Specialist**: Fortíssima competência em automação de código/suítes.
- **Quality Engineer**: Perfil equilibrado em fundamentos, automação e esteira.
- **Quality Analyst**: Destaque em fundamentos, planejamento e negócios; gap em código/automação.
- **Emerging QE**: Potencial em desenvolvimento com base inicial de testes.

### 3.5 Matriz de Transição (Scan Anterior x Quick Scan)

| Scan Anterior | Quick Scan | Diagnóstico do Sistema | Ação Recomendada |
|---|---|---|---|
| **Alto** | **Alto** | Desempenho confirmado | Manter / Habilitador Técnico |
| **Médio** | **Alto** | Evolução consistente comprovada | Manter / Potencial Multiplicador |
| **Baixo** | **Alto** | Evolução relevante / Salto de maturidade | Manter / Reconhecimento |
| **Alto** | **Baixo** | **Divergência Crítica** | **Gate: Entrevista Obrigatória** |
| **Médio** | **Médio** | Desempenho estável | Habilitar nos gaps pontuais |
| **Baixo** | **Baixo** | Gap técnico persistente | Avaliar substituição ou plano emergencial |
| **Não Avaliado** | **Alto/Médio/Baixo** | Primeira avaliação estruturada | Conforme resultado do Quick Scan |

---

## 4. Banco de Questões e Desafios Integrados (28 Questões)

O sistema possui cadastrado o banco completo extraído do `Questionário pro Quick Scan.txt`:

### Bloco 1: Assessment Teórico e Situacional
1. **Fundamentos (Q1-Q4)**: Priorização por risco, Pirâmide de testes (UI vs API), Estratégia de regressão em 600 cenários, Análise de bug em produção (fuga).
2. **Automação (Q5-Q12)**: Cenário para automação, Diagnóstico de testes instáveis (*flaky tests*), Substituição de *sleep* fixo por esperas explícitas, Reuso e componentes de login, Raciocínio API x UI em cálculos bancários, Seletores resilientes (`data-testid`), Independência de testes e efeito cascata, Interpretação de métricas de cobertura.
3. **Engenharia e Código (Q13-Q16)**: Code review de script Python com credenciais/massa hardcoded e sleeps, Manutenibilidade para suítes de grande escala, Revisão de PR de código gerado por IA, Resolução de duplicação em dezenas de testes.
4. **CI/CD e Massa (Q17-Q20)**: Momento ideal de execução na pipeline (gates), Estratégias para regressão lenta de 4 horas, Gestão estrutural de massa (usuários bloqueados), Quality gate bloqueante em falhas críticas de pagamento.
5. **IA Aplicada (Q21-Q28)**: Validação de testes gerados por IA, Identificação de alucinações e regras de negócio inventadas, Engenharia de prompt contextualizado, Refatoração de scripts imperfeitos gerados por IA, LGPD e dados sensíveis/corporativos enviados para LLMs, Papel do QE na era dos Agentes Autônomos, Casos práticos reais de uso de IA, Critérios de desconfiança e validação cruzada.

### Bloco 2: Desafio Prático de Automação
- **Cenário**: Aplicação de pagamentos/transferência bancária com Login → Consulta → Transferência → Validação de Saldo/Comprovante.
- **História de Usuário & Critérios de Aceite**: Autenticação, conta destino existente, valor maior que zero, saldo suficiente, atualização de saldo e emissão de comprovante.
- **Submissão**: Campo de URL de repositório (GitHub/GitLab) ou upload de arquivo ZIP, com preenchimento da estratégia adotada (quais cenários em API, quais em UI).
- **Rubrica**: Automação funcional (25%), Manutenibilidade e arquitetura (20%), Estratégia (15%), Reuso (10%), Assertions (10%), Massa (10%), Evidências/Logs (5%), README (5%).

### Bloco 3: Desafio de IA Aplicada
- **Tarefa 1**: Análise de história propositalmente incompleta de chave PIX.
- **Tarefa 2**: Registro do Prompt exato utilizado na ferramenta de IA (Copilot, ChatGPT, Claude, etc.).
- **Tarefa 3**: Discriminação das respostas da IA: quais foram aceitas, quais foram descartadas e por quê.
- **Tarefa 4 (Detecção de Alucinação)**: Análise crítica da premissa errônea *"Uma chave PIX de CPF pode pertencer simultaneamente a contas de bancos diferentes"*.
- **Tarefa 5 (Code Review com IA)**: Refatoração assistida por IA de um script bruto Selenium/Python com seletores instáveis e `time.sleep(10)`, informando quais sugestões foram adotadas e quais foram rejeitadas.

---

## 5. Arquitetura de Software Proposta (React + Vite + Tailwind)

### 5.1 Stack Tecnológico
- **Bundler & Build**: `Vite` (rápido, HMR instantâneo, compatível com TypeScript).
- **Core Library**: `React 18 / 19` com `TypeScript`.
- **Estilização**: `Tailwind CSS v3 / v4` com paleta corporativa NTT DATA (Navy `#071b33`, Royal Blue `#0a66c2`, Cyan `#16b8d4`, Emerald `#16855b`, Amber `#d97706`, Rose `#c2413b`).
- **Ícones**: `lucide-react`.
- **Gráficos & Visualização**: `recharts` (Skill Radars, Bar Charts comparativos, Gauge de Readiness).
- **Gerenciamento de Estado**: React Context API + LocalStorage Adapter (com camada de serviço desacoplada para conexão trivial a APIs REST ou Supabase).

### 5.2 Estrutura de Diretórios Recomendada
```text
quick-scan-app/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types/
    │   ├── qa.ts              # Tipos de QA, SAP, Coordenações, Hierarquia
    │   ├── assessment.ts      # Tipos de Questões, Respostas, Rubricas
    │   ├── results.ts         # Scores, Readiness, Perfis, Matriz de Transição
    │   └── accelerate.ts      # Diagnóstico técnico de squads e backlog
    ├── data/
    │   ├── questionsBank.ts   # As 28 questões completas tipadas
    │   ├── initialQAs.ts      # Base demonstrativa com dados de exemplo (68 QAs)
    │   ├── hierarchyData.ts   # Gerências, Coordenações e Squads
    │   └── accelerateMock.ts  # Diagnósticos pré-preenchidos de squads
    ├── services/
    │   ├── storageService.ts  # Persistência em LocalStorage / Mock API
    │   └── scoringEngine.ts   # Algoritmo de cálculo de readiness e perfis
    ├── context/
    │   ├── AuthContext.tsx    # Controle de sessão (QA logado vs Gestor)
    │   └── AssessmentContext.tsx # Estado do questionário em andamento
    ├── components/
    │   ├── common/
    │   │   ├── Header.tsx     # Barra superior com branding NTT DATA e alternador de perfil
    │   │   ├── MetricCard.tsx # Cartões de KPI com tendências
    │   │   └── StatusBadge.tsx# Badges coloridos (Alto, Médio, Baixo, Ação)
    │   ├── qa-portal/
    │   │   ├── IdentificationStep.tsx # Busca por SAP e confirmação
    │   │   ├── AssessmentQuestion.tsx # Renderizador de questão (única, múltipla, aberta)
    │   │   ├── PracticalChallenge.tsx # Envio de código / git do desafio
    │   │   ├── AiChallenge.tsx        # Perguntas reflexivas sobre IA
    │   │   └── SubmissionSuccess.tsx  # Tela final de confirmação
    │   ├── analytics-portal/
    │   │   ├── FiltersBar.tsx         # Filtros em cascata
    │   │   ├── KpiOverview.tsx        # Indicadores gerais da coordenação
    │   │   ├── ReadinessBars.tsx      # Barras de prontidão por dimensão
    │   │   ├── QAsTable.tsx           # Lista detalhada com Scan vs Quick Scan
    │   │   ├── RadarModal.tsx         # Modal com Raio-X detalhado do QA
    │   │   └── TransitionMatrixView.tsx # Matriz visual 3x3 de evolução
    │   └── accelerate-portal/
    │       ├── SquadDiagnosticForm.tsx # Formulário de stack, cobertura e pipeline
    │       ├── OpportunitiesChecklist.tsx # Oportunidades de automação e IA
    │       └── ActionPlanReport.tsx    # Plano integrado Pessoas + Tecnologia
    └── pages/
        ├── QAPortalPage.tsx
        ├── AnalyticsPage.tsx
        └── AcceleratePage.tsx
```

---

## 6. Algoritmo do Motor de Scoring (`scoringEngine.ts`)

O cálculo dos readiness scores e da classificação final é puramente determinístico:

```typescript
// Pseudocódigo da lógica de cálculo
interface AssessmentInput {
  answers: Record<string, string | string[]>;
  practicalChallenge: {
    functionalScore: number; // 0 a 100
    architectureScore: number;
    strategyScore: number;
    assertionsScore: number;
    dataHandlingScore: number;
  };
  aiChallenge: {
    promptQualityScore: number;
    criticalAnalysisScore: number;
    hallucinationDetection: boolean;
    refactoringQualityScore: number;
  };
}

function calculateScores(input: AssessmentInput) {
  // 1. Cálculo das dimensões por peso de questões corretas + desafios
  const qualityFundamentals = calculateDimension('fundamentos', input);
  const automationReadiness = calculateDimension('automacao', input, input.practicalChallenge);
  const engineeringReadiness = calculateDimension('engenharia', input, input.practicalChallenge);
  const cicdDataReadiness = calculateDimension('cicd_massa', input);
  const aiReadiness = calculateDimension('ia_aplicada', input, input.aiChallenge);

  // 2. Score Final Ponderado
  const overallScore = Math.round(
    qualityFundamentals * 0.10 +
    automationReadiness * 0.30 +
    engineeringReadiness * 0.20 +
    cicdDataReadiness * 0.10 +
    aiReadiness * 0.20 +
    calculateCriticalDecision(input) * 0.10
  );

  // 3. Classificação com Gate Mínimo de Automação
  let classification: 'Alto' | 'Médio' | 'Baixo' = 'Baixo';
  if (overallScore >= 80 && automationReadiness >= 70) {
    classification = 'Alto';
  } else if (overallScore >= 60) {
    classification = 'Médio';
  } else {
    classification = 'Baixo';
  }

  // 4. Perfil Predominante
  const profile = determineProfile({
    automation: automationReadiness,
    engineering: engineeringReadiness,
    ai: aiReadiness,
    fundamentals: qualityFundamentals
  });

  return {
    dimensions: {
      qualityFundamentals,
      automationReadiness,
      engineeringReadiness,
      cicdDataReadiness,
      aiReadiness
    },
    overallScore,
    classification,
    profile
  };
}
```

---

## 7. Opções de Arquitetura e Decisão de Implementação

### Opção A: Front-end SPA Rico com State Mock + LocalStorage (Recomendada para Piloto Imediato)
- **Como funciona**: Aplicação completa em React + Tailwind executando 100% no navegador, com dados mockados realistas dos 68 QAs, formulário funcional que recalcula scores em tempo real e armazena respostas no `localStorage`.
- **Vantagens**:
  - Zero atrito de infraestrutura corporativa ou dependência de aprovação de segurança da informação.
  - Demonstração navegável impecável e imediata para validação com gestores NTT e clientes.
  - Código desacoplado por serviços (`api/storage`), facilitando a conexão futura com backend.
- **Desvantagens**: Os dados ficam salvos localmente no navegador de cada usuário.

### Opção B: Front-end React + Supabase (BaaS)
- **Como funciona**: React consome PostgreSQL, autenticação corporativa e Storage de arquivos no Supabase.
- **Vantagens**: Persistência centralizada em nuvem, upload real de arquivos ZIP de automação.
- **Desvantagens**: Requer provisionamento e permissão de rede corporativa.

### Opção C: Fullstack React + Node/Express / NestJS + Azure SQL (Ambiente Corporativo Definitivo)
- **Como funciona**: Backend dedicado com integração ao Active Directory/SSO corporativo.
- **Vantagens**: Aderência total às políticas de TI corporativa.
- **Desvantagens**: Maior prazo de desenvolvimento inicial.

### **Recomendação Estratégica**:
Iniciar pela **Opção A** (SPA React Vite + Tailwind modularizada), garantindo que a interface, todos os fluxos de QA, dashboard analítico e módulo accelerate estejam 100% funcionais e responsivos. A arquitetura de código deve manter as camadas de serviço (`services/api.ts`) isoladas para que a transição para a **Opção B ou C** ocorra sem reescrever nenhum componente de UI.

---

## 8. Roteiro de Implementação Passo a Passo (Próximos Passos)

1. **Inicialização do Projeto**:
   - `npm create vite@latest quick-scan -- --template react-ts`
   - Configuração de Tailwind CSS e `lucide-react`
2. **Camada de Modelos e Dados (`src/data/`)**:
   - Migrar as 28 questões do arquivo `.txt` para um catálogo TypeScript fortemente tipado.
   - Criar base mock de QAs, gerências, coordenações e resultados do Scan anterior.
3. **Desenvolvimento dos Módulos**:
   - **Módulo 1**: Portal do QA (identificação por SAP, carrossel de assessment, desafios práticos e de IA).
   - **Módulo 2**: Portal Analytics (filtros hierárquicos, cartões de KPI, Skill Radar e tabela de transição).
   - **Módulo 3**: Módulo Accelerate Team (diagnóstico de squads e gerador de plano de ação).
4. **Revisão e Testes**:
   - Validação de cálculos da rubrica e responsividade mobile/desktop.

