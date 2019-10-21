import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, GameOver} from "./Components";
import api from "../api";

export default class extends Component{

	state = {
		question: false,
		userID: null,
		gameOver: false,
	}

	score = 0;

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

	gameOver = () => this.setState({ gameOver: true })

	setScore = score => this.score += score

	render(){
		const {userID, question, gameOver} = this.state;
		return (
			userID === null ?
				<Login setUser={this.login} />
				: !question ?  // If logged in and no question posed
					gameOver ?  // Is the game over?
						<GameOver logout={this.logout} score={this.score}/>
					:  // If not then keep fetching for questions
						<Idle showQ={this.showQuestion} showScores={this.gameOver} id={userID} />
				:  // If logged in and question posed
					<AnswerQuestion
						question={question}
						showQuestion={this.showQuestion}
						setScore={this.setScore}
						id={userID} />
		)
	}
}