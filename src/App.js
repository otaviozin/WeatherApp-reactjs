import React, { useState } from 'react';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

const api = axios.create({
	baseURL: 'http://api.openweathermap.org/data/2.5'
});

function App() {

	const [query, setQuery] = useState('');
  	const [weather, setWeather] = useState({});

	const search = () => {
		api.get(`/weather?q=${query}&appid=3300ec1fed8e41e89428ff11f45800cf&units=metric`)
		.then(result => {
			setWeather(result.data);
			setQuery('');
			console.log(result.data);
		});
	}

	return (
		<div>
			<h1 className='ms-3 mt-3'>Weather App</h1>
			<div className='container mt-5 text-center text-lg-start'>
				<div className='row justify-content-center'>
					<div className='mb-3'>
						<input
							type='text'
							className='form-control w-md-50'
							placeholder='Search...'
							onChange={e => setQuery(e.target.value)}
							value={query} 
						/>
					</div>
					<button type='submit' className='btn btn-primary mb-4 w-75' onClick={search}>Search</button>
					{(typeof weather.main != "undefined") ? (
						<div className='card text-start border-primary mb-3' style={{maxWidth: 288}}>
							<div className='card-header'>
								{weather.name}, {weather.sys.country}
							</div>
							<div className='card-body'>
								<h5 className='card-title'>
									{Math.round(weather.main.temp)}°c
								</h5>
								<p className='card-text'>{weather.weather[0].main}</p>
							</div>
						</div>
					) : ('')}
				</div>
			</div>
		</div>
	);
}

export default App;