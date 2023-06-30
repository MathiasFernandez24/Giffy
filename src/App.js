import { useEffect, useState } from 'react';
import { Link, Route, useLocation, } from 'wouter';
import styles from './App.module.css';
import Details from './pages/detail/Details';
import Home from './pages/home/Home';
import SearchResults from './pages/searchResults/SearchResults';


function App() {
	const [searchInput, setSearchInput] = useState("")
	const [search, setSearch] = useState("")
	const [path, pushPath] = useLocation()


	function handleGoBack() {
		window.history.back();
	}
	const handlerSearch = () => {
		if (searchInput != "") {
			setSearch(searchInput)
			setSearchInput("")
		}
	}

	useEffect(() => {
		if (search != "") {
			pushPath(`/search/${search}`)
			setSearch("")
		}
	}, [search])

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<Link to='/'>
					<h1 className={styles.title}>Giffy</h1>
				</Link>
				<input className={styles.input} placeholder='Search..' value={searchInput} onChange={({ target }) => setSearchInput(target.value)} onKeyUp={(tecla) => { tecla.key == 'Enter' && handlerSearch() }} />
			</div>
			<h1 className={styles.returnText} onClick={handleGoBack}>Return</h1>
			<Route path='/' component={Home} />
			<Route path='/search/:keyword' component={SearchResults} />
			<Route path='/detail/:id' component={Details} />
		</div >
	);
}

export default App;
