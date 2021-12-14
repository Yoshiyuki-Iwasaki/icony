import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Router } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = ({ user, setUser, getUser }: any) => {
    const history = useHistory();
    // ブラウザリロード時にログイン済みか判定
    useEffect(() => {
        getUser();
    }, []);

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

    return (
        <HeaderLayout>
            <Inner>
                <Title>
                    <Link to="/">Icony</Link>
                </Title>
                <LeftArea>
                    {user ? (
                        <>
                            <p>{user.name}</p>
                            <button onClick={logout}>ログアウト</button>
                        </>
                    ) : (
                        <>
                            <Auth to="/auth">ログイン</Auth>
                            <SignUp to="/signup">新規登録</SignUp>
                        </>
                    )}
                </LeftArea>
            </Inner>
        </HeaderLayout>
    );
};

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
const LeftArea = styled.div`
    display: flex;
`;
const Auth = styled(Link)``;
const SignUp = styled(Link)``;
const SignIn = styled(Link)``;
