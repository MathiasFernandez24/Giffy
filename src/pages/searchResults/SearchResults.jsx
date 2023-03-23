import React from 'react'
import LazyLoad from '../../components/LazyLoad'
import ListOfGifs from '../../components/ListOfGifs'
import './SearchResults.css'

const SearchResults = ({ params }) => {
    const { keyword } = params
    return (
        <>
            resultados
            <div className='searchResultsContainer'>
                <ListOfGifs search={keyword} />
            </div>
        </>
    )
}

export default SearchResults