import { useState } from "react"
import { useNotesStore } from "../store/useNotesStore"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteCard from "../components/NoteCard"
import MainLayout from "../layouts/MainLayout"
import CreateNoteModal from "../components/CreateNoteModal"

import {TriangleAlert} from "lucide-react"

export default function Home() {
	const notes = useNotesStore(
		(state) => state.notes
	)

	const activeNotes = notes.filter(
		(note) => !note.isDeleted
	)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const isSearching = searchQuery.trim() !== ""

	const searchResults = activeNotes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLocaleLowerCase().includes(searchQuery.toLowerCase())
	)

	const unpinnedNotes = [...activeNotes].filter((note) => !note.pinned)

	// Searching Feature
	const filteredUnpinnedNotes = unpinnedNotes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLocaleLowerCase().includes(searchQuery.toLowerCase())
	)

	// Filter out only pinned Notes
	const pinnedNotes = (
		[...activeNotes].filter((note) => note.pinned)
	)

	const pinnedCount = pinnedNotes.length

	// Autocomplete suggestion Feature
	const suggestions = [...new Set(activeNotes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())).map((note) => note.title)),].slice(0, 5)

	return (
		<MainLayout>
			<Sidebar />
			<main className="flex-1 flex flex-col transition-all duration-300 ease-in-out bg-[url('/assets/img/background3.jpg')] bg-fixed bg-cover bg-no-repeat bg-center">
				<Header
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					suggestions={suggestions}
				/>
				{
					<div className="h-full flex items-center justify-center">
						<div className="inset-0 bg-[#fedf08]/50 backdrop-brightness-300 backdrop-blur-lg border border-white rounded-2xl w-full h-full m-5 p-5 flex flex-col items-center justify-center gap-[3rem] select-none cursor-not-allowed">
							<TriangleAlert size={150} />
							<h2 className="text-5xl">Work In Progress</h2>
						</div>
					</div>
				}

			</main>
		</MainLayout>
	)
}