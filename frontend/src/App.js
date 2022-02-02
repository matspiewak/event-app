import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [error, setError] = useState();
  const [events, setEvents] = useState();

  const fetchData = async () => {
    await fetch("https://eventplannerapi.azurewebsites.net/en/events")
      .then((res) => res.json())
      .then((events) => {
        setEvents(events);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(events);
  if(!events){
    return <p>loading</p>
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p className="event">{events[0].title}</p>
      </header>
    </div>
  );
}

export default App;
