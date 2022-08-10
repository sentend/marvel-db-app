import { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import useMarvelService from '../../services/MarvelService'
import { Themes } from '../app/App'

import './findCharForm.scss'

const FindCharForm = () => {
	const [charName, setCharName] = useState('')
	const [charData, setCharData] = useState(null)
	const context = useContext(Themes)
	const { getCharacterByName } = useMarvelService()
	const classNamesForm = cn({
		'form': true,
		'dark-theme': context.darkMode ? true : false,
	})
	const classNamesInput = cn({
		'form__input': true,
		'dark-theme': context.darkMode ? true : false,
	})

	useEffect(() => {
		if (charName.length > 0) {
			getCharacterByName(charName).then((data) => {
				if (data !== false) {
					setCharData(data)
				}
			})
		}
	}, [charName])

	const result = !charData ? null : Object.keys(charData).length === 0 ? (
		<div className='form__find-char-page'>
			<span className='form__unfind-hero'>The character was not found. Check the name and try again</span>
		</div>
	) : (
		<div className='form__find-char-page'>
			<span className='form__find-hero'>There is! Wanna visit {charName} page?</span>
			<button className='button button__secondary'>
				<div className='inner'>
					<Link to={`characters/${charData.id}`}>page</Link>
				</div>
			</button>
		</div>
	)

	return (
		<div className={classNamesForm}>
			<Formik
				initialValues={{ name: '' }}
				validationSchema={yup.object({
					name: yup.string().required('You have to enter name character'),
				})}
				onSubmit={(value) => {
					setCharName(value.name)
				}}
			>
				<Form>
					<div className='form__block'>
						<label htmlFor='name' className='form__label'>
							Or find a character by name
						</label>
						<div className='form__find-char-info'>
							<Field
								id='name'
								name='name'
								type='text'
								className={classNamesInput}
								placeholder='Enter name'
								tabIndex={1}
							/>
							<button className='button button__main' type='submit'>
								<div className='inner'>FIND</div>
							</button>
						</div>
						<ErrorMessage name='name' className='form__error' component='div' />
					</div>
				</Form>
			</Formik>
			{result}
		</div>
	)
}

export default FindCharForm
