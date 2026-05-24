import { Trash2 } from "lucide-react"
import { useNotesStore } from "../store/userNotesStore"

type NoteCardProps = {
	id: number
	title: string
	content: string
}

export default function NoteCard({
	id,
	title,
	content,
}: NoteCardProps) {
	const deleteNote = useNotesStore(
		(state) => state.deleteNote
	)
	return (
		<div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 hover:scale-105 hover:bg-zinc-700 transition">
			<button onClick={() => deleteNote(id)} className="absolute top-4 right-4 text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-[#ad2323] hover:text-[#ffffff] hover:border-zinc-400 transition-all duration-300 ease-in-out">
				<Trash2 size={18} />
			</button>
			<h2 className="text-lg font-semibold mb-2">
				{title}
			</h2>
			<p className="text-zinc-400 text-sm line-clamp-4">
				{content}
			</p>
		</div>
	)
}