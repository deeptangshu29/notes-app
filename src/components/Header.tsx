import { Search } from "lucide-react";

type HeaderProps = {
	searchQuery: string
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function Header({searchQuery, setSearchQuery,}: HeaderProps) {
	return (
		<header className="group border-b border-zinc-800 p-4 transition-all hover:font-bold">
			<div className="border border-zinc-600 flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-3 hover:border-zinc-200 hover:bg-zinc-700 transition">
				<Search size={18} className="text-zinc-400 transition-all group-hover:scale-110"/>
				<input type="text" placeholder="Search Notes" className="bg-transparent outline-none w-full text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
			</div>
		</header>
	)
}