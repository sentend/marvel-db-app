import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Themes } from '../../app/App'
import withSinglePage from '../../HOC/SinglePage'

import './singleComicPage.scss'

const SingleComicPage = ({ data }) => {
	const context = useContext(Themes)
	return (
		<div className='single-comic'>
			<img src={data.img} alt={data.title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name' style={{ color: context.darkMode ? 'white' : '' }}>
					{data.title}
				</h2>
				<p className='single-comic__descr'>{data.description}</p>
				<p className='single-comic__descr'>{data.pages}</p>
				<p className='single-comic__descr'>Language: {data.language}</p>
				<div className='single-comic__price'>{data.price}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</div>
	)
}

const ComicWithSinglePage = withSinglePage(SingleComicPage, 'comic')

export default ComicWithSinglePage

// const SingleComicPage = () => {
// 	const [comic, setComic] = useState({})
// 	const { comicId } = useParams()
// 	const { getComic, loading, errorMessage } = useMarvelService()

// 	useEffect(() => {
// 		getComicFromList()
// 	}, [comicId])

// 	const getComicFromList = () => {
// 		getComic(comicId).then((comic) => {
// 			setComic(comic)
// 		})
// 	}

// 	const error = errorMessage ? <Error404 /> : null
// 	const spinner = loading ? <Spinner /> : <View comic={comic} />

// 	return <div className='single-comic'>{error || spinner}</div>
// }

// const View = ({ comic }) => {
// 	const { title, price, description, pages, img, language } = comic
// 	const context = useContext(Themes)

// 	return (
// 		<>
// 			<img src={img} alt={title} className='single-comic__img' />
// 			<div className='single-comic__info'>
// 				<h2 className='single-comic__name' style={{ color: context.darkMode ? 'white' : '' }}>
// 					{title}
// 				</h2>
// 				<p className='single-comic__descr'>{description}</p>
// 				<p className='single-comic__descr'>{pages}</p>
// 				<p className='single-comic__descr'>Language: {language}</p>
// 				<div className='single-comic__price'>{price}</div>
// 			</div>
// 			<Link to='/comics' className='single-comic__back'>
// 				Back to all
// 			</Link>
// 		</>
// 	)
// }

// export default SingleComicPage
