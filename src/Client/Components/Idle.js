import React, { Component} from "react";
import api from '/Users/ScottGullaksen/deco7350/src/api'

export default class extends Component {

	state = {
		text: "",
		response: ""
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	async tick(){
		const response = await api.fetchQuestions("Scotty");
		console.log(response);
		try {
			if (!response.success) return
			this.setState({ response: JSON.stringify(response.question) });
		} catch (error) {
			this.setState({ response: "Could not connect to server" });
		}
	}

	render() {
		return (
		<div>
			<form onSubmit={ () => {} }>
				<label htmlFor="new-todo">
						Talk to teacher:
				</label>
				<input
					id="new-todo"
					onChange={() => { }}
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
}