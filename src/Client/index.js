import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, Header} from "./Components";
import api from "../api";

export default class extends Component{

	state = {
		question: false,
		userID: null
	}

	componentDidMount(){
		const username = localStorage.getItem("username");
		if (username) this.login(username);
	}

	componentWillUnmount(){
		// TODO: delete user files in backend
	}

	showQuestion = q => this.setState({ question: q })

	login = async username => {
		api.postNewUser(username)
		.then( status => {
			if (status === "OK"){
				localStorage.setItem("username", username);
				this.setState({ userID: username })
			}
		})
		.catch( err => {
			// TODO
			console.log(err);
		})
	}

	logout = () => this.setState({ userID: null })

	render(){
		const {userID, question} = this.state;
		return (
			userID === null ? 
				<Login setUser={this.login}/>
				: !question ?  // If logged in and no question posed
					<Idle showQ= {this.showQuestion} logout={this.logout} id={userID} />
					:  // If logged in and question posed
					<AnswerQuestion question={question} showQuestion= {this.showQuestion} id={userID}/>
		)
	}
}