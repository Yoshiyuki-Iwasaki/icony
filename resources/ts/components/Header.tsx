import React from "react";
import styled from "styled-components";

const Header = () => {
    return (
        <HeaderLayout>
            <Inner>
                <Title>Icony</Title>
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
    width: 1000px;
    height: 70px;
`;
const Title = styled.h1`
    font-size: 22px;
    font-weight: 700;
`;
