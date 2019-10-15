import React, { Fragment, Component }from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import { Stepper, Header, Chart } from "./Components";
import { postQuestion } from '../api'

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
			<Chart/>
			: 
			<Stepper postQuestion={postQuestion} reDirectIn= {this.setTimer}/>}
		</Fragment>
		)
	}
}

/*
export default class extends Component{

	state = {
		response: ""
	}

	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render(){
		return(
		<div>
			This is the teachers screen. Student replied: {this.state.response}
		</div>
		)
	}

	tick(){
		axios.post('/reply')
			.then(
				res => {
					if (res.data === this.state.response) return res
					this.setState({ response: res.data });
				}
			)
			.catch(err => console.log(err));
	}
}
*/