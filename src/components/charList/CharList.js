import { useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'
import { Themes } from '../app/App'

import './charList.scss'

const CharList = (props) => {
	const [charList, setCharList] = useState([])
	const [newCharsLoading, setNewCharsLoading] = useState(false)
	const [loadingList, setLoadingList] = useState(false)
	const [offset, setOffset] = useState(400)
	const [charEnded, setCharEnded] = useState(false)
	const { getAllCharacters, loading, errorMessage } = useMarvelService()
	const context = useContext(Themes)

	const refsArray = useRef([])

	useEffect(() => {
		loadMoreCharacters(offset)

		window.addEventListener('scroll', loadMoreCharactersOnScroll)

		return function cleanup() {
			window.removeEventListener('scroll', loadMoreCharactersOnScroll)
		}
	}, [])

	useEffect(() => {
		if (newCharsLoading) {
			setLoadingList(true)
			loadMoreCharacters(offset)
		}
	}, [newCharsLoading])

	const loadMoreCharacters = (offsetLocal) => {
		setLoadingList(true)
		getAllCharacters(offsetLocal)
			.then((newCharList) => {
				setCharList((charList) => [...charList, ...newCharList])
				setLoadingList(false)
				setOffset((offset) => offset + 9)
				setCharEnded(newCharList.length < 9 ? true : false)
			})
			.finally(() => setNewCharsLoading(false))
	}

	const loadMoreCharactersOnScroll = () => {
		if (loadingList) {
			return
		}
		if (charEnded) {
			window.removeEventListener('scroll', loadMoreCharactersOnScroll)
		}
		if (window.innerHeight + (window.scrollY - 37) >= document.documentElement.scrollHeight - 300) {
			setNewCharsLoading(true)
		}
	}

	const setFocusOnCharacter = (id, charId) => {
		refsArray.current.forEach((ref) => {
			ref.classList.remove('char__item_selected')
		})

		refsArray.current[id].classList.add('char__item_selected')
		refsArray.current[id].focus()
	}

	const renderListItems = (charList) => {
		const elements = charList.map((char, i) => {
			let style = { objectFit: 'cover', borderRadius: 10 }
			if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				style = { objectFit: 'unset', borderRadius: 10 }
			}

			return (
				<li
					ref={(el) => (refsArray.current[i] = el)}
					className='char__item'
					style={{ backgroundColor: context.darkMode ? '#2d2d2d' : '' }}
					key={char.name}
					onClick={() => {
						props.getCharId(char.id)
						setFocusOnCharacter(i, char.id)
					}}
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === ' ' || e.key === 'Enter') {
							props.getCharId(char.id)
							setFocusOnCharacter(i, char.id)
						}
					}}
				>
					<img src={char.thumbnail} alt={char.name} style={style} />
					<div className='char__name'>{char.name}</div>
				</li>
			)
		})

		return <ul className='char__grid'>{elements}</ul>
	}

	const items = renderListItems(charList)
	const error = errorMessage ? <Error /> : null
	const spinner = loading && !newCharsLoading ? <Spinner /> : items

	return (
		<div className='char__list'>
			{error || spinner}
			{charEnded ? null : (
				<button
					className='button button__main button__long'
					onClick={() => setNewCharsLoading(true)}
					disabled={loadingList}
				>
					<div className='inner'>load more</div>
				</button>
			)}
		</div>
	)
}

CharList.propTypes = {
	getCharId: PropTypes.func.isRequired,
}

export default CharList

//done сделал рефы для кажой карточки и класс активности да и в целом уже все готово по проекту
