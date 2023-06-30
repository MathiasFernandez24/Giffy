import React from 'react'
import useFetch from '../hooks/useFetch'
import Gif from './Gif'
import LazyLoad from './LazyLoad'
import styles from './ListOfGifs.module.css'
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
            className={styles.listOfGifsSearchContainer}
        // columnClassName="my-masonry-grid_column"
        >
            {props.children}
        </Masonry>
    );
}




const ListOfGifs = ({ search }) => {
    const { listaGif, debounceNextPage } = useFetch(search)
    console.log(listaGif);
    return (
        <div>
            {listaGif.length > 1 ?
                <>
                    <div className='listOfGifsContainer'>
                        <MasonryComponent>
                            {
                                listaGif.map(({ title, url, id }) => <Gif title={title} url={url} id={id} key={id} />)
                            }
                        </MasonryComponent>

                    </div>
                    <LazyLoad debounceNextPage={debounceNextPage} />
                </>
                :
                <SyncLoader />
            }
        </div>
    )
}

export default ListOfGifs