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

	input UpdateTodoItemInput {
		id: ID!
		label: String!
		isCompleted: Boolean
		todoListId: ID!
	}

	type UpdateTodoItemFeedback {
		success: Boolean!
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
		updateTodoItem(input: UpdateTodoItemInput): UpdateTodoItemFeedback
	}

	type Subscription {
		todoItemAdded: TodoItem
		# commentAdded(repoFullName: String!): Comment
	}
`;

module.exports = typeDefs;
