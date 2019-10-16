import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle} from "./Components";

export default class extends Component{
	
	state = {
		loggedIn: true,
		question: false,
	}

	showQuestion = q => {
		console.log(q);
		this.setState({ question: q })
	}

	render(){
		return (
			<Fragment>
				{ !this.state.loggedIn ? 
				<Login/>
				: !this.state.question ?  // If logged in and no question posed
				<Idle reDirect= {this.showQuestion} />
				:  // If logged in and question posed
				<AnswerQuestion question={this.state.question} /> }
			</Fragment>
		)
	}
}