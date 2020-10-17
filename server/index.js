const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const {createToken, getUserFromToken} = require('./auth')

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
	// context() {
	// 	return { models, db };
	// }
	dataSources,
	context({req, connection}) {
		const ctx = {...store}
		if (connection) {
			// check from req
			return {...ctx, ...connection.context}
		}

		const token = req.headers.authorization
		const user = getUserFromToken(token)
		return {...store, user, createToken}
	}
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
