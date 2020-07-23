import React, { useState } from "react";
import gql from "graphql-tag";
import TodoItemBox from "../components/TodoItemBox";
import NewTodoItem from "../components/NewTodoItem";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const TODOITEM_DETAILS = gql`
	fragment TodoItemDetails on TodoItem {
		id
		label
		isCompleted
	}
`;

const GET_TODOITEMS = gql`
	query todoItemsList {
		todoItems {
			...TodoItemDetails
		}
	}
	${TODOITEM_DETAILS}
`;

const CREATE_TODOITEM = gql`
	mutation CreateTodoItem($input: NewTodoItemInput!) {
		addTodoItem(input: $input) {
			...TodoItemDetails
		}
	}
	${TODOITEM_DETAILS}
`;

export default function TodoItems() {
	const [modal, setModal] = useState(false);
	const todoItems = useQuery(GET_TODOITEMS);

	const [addTodoItem, newTodoItem] = useMutation(CREATE_TODOITEM, {
		update(cache, { data: { addTodoItem } }) {
			const { todoItems } = cache.readQuery({ query: GET_TODOITEMS });

			cache.writeQuery({
				query: GET_TODOITEMS,
				data: { todoItems: [addTodoItem, ...todoItems] },
			});
		},
	});

	if (todoItems.loading) {
		return  (<Loader />);
	}

	if (todoItems.error || newTodoItem.error) {return (<p>ERROR</p>);}

	const onSubmit = (input) => {
		setModal(false);
		addTodoItem({
			variables: { input },

			optimisticResponse: {
				__typename: "Mutation",
				addTodoItem: {
					__typename: "TodoItem",
					id: 'Saving',
					label: input.label,
					isCompleted: input.isCompleted,
				},
			},
		});
	};

	const todoItemsList = todoItems.data.todoItems.map((todoItem) => (
		<TodoItemBox key={`${todoItem.id}-${todoItem.label}`} todoItem={todoItem} />
	));

	if (modal) {
		return <NewTodoItem onSubmit={onSubmit} onCancel={() => setModal(false)} />;
	}

	return (
		<div>
			<section>
				<h1>TodoItems</h1>
				<button onClick={() => setModal(true)}>new todoItem</button>
			</section>
			<section>
				<div>{todoItemsList}</div>
			</section>
		</div>
	);
}
