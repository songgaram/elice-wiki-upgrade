import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "view/note/Note";
import UserHome from "view/home";
import EliceUserAuth from "view/auth/EliceUserAuth";
import GoogleLoading from "view/auth/GoogleLoading";
import Admin from "view/admin/Admin";
import ManagePosts from "view/admin/ManagePosts";
import ManageUsers from "view/admin/ManageUsers";
import ManageQuestions from "view/admin/ManageQuestions";
import ManageBoard from "view/admin/ManageBoard";
import QuestionEditor from "view/admin/QuestionEditor";
import MyPage from "view/mypage/MyPage";
import WeekPost from "view/home/week/WeekPost";
import HomePost from "view/home/HomePost";
import TagPost from "view/home/tag/TagPost";
import Board from "view/board";
import BoardDetail from "view/board/BoardDetail";
import BoardAddForm from "view/board/BoardAddForm";
import Spinner from "components/Spinner";
import Mdfile from "view/note/Markdown";
import PostEditForm from "view/note/PostEditForm";
import Intro from "view/Intro/Intro";
import Layout from "components/Layout";
import Search from "view/search";

import { useGetCurrentUser } from "queries/userQuery";

function App() {
    const { data, isFetching } = useGetCurrentUser();
    const userState = data?.userState?.payload;

    if (isFetching) return <Spinner />;

    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Intro />} />
                {userState && <Route path="/auth" exact element={<EliceUserAuth />} />}
                {userState?.authorized && (
                    <Route element={<Layout />}>
                        <Route path="/home" exact element={<UserHome />}>
                            <Route index element={<HomePost />} />
                            <Route path="post" element={<HomePost />} />
                            <Route path="week/:week" element={<WeekPost />} />
                            <Route path="tag/:tag" element={<TagPost />} />
                        </Route>
                        <Route path="post/:postId" element={<Mdfile />} />
                        <Route path="/addPost" element={<Note />} />
                        <Route path="/editPost" element={<PostEditForm />} />
                        <Route path="/board" exact element={<Board />} />
                        <Route path="/board/:id" exact element={<BoardDetail />} />
                        <Route path="/board/create" exact element={<BoardAddForm />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/search" element={<Search />} />
                    </Route>
                )}
                <Route path="/test" exact element={<GoogleLoading />} />

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
            </Routes>
        </Router>
    );
}

export default App;
