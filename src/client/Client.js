import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

export default class Client extends Component {

	state = {
		text: "",
		response: ""
	}

	render(){
		return (
		<div>
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="new-todo">
					Talk to teacher: 
				</label>
				<input
					id="new-todo"
					onChange={this.handleChange}
					value={this.state.text}
				/>
				<button>
					send text
				</button>
			</form>
			<h3>{this.state.response}</h3>
		</div>
		)
	}

	handleChange = e => this.setState({ text: e.target.value })

	handleSubmit = e => {
		e.preventDefault();
		axios.get("/server")
			.then(res => {this.setState({ response: res.data });})
			.catch(err => console.log(err));
	}
	
}
