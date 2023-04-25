import { useEffect, useState } from 'react';
import { Link, Route, useLocation, } from 'wouter';
import style from './App.module.css';
import Details from './pages/detail/Details';
import Home from './pages/home/Home';
import SearchResults from './pages/searchResults/SearchResults';
import { IconArrowNarrowLeft } from '@tabler/icons-react';


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
		<div className={style.container}>
			<Link to='/'>
				<h1 style={{ cursor: 'pointer', alignItems: 'center', fontSize: 70, fontFamily: 'cursive', margin: 0 }}>Giffy</h1>
			</Link>
			<div className={style.inputBar}>
				<div onClick={handleGoBack} style={{ cursor: 'pointer', display: 'flex', backgroundColor: '#00FFCA', padding: 3, borderRadius: 10 }}>
					<IconArrowNarrowLeft />
					<h1 style={{ alignItems: 'center', fontSize: 20, fontFamily: 'serif', margin: 0 }}>Go Back</h1>
				</div>
				<input className={style.input} placeholder='Buscar..' value={searchInput} onChange={({ target }) => setSearchInput(target.value)} onKeyUp={(tecla) => { tecla.key == 'Enter' && handlerSearch() }} />
				{/* <button onClick={handlerSearch}>buscar</button> */}
			</div>
			<Route path='/' component={Home} />
			<Route path='/search/:keyword' component={SearchResults} />
			<Route path='/detail/:id' component={Details} />
		</div>
	);
}

export default App;
