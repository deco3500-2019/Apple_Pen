import React from 'react';
import { Route, Link } from "react-router-dom";
import Client from "./client/Client";
import Host from "./host/Host";

export default () => 
		<div className= "App" >
			<Route exact path="/" >
				<Home/>
			</Route>
			<Route path= "/host">
				<Host/>
			</Route>
			<Route path= "/client">
				<Client/>
			</Route>
		</div>

const Home = () =>
	<div>
		<nav>
			<ul>
				<li>
					<Link to="/client"> Students page </Link>
				</li>
				<li>
					<Link to="/host"> Teachers page </Link>
				</li>
			</ul>
		</nav>
	</div>