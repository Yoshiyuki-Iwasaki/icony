import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Router } from "react-router-dom";
import axios from "axios";

const Header = () => {
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
        <HeaderLayout>
            <Inner>
                <Title>
                    <Link to="/">Icony</Link>
                </Title>
                <LeftArea>
                    <Auth to="/auth">Auth</Auth>
                    <SignUp to="/signup">Sign Up</SignUp>
                    <SignIn to="/signin">Sign In</SignIn>
                </LeftArea>
            </Inner>
        </HeaderLayout>
    );
}

export default Header;

const HeaderLayout = styled.header``;
const Inner = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1000px;
    height: 70px;
`;
const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
`;
const LeftArea = styled.div``;
const Auth = styled(Link)``;
const SignUp = styled(Link)``;
const SignIn = styled(Link)``;
