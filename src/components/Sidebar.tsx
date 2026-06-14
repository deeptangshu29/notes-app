import { useNavigate } from "react-router-dom"
import {
	StickyNote,
	Archive,
	Trash2,
} from "lucide-react"

export default function Sidebar() {
	const navigateTo = useNavigate()
	return (
		<aside className="w-64 bg-zinc-900/20 backdrop-blur-lg border-r border-zinc-500 p-4 hidden md:block">
			<h1 className="text-2xl font-bold mb-8 cursor-default" onClick={() => navigateTo("/")}>
				Notes
			</h1>
			<nav className="space-y-4">
				<div className="sidebar-button" onClick={() => navigateTo("/mynotes")}>
						<button className="flex items-center gap-2 text-zinc-300">
						<StickyNote size={20} />
						Notes
					</button>
				</div>
				<div className="sidebar-button" onClick={() => navigateTo("/archive")}>
					<button className="flex items-center gap-2 text-zinc-300" >
						<Archive size={20} />
						Archive
					</button>
				</div>
				<div className="sidebar-button" onClick={() => navigateTo("/trash")}>
					<button className="flex items-center gap-2 text-zinc-300" >
						<Trash2 size={20} />
						Trash
					</button>
				</div>
			</nav>
		</aside>
	)
}