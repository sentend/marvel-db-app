import { useState, useEffect, useContext } from 'react'
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import { Themes } from '../app/App'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = (props) => {
	const [char, setChar] = useState({})
	const [charLoaded, setcharLoaded] = useState(false)
	const context = useContext(Themes)
	const { loading, errorMessage, getCharacter, clearError } = useMarvelService()
	const cnStatic = cn({
		'randomchar__static': true,
		'dark-theme': context.darkMode ? true : false,
	})

	useEffect(() => {
		setcharLoaded(false)
		getRandomChar()
		const timerID = setInterval(getRandomChar, 6000)

		return () => {
			clearInterval(timerID)
		}
	}, [])

	const getRandomChar = () => {
		clearError()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id).then((char) => {
			setChar(char)
		})
		setcharLoaded(true)
	}

	const error = errorMessage ? <Error /> : null
	const spinner = loading ? <Spinner /> : <View char={char} getCharId={props.getCharId} />

	return (
		<CSSTransition timeout={300} in={charLoaded} unmountOnExit classNames='randomchar'>
			<div className='randomchar'>
				{error || spinner}
				<div className={cnStatic}>
					<div className='randomchar__info-block'>
						<div className='randomchar__text-block'>
							<p className='randomchar__title'>
								Random character for today!
								<br />
								Do you want to get to know him better?
							</p>
							<p className='randomchar__title'>Or choose another one</p>
						</div>
						<button className='button button__main'>
							<div className='inner' onClick={getRandomChar}>
								try it
							</div>
						</button>
					</div>
					<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
				</div>
			</div>
		</CSSTransition>
	)
}

const View = ({ char, getCharId }) => {
	const { thumbnail, name, description, homepage, wiki, id } = char
	const context = useContext(Themes)
	const cnBlock = cn({
		'randomchar__block': true,
		'dark-theme': context.darkMode ? true : false,
	})

	return (
		<div className={cnBlock} onClick={() => getCharId(id)} style={{ cursor: 'pointer' }}>
			<img src={thumbnail} alt='Random character' className='randomchar__img' />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{description}</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar
