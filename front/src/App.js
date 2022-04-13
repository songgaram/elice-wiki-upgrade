import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import User from "./components/user/User";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users/:userId" element={<User />} />
                <Route path="*" element={<User />} />
            </Routes>
        </Router>
    );
}

export default App;
