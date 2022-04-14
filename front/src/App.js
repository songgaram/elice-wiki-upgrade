import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import User from "./components/user/User";
import Admin from "./components/admin/Admin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users/:userId" element={<User />} />
                <Route path="/users/:userId/admin" element={<User />} />
                <Route path="*" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
