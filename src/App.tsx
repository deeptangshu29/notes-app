import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MyNotes from "./pages/MyNotes"
import Archive from "./pages/Archive"
import Trash from "./pages/Trash"

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/mynotes" element={<MyNotes />} />
				<Route path="/archive" element={<Archive />} />
				<Route path="/trash" element={<Trash />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
