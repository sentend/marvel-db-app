import { Component } from 'react'

import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './charList.scss'

class CharList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			charList: [],
			loading: true,
			errorMessage: false,
		}
	}

	componentDidMount() {
		this.getCharacters()
	}

	marvelRequest = new MarvelService()

	getCharacters = () => {
		this.marvelRequest
			.getAllCharacters()
			.then((charList) => this.setState({ charList, loading: false, errorMessage: false }))
			.catch(this.getError)
	}

	getError = () => {
		this.setState({
			loading: false,
			errorMessage: true,
		})
	}

	renderListItems = (charList) => {
		const elements = charList.map((char) => {
			let style = { objectFit: 'cover' }
			if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				style = { objectFit: 'unset' }
			}

			return (
				<li className='char__item' key={char.name} onClick={() => this.props.getCharId(char.id)}>
					<img src={char.thumbnail} alt={char.name} style={style} />
					<div className='char__name'>{char.name}</div>
				</li>
			)
		})

		return <ul className='char__grid'>{elements}</ul>
	}

	render() {
		const { charList, errorMessage, loading } = this.state
		const items = this.renderListItems(charList)
		const error = errorMessage ? <Error /> : null
		const spinner = loading ? <Spinner /> : items

		return (
			<div className='char__list'>
				{error || spinner}
				<button className='button button__main button__long'>
					<div className='inner'>load more</div>
				</button>
			</div>
		)
	}
}

export default CharList
