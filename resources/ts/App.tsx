import React from "react";
import '../styles/globals.css'
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Top from "./pages/Top";
import About from "./pages/About";
import OrderDetail from "./components/OrderDetail";
import Layout from "./components/Layout";

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Route exact path="/" component={Top} />
                <Route exact path="/about" component={About} />
                <Route path="/orders/:id" component={OrderDetail} />
            </BrowserRouter>
        </Layout>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
