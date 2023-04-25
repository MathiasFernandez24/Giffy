import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../../constant';
import styles from './Detail.module.css'

const Details = ({ params }) => {
    const { id } = params

    const [urlImage, setUrlImage] = useState("")

    useEffect(() => {
        fetch(`${API_URL}${id}?${API_KEY}`)
            .then(r => r.json())
            .then(r => {
                setUrlImage(r.data.images.downsized_large.url)

            })


    }, [])

    return (
        <div className={styles.container}>
            <img className={styles.image} src={urlImage} />
        </div>
    )
}

export default Details