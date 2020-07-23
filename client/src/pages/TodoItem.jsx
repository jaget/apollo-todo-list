import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

const TODOITEM_DETAILS = gql`
	fragment TodoItemDetails on TodoItem {
		id
		label
		isCompleted
	}
`;

const GET_TODOITEM = gql`
	query todoItem($input: TodoItemInput) {
		todoItem(input: $input) {
			...TodoItemDetails
		}
	}
	${TODOITEM_DETAILS}
`;

export default function TodoItem() {
	let { todoItemID } = useParams();
	const todoItemInput = { id: todoItemID };
	const todoItem = useQuery(GET_TODOITEM, {
		variables: { input: todoItemInput },
	});

	if (todoItem.loading) return <Loader />;
	if (todoItem.error) return <p>ERROR</p>;

	return (
		<div>
			<section>
				<h1>TodoItem : #{todoItemID}</h1>
			</section>
			<section>{todoItem.data.todoItem.label}</section>
			<p>{todoItem.data.todoItem.isComplete ? "Completed" : "Incomplete"}</p>
		</div>
	);
}
