import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "style/Theme";
import GlobalStyle from "./style";

const muiTheme = createTheme({
    palette: {
        primary: {
            main: "#7353EA",
            darker: "#322468",
        },
        binary: {
            main: "#757575",
            darker: "#3A3A3A",
        },
        black: {
            main: "#333333",
        },
    },
});

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <StyledThemeProvider theme={theme}>
                <ThemeProvider theme={muiTheme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </StyledThemeProvider>
        </QueryClientProvider>
    </RecoilRoot>,
);
