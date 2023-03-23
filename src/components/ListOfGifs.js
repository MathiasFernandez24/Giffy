import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Gif from './Gif'
import LazyLoad from './LazyLoad'
import './ListOfGifs.css'


const ListOfGifs = ({ search }) => {
    const [page, setPage] = useState(0)


    const { listaGif, loading, error, handleCancelRequest, nextPage } = useFetch(search, page, setPage)


    return (
        <>
            <div className='listOfGifsContainer'>

                {/* <p>{error ? `error: ${error}` : `error: ok`}</p> */}
                {/* <p>{loading ? `loading: ${loading}` : `loading: ${loading}`}</p> */}
                {/* <button onClick={handleCancelRequest} >cancelar peticion</button> */}
                {
                    listaGif.map(({ title, url, id }) => <Gif title={title} url={url} key={id} />)
                }
            </div>
            <br />
            <button onClick={nextPage}>Mas resultados</button>
            <LazyLoad nextPage={nextPage} />
            <br />
        </>
    )
}

export default ListOfGifs