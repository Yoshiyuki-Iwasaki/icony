import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Auth = ({ user, setUser, getUser }: any) => {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const history = useHistory();

    // ログイン
    const login = async (e: any) => {
        e.preventDefault();
        // ログイン時にCSRFトークンを初期化
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post("/api/login", {
                    email,
                    password,
                })
                .then((res) => {
                    if (res.data.name) {
                        console.log("[login]ログイン成功");
                        setUser(res.data.user);
                        getUser();
                        history.push("/");
                    } else {
                        console.log(res.data.message);
                        console.log("[login]ログイン失敗");
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    console.log("[login]ログイン失敗");
                });
        });
    };

    // ログアウト
    const logout = () => {
        axios
            .post("/api/logout")
            .then((res) => {
                setUser(null);
                getUser();
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // ログインフォーム
    let form = (
        <form onSubmit={login}>
            <label>email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );

    // ユーザ情報
    let userInfo = null;

    // 認証済みの場合、ログアウトボタンとユーザ情報を表示
    if (user) {
        form = <button onClick={logout}>Logout</button>;
        userInfo = (
            <div>
                <h2>User</h2>
                <div>name: {user.name}</div>
                <div>email: {user.email}</div>
            </div>
        );
    }

    return (
        <div>
            {form}
            {userInfo}
            <button onClick={getUser}>getUser</button>
        </div>
    );
};

export default Auth;
