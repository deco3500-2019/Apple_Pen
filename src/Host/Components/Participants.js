import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import api from "../../api";

export default class extends Component {

	state = {
		participants: 0
	}

	componentDidMount() {
		this.timerID = setInterval(() => {
			api.fetchUserCount()
				.then(count => {
					console.log(count);
					this.setState({ participants: count })
				})
				.catch(err => console.log('unable to fetch user count'))
		}, 5000);
	}

	componentWillUnmount(){
		clearInterval(this.timerID)
	}

	render() {
		return(
			<div style={ { flexGrow: 1, display: "flex", justifyContent: "center", paddingRight: "100px"} }>
				<Typography variant="h6">
					{`Participants: ${this.state.participants}`}
				</Typography>
			</div>
		)
	}
}