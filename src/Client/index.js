import React, { Component, Fragment } from 'react';
import { Login, AnswerQuestion, Idle, GameOver, Header} from "./Components";
import api from "../api";

export default class extends Component{

	state = {
		question: false,
		userID: null,
		gameOver: false,
	}

	score = 0;
	qCount = 0;

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

	setScore = score => {
		this.score += score
		this.qCount += 1
	}

	render(){
		const {userID, question, gameOver} = this.state;
		return (
			<div style={style.root}>
				<Header />
				<div style={style.content}>
					{userID === null ?
						<Login setUser={this.login} />
						: !question ?  // If logged in and no question posed
							gameOver ?  // Is the game over?
								<GameOver logout={this.logout} score={this.score} qCount={this.qCount} />
								:  // If not then keep fetching for questions
								<Idle showQ={this.showQuestion} showScores={this.gameOver} id={userID} />
							:  // If logged in and question posed
							<AnswerQuestion
								question={question}
								showQuestion={this.showQuestion}
								setScore={this.setScore}
								id={userID} />}
				</div>
			</div>
		)
	}
}

const style = {
	root: {
		width: "100vw",
		height: "100vh",
		background: "#E1CCBD",
		display: "flex",
		flexDirection: "column"
	},
	content: {
		flexGrow: 1
	}
}