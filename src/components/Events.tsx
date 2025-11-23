import event1 from "../assets/event1.jpg";


export default function Events() {
  const events = [
    { id: 1, image: event1, time: "7:30 AM", place: "Vijayawada" },
    { id: 2, image: event1, time: "7:30 AM", place: "Vijayawada" },
    { id: 3, image: event1, time: "7:30 AM", place: "Vijayawada" },
    { id: 4, image: event1, time: "7:30 AM", place: "Vijayawada" },
  ];

  return (
    <section className="events-section">
      <div className="container">
        <h2 className="events-title">Upcoming Meetings/Events</h2>

        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.place} className="event-image" />

             <div className="event-footer">
  <div className="event-row">
    {/* DATE CIRCLE */}
    <div className="date-circle">
      <span className="day">22</span>
      <span className="month">JUN</span>
    </div>

    {/* TIME PILL */}
    <div className="time-pill">{event.time}</div>

    {/* PLACE CAPSULE WITH INNER BUTTON */}
    <div className="place-pill">
      <span className="place-text">{event.place}</span>
      <button className="book-btn">Book Seats</button>
    </div>
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
