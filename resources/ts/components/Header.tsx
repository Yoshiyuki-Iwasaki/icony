import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderType } from '../type/header';
import useDarkMode from "../hook/useDarkMode";

const Header: React.FC<HeaderType> = ({ getUser }) => {
    const [theme, setTheme] = useDarkMode();
    // ブラウザリロード時にログイン済みか判定
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <HeaderLayout>
                <Inner>
                    <Title to="/">Icony</Title>
                    <RightArea>
                        <DarkmodeButton onClick={setTheme}>
                            {theme.type === "light" ? "🌚" : "🌝"}
                        </DarkmodeButton>
                    </RightArea>
                </Inner>
            </HeaderLayout>
        </>
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
const Title = styled(Link)`
    font-size: 22px;
    font-weight: 700;
`;
const RightArea = styled.div`
    display: flex;
`;
const DarkmodeButton = styled.button`
    font-size: 20px;
`;
