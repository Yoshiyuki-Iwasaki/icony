import { atom } from "recoil";
import { lightTheme,darkTheme } from "./theme";

let defaultTheme = lightTheme;
if (typeof window !== "undefined") {
    const savedColor = window.localStorage.getItem("THEME_TUTORIAL"); // save the users prefered mode
    if (savedColor) {
        savedColor === "dark"
            ? defaultTheme = darkTheme
            : defaultTheme = lightTheme;
    } else {
        const isDarkMode =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches; //get the default prefered mode
        defaultTheme = isDarkMode ? darkTheme : lightTheme;
    }
}

export const themeState = atom({
    key: "themeState",
    default: defaultTheme,
});
