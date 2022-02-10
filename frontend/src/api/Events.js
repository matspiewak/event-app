import { useEffect, useState } from "react";
import EventCard from "../componennts/EventCard";
import "./Events.css";

function Events() {
  const [error, setError] = useState();
  const [events, setEvents] = useState();

  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    const fetchData = async () => {
      await fetch(`https://eventplannerapi.azurewebsites.net/${browserLanguage}/events`) //! dodać cors z localhost xxxx
        .then((res) => res.json())
        .then((events) => {
          setEvents(events);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  if (!events) {
    return <div>loading...</div>;
  }
  const locationEvents = events.includes('zulul')
  console.log(locationEvents)

  return (
    <>
      <div className="event-container">
        <h1>Events in Gdańsk</h1>
        <div className="carousel">
          {events.map((event, i) => (
            <EventCard
              key={i}
              title={event.title}
              tickets={event.ticketsLeft}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
