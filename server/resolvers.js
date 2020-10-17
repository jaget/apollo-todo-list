const {PubSub} = require('apollo-server');

const pubsub = new PubSub();

const TODO_ITEM_ADDED = "TODO_ITEM_ADDED";

module.exports = {
  Query: {
    todoLists: (_, { input }, { dataSources }) =>
      dataSources.todoListsAPI.list({ ...input }),
    todoItems: (_, { input }, { dataSources }) =>
      dataSources.todoItemsAPI.list({ ...input }),
    todoList: (_, { id }, { dataSources }) => dataSources.TodoList.find(id),
    todoItem: (_, { input }, { dataSources }) =>
      dataSources.todoItemsAPI.find(input.id),
  },
  Mutation: {
    addTodoItem: (_, { input }, models) => {
      const result = models.dataSources.todoItemsAPI.create({ ...input });
      pubsub.publish(TODO_ITEM_ADDED, { todoItemAdded: result });

      return result;
    },
    deleteTodoItem: (_, { input }, models) =>
      models.dataSources.todoItemsAPI.delete({ ...input }),
    updateTodoItem: (_, { input }, models) =>
      models.dataSources.todoItemsAPI.update({ ...input }),
    addTodoList: (_, { input }, { models }) =>
      models.TodoList.create({ ...input }),
  },
  Subscription: {
    todoItemAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator(TODO_ITEM_ADDED),
    },
  },
};
