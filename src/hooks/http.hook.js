import { useState, useCallback } from 'react'
import axios from 'axios'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)

	const request = useCallback(async (url) => {
		setLoading(true)

		try {
			const response = await axios.get(url)

			if (!response.status === 200 && response.statusText === 'OK') {
				throw new Error(`could not get request to ${url} status is ${response.status}`)
			}

			setLoading(false)
			return response.data
		} catch (e) {
			setLoading(false)
			setErrorMessage(e.message)
			throw e
		}
	}, [])

	const clearError = () => {
		setErrorMessage(false)
	}

	return {
		loading,
		request,
		clearError,
		errorMessage,
	}
}
