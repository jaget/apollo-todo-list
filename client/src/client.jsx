import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split, ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import gql from "graphql-tag";

const typeDefs = gql`
	extend type Pet {
		vacinated: Boolean!
	}
`;

const resolvers = {
	Pet: {
		vacinated: () => true,
	},
};

const delay = setContext(
	(request) =>
		new Promise((success, fail) => {
			setTimeout(() => {
				success();
			}, 800);
		})
);

const cache = new InMemoryCache();
const httpLink = new HttpLink({
	uri: "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000/graphql`,
	options: {
		reconnect: true,
	},
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const link = ApolloLink.from([delay, splitLink]);

const client = new ApolloClient({
	cache,
	link,
	typeDefs,
	resolvers,
	subscriptions: {
		onConnect: (connectionParams, webSocket) => {
			console.log(connectionParams);
			console.log(webSocket);
		},
	},
});

export default client;
