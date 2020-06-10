import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const TODOITEM_DETAILS = gql`
	fragment TodoItemDetails on TodoItem {
		id
		label
		isCompleted
	}
`;

const DELETE_TODOITEM_FEEDBACK = gql`
	fragment TodoItemDeleteFeedback on DeleteTodoItemFeedback {
		success
	}
`;

const REMOVE_TODO = gql`
	mutation DeleteTodoItem($input: DeleteTodoItemInput!) {
		deleteTodoItem(input: $input) {
			...TodoItemDeleteFeedback
		}
	}
	${DELETE_TODOITEM_FEEDBACK}
`;

const GET_TODOITEMS = gql`
	query todoItemsList {
		todoItems {
			...TodoItemDetails
		}
	}
	${TODOITEM_DETAILS}
`;

const TodoItemBox = ({ todoItem }) => {
	const [deleteTodo, { loading: deleting, error: deleteError }] = useMutation(
		REMOVE_TODO
	);

	const updateCache = (client) => {
		const data = client.readQuery({
			query: GET_TODOITEMS,
		});
		const newData = {
			todoItems: data.todoItems.filter((t) => t.id !== todoItem.id),
		};

		client.writeQuery({
			query: GET_TODOITEMS,
			data: newData,
		});
	};

	const remove = (e) => {
		e.preventDefault();
		const { id } = todoItem;

		if (deleting) return;
		deleteTodo({
			variables: { input: { id: id } },
			update: updateCache,
		});
	};

	return (
		<div>
			<h6>{todoItem.id}</h6>
			<Link to={`/todo/${todoItem.id}`}>{todoItem.label}</Link>
			<span>{todoItem.isCompleted ? "Completed" : "Not completed"}</span>
			<button onClick={remove} disabled={deleting}>
				Delete
			</button>
		</div>
	);
};

export default TodoItemBox; // Should wrap this in the withrouter HOC
