import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage, ComicsPage } from '../pages/pages.js'
import AppHeader from '../appHeader/AppHeader'

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<AppHeader />
				<main>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/comics' element={<ComicsPage />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	)
}

export default App
