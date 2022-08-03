import { useState } from 'react'

import AppHeader from '../appHeader/AppHeader'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

const App = () => {
	const [charId, setcharId] = useState(null)

	const handleGetCharId = (id) => {
		setcharId(id)
	}

	return (
		<div className='app'>
			<AppHeader />
			<main>
				<RandomChar getCharId={handleGetCharId} />
				<div className='char__content'>
					<CharList getCharId={handleGetCharId} />
					<CharInfo id={charId} />
				</div>
			</main>
		</div>
	)
}

export default App
