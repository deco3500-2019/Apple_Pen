import React, { Component, Fragment } from "react";
import api from '../../api'

export default class extends Component{
	constructor(props){
		super(props);
		this.state = {
			answers: null
		};
	}

	async componentDidMount() {
		api.fetchAnswers()
		.then(answers => {
			console.log(answers);
			this.setState({ answers: answers })
		})
		.catch(err => {
			this.setState({ answers: "Could not retrieve answers"})
		})
	}

	render(){
		return(
			<Fragment>
				<h3>{this.state.answers}</h3>
				<button onClick = {() => this.props.reDirect()}> Back </button>
			</Fragment>
		)
	}
}
