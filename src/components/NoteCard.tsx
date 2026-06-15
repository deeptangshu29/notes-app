import { useState } from "react"

// Icon import
import {
	Pencil, Trash2, Pin, PinOff, Archive,
} from "lucide-react"

// Components import
import { useNotesStore } from "../store/useNotesStore"
import EditNoteModal from "./EditNoteModal"
import ViewNoteModal from "./ViewNoteModal"


type NoteCardProps = {
	id: number
	title: string
	content: string
	pinned: boolean
	isDeleted: boolean
	isArchive: boolean
}

export default function NoteCard({
	id,
	title,
	content,
	pinned,
	isDeleted,
	isArchive,
	
}: NoteCardProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [isViewing, setIsViewing] = useState(false)

	const deleteNote = useNotesStore(
		(state) => state.deleteNote
	)

	const archiveNote = useNotesStore(
		(state) => state.archiveNote
	)

	const togglePin = useNotesStore(
		(state) => state.togglePin
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
							togglePin(id)
						}}
						className={`relative border rounded-full p-2 transition-all duration-300 cursor-pointer ${pinned
							? "bg-yellow-500 ring-2 ring-yellow-400 ring-inset hover:bg-white hover:text-yellow-600"
							: "text-zinc-500 border-zinc-500 hover:bg-yellow-500 hover:text-white"}
						`}>
						{pinned
							?<PinOff size={18} />
							:<Pin size={18} />
						}
						
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							setIsEditing(true)
						}}
						className="relative text-zinc-500 border border-zinc-500 hover:text-black rounded-full p-2 hover:bg-white hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
						<Pencil size={18} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							archiveNote(id)
						}}
						className="relative text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-sky-700 hover:text-white hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
						<Archive size={18} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation()
							deleteNote(id)
						}}
						className="relative text-zinc-500 border border-zinc-500 rounded-full p-2 hover:bg-[#ad2323]/50 hover:text-[#ffffff] hover:border-zinc-400 transition-all duration-300 ease-in-out cursor-pointer">
						<Trash2 size={18} />
					</button>
				</div>

			</div>
			{
				isEditing && (
					<EditNoteModal
						note={{
							id,
							title,
							content,
							pinned,
							isDeleted,
							isArchive,
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
							pinned,
							isDeleted,
							isArchive,
						}}
						onClose={() => setIsViewing(false)}
						onDelete={() => {
							setIsViewing(false)
							deleteNote(id)
						}}
						onPin={() => {
							setIsViewing(false)
							togglePin(id)
						}}
						onArchive={() => {
							setIsViewing(false)
							archiveNote(id)
						}}
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