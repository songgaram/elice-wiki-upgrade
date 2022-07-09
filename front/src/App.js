import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/actions/userAction";
import * as Api from "libs/api";
import Home from "view/home/Home";
import Note from "view/note/Note";
import UserHome from "view/home/UserHome";
import EliceUserAuth from "view/auth/EliceUserAuth";
import GoogleLoading from "view/auth/GoogleLoading";
import Admin from "view/admin/Admin";
import ManagePosts from "view/admin/ManagePosts";
import ManageUsers from "view/admin/ManageUsers";
import ManageQuestions from "view/admin/ManageQuestions";
import ManageBoard from "view/admin/ManageBoard";
import QuestionEditor from "view/admin/QuestionEditor";
import MyPage from "view/mypage/MyPage";
import WeekPost from "view/home/WeekPost";
import HomePost from "view/home/HomePost";
import TagPost from "view/home/TagPost";
import Board from "view/board/Board";
import BoardDetail from "view/board/BoardDetail";
import BoardAddForm from "view/board/BoardAddForm";
import Spinner from "components/Spinner";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Mdfile from "view/note/Markdown";
import PostEditForm from "view/note/PostEditForm";
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

function App() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await Api.get("user/current");
                const currentUser = data.payload;
                // dispatch 함수를 통해 로그인 성공 상태로 만듦.
                dispatch(loginUser(currentUser));

                console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
            } catch {
                console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
            }
            setIsFetchCompleted(true);
        };
        fetchCurrentUser();
    }, [dispatch]);

    if (!isFetchCompleted) {
        return <Spinner />;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    {userState && <Route path="/auth" exact element={<EliceUserAuth />} />}
                    {userState?.authorized && (
                        <>
                            <Route path="/home" exact element={<UserHome />}>
                                <Route index element={<HomePost />} />
                                <Route path="post" element={<HomePost />} />
                                <Route path="post/:postId" element={<Mdfile />} />
                                <Route path="week/:week" element={<WeekPost />} />
                                <Route path="tag/:tag" element={<TagPost />} />
                            </Route>
                            <Route path="/addPost" element={<Note />} />
                            <Route path="/editPost" element={<PostEditForm />} />
                            <Route path="/board" exact element={<Board />} />
                            <Route path="/board/:id" exact element={<BoardDetail />} />
                            <Route path="/board/create" exact element={<BoardAddForm />} />
                        </>
                    )}
                    <Route path="/test" exact element={<GoogleLoading />} />
                    <Route path="*" element={<Home />} />
                    {(userState?.admin === 0 || userState?.admin === 1) && (
                        <Route path="/admin" element={<Admin />}>
                            <Route path="board" element={<ManageBoard />} />
                            <Route path="posts" element={<ManagePosts />} />
                            <Route path="users" element={<ManageUsers />} />
                            <Route path="questions" element={<ManageQuestions />} />
                        </Route>
                    )}
                    {userState?.admin === 0 && (
                        <Route path="editquestion/:id" element={<QuestionEditor />} />
                    )}
                    <Route path="mypage" element={<MyPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
