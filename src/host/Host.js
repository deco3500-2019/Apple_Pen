import React, { Component } from "react";
import axios from 'axios';

export default class Host extends Component{

	state = {
		response: ""
	}

	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render(){
		return(
		<div>
			This is the teachers screen. Student replied: {this.state.response}
		</div>
		)
	}

	tick(){
		axios.post('/reply')
			.then(
				res => {
					if (res.data === this.state.response) return res
					this.setState({ response: res.data });
				}
			)
			.catch(err => console.log(err));
	}
}