import { useContext } from 'react'
import { Outlet } from 'react-router'

import { Themes } from '../app/App'
import './appBanner.scss'
import avengers from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers_logo.png'

const AppBanner = () => {
	const context = useContext(Themes)
	return (
		<>
			<div className='app__banner' style={{ backgroundColor: context.darkMode ? 'rgb(55, 55, 55)' : '#232222' }}>
				<img src={avengers} alt='Avengers' />
				<div className='app__banner-text'>
					New comics every week!
					<br />
					Stay tuned!
				</div>
				<img src={avengersLogo} alt='Avengers logo' />
			</div>
			<Outlet />
		</>
	)
}

export default AppBanner
