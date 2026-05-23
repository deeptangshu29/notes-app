import {
	StickyNote,
	Archive,
	Trash2,
} from "lucide-react"

export default function Sidebar() {
	return (
		<aside className="w-64 border-r border-zince-800 p-4 hidden md:block">
			<h1 className="text-2xl font-bold mb-8">
				Notes
			</h1>
			<nav className="space-y-4">
				<button className="flex items-center gap-2 text-zinc-300 hover:text-white">
					<StickyNote size={20}/>
					Notes
				</button>
				<button className="flex items-center gap-2 text-zinc-300 hover:text-white">
					<Archive size={20}/>
					Archive
				</button>
				<button className="flex items-center gap-2 text-zinc-300 hover:text-white">
					<Trash2 size={20}/>
					Trash
				</button>
		</nav>
		</aside>
	)
}