import React from 'react';

import api from '../api';

class CityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		api.get(`/weather?q=${this.state.value}&appid=3300ec1fed8e41e89428ff11f45800cf&lang=pt_br`)
			.then((res) => 
				console.log(res.data)
			)
			.catch((e) => {
				alert('Cidade não encontrada');
				console.log(e);
			})
		
		// alert('Um nome foi enviado: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form className='bg-blue-400 w-52' onSubmit={this.handleSubmit}>
			<label>
				Nome:
				<input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Enviar" />
			</form>
		);
	}
}

export default CityForm;