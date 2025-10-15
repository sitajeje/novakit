# 🧭 NovaKit — A Modern Multi-tenant SaaS Dashboard Starter

NovaKit is a modern multi-tenant SaaS dashboard starter built with Turborepo, Next.js, Tailwind, and Supabase.
It provides a clean architecture for scalable front-end projects with cloud deployment and CI/CD ready out of the box.

---

## 📦 Project Overview

**NovaKit** is structured as a **Turborepo monorepo**, managed with **pnpm** and powered by **Vite**, **Storybook**, and **tsup**.  
It provides a modular architecture where shared UI components, utilities, and documentation live together seamlessly.

### 🔧 Tech Stack

- 🏗 **Turborepo** — Monorepo management  
- 📦 **pnpm workspaces** — Fast and isolated package installations  
- ⚡ **Vite** — Modern dev/build system  
- 🧱 **React + TypeScript** — Component-driven architecture  
- 🧰 **tsup** — Type-safe and minimal build tool for libraries  
- 🎨 **Storybook (planned)** — UI component documentation  
- 🧩 **Custom Script Generator** — `create-component` CLI for rapid component scaffolding  

---

## 🚀 Today’s Progress (2025-10-14)

✅ Set up a working **monorepo** using Turborepo + pnpm  
✅ Created the `@novakit/ui` package for shared UI components  
✅ Integrated **tsup** to build and generate type definitions  
✅ Fixed TypeScript import errors from submodules  
✅ Built and tested the `create-component` script using **ts-node / tsup-node**  
✅ Successfully generated new components via CLI (e.g., `Input`, `Card`)  
✅ Verified module resolution via `dist/` build output  

---

## 🧩 Next Steps

- [ ] Integrate **Storybook** for visual component testing  
- [ ] Add **TailwindCSS** support for design system styling  
- [ ] Create a `@novakit/config` package (ESLint, Prettier, TS configs)  
- [ ] Publish `@novakit/ui` to npm (internal registry)  
- [ ] Automate release workflow with **Changesets + GitHub Actions**  
- [ ] Build real-world demo app consuming `@novakit/ui`  

---

## 🧠 Purpose & Vision

NovaKit is more than just a codebase —  
it’s part of a long-term **Frontend Architect Mastery Plan** to evolve from traditional frontend integration (e.g., Drupal/Twig)  
to a **modern, scalable, TypeScript-driven architecture mindset**.

The ultimate goal:  
> Design and build reusable, type-safe, and cross-platform UI systems — from component libraries to full applications.

---

## 📂 Repository Structure

novakit/
├── apps/
│   ├── web/               # 主应用：Next.js Dashboard
│   └── docs/              # Storybook or Documentation Site
│
├── packages/
│   ├── ui/                # 共享组件库（Button, Card, etc.）
│   ├── config/            # Tailwind、ESLint、tsconfig 等共享配置
│   └── utils/             # 可选：通用 hooks / helpers
│
├── .github/
│   └── workflows/
│       ├── deploy.yml     # CI/CD 配置（Lint + Build + Vercel Deploy）
│
├── turbo.json             # Turborepo 配置文件
├── package.json
├── pnpm-workspace.yaml
└── README.md



---

## ⚙️ How to Use

### 1️⃣ Install dependencies
```bash
pnpm install
pnpm create-component Button
pnpm build
pnpm storybook



