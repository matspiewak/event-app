import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./api/Events";
import Home from "./api/Home";
import Venues from "./api/Venues";
import Navbar from "./componennts/Navbar";
import SignIn from "./api/SignIn";
import SignUp from "./api/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <div className="content">
          <Routes>
            <Route path="/:lang/home" element={<Home />} />
            <Route path="/:lang/events" element={<Events />} />
            <Route path="/:lang/venues" element={<Venues />} />
            <Route path="/:lang/signin" element={<SignIn />} />
            <Route path="/:lang/signup" element={<SignUp />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
