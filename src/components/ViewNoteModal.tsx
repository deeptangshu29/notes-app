import { useState } from "react";

import type { Note } from "../types/notes";

type ViewNoteModalProps = {
	note: Note,
	onClose: () => void,
	onEdit: () => void,
}


export default function ViewNoteModal({ note, onClose, onEdit }: ViewNoteModalProps) {
	const [title] = useState(note.title)
	const [content] = useState(note.content)

	return (
		<>
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
				<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg">
					<h2 className="text-2xl font-bold mb-5">{title}</h2>
					<p className="w-full h-40 p-3 bg-zinc-800 outline-none resize-none">{content}</p>

					<div className="flex justify-end gap-3 mt-5">
						<button onClick={onClose} className="px-4 py-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition">Close</button>
						<button onClick={onEdit} className="px-4 py-2 rounded-xl text-black bg-zinc-300 hover:bg-white transition">Edit</button>
					</div>
				</div>
			</div>
		</>
	)
}