import React from 'react'
import ListOfGifs from '../../components/ListOfGifs'
import './SearchResults.css'

const SearchResults = ({ params }) => {
    const { keyword } = params
    return (
        <div className='searchResultsContainer'>
            <ListOfGifs search={keyword} />
        </div>
    )
}

export default SearchResults