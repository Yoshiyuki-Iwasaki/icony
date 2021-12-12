import React from "react";
import styled from "styled-components";
import { Link, Router } from "react-router-dom";

const Header = () => {
    return (
        <HeaderLayout>
            <Inner>
                <Title>
                    <Link to="/">Icony</Link>
                </Title>
                <LeftArea>
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
const SignUp = styled(Link)``;
const SignIn = styled(Link)``;
