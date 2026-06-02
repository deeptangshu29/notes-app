import { useState } from "react";

import { Search } from "lucide-react";

type HeaderProps = {
	searchQuery: string
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
	suggestions: string[]
}

export default function Header({ searchQuery, setSearchQuery, suggestions }: HeaderProps) {
	const [showSuggestions, setShowwSuggestions] = useState(true)
	return (
		<header className="relative group border-b border-zinc-800 p-4 transition-all hover:font-bold">
			<div className="border border-zinc-600 flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-3 hover:border-zinc-200 hover:bg-zinc-700 transition">
				<Search size={18} className="text-zinc-400 transition-all group-hover:scale-110"/>
				<input type="text" placeholder="Search Notes" className="bg-transparent outline-none w-full text-sm" value={searchQuery} onChange={(e) => {
					setSearchQuery(e.target.value)
					setShowwSuggestions(true)
				}}/>
			</div>
			{
				showSuggestions && searchQuery.trim() !== "" &&
				suggestions.length > 0 && (
					<div className="absolute left-4 right-3 top-full mt-2 bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden z-50">
						{
							suggestions.map((suggestion) => (
								<button key={suggestion} onClick={() => {
									setSearchQuery(suggestion)
									setShowwSuggestions(false)
								}} className="w-full text-left px-4 py-3 hover:bg-zinc-800 transition">{suggestion}</button>
							))
						}
					</div>
				)
			}
		</header>
	)
}