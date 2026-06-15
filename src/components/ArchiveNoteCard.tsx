import { useState } from "react"

// Icon import
import {
	ArchiveRestore,
	Trash2,
} from "lucide-react"

// Components import
import { useNotesStore } from "../store/useNotesStore"
import ViewTrashNoteModal from "./ViewArchiveNoteModal"


type NoteCardProps = {
	id: number
	title: string
	content: string
	pinned: boolean
	isDeleted: boolean
	isArchive: boolean
}

export default function ArchiveNoteCard({
	id,
	title,
	content,
	pinned,
	isDeleted,
	isArchive,
}: NoteCardProps) {
	const [isViewing, setIsViewing] = useState(false)

	const unarchiveNote = useNotesStore(
		(state) => state.unarchiveNote
	)

	const deleteNote = useNotesStore(
		(state) => state.deleteNote
	)

	return (
		<>
			<div
				onClick={() => setIsViewing(true)}
				className="group relative justify-between mb-4 bg-zinc-900/20 backdrop-blur-lg border border-zinc-800 rounded-2xl p-5 hover:border-zinc-500 hover:bg-zinc-500/40 transition-all duration-300 select-none">

				<div className="flex flex-col flex-1 overflow-hidden">
					<h2 className="text-lg font-semibold mb-2 truncate">
						{title}
					</h2>


					<p className="text-zinc-400 text-sm line-clamp-4">
						{content}
					</p>
				</div>

				{/* <div className="flex flex-row gap-2 min-h-fit hidden group-hover:flex gap-2"> */}
				<div className="absolute hidden group-hover:flex top-4 right-4 gap-2">
					
					<button
						onClick={(e) => {
							e.stopPropagation()
							unarchiveNote(id)
						}}
						className="relative text-zinc-500 border border-zinc-500 hover:text-black rounded-full p-2 hover:bg-white hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
						<ArchiveRestore size={18} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							deleteNote(id)
						}}
						className="relative text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-[#ad2323] hover:text-white hover:border-red-400 transition-all duration-300 ease-in-out cursor-pointer">
						<Trash2 size={18} />
					</button>
				</div>

			</div>
			{
				isViewing && (
					<ViewTrashNoteModal
						note={{
							id,
							title,
							content,
							pinned,
							isDeleted,
							isArchive,
						}}
						onClose={() => setIsViewing(false)}
						onUnarchive={() => {
							setIsViewing(false)
							unarchiveNote(id)
						}}
						onDelete={() => {
							setIsViewing(false)
							deleteNote(id)
						}}
					/>
				)
			}
		</>
	)
}