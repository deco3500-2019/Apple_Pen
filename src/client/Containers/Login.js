import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios"

export default () =>
	<div>
		Implement login screen here.
	</div>


/*
export default class extends Component {

	state = {
		text: "",
		response: ""
	}

	render() {
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
		axios.post("/", { text: this.state.text })
			.then(res => this.setState({ response: res.data }))
			.catch(err => console.log(err));
	}
}
*/