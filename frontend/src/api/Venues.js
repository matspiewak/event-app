import { useEffect, useState } from "react";

function Venues() {
  const [error, setError] = useState();
  const [venues, setVenues] = useState();

  useEffect(() => {
    const browserLanguage = navigator.language.slice(0, 2);
    const fetchData = async () => {
      await fetch(`https://eventplannerapi.azurewebsites.net/${browserLanguage}/venues`) //! dodać cors z localhost xxxx
        .then((res) => res.json())
        .then((venues) => {
          setVenues(venues);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  if (!venues) {
    return <div>loading...</div>;
  }
  return (
    <div>
      {venues[0].title}
      {error}
    </div>
  );
}

export default Venues;
