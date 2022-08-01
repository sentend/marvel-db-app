import { Component } from 'react'
import PropTypes from 'prop-types'

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
			loadingList: false,
			offset: 350,
			charEnded: false,
			total: null,
		}
	}

	componentDidMount() {
		this.getCharacters()
		this.marvelRequest.getTotalCharacters().then((total) => {
			this.setState({ total })
		})
		window.addEventListener('scroll', this.loadMoreCharactersOnScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.loadMoreCharactersOnScroll)
	}

	marvelRequest = new MarvelService()

	getCharacters = () => {
		this.loadMoreCharacters()
	}

	loadMoreCharactersOnScroll = () => {
		if (this.state.loadingList) {
			return
		}
		if (this.state.charEnded) {
			window.removeEventListener('scroll', this.loadMoreCharactersOnScroll)
		}
		if (window.innerHeight + (window.scrollY - 37) >= document.documentElement.scrollHeight - 300) {
			this.loadMoreCharacters(this.state.offset)
		}
	}

	loadMoreCharacters = (offset) => {
		this.setState({
			loadingList: true,
		})

		this.marvelRequest
			.getAllCharacters(offset)
			.then((newCharList) => {
				this.setState((state) => ({
					charList: [...state.charList, ...newCharList],
					loading: false,
					errorMessage: false,
					loadingList: false,
					offset: state.offset + 9,
					charEnded: newCharList.length < 9 ? true : false,
				}))
			})
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
		const { charList, errorMessage, loading, loadingList, offset, charEnded } = this.state
		const items = this.renderListItems(charList)
		const error = errorMessage ? <Error /> : null
		const spinner = loading ? <Spinner /> : items

		return (
			<div className='char__list'>
				{error || spinner}
				{charEnded ? null : (
					<button
						className='button button__main button__long'
						onClick={() => this.loadMoreCharacters(offset)}
						disabled={loadingList}
					>
						<div className='inner'>load more</div>
					</button>
				)}
			</div>
		)
	}
}

CharList.propTypes = {
	getCharId: PropTypes.func.isRequired,
}

export default CharList
