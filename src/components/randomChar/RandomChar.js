import { Component } from 'react'

import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../errorMessage/Error'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

class RandomChar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			char: {
				name: null,
				thumbnail: null,
				description: null,
				homepage: null,
				wiki: null,
			},
			loading: true,
			errorMessage: false,
		}
	}

	componentDidMount() {
		this.getRandomChar()
		this.timerID = setInterval(this.getRandomChar, 6000)
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	marvelRequest = new MarvelService()

	getRandomChar = () => {
		this.setState({
			loading: true,
			errorMessage: false,
		})
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		this.marvelRequest
			.getCharacter(id)
			.then((char) => {
				this.setState({ char, loading: false, errorMessage: false })
			})
			.catch(this.getError)
	}

	getError = () => {
		this.setState({
			loading: false,
			errorMessage: true,
		})
	}

	render() {
		const { char, loading, errorMessage } = this.state

		const error = errorMessage ? <Error /> : null
		const spinner = loading ? <Spinner /> : <View char={char} getCharId={this.props.getCharId} />

		return (
			<div className='randomchar'>
				{error || spinner}
				<div className='randomchar__static'>
					<p className='randomchar__title'>
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className='randomchar__title'>Or choose another one</p>
					<button className='button button__main'>
						<div className='inner' onClick={this.getRandomChar}>
							try it
						</div>
					</button>
					<img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
				</div>
			</div>
		)
	}
}

const View = ({ char, getCharId }) => {
	const { thumbnail, name, description, homepage, wiki, id } = char

	return (
		<div className='randomchar__block' onClick={() => getCharId(id)} style={{ cursor: 'pointer' }}>
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
