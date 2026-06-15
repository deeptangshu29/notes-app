import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import type { Note } from '../types/notes';
import { mockNotes } from '../data/mockNotes';

type NotesStore = {
	notes: Note[]

	addNote: (
		note: Omit<Note, "id">
	) => void

	deleteNote: (
		id: number
	) => void
	
	restoreNote: (
		id: number
	) => void

	deleteNotePermanently: (
		id: number
	) => void
	
	archiveNote: (
		id: number
	) => void
	
	unarchiveNote: (
		id: number
	) => void

	updateNote: (
		updatedNote: Note
	) => void

	togglePin: (
		id: number
	) => void
}

export const useNotesStore =
	create<NotesStore>()(
		persist(
			(set) => ({
				notes: mockNotes,

				addNote: (note) =>
					set((state) => ({
						notes: [
							{
								...note,
								id: Date.now(),
							},
							...state.notes,
						],
					})),

				deleteNote: (id) =>
					set((state) => ({
						notes: state.notes.map((note) =>
							note.id === id
								? {
									...note,
									isDeleted: true,
									isArchive: false,
								}
								: note
						)
					})),
				
				restoreNote: (id) =>
					set((state) => ({
						notes: state.notes.map((note) =>
							note.id === id
								? {
									...note,
									isDeleted: false,
									isArchive: false,
								}
								: note
						)
					})),

				deleteNotePermanently: (id) =>
					set((state) => ({
						notes: state.notes.filter(
							(note) => note.id !== id
						),
					})),

				archiveNote: (id) =>
					set((state) => ({
						notes: state.notes.map((note) =>
							note.id === id
								? {
									...note,
									isArchive: true,
									isDeleted: false,
								}
								: note
						)
					})),

				unarchiveNote: (id) =>
					set((state) => ({
						notes: state.notes.map((note) =>
							note.id === id
								? {
									...note,
									isArchive: false,
									isDeleted: false,
								}
								: note
						)
					})),

				updateNote: (updatedNote) =>
					set((state) => ({
						notes: state.notes.map((note =>
							note.id === updatedNote.id
								? updatedNote
								: note
						))
					})),

				togglePin: (id) =>
					set((state) => ({
						notes: state.notes.map((note) =>
							note.id === id
								? {
									...note,
									pinned: !note.pinned
								}
								: note
						)
					}))
			}),
			{
				name: "notes-storage",
			}
		)
	)

