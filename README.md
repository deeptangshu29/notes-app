# Notes App

A modern notes application built with **React** and **TypeScript**, currently focused on establishing a clean component structure, note state management, and reliable note lifecycle operations.

> **Project status:** In active development  
> **Documentation scope:** Everything implemented and discussed up to **September 7, 2026**

---

## Table of Contents

- [Overview](#overview)
- [Current Features](#current-features)
- [Implemented Functionality](#implemented-functionality)
- [Archive](#archive)
- [Delete and Edge Cases](#delete-and-edge-cases)
- [Layout Architecture](#layout-architecture)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Design and Implementation Principles](#design-and-implementation-principles)
- [Current Development Status](#current-development-status)
- [Next Steps](#next-steps)

---

## Overview

The **Notes App** is a React-based note-taking application being developed with a strong emphasis on maintainable architecture, predictable state transitions, reusable components, and clean UI structure.

The project is being built incrementally rather than treating each feature as an isolated implementation. Core note operations are being designed so that actions such as archiving and deleting behave consistently regardless of where the user performs them in the application.

---

## Current Features

The following functionality has been implemented or worked through so far:

- Note-based application structure
- React + TypeScript application architecture
- Main application layout
- Note archive functionality
- Archive/unarchive state handling
- Delete functionality
- Delete edge-case handling for archived notes
- Separation of layout concerns from feature/state logic
- Incremental refinement of component and state behavior

---

## Implemented Functionality

### Notes

Notes are represented with an archive state, allowing the application to distinguish between active and archived notes.

The archive state is handled through an `isArchive` property.

Conceptually:

```ts
type Note = {
  // other note properties
  isArchive: boolean;
};
```

The important distinction is that archiving is a **state transition**, not a separate type of note. This keeps the underlying note model simple while allowing the UI to present active and archived notes separately.

---

## Archive

Archive functionality has been implemented using the note's `isArchive` state.

### Archive behavior

A note can transition between:

```text
Active
  ↓
Archived
```

and:

```text
Archived
  ↓
Active
```

This allows the same note to be restored without creating a duplicate or changing its identity.

### Design approach

The archive implementation follows the same general pattern as other note state changes:

1. Identify the target note.
2. Update its `isArchive` value.
3. Preserve the rest of the note data.
4. Allow the UI to react to the updated state.

This keeps archive/unarchive operations predictable and avoids duplicating note data.

---

## Delete and Edge Cases

Delete functionality has also been implemented and the archive-related delete edge cases were explicitly addressed.

The important behavior is that deletion should remove the note from the application's source of truth regardless of whether the note is currently active or archived.

### Edge cases addressed

The implementation accounts for scenarios such as:

- Deleting an active note.
- Deleting an archived note.
- Deleting a note while viewing the archive.
- Ensuring deleted notes do not remain visible because of stale UI state.
- Avoiding inconsistent behavior when archive state and delete operations interact.

The key principle is:

> **Archive changes where a note is represented in the UI; delete removes the note itself.**

Therefore, deleting an archived note should not require a separate deletion mechanism from deleting an active note.

---

## Layout Architecture

The project includes a `MainLayout.tsx` component responsible for the application's primary layout structure.

The layout work is being approached separately from note-management logic so that:

- Layout concerns remain isolated.
- Feature components do not need to know how the overall application shell is arranged.
- Navigation and page-level structure can evolve without rewriting note operations.
- The application can support additional views without duplicating the shell.

The current development direction is to establish the layout as the stable application shell and keep individual note views/features focused on their own responsibilities.

---

## Technology Stack

### Core

- **React**
- **TypeScript**

### Development approach

- Component-based UI architecture
- Typed application code
- State-driven UI
- Reusable layout components
- Incremental feature implementation
- Edge-case-focused refinement

> Additional tooling and libraries will be documented here as they become part of the finalized project stack.

---

## Project Architecture

The application is being structured around clear separation of responsibilities.

A simplified conceptual architecture is:

```text
Application
│
├── Main Layout
│   ├── Navigation / Application Shell
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

The architecture is intentionally kept simple at this stage. The goal is to avoid prematurely introducing abstractions while still maintaining clear boundaries between:

- Layout
- Presentation
- Note state
- Note operations

---

## Design and Implementation Principles

### 1. Single source of truth

A note should exist in one authoritative state representation.

Archive status should determine how the note is presented rather than creating separate copies of the same note.

### 2. State-driven UI

The UI should be derived from application state.

For example:

```text
isArchive = false → Active Notes
isArchive = true  → Archived Notes
```

This avoids maintaining multiple independent collections that can drift out of sync.

### 3. Feature consistency

Operations should behave consistently regardless of the current view.

For example:

```text
Active view
    └── Delete note
          ↓
       Note removed

Archive view
    └── Delete note
          ↓
       Note removed
```

### 4. Edge cases are part of the feature

A feature is not considered complete merely because the primary interaction works.

Archive/delete interactions were specifically tested and refined to prevent inconsistent states.

### 5. Separation of concerns

Layout should not contain note-management logic, and note-management logic should not depend unnecessarily on the application's visual layout.

---

## Current Development Status

### Completed

- [x] React + TypeScript application foundation
- [x] Notes application structure
- [x] Main layout component introduced
- [x] Archive state represented through `isArchive`
- [x] Archive functionality
- [x] Unarchive functionality
- [x] Delete functionality
- [x] Archive/delete edge cases addressed
- [x] Initial separation between application layout and note functionality

### In Progress

- [ ] Further refinement of the main application layout
- [ ] Continued UI/component organization
- [ ] Additional note-management functionality

### Not Yet Documented as Implemented

Features that have not been explicitly completed in the project work so far are intentionally not marked as implemented here. This keeps the README aligned with the actual state of the codebase rather than presenting planned functionality as finished functionality.

---

## Next Steps

The immediate development direction is to continue refining the application layout and then build additional functionality on top of the established note state model.

Potential areas for subsequent implementation/documentation include:

- Note creation and editing improvements
- Note search/filtering
- Additional note actions
- UI/UX refinement
- Persistence
- Testing
- Responsive behavior
- Accessibility
- Production build/deployment

These are development directions rather than completed features.

---

## Development Philosophy

The project is being developed feature-by-feature, with each feature expected to handle both its normal path and relevant edge cases before moving on.

The current implementation particularly establishes an important foundation:

```text
                    ┌──────────────┐
                    │     Note     │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
          isArchive = false   isArchive = true
                 │                   │
                 ▼                   ▼
          Active Notes        Archived Notes
                 │                   │
                 └─────────┬─────────┘
                           │
                        Delete
                           │
                           ▼
                     Note removed
```

This keeps the application's behavior centered around a single note model and predictable state transitions.

---

## License

License information has not yet been defined for the project.