import React from "react";
import ReactDOM from "react-dom";

function Header() {
    return <>Header</>;
}

export default Header;

if (document.getElementById("header")) {
    ReactDOM.render(<Header />, document.getElementById("header"));
}
