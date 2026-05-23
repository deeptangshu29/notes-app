type NoteCardProps = {
	title: string
	content: string
}

export default function NoteCard({
	title,
	content,
}: NoteCardProps) {
	return (
		<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition">
			<h2 className="text-lg front-semibold mb-2">
				{title}
			</h2>
			<p className="text-zinc-400 text-sm line-clamp-4">
				{content}
			</p>
		</div>
	)	
}