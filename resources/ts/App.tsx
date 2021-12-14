import React from "react";
import '../styles/globals.css'
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Top from "./pages/Top";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OrderDetail from "./components/OrderDetail";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Auth from "./components/Auth";

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Header />
                <Route exact path="/" component={Top} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/auth" component={Auth} />
                <Route path="/orders/:id" component={OrderDetail} />
            </BrowserRouter>
        </Layout>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
