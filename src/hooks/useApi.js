import { useState } from 'react'

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (method, url, body = null, headers = {}) => {
    setLoading(true)
    setError(null)

    // Token de autorizacion
    const loginToken = localStorage.getItem('loginToken')

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
          ...headers,
        },
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { fetchData, loading, error }
}

export default useApi
