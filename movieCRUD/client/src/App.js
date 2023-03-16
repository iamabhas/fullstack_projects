import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Add from "./pages/Add";
import Movies from "./pages/Movies";
import Update from "./pages/Update";
import "./style.css";

const App = () => {
  return (
    <main className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
