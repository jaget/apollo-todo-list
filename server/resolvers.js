const {AuthenticationError} = require('apollo-server')
const {PubSub} = require('apollo-server');
const {authenticated, authorized} = require('./auth')

const pubsub = new PubSub();

const TODO_ITEM_ADDED = "TODO_ITEM_ADDED";

module.exports = {
    Query: {
        todoLists: (_, {input}, {dataSources}) =>
            dataSources.todoListsAPI.list({...input}),
        todoItems: (_, {input}, {dataSources}) =>
            dataSources.todoItemsAPI.list({...input}),
        todoList: (_, {id}, {dataSources}) => dataSources.TodoList.find(id),
        todoItem: (_, {input}, {dataSources}) =>
            dataSources.todoItemsAPI.find(input.id)
    },
    Mutation: {
        addTodoItem: (_, {input}, models) => {
            console.log('models is ', models);
            const result = models.dataSources.todoItemsAPI.create({...input});
            pubsub.publish(TODO_ITEM_ADDED, {todoItemAdded: result});

            return result;
        },
        deleteTodoItem: (_, {input}, models) =>
            models.dataSources.todoItemsAPI.delete({...input}),
        updateTodoItem: (_, {input}, models) =>
            models.dataSources.todoItemsAPI.update({...input}),
        addTodoList: (_, {input}, {models}) =>
            models.TodoList.create({...input}),
        register: (_, {input}, {models, createToken}) => {
            console.log('models is ', models);
            const existing = models.User.findOne({email: input.email})

            if (existing) {
                throw new AuthenticationError('nope')
            }
            const user = models.User.createOne({...input, verified: false, avatar: 'http'})
            const token = createToken(user)
            models.Settings.createOne({user: user.id, theme: 'DARK', emailNotifications: true, pushNotifications: true})
            return {token, user}
        },
        login: (_, {input}, {models, createToken}) => {

            const user = models.User.findOne(input)

            if (!user) {
                throw new AuthenticationError('wrong email + password combo')
            }

            const token = createToken(user)
            // return {token: 'token', user: {email: 'login resolver'}};

            return {token, user}
        }

    },
    Subscription: {
        todoItemAdded: {
            // Additional event labels can be passed to asyncIterator creation
            subscribe: () => pubsub.asyncIterator(TODO_ITEM_ADDED),
        },
    },
};
