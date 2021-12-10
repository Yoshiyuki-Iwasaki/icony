import React from "react";
import ReactDOM from "react-dom";

const Header = () => {
    return (
        <header>Header</header>
    );
}

export default Header;

if (document.getElementById("header")) {
    ReactDOM.render(<Header />, document.getElementById("header"));
}
