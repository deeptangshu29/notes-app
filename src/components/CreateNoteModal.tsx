import { useState } from "react";
import { useNotesStore } from "../store/useNotesStore";

type CreateNoteModalProps = {
	onClose: () => void
}

export default function CreateNoteModal({
	onClose
}: CreateNoteModalProps) {
	const addNote = useNotesStore(
		(state) => state.addNote
	)
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	const handleCreateNote = () => {
		if (!title.trim())
			return

		addNote({
			title,
			content,
			pinned: false,
			isDeleted: false
		})

		onClose()
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-5">
					Create Note
				</h2>
				
				<input type="text" placeholder="Note Title" value={title} className="w-full mb-4 p-3 rounded-xl bg-zinc-800 outline-none" onChange={(e) => setTitle(e.target.value)}/>

				<textarea placeholder="Start typing" value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-40 p-3 rounded-xl bg-zinc-800 outline-none resize-none" />

				<div className="flex justify-end gap-3 mt-5">
					<button onClick={onClose} className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition">
						Cancel
					</button>
					<button onClick={handleCreateNote} className="px-4 py-2 rounded-xl bg-white text-black hover:opacity-90 transition">
						Save
					</button>
				</div>
			</div>
		</div>
	)
}