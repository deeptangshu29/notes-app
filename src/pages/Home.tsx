import { useState } from "react"
import { useNotesStore } from "../store/useNotesStore"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteCard from "../components/NoteCard"
import MainLayout from "../layouts/MainLayout"
import CreateNoteModal from "../components/CreateNodeModal"

export default function Home() {
	const notes = useNotesStore(
		(state) => state.notes
	)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")

	// Searching Feature
	const filteredNotes = notes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLocaleLowerCase().includes(searchQuery.toLowerCase())
	)

	const sortedNotes = (
		[...filteredNotes].sort((a, b) => Number(b.pinned) - Number(a.pinned))
	)

	// Autocomplete suggestion Feature
	const suggestions = [...new Set(notes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())).map((note) => note.title)),].slice(0, 5)

	return (
		<MainLayout>
			<Sidebar />
			<main className="flex-1 flex flex-col transition-all">
				<Header
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					suggestions={suggestions}
				/>
				<section className="m-6 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
					{sortedNotes.map((note) => (
						<NoteCard
							key={note.id}
							id={note.id}
							title={note.title}
							content={note.content}
							pinned = {note.pinned}
						/>
					))}
					<button
						onClick={() => setIsModalOpen(true)}
						className="fixed bottom-6 right-6 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
						+ New Note
					</button>
					{isModalOpen && (
						<CreateNoteModal onClose={() => setIsModalOpen(false)} />
					)}
				</section>
			</main>
		</MainLayout>
	)
}