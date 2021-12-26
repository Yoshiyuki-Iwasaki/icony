import React from 'react'
import styled from "styled-components";
import { LayoutType } from "../type/layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "../style";


const Layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <>
            <RecoilRoot>
                <ThemeProvider>
                    <Main>{children}</Main>
                </ThemeProvider>
            </RecoilRoot>
        </>
    );
};

export default Layout;

const Main = styled.main`
    margin: 0 auto;
    width: 1000px;
`;
