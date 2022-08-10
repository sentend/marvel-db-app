import { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { Themes } from '../app/App'
import './appHeader.scss'

const AppHeader = () => {
	const context = useContext(Themes)

	return (
		<>
			<header className='app__header'>
				<h1 className='app__title'>
					<Link to='/'>
						<span>Marvel</span> information portal
					</Link>
				</h1>
				<button
					style={{
						color: context.darkMode ? 'white' : 'black',
						backgroundColor: context.darkMode ? 'black' : 'white',
						padding: 5,
						cursor: 'pointer',
						borderRadius: 5,
					}}
					onClick={context.toggleDarkMode}
				>
					{context.darkMode ? 'Light theme' : 'Dark Theme'}
				</button>
				<nav className='app__menu'>
					<ul>
						<li>
							<NavLink end to='/' style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })}>
								Characters
							</NavLink>
						</li>
						/
						<li>
							<NavLink to='/comics' style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })}>
								Comics
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
		</>
	)
}

export default AppHeader
