import React, { Fragment }from 'react';
import ReactDOM from "react-dom";
import { Route, Link } from "react-router-dom";
import Client from "./Client";
import Host from "./Host";
import { BrowserRouter } from "react-router-dom";

const App = () => 
		<BrowserRouter >
			<Route exact path="/" >
				<Client />
			</Route>
			<Route path= "/host">
				<Host/>
			</Route>
		</BrowserRouter>

ReactDOM.render(<App/> , document.getElementById('root'));