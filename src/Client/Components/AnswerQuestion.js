import React, { Component, Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import api from "../../api";
import Header from "./Header";

let useStyles = makeStyles(theme =>({
	root: {
		width: "414px",
		height: "736px",
		background: "#E1CCBD"
	},
	button: {
		margin: "40px 0 0 48px",
		background: "#95C2B7",
		width: "134px",
		height: "76px"
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
		this.props.setScore(this.state.answer === this.props.question.answers ? 100 : 0)
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
	const { text, alternatives, answer } = props.question

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
			</div>
			<div className={classes.content}>
				{text}
			</div> {[0, 1, 2, 3].map(key => 
				<Button
					variant="contained"
					className = { clsx(classes.button,
						!props.showResult ? 
							{ [classes.buttonSelected]: props.answer === key }
							:
							key === props.answer && props.answer !== answer ?
								{ [classes.buttonWrong]: true }
								:
								{ [classes.buttonCorrect]: answer === key }
					)}
					onClick= { () => props.setAnswer(key)}
				>
				{alternatives[key]}
				</Button>) }
		</div>
	);
}