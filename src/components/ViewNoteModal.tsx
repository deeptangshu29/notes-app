import { useState } from "react";
import { Trash2, Archive, Pin, PinOff } from "lucide-react";

import type { Note } from "../types/notes";

type ViewNoteModalProps = {
	note: Note,
	onClose: () => void,
	onEdit: () => void,
	onDelete: () => void,
	onPin: () => void,
	onArchive: () => void,
}


export default function ViewNoteModal({ note, onClose, onEdit, onDelete, onPin, onArchive }: ViewNoteModalProps) {
	const [title] = useState(note.title)
	const [content] = useState(note.content)

	return (
		<>
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
				<div className="bg-zinc-900/20 backdrop-blur-lg border border-zinc-800 rounded-2xl p-6 w-full max-w-lg">
					<div className="flex align-middle justify-between gap-3 mt-1">
						<h2 className="text-2xl font-bold mb-5">{title}</h2>
						<button onClick={onPin} className={`p-2 w-fit h-fit rounded-xl border border-zinc-500 transition ${note.pinned
							? "bg-yellow-500 text-white ring-2 ring-yellow-400 ring-inset hover:bg-white hover:text-yellow-600"
							: "text-zinc-500 hover:bg-yellow-500 hover:text-white hover:border-yellow-100"}`}>{note.pinned
								? <PinOff size={18}/>
								: <Pin size={18} />
							}
						</button>
					</div>
					<div className="w-full h-40 p-3 overflow-auto text-pretty bg-zinc-800/10 backdrop-blur-lg outline-none resize-none">
						<p className="whitespace-pre-wrap break-words text-pretty">{content}</p>
					</div>

					<div className="flex justify-end gap-3 mt-5">
						<button onClick={onDelete} className="p-2 rounded-xl text-zinc-500 border border-zinc-500 hover:bg-[#ad2323] hover:text-white hover:border-zinc-400 transition"><Trash2 /></button>
						<button onClick={onArchive} className="p-2 rounded-xl text-zinc-500 border border-zinc-500 hover:bg-sky-700 hover:text-white hover:border-zinc-400 transition"><Archive /></button>
						<button onClick={onClose} className="px-4 py-2 min-w-[5rem] rounded-xl border hover:bg-zinc-600 transition">Close</button>
						<button onClick={onEdit} className="px-4 py-2 min-w-[5rem] rounded-xl text-black bg-zinc-300 hover:bg-white transition">Edit</button>
					</div>
				</div>
			</div>
		</>
	)
}