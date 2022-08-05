import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import Error404 from './Error404'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'

import './singleComicPage.scss'

const SingleComicPage = () => {
	const [comic, setComic] = useState({})
	const { comicId } = useParams()
	const { getComic, loading, errorMessage } = useMarvelService()

	useEffect(() => {
		getComicFromList()
	}, [comicId])

	const getComicFromList = () => {
		getComic(comicId).then((comic) => {
			setComic(comic)
		})
	}

	const error = errorMessage ? <Error404 /> : null
	const spinner = loading ? <Spinner /> : <View comic={comic} />

	return <div className='single-comic'>{error || spinner}</div>
}

const View = ({ comic }) => {
	const { title, price, description, pages, img, language } = comic

	return (
		<>
			<img src={img} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pages}</p>
				<p className='single-comic__descr'>Language: {language}</p>
				<div className='single-comic__price'>{price}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</>
	)
}

export default SingleComicPage
