-- ==============================================================================
-- QUICK SCAN — SCHEMA COMPLETO SUPABASE (POSTGRESQL)
-- Quality Engineering, Automação & IA (NTT DATA)
-- ==============================================================================

-- 1. Extensões
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- 2. Tabela de Hierarquia Organizacional
create table if not exists public.hierarchies (
    id uuid primary key default gen_random_uuid(),
    gerencia text not null,
    coordenacao text not null,
    squad_name text not null,
    created_at timestamptz default now()
);

-- 3. Tabela de Profissionais (QAs)
create table if not exists public.qas (
    id uuid primary key default gen_random_uuid(),
    sap text unique not null,
    name text not null,
    email text,
    hierarchy_id uuid references public.hierarchies(id) on delete set null,
    previous_scan_score numeric(5,2),
    previous_scan_classification text check (previous_scan_classification in ('Alto', 'Médio', 'Baixo', 'Não Avaliado')),
    created_at timestamptz default now()
);

-- 4. Tabela do Banco de Questões (28 Questões)
create table if not exists public.questions (
    id int primary key,
    code text not null,
    dimension text not null check (dimension in ('fundamentos', 'automacao', 'engenharia', 'cicd_massa', 'ia_aplicada')),
    dimension_label text not null,
    title text not null,
    statement text not null,
    options jsonb not null, -- [{ "id": "A", "text": "..." }, ...]
    correct_answer text not null,
    explanation text,
    weight numeric(4,2) default 1.0,
    created_at timestamptz default now()
);

-- 5. Tabela de Avaliações / Submissões do Quick Scan
create table if not exists public.assessments (
    id uuid primary key default gen_random_uuid(),
    qa_id uuid references public.qas(id) on delete cascade,
    status text default 'completed' check (status in ('in_progress', 'completed')),
    answers jsonb not null default '{}'::jsonb,
    practical_repo_url text,
    practical_storage_path text,
    practical_strategy text,
    ai_tool_used text,
    ai_prompt text,
    ai_accepted_rejected text,
    ai_hallucination_answer text,
    ai_refactoring text,
    quality_fundamentals_score numeric(5,2) not null,
    automation_readiness_score numeric(5,2) not null,
    engineering_readiness_score numeric(5,2) not null,
    cicd_data_readiness_score numeric(5,2) not null,
    ai_readiness_score numeric(5,2) not null,
    overall_score numeric(5,2) not null,
    classification text check (classification in ('Alto', 'Médio', 'Baixo')),
    predominant_profile text not null,
    transition_diagnosis text,
    recommended_action text,
    completed_at timestamptz default now()
);

-- 6. Tabela de Diagnóstico de Squads (Módulo Accelerate Team)
create table if not exists public.squad_diagnostics (
    id uuid primary key default gen_random_uuid(),
    hierarchy_id uuid references public.hierarchies(id) on delete cascade,
    stack text[] default '{}',
    web_coverage numeric(5,2) default 0,
    api_coverage numeric(5,2) default 0,
    mobile_coverage numeric(5,2) default 0,
    regressive_count int default 0,
    automated_count int default 0,
    has_pipeline boolean default false,
    has_automated_data boolean default false,
    opportunities jsonb default '[]'::jsonb,
    action_plan_text text,
    target_coverage_90_days numeric(5,2) default 70,
    evaluated_by text,
    updated_at timestamptz default now()
);

-- 7. Índices de Performance
create index if not exists idx_qas_sap on public.qas(sap);
create index if not exists idx_qas_hierarchy on public.qas(hierarchy_id);
create index if not exists idx_assessments_qa on public.assessments(qa_id);
create index if not exists idx_squad_diag_hierarchy on public.squad_diagnostics(hierarchy_id);
create index if not exists idx_questions_dimension on public.questions(dimension);

-- 8. Configuração de Storage do Supabase (Bucket para ZIPs de Código)
insert into storage.buckets (id, name, public)
values ('challenge-submissions', 'challenge-submissions', true)
on conflict (id) do nothing;

-- 9. Habilitar Row Level Security (RLS)
alter table public.hierarchies enable row level security;
alter table public.qas enable row level security;
alter table public.questions enable row level security;
alter table public.assessments enable row level security;
alter table public.squad_diagnostics enable row level security;

-- Políticas de Acesso Permissivas (Piloto / Ambiente de Demonstração e Avaliação)
create policy "Permitir leitura pública de hierarquias" on public.hierarchies for select using (true);
create policy "Permitir leitura pública de QAs" on public.qas for select using (true);
create policy "Permitir inserção/atualização de QAs" on public.qas for all using (true);

create policy "Permitir leitura de questões" on public.questions for select using (true);

create policy "Permitir leitura de avaliações" on public.assessments for select using (true);
create policy "Permitir inserção de avaliações" on public.assessments for insert with check (true);
create policy "Permitir atualização de avaliações" on public.assessments for update using (true);

create policy "Permitir controle total de diagnósticos de squad" on public.squad_diagnostics for all using (true);

-- Política de Storage para Uploads
create policy "Permitir upload no bucket challenge-submissions" on storage.objects 
for insert with check (bucket_id = 'challenge-submissions');

create policy "Permitir download no bucket challenge-submissions" on storage.objects 
for select using (bucket_id = 'challenge-submissions');
