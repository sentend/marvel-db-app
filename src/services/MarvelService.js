import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
	const { loading, errorMessage, request, clearError } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=893a9b7dba2d7b81bf6c25ef2a7f0761'
	const _charLimit = 9
	const _comicsLimit = 12

	const getAllCharacters = async (offset) => {
		const characters = await request(`${_apiBase}characters?limit=${_charLimit}&offset=${offset}&${_apiKey}`)
		return characters.data.results.map((char) => _tranformCharacters(char))
	}

	const getCharacter = async (id) => {
		const result = await request(`${_apiBase}characters/${id}?&${_apiKey}`)
		return _tranformCharacters(result.data.results[0])
	}

	const getTotalCharacters = async () => {
		const result = await request(`${_apiBase}characters?${_apiKey}`)
		return result.data.total
	}

	const getComic = async (id) => {
		const comic = await request(`${_apiBase}comics/${id}?${_apiKey}`)
		return _tranformComics(comic.data.results[0])
	}

	const getAllComics = async (offset) => {
		const comics = await request(`${_apiBase}comics?limit=${_comicsLimit}&offset=${offset}&${_apiKey}`)
		return comics.data.results.map((comic) => _tranformComics(comic))
	}

	const _tranformCharacters = (char) => {
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

	const _tranformComics = (comic) => {
		return {
			id: comic.id,
			title: comic.title,
			description: comic.description === null ? 'There is no description about this comics' : comic.description,
			pages: comic.pageCount > 0 ? comic.pageCount + ' pages' : 'There is not information about pages',
			price: comic.prices[0].price ? comic.prices[0].price + '$' : 'NOT AVAILABLE',
			img: comic.thumbnail.path + '.' + comic.thumbnail.extension,
			language: comic.textObjects.language || 'en-us',
		}
	}

	return {
		getTotalCharacters,
		getCharacter,
		getAllCharacters,
		loading,
		errorMessage,
		clearError,
		getComic,
		getAllComics,
	}
}

export default useMarvelService
