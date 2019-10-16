import React, { Component } from "react";
import api from "/Users/ScottGullaksen/deco7350/src/api";

export default class extends Component {

	answer = ""

	componentDidMount(){
		const timerID = setTimeout( () => {
			// Post answer and Redirect to scoreBoard
			this.timeOut()
		}, this.props.question.timeLimit * 1000)
	}

	timeOut(){
		api.postAnswer(this.props.id, this.answer);
		this.props.reDirect()
	}

	render(){
		return (
			<div>
				<form >
					<label htmlFor="new-todo">
						Talk to teacher:
					</label>
					<input
						id="new-todo"
						onChange={ e => this.answer = e.target.value }
					/>
				</form>
				<h3>{JSON.stringify(this.props.question)}</h3>
			</div>
		)
	}
}