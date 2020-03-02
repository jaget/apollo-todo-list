const { Sequelize } = require("sequelize");

module.exports.paginateResults = ({
	after: cursor,
	pageSize = 20,
	results,
	// can pass in a function to calculate an item's cursor
	getCursor = () => null
}) => {
	if (pageSize < 1) return [];

	if (!cursor) return results.slice(0, pageSize);
	const cursorIndex = results.findIndex(item => {
		// if an item has a `cursor` on it, use that, otherwise try to generate one
		let itemCursor = item.cursor ? item.cursor : getCursor(item);

		// if there's still not a cursor, return false by default
		return itemCursor ? cursor === itemCursor : false;
	});

	return cursorIndex >= 0
		? cursorIndex === results.length - 1 // don't let us overflow
			? []
			: results.slice(
					cursorIndex + 1,
					Math.min(results.length, cursorIndex + 1 + pageSize)
			  )
		: results.slice(0, pageSize);
};

module.exports.createStore = () => {
	const db = new Sequelize({
		dialect: "sqlite",
		storage: "./store.sqlite"
	});

	const todoLists = db.define("todoLists", {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		name: Sequelize.STRING
	});

	todoLists.associate = function(models) {
		todoLists.hasMany(
			models.todoItems
			//  {as: 'employes'}
		);
	};

	const todoItems = db.define("todoItems", {
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE,
		label: Sequelize.STRING,
		isCompleted: Sequelize.BOOLEAN,
		todoListId: Sequelize.INTEGER
	});

	todoItems.associate = function(models) {
		todoItems.belongsTo(models.todoLists, {
			foreignKey: "todoListId",
			as: "listItem"
		});
	};

	return { db, todoLists, todoItems };
};
