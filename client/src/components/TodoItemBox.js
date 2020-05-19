import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const TodoItemBox = ({ todoItem }) => (
	<div>
		<h6>{todoItem.id}</h6>
		<Link to={`/todo/${todoItem.id}`}>{todoItem.label}</Link>
		<span >
			{todoItem.isCompleted ? "Completed" : "Not completed"}
		</span>
	</div>
);

export default TodoItemBox; // Should wrap this in the withrouter HOC
