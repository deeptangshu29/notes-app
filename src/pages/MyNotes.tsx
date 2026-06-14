import { useState } from "react"
import { useNotesStore } from "../store/useNotesStore"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteCard from "../components/NoteCard"
import MainLayout from "../layouts/MainLayout"
import CreateNoteModal from "../components/CreateNoteModal"

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
					isSearching ? (
						<div>
							<h2 className="m-6 mb-0 text-3xl font-bold">Search Results ({searchResults.length})</h2>
							{
								searchResults.length === 0 ? (
									<p className="m-6 text-zinc-400">
										No Notes found.
									</p>
								) : (
									<section className="m-6 mt-0 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
										{
											searchResults.map((note) => (
												<NoteCard
													key={note.id}
													id={note.id}
													title={note.title}
													content={note.content}
													pinned={note.pinned}
													isDeleted={note.isDeleted}
												/>
											))
										}
									</section>)
							}
						</div>
					) : (

						<div>
							<div className="m-0 p-0">
								{pinnedCount > 0 && (
									<h2 className="m-6 mb-0 text-3xl font-bold">Pinned Notes</h2>
								)}
								{pinnedCount > 0 && (
									<>
										<section className="m-6 mt-0 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
											{pinnedNotes.map((note) => (
												<NoteCard
													key={note.id}
													id={note.id}
													title={note.title}
													content={note.content}
													pinned={note.pinned}
													isDeleted={note.isDeleted}
												/>
											))}
										</section>
										<div className="border-b border-gray-500 mx-10 mb-20" />
									</>
								)}
							</div>
							<div className="m-0 p-0">
								{pinnedCount > 0 && (
									<h3 className="m-6 mb-0 text-2xl font-bold">All Notes</h3>
								)}
								<section className="m-6 mt-0 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
									{filteredUnpinnedNotes.map((note) => (
										<NoteCard
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											pinned={note.pinned}
											isDeleted={note.isDeleted}
										/>
									))}
								</section>
							</div>
						</div>)
				}
				<button
					onClick={() => setIsModalOpen(true)}
					className="fixed bottom-6 right-6 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
					+ New Note
				</button>
				{isModalOpen && (
					<CreateNoteModal onClose={() => setIsModalOpen(false)} />
				)}

			</main>
		</MainLayout>
	)
}