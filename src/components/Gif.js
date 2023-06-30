import React from 'react'
import { Link } from 'wouter'
import styles from './Gif.module.css'

const Gif = ({ title, url, id }) => {
    return (
        <Link to={`/detail/${id}`}>
            <div className={styles.gifContainer}>
                <img className={styles.gifImage} src={url} />
                {/* <p className='gifTitle'>{title}</p> */}
            </div>
        </Link>
    )
}

export default Gif