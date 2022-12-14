import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import useMarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'
import { CharContext } from '../pages/MainPage'
import { Themes } from '../app/App'

import './charInfo.scss'

const CharInfo = () => {
	const [char, setChar] = useState(null)
	const { getCharacter, loading, errorMessage, clearError } = useMarvelService()
	const context = useContext(CharContext)
	const contextTheme = useContext(Themes)
	const cnCharInfo = cn({
		'char__info': true,
		'dark-theme': contextTheme.darkMode ? true : false,
	})

	useEffect(() => {
		getCharFromList()
	}, [context])

	const getCharFromList = () => {
		clearError()
		if (!context) {
			return
		}

		getCharacter(context).then((char) => {
			setChar(char)
		})
	}

	const skeleton = char || loading || errorMessage ? null : <Skeleton />
	const error = errorMessage ? <Error /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !loading && !error && char ? <View char={char} /> : null

	return (
		<div className={cnCharInfo}>
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
				<Link to={`/comics/${comic.resourceURI.match(/\d/g).slice(1).join('')}`}>{comic.name}</Link>
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
