import { lazy, Suspense, useState, createContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppHeader from '../appHeader/AppHeader'
import AppBanner from '../appBanner/AppBanner.js'
import Spinner from '../spinner/Spinner.js'

const Page404 = lazy(() => import('../pages/Error404.js'))
const MainPage = lazy(() => import('../pages/MainPage.js'))
const ComicsPage = lazy(() => import('../pages/ComicsPage.js'))
const SingleComicPage = lazy(() => import('../pages/SingleComicsPage.js'))

export const Themes = createContext()

const App = () => {
	const [darkMode, setDarkMode] = useState(false)

	const toggleDarkMode = () => {
		setDarkMode((darkMode) => !darkMode)
	}

	if (darkMode) {
		document.body.classList.add('dark-theme')
	} else {
		document.body.classList.remove('dark-theme')
	}
	console.log('test')

	return (
		<div className='app'>
			<Suspense fallback={<Spinner />}>
				<BrowserRouter>
					<Themes.Provider value={{ darkMode, toggleDarkMode }}>
						<Routes>
							<Route path='/' element={<AppHeader />}>
								<Route index element={<MainPage />} />
								<Route path='comics' element={<AppBanner />}>
									<Route index element={<ComicsPage />} />
									<Route path=':comicId' element={<SingleComicPage />} />
								</Route>
								<Route path='*' element={<Page404 />} />
							</Route>
						</Routes>
					</Themes.Provider>
				</BrowserRouter>
			</Suspense>
		</div>
	)
}
//контр точка
export default App
