import { useState } from "react";

import { Search } from "lucide-react";
import { ArrowUpLeft, CircleX } from "lucide-react";

type HeaderProps = {
	searchQuery: string
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>
	suggestions: string[]
}

export default function Header({ searchQuery, setSearchQuery, suggestions }: HeaderProps) {
	const [showSuggestions, setShowSuggestions] = useState(true)
	return (
		<header className="relative group border-b border-zinc-800 p-4 transition-all">
			<div className="backdrop-blur-lg border border-zinc-600 flex items-center gap-3 bg-zinc-900/20 rounded-full px-4 py-3 hover:border-zinc-200 hover:bg-zinc-700 transition">
				{
					searchQuery.trim() !== ""
						? <Search size={25} className="text-zinc-400 transition-all group-hover:scale-110 group-hover:rotate-90" />
						: <Search size={18} className="text-zinc-400 transition-all group-hover:scale-110 group-hover:rotate-90" />
				}
				<input type="text" placeholder="Search Notes" className="bg-transparent outline-none w-full text-sm" value={searchQuery} onChange={(e) => {
					setSearchQuery(e.target.value)
					setShowSuggestions(true)
				}} />
				{
					searchQuery.trim() !== "" &&
					<button
						onClick={() => {
							setSearchQuery("")
							setShowSuggestions(true)
						}}
						className="text-zinc-500 hover:text-white transition">
						<CircleX size={25} />
					</button>
				}
			</div>
			{
				showSuggestions && searchQuery.trim() !== "" &&
				suggestions.length > 0 && (
					<div className="absolute left-4 right-3 mt-2 bg-zinc-900/20 backdrop-blur-lg hover:backdrop-blur-lg border border-zinc-700 rounded-xl overflow-hidden z-50">
						{
							suggestions.map((suggestion) => (
								<button
									key={suggestion}
									onClick={() => {
										setSearchQuery(suggestion)
										setShowSuggestions(false)
									}}
									className="flex w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-zinc-800/50 transition">
									{suggestion}
									<ArrowUpLeft className="ml-auto text-gray-300" />
								</button>
							))
						}
					</div>
				)
			}
		</header>
	)
}