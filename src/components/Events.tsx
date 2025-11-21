import event1 from "../assets/event1.jpg";
import event2 from "../assets/event1.jpg";
import event3 from "../assets/event1.jpg";
import event4 from "../assets/event1.jpg"; 

export default function Events() {
  const events = [
    { id: 1, image: event1, time: "7:30 AM", place: "Vijayawada" },
    { id: 2, image: event2, time: "7:30 AM", place: "Vijayawada" },
    { id: 3, image: event3, time: "7:30 AM", place: "Vijayawada" },
    { id: 4, image: event4, time: "7:30 AM", place: "Vijayawada" },
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
                <div className="event-info">
                  <div className="event-time">
                    <span>22</span>
                    <small>JUN</small>
                    <p>{event.time}</p>
                  </div>

                  <p className="event-place">{event.place}</p>

                  <button className="event-btn">Book Seats</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
