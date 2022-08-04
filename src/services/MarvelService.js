import axios from 'axios'

import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
	const { loading, errorMessage, request } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=893a9b7dba2d7b81bf6c25ef2a7f0761'
	const _offset = 350
	const _limit = 9

	const getAllCharacters = async (offset) => {
		const characters = await request(`${_apiBase}characters?limit=${_limit}&offset=${offset}&${_apiKey}`)
		return characters.data.results.map((char) => _tranformData(char))
	}

	const getCharacter = async (id) => {
		console.log('getCharacter')
		const result = await request(`${_apiBase}characters/${id}?&${_apiKey}`)
		console.log(result)
		return _tranformData(result.data.results[0])
	}

	const getTotalCharacters = async () => {
		const result = await request(`${_apiBase}characters?${_apiKey}`)
		return result.data.total
	}

	const _tranformData = (char) => {
		if (char.description === '') {
			char.description = 'This character does not have description'
		} else if (char.description.length > 150) {
			char.description = char.description.slice(0, 150) + '...'
		}

		return {
			id: char.id,
			name: char.name,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			description: char.description,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
			availableComics: char.comics.available,
		}
	}

	return {
		getTotalCharacters,
		getCharacter,
		getAllCharacters,
		loading,
		errorMessage,
	}
}

export default useMarvelService
