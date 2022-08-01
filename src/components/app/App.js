import { Component } from 'react'

import AppHeader from '../appHeader/AppHeader'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: null,
		}
	}

	handleGetCharId = (id) => {
		this.setState({ id })
	}

	render() {
		const { id } = this.state

		return (
			<div className='app'>
				<AppHeader />
				<main>
					<RandomChar />
					<div className='char__content'>
						<CharList getCharId={this.handleGetCharId} />
						<CharInfo id={id} />
					</div>
				</main>
			</div>
		)
	}
}

export default App
