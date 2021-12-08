import React from "react";
import ReactDOM from "react-dom";

function Header() {
    return (
        <header className="navbar navbar-expand navbar-light bg-white shadow-sm">Header</header>
    );
}

export default Header;

if (document.getElementById("header")) {
    ReactDOM.render(<Header />, document.getElementById("header"));
}
