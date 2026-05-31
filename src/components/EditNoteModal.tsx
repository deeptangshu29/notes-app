import { useState } from "react";

import type { Note } from "../types/notes"
import { useNotesStore } from "../store/useNotesStore";

type EditNoteModalProps = {
	note: Note,
	onClose: () => void,
}

export default function EditNoteModal({
	note,
	onClose
}: EditNoteModalProps) {
	const updateNote = useNotesStore(
		(state) => state.updateNote
	)

	const [title, setTitle] = useState(note.title)
	const [content, setContent] = useState(note.content)

	const handleUpdateNote = () => {
		if (!title.trim())
			return

		updateNote({
			...note,
			title,
			content,
		})

		onClose()
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-5">Edit Note</h2>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-4 p-3 rounded-xl bg-zinc-800 outline-none " />
				<textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-3 rounded-xl bg-zinc-800 outline-none resize-none" />
				
				<div className="flex justify-end gap-3 mt-5">
					<button onClick={onClose} className="px-4 py-2 min-w-[5rem] rounded-xl border hover:bg-zinc-600 transition">Cancel</button>
					<button onClick={handleUpdateNote} className="px-4 py-2 min-w-[5rem] rounded-xl text-black bg-zinc-300 hover:bg-white transition">Update</button>
				</div>
			</div>
		</div>
	)
}