import { useState } from "react"
import { useNotesStore } from "../store/useNotesStore"

import { CircleX } from "lucide-react"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import TrashNoteCard from "../components/TrashNoteCard"
import MainLayout from "../layouts/MainLayout"
import CreateNoteModal from "../components/CreateNoteModal"

export default function Home() {
	const notes = useNotesStore(
		(state) => state.notes
	)

	const deletedNotes = notes.filter(
		(note) => note.isDeleted
	)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const isSearching = searchQuery.trim() !== ""

	const searchResults = deletedNotes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLocaleLowerCase().includes(searchQuery.toLowerCase())
	)

	// Searching Feature
	const filteredUnpinnedNotes = deletedNotes.filter((note) =>
		note.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLocaleLowerCase().includes(searchQuery.toLowerCase())
	)

	const deletedCount = deletedNotes.length

	// Autocomplete suggestion Feature
	const suggestions = [...new Set(deletedNotes.filter((note) =>
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
					deletedCount <= 0 ? (
						<div className="h-full flex items-center justify-center m-5">
							<div className="inset-0 bg-zinc-700/50 backdrop-brightness-300 backdrop-blur-lg border border-white rounded-2xl w-full h-full m-5 p-5 flex flex-col items-center justify-center gap-[3rem] select-none cursor-not-allowed">
								<CircleX size={80} />
								<h2 className="text-4xl">No Deleted Notes</h2>
							</div>
						</div>
					) : (
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
												<TrashNoteCard
													key={note.id}
													id={note.id}
													title={note.title}
													content={note.content}
													pinned={note.pinned}
													isDeleted={note.isDeleted}
													isArchive={note.isArchive}
												/>
											))
										}
									</section>)
							}
						</div>
					) : (

						<div>
							<div className="m-0 p-0">
								<section className="m-6 mt-0 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
									{filteredUnpinnedNotes.map((note) => (
										<TrashNoteCard
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											pinned={note.pinned}
											isDeleted={note.isDeleted}
											isArchive={note.isArchive}
										/>
									))}
								</section>
							</div>
									</div>)
					)
				}

			</main>
		</MainLayout>
	)
}