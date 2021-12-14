import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Auth = ({ setUser, getUser }: any) => {
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

    return (
        <div>
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
        </div>
    );
};

export default Auth;
