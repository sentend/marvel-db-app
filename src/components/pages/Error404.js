import { Link } from 'react-router-dom'

import './error.scss'
import Error from '../errorMessage/Error'

const Error404 = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Error />
			<Link className='error-text' style={{ marginTop: 30, fontSize: 30, fontWeight: 'bold' }} to='/'>
				Would u like to go back?
			</Link>
		</div>
	)
}

export default Error404
