import React from 'react'
import { Link } from 'wouter'
import './Gif.css'

const Gif = ({ title, url }) => {
    return (
        <Link to={`/detail/${title}`}>
            <div className='gifContainer'>
                <p className='gifTitle'>{title}</p>
                <img className='gifImage' src={url} />
            </div>
        </Link>
    )
}

export default Gif