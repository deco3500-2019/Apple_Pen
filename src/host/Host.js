import React, { Fragment, Component }from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import { Stepper, Header, Chart } from "./Containers";
import { postQuestion } from '../api'

export default class extends Component {
	render(){
		return <Host/>
	}
}

const Host = props => {

	const match = useRouteMatch();

	return (
		<Fragment>
			<Route exact path={`${match.path}/`}>
				<Header />
				<Stepper postQuestion={postQuestion} />
			</Route>
			<Route path={`${match.path}/chart`}>
				<Chart />
			</Route>
		</Fragment>
	)
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