import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const eventsAddress = `/${navigator.language.slice(0, 2)}/events`;
  const homeAddress = `/${navigator.language.slice(0, 2)}/home`;
  const venuesAddress = `/${navigator.language.slice(0, 2)}/venues`;
  const signInPage = `/${navigator.language.slice(0, 2)}/signin`;

  return (
    <header>
      <nav>
        <Link to={homeAddress}>Event-planner</Link>
        <ul>
          <li>
            <Link to={eventsAddress}>Events</Link>
          </li>
          <li>
            <Link to={venuesAddress}>Venues</Link>
          </li>
          <li>
            <Link to={signInPage}>Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
