import React from "react";
import PropTypes from "prop-types";

const ListTodo = ({ todos, deleteTodo }) => {

	return (
		<ul>
			{
				todos && todos.length > 0 ?
					(
						todos.map(todo => {
							return (
								<li key={ todo._id } onClick={ () => deleteTodo(todo._id) }>{ todo.action }</li>
							)
						})
					)
					:
					(
						<li>No todo(s) left</li>
					)
			}
		</ul>
	)
};

ListTodo.propTypes = {
	todos: PropTypes.object,
	deleteTodo: PropTypes.func
};

export default ListTodo;