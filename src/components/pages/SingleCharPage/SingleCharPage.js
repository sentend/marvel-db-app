import { useContext } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import cn from 'classnames'

import withSinglePage from '../../HOC/SinglePage'
import { Themes } from '../../app/App'

import './singleCharPage.scss'

//!сделать темную тему и добавить кнопку вернуться назад

const SingleCharPage = ({ data }) => {
	const context = useContext(Themes)

	return (
		<div className='single-comic'>
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
