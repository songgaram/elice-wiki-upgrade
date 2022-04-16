import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/view/home/Home";
import GoogleLoading from "./components/auth/GoogleLoading";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/test" element={<GoogleLoading />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;