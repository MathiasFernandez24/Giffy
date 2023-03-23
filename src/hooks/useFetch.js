import { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'

const useFetch = (search, page, setPage) => {
    const [listaGif, setListaGif] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    // const [page, setPage] = useState(0)
    const gifResults = 1

    const api_url = (pageIndex) => `${API_URL}search?${API_KEY}&q=${search}&limit=${gifResults}&offset=${pageIndex * gifResults}&rating=g&lang=en`

    useEffect(() => {
        console.log("SIGUIENTE PAGINA");
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
                setListaGif(preGifs => preGifs.concat(resultGifs))
            })
    }, [loadingNextPage])



    useEffect(() => {
        setListaGif([])
        console.log("EFECTO FETCCH");
        const abortController = new AbortController()
        setController(abortController)

        // setPage(0)
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


    const nextPage = () => {
        console.log(page);
        setPage(i => i + 1)
        console.log(page);
        console.log(loadingNextPage);
        setLoadingNextPage(!loadingNextPage)
        // setLoading

    }

    const handleCancelRequest = () => {
        controller && controller.abort();
        console.log("cancelar");
        // setError("Request cancelled")
    }
    console.log("---------------------------------");
    return { listaGif, loading, error, handleCancelRequest, nextPage }
}

export default useFetch