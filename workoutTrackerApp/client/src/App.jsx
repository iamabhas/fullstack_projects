import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Learn from "./pages/Learn";
import Sessions from "./pages/Sessions";
import Workouts from "./pages/Workouts";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/learn" element={<Learn />}></Route>
            <Route path="/sessions" element={<Sessions />}></Route>
            <Route path="/workouts" element={<Workouts />}></Route>
            <Route path="/analytics" element={<Analytics />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
