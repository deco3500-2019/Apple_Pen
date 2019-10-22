import React, { Component, Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../api"
import Header from "./Header";

const useStyles = makeStyles(theme => ({
	root: {
		width: "414px",
		height: "736px",
		background: "#E1CCBD",
		color: "black",
		display: "flex",
		textalign: "center",
		justifyContent: "center",
		alignItems: "center"
	}
}));

export default class extends Component {

	async componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	async tick(){
		api.fetchQuestion(this.props.id).then( response => {
			console.log(response);
			if (!response.success) return
			clearInterval(this.timerID);
			this.props.showQ(response.question)  // TODO: Handle undefined (answers > questions)
		})
		.catch( error => {
			clearInterval(this.timerID);
			localStorage.clear()
			this.props.showScores()
		})
	}

	render() {
		return (
			<Fragment>
				<Header />
				<Display {...this.state} />
			</Fragment>
		) 
	}
}

const Display = ({ connect }) => {
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<h1> Pay attention to class, silly! </h1>
		</div>
	)
}