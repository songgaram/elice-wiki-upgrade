import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./api";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/actions/userAction";
import Home from "./components/view/home/Home";
import EliceUserAuth from "./components/auth/EliceUserAuth";

function App() {
    const dispatch = useDispatch();
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
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
                {/* <Route path="/" exact element={<Home />} />
        <Route path="/users/:userId" element={<Home />} /> */}
                <Route path="/" element={<EliceUserAuth />} />
                {/* <Route path="/login" element={<LoginForm />} />
        <Route path="/test" element={<GoogleLoading />} />
        <Route path="*" element={<Home />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
