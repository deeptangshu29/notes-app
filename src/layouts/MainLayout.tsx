import type { ReactNode } from "react";

type MainLayoutProps = {
	children: ReactNode
}

export default function MainLayout({
	children,
}: MainLayoutProps) {
	return (
		<div className="min-h-screen bg-zinc-950 text-white flex">
			{children}
		</div>
	)
}