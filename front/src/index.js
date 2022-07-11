import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import store from "./store/index";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "./GlobalStyle";

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
    },
});

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <App />
                </ThemeProvider>
            </Provider>
        </QueryClientProvider>
    </RecoilRoot>,
);
