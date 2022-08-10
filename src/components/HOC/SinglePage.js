import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import Error404 from '../pages/Error404'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'

const withSinglePage = (BaseComponent, type) => () => {
	const { getComic, getCharacter, errorMessage, loading } = useMarvelService()
	const [data, setData] = useState({})
	const { id } = useParams()

	useEffect(() => {
		switch (type) {
			case 'comic':
				getComic(id).then((data) => setData(data))
				break
			case 'char':
				getCharacter(id, 'char').then((data) => setData(data))
				break
			default:
				break
		}
	}, [id])

	const error = errorMessage ? <Error404 /> : null
	const spinner = loading ? <Spinner /> : <BaseComponent data={data} />

	return error || spinner
}

export default withSinglePage
