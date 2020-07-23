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
	todoItemsAPI: new TodoItemsAPI({ store }),
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	// context() {
	// 	return { models, db };
	// }
	context: async ({ req, connection }) => {
		if (connection) {
			// check connection for metadata
			return connection.context;
		} else {
			// check from req
			const token = req.headers.authorization || "";
			return { token };
		}
	},
	// subscriptions: {
	// 	onConnect: (connectionParams, webSocket) => {
	// 		console.log("connect");
	// 		if (connectionParams.authToken) {
	// 			return validateToken(connectionParams.authToken)
	// 				.then(findUser(connectionParams.authToken))
	// 				.then((user) => {
	// 					return {
	// 						currentUser: user,
	// 					};
	// 				});
	// 		}

	// 		throw new Error("Missing auth token!");
	// 	},
	// },
});

server.listen().then(({ url, subscriptionsUrl }) => {
	console.log(`🚀 Server ready at ${url}`);
	console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
