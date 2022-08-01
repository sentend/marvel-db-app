import { Component } from 'react'

import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './charInfo.scss'

class CharInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			char: null,
			loading: false,
			errorMessage: false,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.id !== prevProps.id) {
			this.getCharFromList()
		}
	}

	marvelRequest = new MarvelService()

	getCharFromList = () => {
		this.setState({
			loading: true,
			errorMessage: false,
		})
		this.marvelRequest
			.getCharacter(this.props.id)
			.then((char) => {
				this.setState({ char, loading: false })
			})
			.catch(this.getError)
	}

	getError = () => {
		this.setState({
			loading: false,
			errorMessage: true,
		})
	}

	render() {
		const { char, loading, errorMessage } = this.state
		const skeleton = char || loading || errorMessage ? null : <Skeleton />
		const error = errorMessage ? <Error /> : null
		const spinner = loading ? <Spinner /> : null
		const content = !loading && !error && char ? <View char={char} /> : null

		return (
			<div className='char__info'>
				{skeleton}
				{error}
				{spinner}
				{content}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, thumbnail, homepage, wiki, description, comics, availableComics } = char

	const comicsList = comics.map((comic, i) => {
		if (i >= 10) {
			return
		}
		return (
			<li className='char__comics-item' key={i}>
				<a href={comic.resourceURI}>{comic.name}</a>
			</li>
		)
	})

	let style = { objectFit: 'cover' }
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		style = { objectFit: 'contain' }
	}

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt='abyss' style={style} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>{availableComics ? comicsList : 'This character was not in comics'}</ul>
		</>
	)
}

export default CharInfo
