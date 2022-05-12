import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/view/Intro/Intro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Intro />} />
      </Routes>
    </Router>
  );
}

export default App;
