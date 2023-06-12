import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Learn from "./pages/Learn";
import Sessions from "./pages/Sessions";
import Workouts from "./pages/Workouts";
import Welcome from "./pages/Welcome";
//forms
import SignUp from "./pages/forms/SignUp";
import Login from "./pages/forms/Login";

//Upper body part
import Abs from "./pages/bodyParts/upperBody/Abs";
import Back from "./pages/bodyParts/upperBody/Back";
import Chest from "./pages/bodyParts/upperBody/Chest";
import Forearms from "./pages/bodyParts/upperBody/Forearms";
import Shoulder from "./pages/bodyParts/upperBody/Shoulder";
import Traps from "./pages/bodyParts/upperBody/Traps";
import Biceps from "./pages/bodyParts/upperBody/Biceps";
import Triceps from "./pages/bodyParts/upperBody/Triceps";

//Lower body part
import Glutes from "./pages/bodyParts/lowerBody/Glutes";
import Quads from "./pages/bodyParts/lowerBody/Quads";
import Calves from "./pages/bodyParts/lowerBody/Calves";
import Hamstrings from "./pages/bodyParts/lowerBody/Hamstrings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarConditional />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/learn" element={<Learn />}></Route>
            <Route path="/sessions" element={<Sessions />}></Route>
            <Route path="/sessions/:id/" element={<Workouts />}></Route>

            <Route path="/abs" element={<Abs />}></Route>
            <Route path="/back" element={<Back />}></Route>
            <Route path="/chest" element={<Chest />}></Route>
            <Route path="/forearms" element={<Forearms />}></Route>
            <Route path="/shoulder" element={<Shoulder />}></Route>
            <Route path="/traps" element={<Traps />}></Route>
            <Route path="/biceps" element={<Biceps />}></Route>
            <Route path="/triceps" element={<Triceps />}></Route>

            <Route path="/glutes" element={<Glutes />}></Route>
            <Route path="/quads" element={<Quads />}></Route>
            <Route path="/calves" element={<Calves />}></Route>
            <Route path="/hamstrings" element={<Hamstrings />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

function NavbarConditional() {
  const location = useLocation();

  const hiddenRoutes = ["/signup", "/login", "/"];

  const shouldShowNavbar = !hiddenRoutes.includes(location.pathname);

  return shouldShowNavbar ? <Navbar /> : null;
}

export default App;
