import { useState, useEffect } from 'react'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './comicsList.scss'

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([])
	const [newComicsLoading, setNewComicsLoading] = useState(false)
	const [offset, setOffset] = useState(6500)
	const [comicsEnded, setComicsEnded] = useState(false)
	const [loadingList, setLoadingList] = useState(false)
	const { loading, errorMessage, getAllComics } = useMarvelService()

	useEffect(() => {
		loadComics(offset)

		window.addEventListener('scroll', loadMoreComicsOnScroll)

		return function cleanup() {
			window.removeEventListener('scroll', loadMoreComicsOnScroll)
		}
	}, [])

	useEffect(() => {
		if (newComicsLoading) {
			setLoadingList(true)
			loadComics(offset)
		}
	}, [newComicsLoading])

	const loadComics = (offsetLocal) => {
		setLoadingList(true)
		getAllComics(offsetLocal)
			.then((newComicsList) => {
				setComicsList((comicsList) => [...comicsList, ...newComicsList])
				setLoadingList(false)
				setOffset((offset) => offset + 12)
				setComicsEnded(newComicsList.length < 12 ? true : false)
			})
			.finally(() => setNewComicsLoading(false))
	}

	const loadMoreComicsOnScroll = () => {
		console.log(loadingList)
		if (loadingList) {
			return
		}
		if (comicsEnded) {
			window.removeEventListener('scroll', loadMoreComicsOnScroll)
		}
		if (window.innerHeight + (window.scrollY - 37) >= document.documentElement.scrollHeight - 400) {
			setNewComicsLoading(true)
		}
	}

	const renderListItems = (charList) => {
		const elements = charList.map((comic, i) => {
			return (
				<li className='comics__item' key={comic.id}>
					<a href='#'>
						<img src={comic.img} alt={comic.title} className='comics__item-img' />
						<div className='comics__item-name'>{comic.title}</div>
						<div className='comics__item-price'>{comic.price}</div>
					</a>
				</li>
			)
		})

		return <ul className='comics__grid'>{elements}</ul>
	}

	const items = renderListItems(comicsList)
	const error = errorMessage ? <Error /> : null
	const spinner = loading && !newComicsLoading ? <Spinner /> : items
	return (
		<div className='comics__list'>
			{error || spinner}
			{comicsEnded ? null : (
				<button
					disabled={loadingList}
					onClick={() => setNewComicsLoading(true)}
					className='button button__main button__long'
				>
					<div className='inner'>load more</div>
				</button>
			)}
		</div>
	)
}

export default ComicsList
