import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage, ComicsPage, Error404, SingleComicPage } from '../pages/pages.js'
import AppHeader from '../appHeader/AppHeader'

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<AppHeader />
				<main>
					<Routes>
						<Route index path='/' element={<MainPage />} />
						<Route path='comics' element={<ComicsPage />}>
							<Route path=':comicId' element={<SingleComicPage />} />
							<Route path='*' element={<Error404 />} />
						</Route>
						<Route path='*' element={<Error404 />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	)
}

export default App
