module.exports = {
	Query: {
		// me: async (_, __, { dataSources }) =>
		// 	dataSources.userAPI.findOrCreateUser(),
		todoLists: async (_, { input }, { dataSources }) => {
			return dataSources.todoListsAPI.findAll();
		},
		todoItems: async (_, { input }, { dataSources }) => {
			return dataSources.todoItemsAPI.findAll();
		},
		todoList(_, { id }, { models }) {
			return models.TodoList.findOne({ id });
		},
		todoItem(_, { id }, { models }) {
			return models.TodoListItem.findOne({ id });
		}
	},
	Mutation: {
		addTodoItem(_, { input }, { models }) {
			const todoItem = models.TodoItem.create({ ...input });
			return todoItem;
		},
		addTodoList(_, { input }, { models }) {
			const todoList = models.TodoList.create({ ...input });
			return todoList;
		}
	}
};
