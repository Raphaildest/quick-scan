# Quick Scan — Aplicação Completa com Supabase

## Goal
Construir a aplicação unificada Quick Scan (Portal do QA, Portal Analytics da Liderança e Módulo Accelerate Team) em React + Vite + Tailwind CSS, com camada de serviço desacoplada e arquitetura relacional pronta para Supabase (PostgreSQL, Storage e Auth).

## Tasks
- [x] Task 1: Gerar o schema relacional SQL e seed do Supabase (`supabase/schema.sql` com tabelas `hierarchies`, `qas`, `questions`, `assessments`, `squad_diagnostics`, RLS e bucket `challenge-submissions`) → Verify: Arquivo SQL sintaticamente válido e estruturado.
- [x] Task 2: Configurar o projeto React + Vite + TypeScript + Tailwind CSS com as dependências essenciais (`lucide-react`, `recharts`, `@supabase/supabase-js`, `canvas-confetti`) → Verify: Build Vite executa sem erros.
- [x] Task 3: Definir tipos TypeScript fortemente tipados (`types/qa.ts`, `types/assessment.ts`, `types/accelerate.ts`, `types/supabase.ts`) → Verify: Tipos cobrem todas as entidades do Blueprint.
- [x] Task 4: Migrar o banco completo de 28 questões e base demonstrativa de QAs/Hierarquias (`data/questionsBank.ts`, `data/initialQAs.ts`, `data/hierarchyData.ts`) → Verify: 28 questões cadastradas com gabaritos e pesos.
- [x] Task 5: Implementar o motor de scoring determinístico (`services/scoringEngine.ts`) com cálculo de Readiness (Automação, IA, Engenharia, CI/CD, Fundamentos), gate de 70% e matriz de perfis → Verify: Testes de cálculo de score e classificação Alto/Médio/Baixo.
- [x] Task 6: Criar a camada de serviço desacoplada (`services/dataService.ts`) e cliente Supabase (`services/supabaseClient.ts`) com suporte híbrido (LocalStorage / Supabase) e upload de Git/ZIP → Verify: Alternância transparente entre Local e Supabase.
- [x] Task 7: Desenvolver o Portal do QA (`components/qa-portal/`) com fluxo de identificação por SAP, avaliação em etapas, navegação direta por pílulas de questão, preenchimento demo, desafios práticos e IA, e tela de confirmação com confetes → Verify: QA conclui avaliação e gera resultado.
- [x] Task 8: Desenvolver o Portal Analytics (`components/analytics-portal/`) com filtros em cascata (Gerência > Coordenação > Squad), KPIs executivos, Matriz de Transição 3x3 com detecção de divergência crítica, Skill Radar e exportação CSV → Verify: Renderização dinâmica dos dados e comparativo com Scan Anterior.
- [x] Task 9: Desenvolver o Módulo Accelerate Team (`components/accelerate-portal/`) com diagnóstico de squad (stack, cobertura, regressivo), gerador de plano de aceleração combinado e exportação para Markdown (.md) → Verify: Geração e salvamento do plano a 90 dias.
- [x] Task 10: Integrar navegação unificada no `App.tsx`, polimento visual corporativo NTT DATA (estrita observância da paleta NTT DATA e Purple Ban) e validação do build (`npm run build`) → Verify: Build de produção concluído com sucesso.

## Done When
- [x] Todos os 3 portais (QA, Analytics, Accelerate) funcionam de forma responsiva e integrada.
- [x] O motor calcula todos os scores, perfis e recomendações com fidelidade às regras de negócio.
- [x] O script SQL do Supabase está completo com tabelas, RLS e dados iniciais.
- [x] A aplicação roda localmente e está pronta para plugar as credenciais do Supabase a qualquer momento.

## Notes
- Autenticação: Qualquer e-mail válido aceito no fluxo corporativo + acesso por SAP para QAs.
- Supabase: Arquitetura desacoplada permite rodar 100% no front enquanto o usuário cria o projeto no Supabase, bastando preencher `.env`.
- Desafio Prático: Suporte a URL de repositório Git e upload de ZIP no Storage.
