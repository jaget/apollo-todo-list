import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { useParams } from "react-router-dom";

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

	console.log(todoItem);

	return (
		<div>
			<section>
				<h1>TodoItem : #{todoItemID}</h1>
			</section>
			<section>{todoItem.label}</section>
		</div>
	);
}
