import { RecoilRoot } from "recoil";
import { ThemeProvider } from "../style";

const Providers = ({ children }:any) => {
    return (
        <RecoilRoot>
            <ThemeProvider>{children}</ThemeProvider>
        </RecoilRoot>
    );
};

export default Providers;
