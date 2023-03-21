import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import Gif from './Gif'
import './ListOfGifs.css'


const ListOfGifs = ({ search }) => {
    const { listaGif, loading, error, handleCancelRequest } = useFetch(search)
    return (
        <div className='listOfGifsContainer'>

            {/* <p>{error ? `error: ${error}` : `error: ok`}</p> */}
            {/* <p>{loading ? `loading: ${loading}` : `loading: ${loading}`}</p> */}
            {/* <button onClick={handleCancelRequest} >cancelar peticion</button> */}
            {
                listaGif.map(({ title, url, id }) => <Gif title={title} url={url} key={id} />)
            }
        </div>
    )
}

export default ListOfGifs