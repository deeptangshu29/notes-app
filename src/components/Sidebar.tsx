import {
	StickyNote,
	Archive,
	Trash2,
} from "lucide-react"

export default function Sidebar() {
	return (
		<aside className="w-64 bg-zinc-900/20 backdrop-blur-lg border-r border-zinc-500 p-4 hidden md:block">
			<h1 className="text-2xl font-bold mb-8">
				Notes
			</h1>
			<nav className="space-y-4">
				<div className="m-2 p-2 border border-transparent rounded-xl hover:border-2 hover:bg-zinc-100/10 hover:backdrop-blur-lg hover:scale-106 hover:text-white hover:font-bold transition-all duration-200 ease-in-out">
					<button className="flex items-center gap-2 text-zinc-300">
						<StickyNote size={20} />
						Notes
					</button>
				</div>
				<div className="m-2 p-2 border border-transparent rounded-xl hover:border-2 hover:bg-zinc-100/10 hover:backdrop-blur-lg hover:scale-106 hover:text-white hover:font-bold transition-all duration-200 ease-in-out">
					<button className="flex items-center gap-2 text-zinc-300">
						<Archive size={20} />
						Archive
					</button>
				</div>
				<div className="m-2 p-2 border border-transparent rounded-xl hover:border-2 hover:bg-zinc-100/10 hover:backdrop-blur-lg hover:scale-106 hover:text-white hover:font-bold transition-all duration-200 ease-in-out">
					<button className="flex items-center gap-2 text-zinc-300">
						<Trash2 size={20} />
						Trash
					</button>
				</div>
			</nav>
		</aside>
	)
}