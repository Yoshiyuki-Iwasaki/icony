import React from 'react'
import styled from "styled-components";
import { LayoutType } from "../type/layout";

const Layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <>
            <Main>{children}</Main>
        </>
    );
};

export default Layout;

const Main = styled.main`
    margin: 0 auto;
    width: 1000px;
`;
