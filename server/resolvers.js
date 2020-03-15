module.exports = {
	Query: {
		// me: async (_, __, { dataSources }) =>
		// 	dataSources.userAPI.findOrCreateUser(),
		todoLists: (_, { input }, { dataSources }) =>
			dataSources.todoListsAPI.list({ ...input }),
		todoItems: (_, { input }, { dataSources }) =>
			dataSources.todoItemsAPI.list({ ...input }),
		todoList: (_, { id }, { models }) => models.TodoList.find(id),
		todoItem: (_, { id }, { models }) => models.TodoListItem.find(id)
	},
	Mutation: {
		addTodoItem: (_, { input }, models) =>
			models.dataSources.todoItemsAPI.create({ ...input }),
		addTodoList: (_, { input }, { models }) =>
			models.TodoList.create({ ...input })
	}
};
