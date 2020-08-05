import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class Input extends Component {
	constructor() {
		this.state = {
			action: ""
		};
	};

	addTodo = () => {
		const task = { action: this.state.action };

		if (task.action && task.action.length > 0) {
			axios.post("/api/todos", task)
				.then(res => {
					if (res.data) {
						this.props.getTodos();
						this.setState({ action: "" });
					}
				})
				.catch(err => console.log(err));
		} else {
			console.log("Input field required");
		}
	};

	handleChange = (e) => {
		this.setState({
			action: e.target.value
		});
	};

	render() {
		const { action } = this.state;
		return (
			<div>
				<input type="text" onChange={ this.handleChange } value={ action }/>
				<button onClick={ this.addTodo }>Add</button>
			</div>
		);
	};
}

Input.propTypes = {
	getTodos: PropTypes.func
}