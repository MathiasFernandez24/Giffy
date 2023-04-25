import React from 'react'
import { Link } from 'wouter'
import './Gif.css'

const Gif = ({ title, url, id }) => {
    return (
        <Link to={`/detail/${id}`}>
            <div className='gifContainer'>
                <img className='gifImage' src={url} />
                {/* <p className='gifTitle'>{title}</p> */}
            </div>
        </Link>
    )
}

export default Gif