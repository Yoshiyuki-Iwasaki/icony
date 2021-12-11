import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Top from "./pages/Top";
import About from "./pages/About";
import OrderDetail from "./components/OrderDetail";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/" component={Top} />
                <Route exact path="/about" component={About} />
                <Route path="/orders/:id" component={OrderDetail} />
            </BrowserRouter>
        </>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
