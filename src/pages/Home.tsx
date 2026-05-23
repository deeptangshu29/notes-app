import { mockNotes } from "../data/mockNotes"

export default function Home() {
	return (
		<div className="min-h-screen bg-zinc-950 text-white p-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{mockNotes.map((note) => (
					<div key={note.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800" >
						<h2 className="text-lg font-semibold">{note.title}</h2>
						<p className="text-zinc-400 mt-2">{note.content}</p>
					</div>
				))}
			</div>
		</div>
	)
}