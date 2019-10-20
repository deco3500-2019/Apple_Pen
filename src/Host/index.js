import React, { Fragment, Component }from 'react';
import { Stepper, Header, Chart } from "./Components";
import api from "../api";

export default class extends Component {

	state = {
		showChart: false
	}

	componentDidMount(){
		console.log("Host did mount")
		window.onunload = () => api.endGame()
	}


	setTimer = time => {
		this.timerID = setTimeout(() => {
			this.setState({ showChart: true })
		}, (time + 5) * 1000);
	}

	showQuestionForm = () => this.setState({showChart: false})

	render(){
		const { showChart } = this.state
		return (
		<Fragment>
			<Header />
			{showChart ?
			<Chart reDirect= {this.showQuestionForm}/>
			: 
			<Stepper reDirectIn= {this.setTimer}/>}
		</Fragment>
		)
	}
}