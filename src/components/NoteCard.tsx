import { useState} from "react"

// Icon import
import { Pencil, Trash2 } from "lucide-react"

// Components import
import { useNotesStore } from "../store/useNotesStore"
import EditNoteModal from "./EditNoteModal"
import ViewNoteModal from "./ViewNoteModal"


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
	const [isEditing, setIsEditing] = useState(false)
	const [isViewing, setIsViewing] = useState(false)

	const deleteNote = useNotesStore(
		(state) => state.deleteNote
	)

	return (
		<>
			<div
				onClick={() => setIsViewing(true)}
				className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 hover:scale-105 hover:bg-zinc-700 transition select-none">
				<button
					onClick={(e) => {
						e.stopPropagation()
						setIsEditing(true)
					}}
					className="absolute top-4 right-16 text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-white hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
					<Pencil size={18} />
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation()
						deleteNote(id)
					}}
					className="absolute top-4 right-4 text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-[#ad2323] hover:text-[#ffffff] hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
					<Trash2 size={18} />
				</button>
				<h2 className="text-lg font-semibold mb-2">
					{title}
				</h2>
				<p className="text-zinc-400 text-sm line-clamp-4">
					{content}
				</p>

			</div>
			{
				isEditing && (
					<EditNoteModal
						note={{
							id,
							title,
							content,
							pinned: false,
						}}
						onClose={() => setIsEditing(false)}
					/>
				)
			}
			{
				isViewing && !isEditing && (
					<ViewNoteModal 
						note={{
							id,
							title,
							content,
							pinned: false,
						}}
						onClose={() => setIsViewing(false)}
						onEdit={() => {
							setIsViewing(false)
							setIsEditing(true)
						}}
					/>
				)
			}
		</>
	)
}