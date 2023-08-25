import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
