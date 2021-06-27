import React from "react";
import ReactDOM from "react-dom";

function Footer() {
    return <>Footer</>;
}

export default Footer;

if (document.getElementById("footer")) {
    ReactDOM.render(<Footer />, document.getElementById("footer"));
}
