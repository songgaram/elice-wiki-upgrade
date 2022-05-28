import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/actions/userAction";
import * as Api from "./api";
import Home from "./components/view/home/Home";
import Note from "./components/view/note/Note";
import EliceUserAuth from "./components/auth/EliceUserAuth";
import GoogleLoading from "./components/auth/GoogleLoading";
import Admin from "./components/admin/Admin";
import ManagePosts from "./components/admin/ManagePosts";
import ManageUsers from "./components/admin/ManageUsers";
import ManageQuestions from "./components/admin/ManageQuestions";
import ManageBoard from "./components/admin/ManageBoard";
import QuestionEditor from "./components/admin/QuestionEditor";
import MyPage from "./components/mypage/MyPage";
import WeekPost from "./components/view/home/WeekPost";
import PostList from "./components/view/home/PostList";
import Board from "./components/view/board/Board";
import BoardDetail from "./components/view/board/BoardDetail";
import BoardAddForm from "./components/view/board/BoardAddForm";
import Spinner from "./components/Spinner";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Mdfile from "./components/view/note/Markdown";
import PostEditForm from "./components/view/note/PostEditForm";

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

  if (!isFetchCompleted) {
    return <div>로딩중...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {userState && (
            <>
              <Route path="/auth" exact element={<EliceUserAuth />} />
              <Route path="/" exact element={<Home />}>
                <Route index element={<PostList />} />
                <Route path="post" element={<PostList />} />
                <Route path='post/:postId' element={<Mdfile />} />
                <Route path="week/:week" element={<WeekPost />} />
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
          {userState?.admin === 0 && <Route path="editquestion/:id" element={<QuestionEditor />} />}
          <Route path="mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
