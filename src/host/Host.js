import React from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import Chart from "./Chart";

export default () => {

	const match = useRouteMatch();

	return (
		<div>
			<Route exact path={`${match.path}/`}>
				<div>
					Implement the teachers screen here.
				</div>
			</Route>
			<Route path={`${match.path}/chart`}>
				<Chart />
			</Route>
		</div>
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