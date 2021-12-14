import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/users/login", {
            email,
            password
        });
        console.log("error", error);
        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>ログイン</button>
        </form>
    );
};

export default SignIn;
