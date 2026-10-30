---
version: 1.0.0
name: NTT DATA Quick Scan Design System
description: Sistema visual corporativo NTT DATA para a plataforma Quick Scan & Analytics
colors:
  primary: "#071b33"
  primary-hover: "#0a2647"
  secondary: "#0a66c2"
  secondary-hover: "#084e96"
  accent: "#16b8d4"
  accent-hover: "#119bb3"
  success: "#16855b"
  warning: "#d97706"
  danger: "#c2413b"
  surface: "#ffffff"
  background: "#f8fafc"
  muted: "#64748b"
  border: "#e2e8f0"
typography:
  display:
    fontFamily: Inter, Plus Jakarta Sans, sans-serif
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: Inter, Plus Jakarta Sans, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: Inter, Plus Jakarta Sans, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter, Plus Jakarta Sans, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

# NTT DATA Quick Scan — Design Specification

## Overview
Design corporativo, limpo e direto desenvolvido para o Quick Scan NTT DATA. Foco absoluto em clareza de leitura, divisão intuitiva entre a área pública do QA e a área administrativa da liderança, e conformidade rigorosa com a identidade visual da NTT DATA.

## Colors
- **Navy Corporativo (`#071b33`)**: Cor estrutural para barras de cabeçalho, navegação e hierarquia principal.
- **Royal Blue (`#0a66c2`)**: Cor de ação, botões primários e links de navegação.
- **Cyan (`#16b8d4`)**: Destaques de inovação, automação e indicadores de progresso.
- **Emerald (`#16855b`)**: Status Alto e confirmações de sucesso.
- **Amber (`#d97706`)**: Status Médio e alertas preventivos.
- **Rose (`#c2413b`)**: Status Baixo e pontos de atenção crítica.
- **Proibição de Roxo (Purple Ban)**: Nenhum tom de roxo, violeta ou magenta é utilizado no sistema visual.

## Typography
Uso de fontes neutras e legíveis (`Inter` / `Plus Jakarta Sans`) com peso estruturado para facilitar a leitura rápida de questões técnicas e relatórios analíticos.

## Layout
- **Jornada do QA**: Layout focado em cartão centralizado, com formulário de identificação limpo (Nome, E-mail, Área) e fluxo progressivo de questões com alternativas visualmente claras.
- **Jornada Administrativa**: Layout em painel executivo com navegação lateral/tabs limpas entre Visão Geral, Visão Individual por QA e Gestão de Usuários Administradores.

## Elevation & Depth
Sombras suaves (`shadow-sm` e `shadow-md`), bordas finas em cinza neutro (`border-slate-200`) e cantos arredondados modernos (`rounded-xl` / `rounded-2xl`).

## Do's and Don'ts
- **DO**: Manter a identificação do QA em 3 campos simples: Nome, E-mail Corporativo e Área de Atuação.
- **DO**: Proteger o Dashboard e o Controle de Administradores através de autenticação por e-mail e senha.
- **DON'T**: Não exigir login para o QA responder o questionário.
- **DON'T**: Não utilizar gradientes roxos ou elementos visuais complexos que distraiam da tomada de decisão.

