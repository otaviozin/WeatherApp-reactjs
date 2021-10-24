import React, { useState } from 'react';
import axios from 'axios';

import waves from './assets/wave.svg'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';

const api = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5'
});

function App() {

	const [query, setQuery] = useState('');
  	const [weather, setWeather] = useState({});

	const search = () => {
		api.get(`/weather?q=${query}&appid=3300ec1fed8e41e89428ff11f45800cf&units=metric`)
		.then(result => {
			setWeather(result.data);
			setQuery('');
			//console.log(result.data);
		});
	}

	return (
		<div className='bg-secondary'>
			<div className='container'>
				<h1 className='text-light pt-5'>Weather App</h1>
				<div className='row mt-5'>
					<div className='col-md-6'>
						<input
							type='text'
							className='form-control rounded-0'
							placeholder='Search...'
							onChange={e => setQuery(e.target.value)}
							value={query} 
						/>
					</div>
					<div className='col-md-6 text-center text-lg-start mt-3 mt-lg-0'>
						<button type='submit' className='btn btn-blue rounded-0' onClick={search}>Search</button>
					</div>
					{(typeof weather.main != 'undefined') ? (
						<div className='col-md-12 mt-3 mt-lg-4 d-flex justify-content-center justify-content-lg-start'>
							<div className='card card-custom rounded-0' style={{width: 288}}>
								<div className='card-body shadow-lg'>
									<h5 className='card-title'>{weather.name}, {weather.sys.country}</h5>
									<h6 className='card-subtitle mb-2'>{Math.round(weather.main.temp)}°c</h6>
									<p className='card-text'>{weather.weather[0].main}</p>
								</div>
							</div>
						</div>
					) : ('')}
				</div>
			</div>
			<img src={waves} alt='Wave footer'/>
		</div>
	);
}

export default App;