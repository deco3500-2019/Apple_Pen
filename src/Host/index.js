import React, { Fragment, Component }from 'react';
import { Stepper, Header, Chart, Participants } from "./Components";
import api from "../api";
import { stat } from 'fs';

export default class extends Component {

	state = {
		showChart: false,
		connect: true
	}

	async componentDidMount(){
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

	toggleView = () => this.setState(state => ({connect: state.connect, showChart: !state.showChart}))

	render(){
		const { showChart, connect } = this.state
		return (
		<Fragment>
			<Header />
			<Participants/>
			{connect ? 
				showChart ?
					<Chart callBack={this.toggleView} />
				:
					<Stepper reDirectIn={this.setTimer} />
			:
				<h3>There was an error starting the quiz</h3>
			}
		</Fragment>
		)
	}
}