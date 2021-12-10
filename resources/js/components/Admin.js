import "react-tabs/style/react-tabs.css";
import ReactDOM from "react-dom";

function Admin() {
    return <>Admin</>;
}

export default Admin;

if (document.getElementById("admin")) {
    ReactDOM.render(<Admin />, document.getElementById("admin"));
}
