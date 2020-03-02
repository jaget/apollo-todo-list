const uuidv4 = require("uuid/v4");
const { DataSource } = require("apollo-datasource");

class TodoItemsAPI extends DataSource {
	constructor({ store }) {
		super();
		this.store = store;
	}

	/**
	 * This is a function that gets called by ApolloServer when being setup.
	 * This function gets called with the datasource config including things
	 * like caches and context. We'll assign this.context to the request context
	 * here, so we can know about the user making requests
	 */
	initialize(config) {
		this.context = config.context;
	}

	async list() {
		const found = await this.store.todoItems.findAll({});
		return found && found.length ? found : [];
	}

	async add({ values }) {
		const result = await this.store.todoItems.create({ values });
		return result;
	}
}

module.exports = TodoItemsAPI;
