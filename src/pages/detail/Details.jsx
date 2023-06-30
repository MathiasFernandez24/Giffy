import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL } from '../../constant';
import styles from './Detail.module.css'
import { SyncLoader } from 'react-spinners'

const Details = ({ params }) => {
    const { id } = params

    const [urlImage, setUrlImage] = useState("")
    const [titleGif, setTitleGif] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch(`${API_URL}${id}?${API_KEY}`)
            .then(r => r.json())
            .then(r => {
                setTitleGif(r.data.title)
                setUrlImage(r.data.images.downsized_large.url)
                setIsLoading(true)
            })
    }, [])

    const handleDownload = () => {
        fetch(urlImage)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);

                // Crear enlace temporal
                const link = document.createElement('a');
                link.href = url;
                link.download = `${titleGif}.gif`;

                // Hacer clic en el enlace temporal para iniciar la descarga
                link.click();

                // Liberar el objeto URL creado
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error al descargar el GIF:', error);
            });
    }

    return (
        <div className={styles.container}>
            {
                isLoading ?
                    <img className={styles.image} src={urlImage} onClick={handleDownload} />
                    :
                    <SyncLoader color='white' />
            }
        </div>
    )
}

export default Details