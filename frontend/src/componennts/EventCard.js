import "./EventCard.css";

function EventCard(props) {
  return (
    <div className="container">
      <img src="https://source.unsplash.com/random" alt="something" />
      <div className="bottom">
        <p className="title">{props.title}</p>
        <p className="tickets">{props.tickets}</p>
      </div>
    </div>
  );
}

export default EventCard;
