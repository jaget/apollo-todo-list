const { gql } = require("apollo-server");

const typeDefs = gql`
	input NewTodoItemInput {
		label: String!
		isCompleted: Boolean
	}

	input TodoItemInput {
		id: ID!
	}

	type TodoItem {
		id: ID!
		label: String!
		isCompleted: Boolean
		todoListId: ID!
	}

	input NewTodoListInput {
		name: String!
	}

	type DeleteTodoItemFeedback {
		success: Boolean!
	}

	input DeleteTodoItemInput {
		id: ID!
	}

	input TodoListInput {
		name: String!
	}

	type TodoList {
		id: ID!
		name: String!
		todoItems: [TodoItem]
	}

	type Query {
		todoLists: [TodoList]
		todoList(id: ID!): TodoList
		todoItems: [TodoItem]
		todoItem(input: TodoItemInput): TodoItem
	}

	type Mutation {
		addTodoList(input: NewTodoListInput): TodoList
		addTodoItem(input: NewTodoItemInput): TodoItem
		deleteTodoItem(input: DeleteTodoItemInput): DeleteTodoItemFeedback
	}
`;

module.exports = typeDefs;
