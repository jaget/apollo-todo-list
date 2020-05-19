const { gql } = require("apollo-server");

const typeDefs = gql`
	input NewTodoItemInput {
		label: String!
		isCompleted: Boolean
	}

	input TodoItemInput {
		label: String!
		isCompleted: Boolean
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
	}
`;

module.exports = typeDefs;
