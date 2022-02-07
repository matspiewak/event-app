import { useEffect, useState } from "react";

function Events() {
  const [error, setError] = useState();
  const [events, setEvents] = useState();

  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    const fetchData = async () => {
      await fetch(`http://localhost:3001/${browserLanguage}/events`) //! dodać cors z localhost xxxx
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
  return (
    <div>
      {events[0].title}
      {error}
    </div>
  );
}

export default Events;
