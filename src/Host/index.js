import React, { Fragment, Component }from 'react';
import { Stepper, Header, Chart } from "./Components";
import api from "../api";

export default class extends Component {

	state = {
		showChart: false,
		connect: true
	}

	async componentDidMount(){
		console.log("Host did mount");
		const timedID = setInterval(() => {  // Start querying for connection
			api.initiateGame()
				.then(status => {
					if (status === "OK"){  // Stop querying for connection
						clearInterval(timedID);
						this.setState({ connect: true })
					}
				})
				.catch(err => {
					if (this.state.connect) this.setState({ connect: false })
					console.log(err)
				})
		}, 1000);
		window.onunload = () => api.endGame()
	}


	setTimer = time => {
		this.timerID = setTimeout(() => {
			this.setState({ showChart: true })
		}, (time + 5) * 1000);
	}

	showQuestionForm = () => this.setState({showChart: false})

	render(){
		const { showChart, connect } = this.state
		return (
		<Fragment>
			<Header />
			{connect ? 
				showChart ?
					<Chart reDirect={this.showQuestionForm} />
				:
					<Stepper reDirectIn={this.setTimer} />
			:
				<h3>There was an error starting the quiz</h3>
			}
		</Fragment>
		)
	}
}