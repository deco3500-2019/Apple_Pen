import React, { Fragment, Component }from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import { Stepper, Header, Chart } from "./Components";

export default class extends Component {

	state = {
		showChart: false
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