import React, { useState, useEffect } from "react";
import '../styles/globals.css'
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Top from "./pages/Top";
import SignUp from "./pages/SignUp";
import OrderDetail from "./pages/OrderDetail";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import ProfileEdit from "./pages/ProfileEdit";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState<any>(null);

    // ブラウザリロード時にログイン済みか判定
    useEffect(() => {
        getUser();
    }, []);

    // 認証ユーザを取得
    const getUser = () => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log("[getUser]ログイン済み");
                console.log("res01", res);
                setUser(res.data);
            })
            .catch((err) => {
                console.log("[getUser]ログインしてません");
            });
    };

    return (
        <Layout>
            <BrowserRouter>
                {user ? (
                    <>
                        <Header
                            user={user}
                            setUser={setUser}
                            getUser={getUser}
                        />
                        <Route exact path="/">
                            <Top />
                        </Route>
                        <Route exact path="/auth">
                            <Auth setUser={setUser} getUser={getUser} />
                        </Route>
                        <Route path="/orders/:id">
                            <OrderDetail />
                        </Route>
                        <Route path="/profile/edit">
                            <ProfileEdit />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth setUser={setUser} getUser={getUser} />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                    </>
                )}
            </BrowserRouter>
        </Layout>
    );
};

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
