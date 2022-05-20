import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/view/Header";
import Home from "./components/view/home/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
