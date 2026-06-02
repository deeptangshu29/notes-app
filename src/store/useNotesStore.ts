import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import type { Note } from '../types/notes';

type NotesStore = {
	notes: Note[]

	addNote: (
		note: Omit<Note, "id">
	) => void

	deleteNote: (
		id: number
	) => void

	updateNote: (
		updatedNote: Note
	) => void
}

export const useNotesStore =
	create<NotesStore>()(
		persist(
			(set) => ({
				notes: [
					{
						id: 1,
						title: "React Learning",
						content:
							"Finish Zustand integration.",
						pinned: false,
					},
					{
						id: 2,
						title: "Docker",
						content:
							"Learn Docker Compose later.",
						pinned: true,
					},
				],

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
						notes: state.notes.filter(
							(note) => note.id !== id
						),
					})),

				updateNote: (updatedNote) =>
					set((state) => ({
						notes: state.notes.map((note =>
							note.id === updatedNote.id
								? updatedNote
								: note
						))
					}))
			}),
			{
				name: "notes-storage",
			}
		)
	)
	
