const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
// const { models, db } = require("./db");

const { createStore } = require("./utils");

const TodoListsAPI = require("./datasources/todoLists");
const TodoItemsAPI = require("./datasources/todoItems");

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
	todoListsAPI: new TodoListsAPI({ store }),
	todoItemsAPI: new TodoItemsAPI({ store })
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources
	// context() {
	// 	return { models, db };
	// }
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
