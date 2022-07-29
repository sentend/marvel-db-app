import axios from 'axios'

class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=893a9b7dba2d7b81bf6c25ef2a7f0761'

	getData = async (url) => {
		let res = await axios.get(url)

		if (!res.status === 200 && res.statusText === 'OK') {
			throw new Error(
				`could not get request to ${url} status is ${res.status}`
			)
		}
		return res.data
	}

	getAllCharacters = () => {
		return this.getData(
			`${this._apiBase}characters?limit=9&offset=132&${this._apiKey}`
		)
	}

	getCharacter = (id) => {
		return this.getData(`${this._apiBase}characters/${id}?&${this._apiKey}`)
	}
}

export default MarvelService
