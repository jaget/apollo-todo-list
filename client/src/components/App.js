import { Switch, Route } from "react-router-dom";
import React, { Fragment } from "react";
import Header from "./Header";
import TodoItems from "../pages/TodoItems";
import TodoItem from "../pages/TodoItem";

const App = () => (
	<Fragment>
		<Header />
		<div>
			<Switch>
				<Route exact path="/" component={TodoItems} />
				<Route exact path="/todo/:todoItemID" component={TodoItem} />
			</Switch>
		</div>
	</Fragment>
);

export default App;
