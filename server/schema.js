const { gql } = require("apollo-server");

const typeDefs = gql`
	input NewTodoItemInput {
		label: String!
	}

	input TodoItemInput {
		label: String!
		completed: Boolean
	}

	type TodoItem {
		id: ID!
		label: String!
		completed: Boolean
	}

	input NewTodoListInput {
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
		todoItem(input: TodoItemInput): TodoItem
	}

	type Mutation {
		addTodoList(input: NewTodoListInput): TodoList
		addTodoItem(input: NewTodoItemInput): TodoItem
	}
`;

module.exports = typeDefs;
