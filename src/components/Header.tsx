import { Search } from "lucide-react";

export default function Header() {
	return (
		<header className="border-b border-zinc-800 p-4">
			<div className="flex items-center gap-3 bg-zinc-900 rounded-xl px-4 py-3">
				<Search size={18} className="text-zinc-400"/>
				<input type="text" placeholder="Search Notes" className="bg-transparent outline-none w-full text-sm" />
			</div>
		</header>
	)
}