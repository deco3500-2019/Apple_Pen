import React from 'react';
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import Login from "./Containers/Login";
import Idle from "./Containers/Idle";
import Question from "./Containers/AnswerQuestion";

export default () => {

	const match = useRouteMatch();

	return(
	<div className="App" >
		<Route exact path={`${match.path}/`} >
			{/* -> First thing user sees is the login page*/ }
			<Redirect to={`${match.path}/login`}/>
		</Route>
		<Route path={`${match.path}/login`}>
			<Login/>
		</Route>
		<Route path={`${match.path}/Idle`}>
			<Idle/>
		</Route>
		<Route path={`${match.path}/Question`}>
			<Question />
		</Route>
	</div>
	)
}