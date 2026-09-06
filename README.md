# 📝 Notes App

> A modern notes application built with **React + TypeScript**, developed incrementally with a focus on clean architecture, predictable state management, and robust edge-case handling.

**Status:** 🚧 Active Development  
**Last documented:** September 7, 2026

---

## 📌 Table of Contents

<details>
<summary><strong>Expand documentation</strong></summary>

- [Overview](#-overview)
- [Features](#-current-features)
- [Architecture](#-architecture)
- [Note State](#-note-state)
- [Archive](#-archive)
- [Delete](#-delete)
- [Layout](#-layout)
- [Tech Stack](#-tech-stack)
- [Development Principles](#-development-principles)
- [Progress](#-development-progress)
- [Roadmap](#-roadmap)

</details>

---

## 🔎 Overview

The **Notes App** is a React-based note-taking application designed around a simple idea:

> **Keep the data model simple, keep state predictable, and keep responsibilities separated.**

The project is being built feature-by-feature. Each feature is implemented first, then its interactions and edge cases are refined before moving on.

---

## ✨ Current Features

| Feature | Status |
|---|:---:|
| React + TypeScript foundation | ✅ |
| Notes application structure | ✅ |
| Main application layout | ✅ |
| Archive notes | ✅ |
| Unarchive notes | ✅ |
| Delete notes | ✅ |
| Archive/Delete edge cases | ✅ |
| Layout/feature separation | 🟡 |
| Additional UI refinement | 🚧 |

### Current core flow

```text
┌─────────────┐
│    Note     │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│   isArchive ?    │
└────┬─────────┬───┘
     │         │
    No        Yes
     │         │
     ▼         ▼
┌────────┐  ┌──────────┐
│ Active │  │ Archived │
│ Notes  │  │  Notes   │
└───┬────┘  └────┬─────┘
    │             │
    └──────┬──────┘
           │
        Delete
           │
           ▼
      Note removed
```

---

## 🏗️ Architecture

The current architecture is intentionally straightforward:

```text
Application
│
├── MainLayout
│   ├── Navigation / Shell
│   └── Page Content
│
├── Notes
│   ├── Active Notes
│   └── Archived Notes
│
└── Note Operations
    ├── Archive
    ├── Unarchive
    └── Delete
```

The main separation is between:

- **Layout** → application shell and page structure
- **Presentation** → displaying notes and actions
- **State** → note data and archive status
- **Operations** → archive, unarchive, and delete

This keeps feature logic from becoming tightly coupled to the application's layout.

---

## 🧠 Note State

Archive status is represented using the `isArchive` property.

```ts
type Note = {
  // other note properties
  isArchive: boolean;
};
```

Rather than maintaining completely separate note objects for active and archived notes, the same note changes state.

```text
isArchive = false
       │
       ▼
 Active Note
       │
    Archive
       │
       ▼
isArchive = true
       │
       ▼
Archived Note
       │
   Unarchive
       │
       └──────────► Active Note
```

### Why this approach?

It gives the application a **single source of truth** for each note.

That means:

- No duplicate note objects.
- No synchronization between active/archive collections.
- Archive and unarchive are simple state transitions.
- The UI can derive what to display directly from note state.

---

## 📦 Archive

Archive functionality has been implemented around `isArchive`.

### Supported operations

- ✅ Archive an active note
- ✅ Unarchive an archived note
- ✅ Display archived notes separately
- ✅ Preserve the original note when archived
- ✅ Restore the same note when unarchived

The operation conceptually looks like:

```text
Active
  │
  │ archive
  ▼
Archived
  │
  │ unarchive
  ▼
Active
```

Archive does **not** create a new note.

It changes the state of the existing note.

---

## 🗑️ Delete

Delete removes the note itself from the application's source of truth.

### Supported scenarios

- ✅ Delete an active note
- ✅ Delete an archived note
- ✅ Delete while viewing archived notes
- ✅ Prevent deleted notes from remaining visible due to stale state
- ✅ Handle archive/delete interactions consistently

The distinction is important:

| Operation | Effect |
|---|---|
| Archive | Changes where/how the note is represented |
| Unarchive | Restores the note to active state |
| Delete | Removes the note completely |

### Edge-case rule

> **An archived note is still just a note.**

Therefore, deleting an archived note should use the same underlying deletion behavior as deleting an active note.

---

## 🧱 Layout

The application contains a `MainLayout.tsx` component responsible for the main application shell.

The layout is being developed independently from note-management logic.

### Goals

- Keep application-wide structure in one place.
- Avoid duplicating navigation/layout code.
- Keep feature components focused on their own responsibilities.
- Make it easier to add future views.
- Prevent layout concerns from leaking into state-management logic.

The next stage of the project includes further refinement of this layout.

---

## 🛠️ Tech Stack

### Core

| Technology | Purpose |
|---|---|
| **React** | UI framework |
| **TypeScript** | Type-safe application code |

### Development approach

- Component-based architecture
- State-driven UI
- Typed data models
- Reusable layout components
- Incremental feature development
- Explicit edge-case handling

> Additional dependencies will be added here as the project stack is finalized.

---

## 📐 Development Principles

<details>
<summary><strong>1. Single source of truth</strong></summary>

Each note should have one authoritative representation.

Archive state determines how the note is presented rather than creating duplicate notes.

</details>

<details>
<summary><strong>2. State-driven UI</strong></summary>

The UI should be derived from application state.

```text
isArchive = false → Active
isArchive = true  → Archived
```

</details>

<details>
<summary><strong>3. Consistent operations</strong></summary>

An operation should behave consistently regardless of the current view.

For example:

```text
Active View
    │
    └── Delete ──► Note removed

Archive View
    │
    └── Delete ──► Note removed
```

</details>

<details>
<summary><strong>4. Edge cases are part of the feature</strong></summary>

A feature is not considered finished simply because its primary interaction works.

Archive/delete interactions have been explicitly refined to prevent inconsistent states.

</details>

<details>
<summary><strong>5. Separation of concerns</strong></summary>

Layout, presentation, state, and operations should remain independently understandable wherever practical.

</details>

---

## 📊 Development Progress

### ✅ Completed

- [x] React + TypeScript foundation
- [x] Notes application structure
- [x] Main layout component
- [x] `isArchive` state
- [x] Archive functionality
- [x] Unarchive functionality
- [x] Delete functionality
- [x] Archive/Delete edge cases
- [x] Initial separation of layout and feature concerns

### 🚧 In Progress

- [ ] Main application layout refinement
- [ ] Further component organization
- [ ] UI/UX refinement
- [ ] Additional note functionality

### ⏳ Planned

- [ ] Note creation/editing improvements
- [ ] Search and filtering
- [ ] Persistence
- [ ] Automated testing
- [ ] Responsive behavior
- [ ] Accessibility improvements
- [ ] Production build/deployment

> Planned items are intentionally not marked as implemented.

---

## 🗺️ Roadmap

```text
Foundation
    │
    ├── React + TypeScript              ✅
    ├── Note structure                  ✅
    └── Main layout                     ✅
    │
    ▼
Core Note Operations
    │
    ├── Archive                         ✅
    ├── Unarchive                       ✅
    └── Delete                          ✅
    │
    ▼
Architecture Refinement
    │
    ├── Layout refinement               🚧
    ├── Component organization          🚧
    └── UI refinement                   🚧
    │
    ▼
Future Features
    │
    ├── Search / filtering              ⏳
    ├── Persistence                     ⏳
    ├── Testing                         ⏳
    └── Deployment                      ⏳
```

---

## 🧪 Current State at a Glance

<details>
<summary><strong>What works right now?</strong></summary>

The application currently has a functional note lifecycle centered around:

**Active → Archive → Unarchive → Delete**

Both active and archived notes can be deleted, and archive/delete edge cases have been handled.

</details>

<details>
<summary><strong>What is being worked on next?</strong></summary>

The immediate focus is the application's layout and component organization, building on the note state and operation model already established.

</details>

---

## 📄 License

License information has not yet been defined.