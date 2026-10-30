# Quick Scan • Quality Engineering Assessment Platform 🚀

Plataforma moderna para avaliação de maturidade técnica e competências de profissionais de Quality Assurance (QA) da **NTT DATA**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 📌 Visão Geral dos 5 Pilares

A aplicação foi reestruturada de forma enxuta, clara e modular, focada em 5 pilares fundamentais:

1. **Questionário Técnico do QA (Público)**:
   - Identificação rápida do profissional (Nome, E-mail corporativo, Área de atuação).
   - Fluxo de 28 questões técnicas distribuídas nas 5 dimensões de qualidade (Automação, IA Aplicada, Engenharia de Código, CI/CD & Massa, Fundamentos).
   - Etapa final dedicada para revisão de pendências e envio opcional de repositório Git e notas de uso de IA.

2. **Autenticação Administrativa Segura**:
   - Controle de acesso para administradores e gestores de qualidade.
   - Credencial padrão de acesso: `admin@nttdata.com` / `ntt@2026`.

3. **Gestão de Usuários Administradores**:
   - Painel para cadastrar novos administradores, editar dados e revogar acessos.

4. **Analytics e Dashboard Executivo**:
   - Visão consolidada: pontuação geral, distribuição por senioridade (Júnior, Pleno, Sênior, Especialista) e radar por dimensão técnica.
   - Análise detalhada individual de cada QA com histórico de respostas e filtros por área.

5. **Gerenciamento Dinâmico de Questões (CRUD)**:
   - Módulo administrativo para cadastrar novas perguntas, editar enunciados/alternativas e remover questões obsoletas.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React (ícones), Recharts (gráficos analíticos)
- **Build Tool**: Vite
- **Persistência**: LocalStorage com sincronização reativa e integração preparada para Supabase Postgres

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Raphaildest/quick-scan.git

# Acesse o diretório do projeto
cd quick-scan

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse a aplicação no navegador em: `http://localhost:5173`

### Build para Produção

```bash
# Gera os arquivos estáticos otimizados na pasta /dist
npm run build

# Pré-visualização do build de produção localmente
npm run preview
```

---

## 🔐 Acesso Administrativo Inicial

- **URL**: Acesse a aba **"Administração"** no topo da página.
- **E-mail**: `admin@nttdata.com`
- **Senha**: `ntt@2026`

---

## 📄 Licença

Projeto desenvolvido para a governança e aceleração técnica em Quality Engineering na **NTT DATA**.
