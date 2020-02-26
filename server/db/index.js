const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db/db.json");
const db = low(adapter);

const createModel = require("./createModel");

module.exports = {
	models: {
		TodoItem: createModel("todoItem", db),
		TodoList: createModel("todoList", db)
	},
	db
};
