const nanoid = require("nanoid");

const createModel = (table, db) => {
	return {
		findMany(filter) {
			return db
				.get(table)
				.filter(filter)
				.value();
		},

		findOne(filter) {
			return db
				.get(table)
				.find(filter)
				.value();
		},

		create(newValues) {
			const newItem = { id: nanoid(), ...newValues };

			db.get(table)
				.push(newItem)
				.write();

			return newItem;
		}
	};
};

module.exports = createModel;
