module.exports = {
	Query: {
		todoLists(_, { input }, { models }) {
			return models.TodoList.findMany(input || {});
		},
		todoList(_, { id }, { models }) {
			return models.TodoList.findOne({ id });
		},
		todoItem(_, { id }, { models }) {
			return models.TodoList.findOne({ id });
		}
	},
	Mutation: {
		addTodoItem(_, { input }, { models }) {
			const todoItem = models.TodoItem.create({ ...input });
			return todoItem;
		}
	}
};
