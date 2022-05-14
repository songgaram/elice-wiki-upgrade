import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/view/home/Home";
import GoogleLoading from "./components/auth/GoogleLoading";
import Admin from "./components/admin/Admin";
import ManagePosts from "./components/admin/ManagePosts";
import ManageUsers from "./components/admin/ManageUsers";
import ManageQuestions from "./components/admin/ManageQuestions";
import QuestionEditor from "./components/admin/QuestionEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/test" element={<GoogleLoading />} />
        <Route path="/admin" element={<Admin />} >
          <Route path="posts" element={<ManagePosts />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="questions" element={<ManageQuestions />} />
        </Route>
        <Route path="editquestion" element={<QuestionEditor />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
