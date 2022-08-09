import { useState, createContext } from 'react'

import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import FindCharForm from '../form/FindCharForm'

export const CharContext = createContext()

const MainPage = () => {
	const [charId, setcharId] = useState(null)

	const handleGetCharId = (id) => {
		setcharId(id)
	}

	return (
		<>
			<CharContext.Provider value={charId}>
				<RandomChar getCharId={handleGetCharId} />
				<div className='char__content'>
					<CharList getCharId={handleGetCharId} />
					<CharInfo />
					{/* <FindCharForm /> */}
				</div>
			</CharContext.Provider>
		</>
	)
}

export default MainPage
