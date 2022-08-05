import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'
import { Outlet, useParams } from 'react-router'

const ComicsPage = () => {
	const params = useParams()
	const lengthParams = Object.keys(params).length
	return (
		<>
			<AppBanner />
			{lengthParams ? <Outlet /> : <ComicsList />}
		</>
	)
}

export default ComicsPage
