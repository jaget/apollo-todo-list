module.exports = {
	Query: {
		// me: async (_, __, { dataSources }) =>
		// 	dataSources.userAPI.findOrCreateUser(),
		todoLists: (_, { input }, { dataSources }) =>
			dataSources.todoListsAPI.list({ ...input }),
		todoItems: (_, { input }, { dataSources }) =>
			dataSources.todoItemsAPI.list({ ...input }),
		todoList: (_, { id }, { dataSources }) => dataSources.TodoList.find(id),
		todoItem: (_, { input }, { dataSources }) =>
			dataSources.todoItemsAPI.find(input.id),
	},
	Mutation: {
		addTodoItem: (_, { input }, models) =>
			models.dataSources.todoItemsAPI.create({ ...input }),
		deleteTodoItem: (_, { input }, models) =>
			models.dataSources.todoItemsAPI.delete({ ...input }),
		addTodoList: (_, { input }, { models }) =>
			models.TodoList.create({ ...input }),
	},
};
