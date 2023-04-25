import debounce from 'just-debounce-it'
import { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'

const useFetch = (search) => {
    const [listaGif, setListaGif] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    const [page, setPage] = useState(0.0)
    const gifResults = 25

    const api_url = (pageIndex) => `${API_URL}search?${API_KEY}&q=${search}&limit=${gifResults}&offset=${pageIndex * gifResults}&rating=g&lang=en`

    useEffect(() => {
        // console.log("SIGUIENTE PAGINA", page);
        fetch(api_url(page))
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
                console.log(resultGifs);
                setListaGif(preGifs => preGifs.concat(resultGifs))
            })
    }, [page])



    useEffect(() => {
        setListaGif([])
        // console.log("EFECTO FETCCH");
        const abortController = new AbortController()
        setController(abortController)

        setPage(0)
        fetch(api_url(0), { signal: abortController.signal })
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

    const debounceNextPage = debounce(() => setPage(i => i + 1), 500)

    const handleCancelRequest = () => {
        controller && controller.abort();
        // console.log("cancelar");
        // setError("Request cancelled")
    }
    return { listaGif, loading, error, handleCancelRequest, debounceNextPage }
}

export default useFetch