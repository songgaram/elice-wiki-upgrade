import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "./style";

const theme = createTheme({
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

            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </RecoilRoot>,
);
