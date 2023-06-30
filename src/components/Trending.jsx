import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'
import Gif from './Gif'
import LazyLoad from './LazyLoad'
import styles from './Trending.module.css'
import Masonry from 'react-masonry-css';
import { SyncLoader } from 'react-spinners'

function MasonryComponent(props) {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            columnClassName="my-masonry-grid_column"
        >
            {props.children}
        </Masonry>
    );
}



const Trending = () => {
    const apiUrl = `${API_URL}trending?${API_KEY}&limit=30&rating=g`
    const [trending, setTrending] = useState([])
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        fetch(apiUrl)
            .then((r) => r.json())
            .then((r) => {
                const { data } = r
                const resultGifs = data.map(i => {
                    return {
                        id: i.id,
                        title: i.title,
                        url: i.images.downsized.url,
                    }
                })
                setTrending(resultGifs)
                setisLoading(true)
            })
    }, [])

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    // <MasonryComponent>
                    // {
                    trending.map(({ title, url, id }) => (
                        <div className={styles.gifsContainer}>
                            <Gif title={title} url={url} id={id} key={id} />
                        </div>
                    ))
                    // }
                    // </MasonryComponent>
                    :
                    <SyncLoader color='white' />
            }
            <LazyLoad />
        </div>
    )
}

export default Trending