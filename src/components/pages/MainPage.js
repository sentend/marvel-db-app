import { useState } from 'react'

import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

const MainPage = () => {
	const [charId, setcharId] = useState(null)

	const handleGetCharId = (id) => {
		setcharId(id)
	}
	return (
		<>
			<RandomChar getCharId={handleGetCharId} />
			<div className='char__content'>
				<CharList getCharId={handleGetCharId} />
				<CharInfo id={charId} />
			</div>
		</>
	)
}

export default MainPage
