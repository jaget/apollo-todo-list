import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Header = () => (
	<header>
		<Link to="/">Home</Link>
	</header>
);

export default withRouter(Header);
