import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, Header} from "./Components";

export default class extends Component{

	state = {
		question: false,
		userID: null
	}

	showQuestion = q => this.setState({ question: q })

	login = username => this.setState({ userID: username })

	render(){
		const {userID, question} = this.state;
		return (
			!userID ? 
				<Login setUser={this.login}/>
				: !question ?  // If logged in and no question posed
					<Idle reDirect= {this.showQuestion} id={userID} />
					:  // If logged in and question posed
					<AnswerQuestion question={question} showQuestion= {this.showQuestion} id={userID}/>
		)
	}
}