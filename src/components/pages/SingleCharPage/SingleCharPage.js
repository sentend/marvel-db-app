import { useContext } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import { Helmet } from 'react-helmet'

import withSinglePage from '../../HOC/SinglePage'
import { Themes } from '../../app/App'

import './singleCharPage.scss'

const SingleCharPage = ({ data }) => {
	const context = useContext(Themes)

	return (
		<div className='single-comic'>
			<Helmet>
				<meta name='description' content={`${data.name} character`} />
				<title>{`${data.name} character`}</title>
			</Helmet>
			<img src={data.thumbnail} alt={data.name} className='single-comic__char-img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name' style={{ color: context.darkMode ? 'white' : 'black' }}>
					{data.name}
				</h2>
				<p className='single-comic__descr'>{data.description}</p>
			</div>
			<Link to='/' className='single-comic__button'>
				Back to all
			</Link>
		</div>
	)
}

const CharWithSinglePage = withSinglePage(SingleCharPage, 'char')

export default CharWithSinglePage
