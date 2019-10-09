import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Client from "./client/Client";
import Host from "./host/Host";

function App() {
	return (
		<div className= "App" >
			<Route exact path="/" >
				<div className="App"> Hello, world! </div>
			</Route>
			<Route path= "/host" component= {Host}/>
			<Route path= "/client" component= {Client}/>
		</div>
	);
}

export default App;
