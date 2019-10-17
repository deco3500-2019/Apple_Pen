import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import api from "../../api";

let useStyles = makeStyles(theme => ({
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
		answer: ""
	}

	componentDidMount(){
		const timerID = setTimeout( () => {
			// Post answer and Redirect to scoreBoard
			this.timeOut()
		}, this.props.question.timeLimit * 1000)
	}

	timeOut(){
		api.postAnswer(this.props.id, this.state.answer);
		this.props.reDirect()
	}

	render(){
		return (
			<ContainedButtons {...this.props } answer= {this.answer} setAnswer= { a => this.setState({answer: a})} />
		)
	}
}

const ContainedButtons = props => {
	const classes = useStyles();
	const { text, alternatives } = props.question

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
				{props.question.text}
			</div> {[0, 1, 2, 3].map(key => 
			<Button variant="contained" className={classes.button} onClick= { () =>{
				props.setAnswer(key)
			}}>
			{alternatives[key] }
			</Button>) }
		</div>
	);
}