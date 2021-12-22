import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link, Router } from "react-router-dom";


const Auth = ({ setUser, getUser }: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
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
                        console.log("[login]ログイン失敗02");
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    setEmailError(err.response.data.errors.email);
                    setPasswordError(err.response.data.errors.password);
                    console.log("eeeeee[login]ログイン失敗03");
                });
        });
    };

    return (
        <Main>
            <Title>ログイン</Title>
            <Form onSubmit={login}>
                <Block>
                    {emailError && <p>{emailError}</p>}
                    <Label htmlFor="email">email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Block>

                <Block>
                    {passwordError && <p>{passwordError}</p>}
                    <Label htmlFor="password">password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Block>
                <ButtonArea>
                    <Button type="submit" onClick={login}>
                        Login
                    </Button>
                </ButtonArea>
            </Form>
            <BottomArea>
                <BottomLink to="/signup">Sign Up</BottomLink>
            </BottomArea>
        </Main>
    );
};

export default Auth;

const Main = styled.div`
    padding: 40px 15px;
    position: fixed;
    background: #f3f3f3;
    height: 300px;
    width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Title = styled.h1`
    text-align:center;
    font-size: 18px;
    font-weight: 700;
`;
const Form = styled.form`
    margin-top: 45px;
`;
const Block = styled.div`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }
`;
const Label = styled.label`
    font-size: 14px;
`;
const Input = styled.input`
    margin-top: 5px;
    display: block;
    width: 100%;
    font-size: 15px;
`;
const ButtonArea = styled.div`
    margin-top: 20px;
    text-align: center;
`;
const Button = styled.button`
    font-size: 14px;
`;

const BottomArea = styled.div`
    margin-top: 15px;
    text-align: center;
`;
const BottomLink = styled(Link)`
    font-size: 13px;
`;
