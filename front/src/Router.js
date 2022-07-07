import { BrowserRouter, Routes, Route } from "react-router-dom";
import Note from "./components/view/note/Note";
import Mdfile from "./components/view/note/Markdown";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addPost" element={<Note />}></Route>
        {/* <Route path="/mdFileTest" element={<Mdfile />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
