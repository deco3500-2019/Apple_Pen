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

	state = {
		connect: true
	}

	async componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	async tick(){
		api.fetchQuestion(this.props.id).then( response => {
			console.log(response);
			if (!response.success){ 
				if (!this.state.connect) this.setState({ connect: true })
				return
			}
			clearInterval(this.timerID);
			this.props.reDirect(response.question)  // TODO: Handle undefined (answers > questions)
		})
		.catch( error => {
			if (this.state.connect) this.setState({ connect: false })
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
			<h1> {connect ?
			"Loading..."
			:
			"Unable to connect to server"}
			</h1>
		</div>
	)
}