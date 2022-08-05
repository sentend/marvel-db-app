import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage, ComicsPage, Error404, SingleComicPage } from '../pages/pages.js'
import AppHeader from '../appHeader/AppHeader'
import AppBanner from '../appBanner/AppBanner.js'

const App = () => {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AppHeader />}>
						<Route index element={<MainPage />} />
						<Route path='comics' element={<AppBanner />}>
							<Route index element={<ComicsPage />} />
							<Route path=':comicId' element={<SingleComicPage />} />
						</Route>
						<Route path='*' element={<Error404 />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
//контр точка
export default App
