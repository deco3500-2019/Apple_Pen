import React, { Component} from "react";
import api from '/Users/ScottGullaksen/deco7350/src/api'

export default class extends Component {

	state = {
		connect: true
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	async tick(){
		const response = await api.fetchQuestions(this.props.id);
		console.log(response);
		try {
			if (!response.success){
				if (!this.state.connect) this.setState({ connect: true })
				return
			}
			clearInterval(this.timerID);
			this.props.reDirect(response.question)
		} catch (error) {
			if (this.state.connect) this.setState({ connect: false })
		}
	}

	render() {
		return (
			<h3>
				{this.state.connect ? 
				"waiting for new question"
				:
				"Cannot connect to backend"}
			</h3>
		) 
	}
}