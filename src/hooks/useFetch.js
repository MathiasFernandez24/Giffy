import { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'

const useFetch = (search) => {
    const api_url = `${API_URL}search?${API_KEY}&q=${search}&limit=3&offset=0&rating=g&lang=en`
    const [listaGif, setListaGif] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController)
        setLoading(false)

        fetch(api_url, { signal: abortController.signal })
            .then(r => r.json())
            .then(r => {
                const { data } = r
                const resultGifs = data.map(i => {
                    return {
                        id: i.id,
                        title: i.title,
                        url: i.images.preview_webp.url,
                    }
                })
                setListaGif(resultGifs)
                setError(null)
            })
            .catch(e => setError(e))
            .finally(() => setLoading(true))
        setLoading(false)
        return () => abortController.abort()
    }, [search])

    const handleCancelRequest = () => {
        controller && controller.abort();
        console.log("cancelar");
        // setError("Request cancelled")
    }

    return { listaGif, loading, error, handleCancelRequest }
}

export default useFetch