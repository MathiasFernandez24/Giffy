import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../constant'
import Gif from './Gif'
import LazyLoad from './LazyLoad'
import './ListOfGifs.css'
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
            className="listOfGifsContainer"
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
                setisLoading(true)
            })
    }, [])

    return (
        <>
            {/* <div className='listOfGifsContainer'> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                {
                    isLoading ?
                        // <MasonryComponent>
                        // {
                        trending.map(({ title, url, id }) => <view style={{ display: 'flex', height: 200, width: 200, backgroundColor: '#088395', }}><Gif title={title} url={url} id={id} key={id} /></view>)
                        // }
                        // </MasonryComponent>
                        :
                        <SyncLoader />
                }
            </div>
            <LazyLoad />
        </>
    )
}

export default Trending