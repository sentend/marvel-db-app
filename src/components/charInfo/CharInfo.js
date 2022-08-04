import { useState, useEffect } from 'react'

import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './charInfo.scss'

const CharInfo = (props) => {
	const [char, setChar] = useState(null)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)

	const marvelRequest = new MarvelService()

	useEffect(() => {
		getCharFromList()
	}, [props.id])

	const getCharFromList = () => {
		if (!props.id) {
			return
		}

		loadingData()

		marvelRequest
			.getCharacter(props.id)
			.then((char) => {
				setChar(char)
				setLoading(false)
			})
			.catch(getError)
	}

	const loadingData = () => {
		setLoading(true)
		setErrorMessage(false)
	}

	const getError = () => {
		setLoading(false)
		setErrorMessage(true)
	}

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
