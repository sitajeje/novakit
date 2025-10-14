# 🧭 NovaKit — Frontend Architecture Monorepo

NovaKit is a **modern frontend architecture toolkit** designed to accelerate the development of scalable and maintainable design systems.  
It serves as both a **learning playground** for frontend architecture mastery and a **production-ready toolkit** for building React-based UI libraries and applications.

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
│ └── web/ # Future demo or production app
├── packages/
│ ├── ui/ # Shared React UI components
│ ├── config/ (planned) # Shared lint/build configs
│ └── scripts/ # Custom CLI tools (create-component, etc.)
└── turbo.json # Turborepo config


---

## ⚙️ How to Use

### 1️⃣ Install dependencies
```bash
pnpm install
pnpm create-component Button
pnpm build
pnpm storybook



