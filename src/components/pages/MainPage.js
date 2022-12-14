import { useState, createContext } from 'react'
import { Helmet } from 'react-helmet'

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
			<Helmet>
				<meta name='description' content='Marvel information portal' />
				<title>Marvel information portal</title>
			</Helmet>
			<CharContext.Provider value={charId}>
				<RandomChar getCharId={handleGetCharId} />
				<div className='char__content'>
					<div>
						<CharList getCharId={handleGetCharId} />
					</div>
					<div style={{ position: 'sticky', top: 20 }}>
						<CharInfo />
						<FindCharForm />
					</div>
				</div>
			</CharContext.Provider>
		</>
	)
}

export default MainPage
