# Plano de Reestruturação e Simplificação — Quick Scan NTT DATA

> **Arquivo de Planejamento Executivo:** `reestruturacao-quickscan.md`  
> **Objetivo:** Reformular e modernizar a aplicação Quick Scan alinhando-a estritamente à visão original dos documentos (`quickscan.html` e `results.html`), eliminando complexidades desnecessárias e focando nos 4 pilares solicitados:  
> 1. Login de Administradores  
> 2. Cadastro e Controle de Acesso de Administradores  
> 3. Link Público do Questionário para o QA (Nome, E-mail, Área de Atuação + Perguntas)  
> 4. Dashboard Analítico (Visão Geral Consolidada + Visão Individual por QA)

---

## 1. Overview & Diagnóstico de Simplificação

### 1.1 O que estava confuso na versão anterior:
- Mistura de portais na mesma navegação superior aberta a qualquer usuário (QA, Líder, Accelerate).
- Obrigatoriedade de busca por SAP com alocações hierárquicas rígidas pré-cadastradas que travavam o preenchimento.
- Excesso de fluxos paralelos e termos que não faziam parte do escopo essencial.

### 1.2 O que será entregue (Arquitetura Simples e Direta):
A aplicação terá apenas **duas jornadas completamente independentes e desacopladas**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUICK SCAN NTT DATA                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────────────┐       ┌───────────────────────────────────┐
│     ÁREA PÚBLICA (LINK DO QA)     │       │   ÁREA ADMINISTRATIVA RESTRITA    │
│  (Sem login / Acesso Imediato)    │       │     (Login com E-mail e Senha)    │
├───────────────────────────────────┤       ├───────────────────────────────────┤
│ 1. Identificação Rápida:          │       │ 1. Tela de Login Administrativo   │
│    - Nome Completo                │       │ 2. Gestão / Cadastro de Usuários  │
│    - E-mail Corporativo           │       │    Administradores                │
│    - Área de Atuação / Squad      │       │ 3. Dashboard Analítico:           │
│ 2. Questionário Modernizado       │       │    - Visão Geral (Métricas globais│
│    (Baseado no quickscan.html)    │       │      de prontidão, médias, gráficos│
│ 3. Desafio Técnico Prático / IA   │       │      e distribuição Alto/Méd/Bx)  │
│ 4. Confirmação de Submissão       │       │    - Visão Individual (Tabela QAs,│
│                                   │       │      Raio-X, respostas e gaps)    │
└───────────────────────────────────┘       └───────────────────────────────────┘
```

---

## 2. Project Type & Tech Stack

- **Project Type:** WEB (Single Page Application moderna e responsiva)
- **Framework Core:** React 18 + TypeScript + Vite
- **Estilização:** Tailwind CSS (Paleta corporativa NTT DATA: Navy `#071b33`, Blue `#0a66c2`, Cyan `#16b8d4`, Emerald `#16855b`, Amber `#d97706`, Rose `#c2413b` — em conformidade total com o *Purple Ban*)
- **Ícones:** `lucide-react`
- **Gráficos & Visualização:** `recharts` (Radar de competências, barras comparativas e KPIs)
- **Autenticação & Banco de Dados:** Supabase (PostgreSQL + Supabase Auth) com camada de serviço desacoplada e fallback automático para LocalStorage (garantindo que o sistema funcione 100% no navegador para testes e validações imediatas).

---

## 3. Estrutura de Arquivos Simplificada

```text
src/
├── types/
│   ├── auth.ts              # Usuário admin, papéis e permissões
│   ├── qaSubmission.ts      # Dados da submissão do QA (nome, email, área, respostas)
│   └── assessment.ts        # Estrutura das questões, gabaritos e dimensões
├── data/
│   ├── questionsBank.ts     # Banco de questões revisado (modernizado do quickscan.html)
│   └── mockAdminData.ts     # Usuários administradores e submissões demonstrativas
├── services/
│   ├── authService.ts       # Login de admin, sessão e gestão de usuários administradores
│   ├── submissionService.ts # Gravação pública de respostas do QA e leitura analítica
│   └── analyticsEngine.ts   # Cálculo de readiness (Automação, IA, Engenharia, CI/CD, Fundamentos)
├── components/
│   ├── common/
│   │   ├── Navbar.tsx       # Barra superior com branding NTT DATA e link discreto para Admin
│   │   └── StatusBadge.tsx  # Badges de classificação (Alto, Médio, Baixo)
│   ├── public-qa/
│   │   ├── QAIdentification.tsx # Nome, E-mail, Área de Atuação
│   │   ├── QAQuestionnaire.tsx  # Interface do questionário (inspirada em quickscan.html)
│   │   ├── QAPracticalBlock.tsx # Desafio prático / IA simplificado
│   │   └── QASuccessScreen.tsx  # Confirmação de recebimento
│   └── admin/
│       ├── AdminLogin.tsx       # Tela de login limpa e segura
│       ├── AdminUserManagement.tsx # Lista e cadastro de novos administradores
│       ├── AnalyticsOverview.tsx   # Dashboard Geral (KPIs, Médias, Gráficos)
│       ├── QASubmissionsTable.tsx  # Tabela com busca, filtros e exportação CSV
│       └── QADetailModal.tsx       # Detalhamento individual (Raio-X de respostas do QA)
├── pages/
│   ├── QAPublicPage.tsx     # Página do Questionário (Rota pública '/')
│   ├── AdminLoginPage.tsx   # Página de Login ('/admin/login')
│   └── AdminDashboardPage.tsx # Painel Administrativo ('/admin/dashboard')
└── App.tsx                  # Roteamento direto e limpo entre Área Pública e Admin
```

---

## 4. Detalhamento dos Módulos

### Módulo 1: Link Público do Questionário do QA
- **Objetivo:** Qualquer QA recebe o link (ex: `https://meu-dominio/`) e responde sem atrito.
- **Campos Iniciais:**
  - Nome Completo (obrigatório)
  - E-mail Corporativo (obrigatório, validação de formato)
  - Área de Atuação / Squad (ex: *Investimentos, Pagamentos, Cartões, Mobile, etc.*)
- **Questionário Técnico:**
  - Apresentação organizada por dimensões (Automação de Testes, Engenharia de Código, IA Aplicada, CI/CD e Massa, Fundamentos de Qualidade).
  - Cenários situacionais objetivos com alternativas A, B, C, D (idênticos à proposta do `quickscan.html`).
  - Navegação fluida entre perguntas com indicação de progresso.
- **Desafio Prático & IA:**
  - Inserção de link do repositório/ZIP (opcional ou obrigatório conforme parametrização).
  - Breve registro de onde utilizou IA e quais sugestões aceitou ou rejeitou.
- **Finalização:** Tela de agradecimento informando que as respostas foram consolidadas para a liderança.

### Módulo 2: Autenticação & Gestão de Administradores
- **Objetivo:** Garantir que somente líderes e gestores autorizados tenham acesso aos resultados.
- **Login Administrativo:**
  - Formulário com E-mail e Senha.
  - Credencial inicial configurada (ex: `admin@nttdata.com` / `ntt@admin2026`).
- **Controle de Acesso de Administradores:**
  - Visualização dos administradores cadastrados com data de inclusão e status.
  - Formulário para cadastrar novos administradores (Nome, E-mail, Senha temporária, Perfil: Administrador / Gestor).
  - Opção de remover ou desativar acessos.

### Módulo 3: Dashboard Analítico — Visão Geral Consolidada
- **Objetivo:** Modernizar a visão do `results.html` com foco em tomada de decisão da liderança.
- **Filtros Globais:** Por Área de Atuação, Classificação (Alto, Médio, Baixo) e Período.
- **KPIs em Destaque:**
  - Total de QAs que responderam.
  - % Automation Ready.
  - % AI Ready.
  - Médias consolidadas por dimensão (Automação, IA, Engenharia, CI/CD, Fundamentos).
- **Gráficos Visuais:**
  - Barras de Prontidão Técnica consolidada.
  - Distribuição percentual de maturidade (Alto / Médio / Baixo).

### Módulo 4: Dashboard Analítico — Visão Individual por QA
- **Objetivo:** Permitir ao líder analisar em profundidade cada profissional avaliado.
- **Tabela de Profissionais:**
  - Nome, E-mail, Área de Atuação, Score Geral (0-100%), Classificação (Alto, Médio, Baixo), Data de Envio.
  - Campo de busca instantânea (por nome, e-mail ou área).
  - Exportação da lista para CSV.
- **Modal de Raio-X Individual:**
  - Gráfico Radar com as 5 dimensões do profissional.
  - Resumo de pontos fortes e principais gaps detectados.
  - Tabela detalhada questão a questão: o que o QA respondeu x resposta esperada x justificativa técnica.
  - Respostas do desafio prático e curadoria de IA.
  - Recomendação estratégica gerada automaticamente: *Manter / Habilitar / Reavaliar*.

---

## 5. Task Breakdown (Plano de Execução)

| Task ID | Nome da Tarefa | Especialista | Skills Recomendadas | Entrada → Saída → Verificação | Status |
|:---:|---|---|---|---|:---:|
| **TASK-01** | **Limpeza & Estrutura de Tipos** | `architect` / `frontend-specialist` | `@clean-code` | **In:** Código anterior confuso<br>**Out:** Modelos concisos em `src/types/` (`auth.ts`, `qaSubmission.ts`, `assessment.ts`)<br>**Verify:** Tipos compilam sem dependências legadas. | **Concluído** ✅ |
| **TASK-02** | **Serviço de Autenticação & Usuários Admin** | `security-auditor` / `backend-specialist` | `@clean-code`, `@api-patterns` | **In:** Necessidade de controle de acesso admin<br>**Out:** `src/services/authService.ts` com login, sessão persistida e CRUD de administradores<br>**Verify:** Login com sucesso, bloqueio de rota não autenticada e criação de novo admin. | **Concluído** ✅ |
| **TASK-03** | **Fluxo Público do QA (Questionário Modernizado)** | `frontend-specialist` | `@frontend-design`, `@clean-code` | **In:** Protótipo `quickscan.html` e banco de questões<br>**Out:** `src/pages/QAPublicPage.tsx` e componentes em `src/components/public-qa/`<br>**Verify:** QA preenche Nome, E-mail, Área, responde as questões e envia com sucesso. | **Concluído** ✅ |
| **TASK-04** | **Motor de Analytics & Persistência de Respostas** | `backend-specialist` / `frontend-specialist` | `@clean-code` | **In:** Submissões recebidas do QA<br>**Out:** `src/services/analyticsEngine.ts` e `submissionService.ts`<br>**Verify:** Cálculo correto de scores (Geral, Automação, IA, etc.) e classificação. | **Concluído** ✅ |
| **TASK-05** | **Dashboard Analítico — Visão Geral & Individual** | `frontend-specialist` | `@frontend-design`, `@clean-code` | **In:** Protótipo `results.html`<br>**Out:** `src/pages/AdminDashboardPage.tsx` com KPIs gerais, filtros e tabela com modal Raio-X individual<br>**Verify:** Filtros funcionam, métricas batem e modal exibe respostas do QA. | **Concluído** ✅ |
| **TASK-06** | **Roteamento Limpo & Validação de Build** | `frontend-specialist` | `@lint-and-validate` | **In:** Todos os componentes refatorados<br>**Out:** `src/App.tsx` com alternador limpo entre Rota Pública do QA e Rota Admin autenticada<br>**Verify:** `npm run build` executa com sucesso e zero erros. | **Concluído** ✅ |

---

## 6. Phase X: Critérios de Aceite & Verificação Final

- [x] **Sem Barreiras para o QA:** O questionário pode ser acessado diretamente sem exigência de login, pedindo apenas Nome, E-mail e Área de Atuação.
- [x] **Segurança de Acesso:** O Dashboard e a Gestão de Administradores exigem login com e-mail e senha.
- [x] **Gestão de Administradores:** O administrador logado consegue criar novos usuários administradores para liberar acesso à equipe de liderança.
- [x] **Visão Geral e Individual:** O dashboard apresenta com clareza os KPIs agregados da empresa e permite abrir qualquer QA para auditar suas respostas individualmente.
- [x] **Zero Roxo (Purple Ban):** A interface respeita a paleta NTT DATA corporativa (Navy, Blue, Cyan, Emerald, Amber, Rose).
- [x] **Build de Produção:** `npm run build` compila limpo e sem advertências.

