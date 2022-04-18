import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import User from "./components/user/User";
import Admin from "./components/admin/Admin";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/users/:userId" element={<User />} />
                <Route path="/admin/:userId" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
