import { useState, useCallback } from 'react'
import axios from 'axios'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null) //если баг, то исправить на null

	const request = useCallback(async (url) => {
		setLoading(true)

		//todo понять почему происходит бесконечное количество запросов на сервер
		try {
			const response = await axios.get(url)

			if (!response.status === 200 && response.statusText === 'OK') {
				throw new Error(`could not get request to ${url} status is ${response.status}`)
			}

			setLoading(false)
			console.log(response.data)
			return response
		} catch (e) {
			setLoading(false)
			setErrorMessage(e.message)
			throw e
		}
	}, [])

	const clearError = () => {
		setErrorMessage(null)
	}

	return {
		loading,
		request,
		clearError,
		errorMessage,
	}
}
