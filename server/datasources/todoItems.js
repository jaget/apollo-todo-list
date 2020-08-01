const uuidv4 = require("uuid/v4");
const { DataSource } = require("apollo-datasource");

const tableName = "TodoItems";

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

	async list(conditions) {
		const found = await this.store[tableName].findAll({
			where: { ...conditions },
		});

		return found && found.length ? found : [];
	}

	async find(id) {
		const found = await this.store.todoItems.findByPk(id);
		return found ? found : [];
	}

	async create(values) {
		return await this.store[tableName].create({ ...values });
	}

	async update(id, values) {
		return await this.store[tableName].update({ ...values }, { where: { id } });
	}

	async delete({ id }) {
		return await this.store[tableName].destroy({ where: { id } }).then(
			function (rowDeleted) {
				// rowDeleted will return number of rows deleted
				if (rowDeleted === 1) {
					return { success: true };
				}
				return { success: false };
			},
			function (err) {
				console.log(err);
				return { success: false };
			}
		);
	}

	async update({ id }) {
		return await this.store[tableName].destroy({ where: { id } }).then(
			function (rowDeleted) {
				// rowDeleted will return number of rows deleted
				if (rowDeleted === 1) {
					return { success: true };
				}
				return { success: false };
			},
			function (err) {
				console.log(err);
				return { success: false };
			}
		);
	}
}

module.exports = TodoItemsAPI;
