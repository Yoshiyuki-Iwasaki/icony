import {
    ThemeProvider as StyledProvider,
    createGlobalStyle,
} from "styled-components";
import { useRecoilValue } from "recoil";

import { themeState } from "./atom";

export const ThemeProvider = ({ children }: any) => {
    const theme = useRecoilValue(themeState);

    return (
        <StyledProvider theme={theme}>
            <GlobalStyle />
            {children}
        </StyledProvider>
    );
};

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }: any) => theme.bgColor};
    color: ${({ theme }: any) => theme.textColor};
  }
  a,p,h1,h2,h3,h4,h5,li,span,button {
      color: ${({ theme }: any) => theme.textColor};
  }
`;
