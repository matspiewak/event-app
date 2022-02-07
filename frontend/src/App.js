import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Events from "./api/Events";
import Venues from "./api/Venues";

function App() {
  const eventsAddress = `/${navigator.language.slice(0, 2)}/events`;
  const homeAddress = `/${navigator.language.slice(0, 2)}/home`;
  const venuesAddress = `/${navigator.language.slice(0, 2)}/venues`;

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to={homeAddress}>Home</Link>
          </li>
          <li>
            <Link to={eventsAddress}>events</Link>
          </li>
          <li>
            <Link to={venuesAddress}>Venues</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/:lang/home" />
          <Route path="/:lang/events" element={<Events />} />
          <Route path="/:lang/venues" element={<Venues />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
