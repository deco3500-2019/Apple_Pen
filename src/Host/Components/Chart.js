import React, { Component, Fragment } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import api from '../../api'

const useStyles = makeStyles({
	root: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});

export default class extends Component{
	constructor(props){
		super(props);
		this.state = {
			answers: null
		};
	}

	async componentDidMount() {
		api.fetchAnswers()
		.then(answers => {
			console.log(answers);
			this.setState({ answers: answers })
		})
		.catch(err => {
			this.setState({ answers: "Could not retrieve answers"})
		})
	}

	render(){
		return(
			<ChartView/>
		)
	}
}

const ChartView = props => {
	const { root } = useStyles();

	return (
		<div className={root}>
			<Grid container>
				<Grid item >
				</Grid>
			</Grid>
		</div>
	)
}