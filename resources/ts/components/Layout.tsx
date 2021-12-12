import React from 'react'
import styled from "styled-components";

const Layout = ({ children }:any) => {
    return (
        <>
            <Main>{children}</Main>
        </>
    );
}

export default Layout;

const Main = styled.main`
    margin: 0 auto;
    width: 1000px;
`;
