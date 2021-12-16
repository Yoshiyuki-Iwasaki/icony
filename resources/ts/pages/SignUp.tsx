import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, Router } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { error }: any = await axios.post("/api/users/register", {
            name: "name",
            introduction: "introduction",
            role: "member",
            image: "",
            email: email,
            password: password,
        });
        console.log("error", error);
        setEmail("");
        setPassword("");
    };

    return (
        <Main>
            <Title>新規登録</Title>
            <Form onSubmit={handleSubmit}>
                <Block>
                    <Label htmlFor="email">email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Block>

                <Block>
                    <Label htmlFor="password">password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Block>
                <ButtonArea>
                    <Button type="submit" onClick={handleSubmit}>
                        新規登録
                    </Button>
                </ButtonArea>
            </Form>
            <BottomArea>
                <BottomLink to="/">ログイン</BottomLink>
            </BottomArea>
        </Main>
    );
};

export default SignUp;

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
    text-align: center;
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
