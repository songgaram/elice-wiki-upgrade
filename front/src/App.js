import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/view/home/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#7353EA",
            // darker: "#322468",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
