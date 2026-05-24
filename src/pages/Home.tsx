import { useNotesStore } from "../store/userNotesStore"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteCard from "../components/NoteCard"
import MainLayout from "../layouts/MainLayout"

export default function Home() {
	const notes = useNotesStore(
		(state) => state.notes
	)
	return (
		<MainLayout>
			<Sidebar />
			<main className="flex-1 flex flex-col">
				<Header />
				<section className="m-6 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
					{notes.map((note) => (
						<NoteCard
							key={note.id}
							id={note.id}
							title={note.title}
							content={note.content}
						/>
					))}
					<button
						className="fixed bottom-6 right-6 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
						+ New Note
					</button>
				</section>
			</main>
		</MainLayout>
	)
}