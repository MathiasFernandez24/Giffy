import { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'

const useFetch = (search) => {
    const [busquedaAnterior, setBusquedaAnterior] = useState("")
    const [listaGif, setListaGif] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [page, setPage] = useState(0)
    const gifResults = 5
    const api_url = `${API_URL}search?${API_KEY}&q=${search}&limit=${gifResults}&offset=${page * gifResults}&rating=g&lang=en`

    useEffect(() => {
        // chequear()

        setPage(0)
        setBusquedaAnterior(search)
        setListaGif([])
    }, [search])



    useEffect(() => {

        console.log("EFECTO FETCCH");
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
                setListaGif(i => i.concat(resultGifs))
                setError(null)
            })
            .catch(e => setError(e))
            .finally(() => setLoading(true))
        setLoading(false)
        setLoadingNextPage(false)
        return () => abortController.abort()
    }, [search, loadingNextPage])


    const nextPage = () => {
        setPage(i => i + 1)
        console.log(page);
        setLoadingNextPage(true)
        // setLoading

    }

    const handleCancelRequest = () => {
        controller && controller.abort();
        console.log("cancelar");
        // setError("Request cancelled")
    }

    return { listaGif, loading, error, handleCancelRequest, nextPage }
}

export default useFetch