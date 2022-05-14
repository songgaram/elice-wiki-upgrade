import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./api";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/actions/userAction";
import { useSelector } from "react-redux";
import Home from "./components/view/home/Home";
import EliceUserAuth from "./components/auth/EliceUserAuth";
import GoogleLoading from "./components/auth/GoogleLoading";
import Admin from "./components/admin/Admin";
import ManagePosts from "./components/admin/ManagePosts";
import ManageUsers from "./components/admin/ManageUsers";
import ManageQuestions from "./components/admin/ManageQuestions";
import QuestionEditor from "./components/admin/QuestionEditor";

function App() {
    const dispatch = useDispatch();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const res = await Api.get("user/current");
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch(loginUser(currentUser));

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        setIsFetchCompleted(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                {userState && (
                    <Route path="/auth" exact element={<EliceUserAuth />} />
                )}
                <Route path="/test" exact element={<GoogleLoading />} />
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
}

export default App;
