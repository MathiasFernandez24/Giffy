import { useEffect, useState } from 'react';
import { Link, Route, useLocation, } from 'wouter';
import './App.css';
import Details from './pages/detail/Details';
import Home from './pages/home/Home';
import SearchResults from './pages/searchResults/SearchResults';


function App() {
	const [searchInput, setSearchInput] = useState("")
	const [search, setSearch] = useState("")
	const [path, pushPath] = useLocation()

	const handlerSearch = () => {
		if (searchInput != "") {
			setSearch(searchInput)
			setSearchInput("")
		}
	}

	useEffect(() => {
		if (search != "") {
			pushPath(`/search/${search}`)
		}
	}, [search])

	return (
		<div className="App-content">
			<div className='home'>
				<div className='home'>
					<Link to='/'>
						<h1>BACK TO HOME</h1>
					</Link>
				</div>
				<input value={searchInput} onChange={({ target }) => setSearchInput(target.value)} onKeyUp={(tecla) => { tecla.key == 'Enter' && handlerSearch() }} />
				<button onClick={handlerSearch}>buscar</button>
				<button onClick={() => { setSearch(!search) }}>True/False</button>
			</div>
			<Route path='/' component={Home} />
			<Route path='/search/:keyword' component={SearchResults} />
			<Route path='/detail/:id' component={Details} />
		</div>
	);
}

export default App;
