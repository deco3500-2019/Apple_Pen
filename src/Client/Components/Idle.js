import { React , Component} from "react";
import {  } from "module";

export default class extends Component {

	render() {
		return (
		<div>
			<form onSubmit={this.handleSubmit}>
				<label htmlFor="new-todo">
						Talk to teacher:
				</label>
				<input
					id="new-todo"
					onChange={this.handleChange}
					value={this.state.text}
				/>
				<button>
					send text
				</button>
			</form>
			<h3>{this.state.response}</h3>
		</div>
		)
	}
}