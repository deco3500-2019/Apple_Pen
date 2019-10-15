import React, { Component, Fragment } from 'react';
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import { Login, AnswerQuestion, Idle} from "./Components";

export default class extends Component{
	
	state = {
		loggedIn: false
	}

	render(){
		return <Client loggedIn= {this.state.loggedIn}/>
	}
}

const Client = props => {
	const match = useRouteMatch();

	return (
		<Fragment>
			<Route exact path={`${match.url}/`}>
				{!props.loggedIn ?
				<Redirect to={`${match.url}/login`} />
				: 
				<Idle/>}
			</Route>
			<Route exact path={`${match.url}/login`}>
				<Login/>
			</Route>
		</Fragment>
	)
}