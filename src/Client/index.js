import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, Header} from "./Components";

export default class extends Component{

	state = {
		loggedIn: true,
		question: false,
		userID: "Scotty"
	}

	showQuestion = q => {
		console.log(q);
		this.setState({ question: q })
	}

	showIdle = () => {
		this.setState({ question: false })
	}

	render(){
		const {loggedIn, userID, question} = this.state;
		return (
			<Fragment>
				<Header />
				{ !loggedIn ? 
				<Login/>
				: !question ?  // If logged in and no question posed
				<Idle reDirect= {this.showQuestion} id={userID} />
				:  // If logged in and question posed
				<AnswerQuestion question={question} reDirect= {this.showIdle} id={userID}/>}
			</Fragment>
		)
	}
}