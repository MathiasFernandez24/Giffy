import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'
import Gif from './Gif'
import LazyLoad from './LazyLoad'
import './ListOfGifs.css'

const Trending = () => {
    const apiUrl = `${API_URL}trending?${API_KEY}&limit=12&rating=g`
    const [trending, setTrending] = useState([])

    useEffect(() => {
        fetch(apiUrl)
            .then((r) => r.json())
            .then((r) => {
                // console.log(r)
                const { data } = r
                const resultGifs = data.map(i => {
                    return {
                        id: i.id,
                        title: i.title,
                        url: i.images.downsized.url,
                    }
                })
                // console.log(trending)
                setTrending(resultGifs)
            })
    }, [])

    return (
        <>
            TRENDING
            <div className='listOfGifsContainer'>
                {
                    trending.map(({ title, url, id }) => <Gif title={title} url={url} key={id} />)
                }
            </div>
            <LazyLoad />
        </>
    )
}

export default Trending