# AI Agent Orchestrator (AGENTS.md)

Welcome! This file serves as the central directory and orchestrator for AI assistants working on this project. It provides the necessary context, rules, and skills required to contribute effectively to the codebase.

## Project Stack
- **Framework:** Angular v20+ (Standalone components, new control flow `@if`/`@for`, Signals)
- **Styling:** Tailwind CSS v4

## Core Documentation & Rules
Before writing any code or proposing architecture changes, AI agents **MUST** align with the principles outlined in these files:

1. **[Best Practices](./best-practices.md):** The fundamental rules for TypeScript, Angular, and Accessibility in this repository.
2. **[Copilot Instructions](./.github/copilot-instructions.md):** Detailed persona, syntax examples, and comprehensive styling/coding guidelines for modern Angular development.

## AI Skills Directory (`.agents/skills/`)
This project uses specialized AI skills to standardize development. When asked to perform specific tasks, agents should refer to the corresponding skill for step-by-step instructions and references:

- **[Angular Component](./.agents/skills/angular-component/SKILL.md)**
  - **Use when:** Creating new UI components or refactoring existing ones.
  - **Focus:** Signal-based `input()`/`output()`, `OnPush` change detection, host bindings in the decorator, and accessibility.

- **[Angular Signals](./.agents/skills/angular-signals/SKILL.md)**
  - **Use when:** Implementing state management or reactive data flows.
  - **Focus:** `signal()`, `computed()`, `linkedSignal()`, `effect()`, and transitioning from RxJS (Observables) to Signals where appropriate.

- **[Frontend Design](./.agents/skills/frontend-design/SKILL.md)**
  - **Use when:** Creating distinctive, high-quality UI/UX with premium aesthetics.
  - **Focus:** Typography, motion, color theory, and avoiding "AI-generated" looks.

- **[Tailwind Design System](./.agents/skills/tailwind-design-system/SKILL.md)**
  - **Use when:** Styling components or building scalable, reusable UI patterns.
  - **Focus:** Tailwind v4 core features, design tokens, and ensuring responsive layouts. *(Note: Adapt any React references in the skill to our Angular v20+ stack).*

## General Workflow for AI Agents
1. **Understand the Request:** Identify if the user's task involves creating components, managing state, or styling.
2. **Consult Skills:** Read the relevant `.agents/skills/.../SKILL.md` instructions before generating code.
3. **Validate:** Cross-check the proposed solution against `best-practices.md` to ensure it avoids legacy Angular patterns (e.g., no `@Input()`, no `NgModules`, no `ngClass`).
4. **Implement:** Deliver modern, performant, and accessible code.
