import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import Login from "./Login";

const Header = () => (
    <header>
        <Link to="/">Home</Link>
        <Login/>
    </header>
);

export default withRouter(Header);
