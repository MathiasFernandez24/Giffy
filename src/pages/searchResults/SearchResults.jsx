import React from 'react'
import ListOfGifs from '../../components/ListOfGifs'
import styles from './SearchResults.module.css'

const SearchResults = ({ params }) => {
    const { keyword } = params
    return (
        <div className={styles.searchResultsContainer}>
            <ListOfGifs search={keyword} />
        </div>
    )
}

export default SearchResults