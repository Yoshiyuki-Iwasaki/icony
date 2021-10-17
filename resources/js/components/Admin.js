import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Admin() {
    return <>Admin</>;
}

export default Admin;

if (document.getElementById("admin")) {
    ReactDOM.render(<Admin />, document.getElementById("admin"));
}
