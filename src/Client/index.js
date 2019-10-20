import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, Header} from "./Components";
import api from "../api";

export default class extends Component{

	state = {
		question: false,
		userID: null
	}

	componentDidMount(){
		console.log("Client did mount")
	}

	componentWillUnmount(){
		// TODO: delete user files in backend
	}

	showQuestion = q => this.setState({ question: q })

	login = async username => {
		api.postNewUser(username)
		.then( status => {
			if (status === "OK") this.setState({ userID: username })
		})
		.catch( err => {
			// TODO
			console.log(err);
		})
	}

	render(){
		const {userID, question} = this.state;
		return (
			userID === null ? 
				<Login setUser={this.login}/>
				: !question ?  // If logged in and no question posed
					<Idle reDirect= {this.showQuestion} id={userID} />
					:  // If logged in and question posed
					<AnswerQuestion question={question} showQuestion= {this.showQuestion} id={userID}/>
		)
	}
}