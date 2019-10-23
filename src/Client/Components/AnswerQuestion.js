import React, { Component, Fragment } from "react";
import {Button, Paper, makeStyles, IconButton,  } from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/Alarm";
import api from "../../api";
import Header from "./Header";

let useStyles = makeStyles(theme =>({
	root: {
		width: "414px",
		height: "736px",
		background: "#E1CCBD"
	},
	buttonContainer:{
		marginTop: "10%",
		width: "100%",
		height: "30%",
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-evenly",
		alignContent: "space-between"
	},
	button: {
		background: "#95C2B7",
		width: "35%",
		height: "40%",
	},
	buttonSelected: {
		backgroundColor: theme.palette.grey.A100,
		boxShadow: theme.shadows[4]
	},
	buttonWrong: {
		backgroundColor: theme.palette.error.main
	},
	buttonCorrect: {
		backgroundColor: "#4caf50"
	},
	title: {
		fontFamily: "Impact",
		padding: "20px",
		fontSize: "24px",
		display: "flex",
		textalign: "center",
		color: "#FFFFFF"
	},
	content: {
		fontFamily: "Arail",
		padding: "20px",
		fontweight: "bold",
		fontSize: "18px",
		display: "flex",
		textalign: "center"
	},
	input: {
		display: "none"
	}
}));

export default class extends Component {

	state = {
		answer: "",
		showResult: false
	}

	componentDidMount(){
		setTimeout( () => {
			this.timeOut()
		}, this.props.question.timeLimit * 1000)
	}

	timeOut(){
		api.postAnswer(this.props.id, this.state.answer);
		this.props.setScore(this.state.answer === this.props.question.answer ? 100 : 0)
		this.setState({ showResult: true });
		setTimeout(() => {
			this.props.showQuestion(false)  // Give user chance to see if they answered wrong or correct, then switch page
		}, 10 * 1000)
	}

	render(){
		return (
			<Fragment>
				<Header/>
				<ContainedButtons
					{...this.props}
					answer={this.state.answer}
					showResult={this.state.showResult}
					setAnswer={a => this.setState({ answer: a })}
				/>
			</Fragment>
		)
	}
}

const ContainedButtons = props => {
	const classes = useStyles();
	const { text, alternatives, answer, timeLimit } = props.question

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<p>Quiz 1</p>
				<IconButton
					color="secondary"
					className={classes.label}
					aria-label="add an alarm"
				>
					<AlarmIcon />
				</IconButton>
				<Timer time={timeLimit} />
			</div>
			<div className={classes.content}>
				{text}
			</div> 
			<div className={classes.buttonContainer}>
				{[0, 1, 2, 3].map(key =>
					<Paper
						className={`${classes.button} 
						${!props.showResult ?
								props.answer === key ? classes.buttonSelected : ""
								:
								key === props.answer && props.answer !== answer ?
									classes.buttonWrong
									:
									answer === key ? classes.buttonCorrect : ""
							}`}
						onClick={() => props.setAnswer(key)}
					>
						{alternatives[key]}
					</Paper>)}
			</div>
		</div>
	);
}

class Timer extends Component{
	constructor(props){
		super(props);
		this.state = {
			time: props.time
		}
	}

	componentDidMount(){
		this.timerID = setInterval(() => {
			this.setState(state => ({ time: state.time - 1 }))
			if (this.state.time === 0) {
				clearInterval(this.timerID);
				this.setState({ time: "Time is up!"})
			}
		}, 1000);
	}

	render(){
		return(
			<p>{this.state.time}</p>
		)
	}
}